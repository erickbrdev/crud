const express = require('express')
const { readTalker, writeTalker, findById, addTalker, deleteTalker } = require('../utils/readFile');
const validateName = require('../middlewares/validations/validateName');
const validateAge = require('../middlewares/validations/validateAge');
const validateTalk = require('../middlewares/validations/validateTalk');
const validateToken = require('../middlewares/validations/validateToken');

const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  try {
    const talkers = await readTalker();
    return res.status(200).json(talkers);
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const getById = await findById(Number(id));
  
  if (!getById) return res.status(404).json({"message": "Pessoa palestrante não encontrada"});

  return res.status(200).json(getById);
});

talkerRouter.post('/',
  validateName,
  validateAge,
  validateTalk,
  async(req, res) => { 
  const {name, age, talk:{ watchedAt, rate }} = req.body; 
  const newTalker = await addTalker(name, age, watchedAt, rate)
  return res.status(201).json(newTalker)
});

talkerRouter.put('/:id',
  validateName,
  validateAge,
  validateTalk,
  async (req,res) => {
    try {
      const talkers = await readTalker();
      const { id } = req.params;
      const {name, age, talk:{ watchedAt, rate }} = req.body;
      const index = talkers.findIndex(elem => elem.id === Number(id));
      talkers[index] = {
        name, age , id:Number(id), talk: {watchedAt, rate}
      }
      await writeTalker(talkers)
      return res.status(200).json(talkers[index])
    } catch (error) {
      return res.status(404).json({"message": `${id} não foi encontrado`})
    }
})

talkerRouter.delete('/:id', validateToken, async (req, res) => {
  try {
    const {id} = req.params
    const filterTalkers = await deleteTalker(Number(id));
    return res.status(200).end();
  } catch (error) {
    return res.status(500).send({message: error.message})
  }
})

module.exports = talkerRouter;
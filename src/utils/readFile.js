const fs = require('fs').promises;
const { join } = require('path')

const path = '../database/talker.json'

const readTalker = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), "utf-8");
    return JSON.parse(contentFile);
  } catch (error) {
    return error.message
  }
}

const writeTalker = async (content) => {
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(content, null, " "))
  } catch (error) {
      return error.message;
  }
}

const findById = async (id) => {
  try {
    const talkerFile = await readTalker();    
    return talkerFile.find((elem) => elem.id === id)
  } catch (error) {
    return error.message;
  }
}

const addTalker = async (name, age, watchedAt, rate) => {
  const talkerFile = await readTalker();
  const newTalker = {
    name,
    age,
    id: talkerFile.length +1,
    talk: {
      watchedAt,
      rate
    }
  }
  talkerFile.push(newTalker);   
  await writeTalker(talkerFile); 
  return newTalker;
}

const deleteTalker = async (id) => {
  const talkerFile = await readTalker();
  const filterTalkers = talkerFile.filter(elem => elem.id !== Number(id));  
  await writeTalker(filterTalkers);  
}

module.exports = {
  readTalker,
  writeTalker,
  findById,
  addTalker,  
  deleteTalker
};
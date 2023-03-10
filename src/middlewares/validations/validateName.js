const validateName = (req, res, next) => {
  const { name } = req.body
  if(name.length < 3) {
    return res.status(400).json({ "message": "O \"name\" deve ter pelo menos 3 caracteres" })
  }

  if(!name || name === null || name === '' ) {
    return res.status(400).json({ "message": "O campo \"name\" é obrigatório" })
  }
 
  next();
}

module.exports = validateName;
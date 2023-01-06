const validatePassword = (req,res, next) => {
  const { password } = req.body 
  if(password.length < 6) {
    return res.status(400).json({ "message": "O \"password\" deve ter pelo menos 6 caracteres"}) 
  };

  if(!password || password === null || password === undefined || password === "") {
    return res.status(400).json({"message": "O campo \"password\" é obrigatório"})
  }
  next();
}

module.exports = validatePassword;
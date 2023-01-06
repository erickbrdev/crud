const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regExp = /^(\w+)@(\w+(\.\w{2,3})+)$/g;

  if(!regExp.test(email)) {
    return res.status(400).json({"message": "O \"email\" deve ter o formato \"email@email.com\""})
  } 
  next();
}

module.exports = validateEmail;
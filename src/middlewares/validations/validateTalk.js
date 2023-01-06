const emptyTalk = (talk) => {
  if (!talk || (talk.rate !== 0 && !talk.rate) || !talk.watchedAt) { return true; }
  };
  
  const validateWatchedAt = (watchedAt) => {
    const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    return dateRegex.test(watchedAt);
  };
  
  const validateRate = (rate) => (rate <= 5 && rate > 0);   

  const validateTalk = (req, res, next) => {
    const { talk } = req.body;    
      if (emptyTalk(talk)) {
        return res.status(400).json({"message":'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'});
      }
      if (!validateWatchedAt(talk.watchedAt)) {
        return res.status(400).json({"message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""});
      }
      if (!validateRate(talk.rate)) {
        return res.status(400).json({ "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"});
      }
    
    next();
  };
  
  module.exports = validateTalk;
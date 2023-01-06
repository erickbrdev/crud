const idLength = 16;

const generateId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = '';
  const charactersLenght = characters.length;
  for (let i = 0; i < idLength; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * charactersLenght));
  }
  return id
}

module.exports = generateId;
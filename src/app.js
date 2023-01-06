const express = require('express');
const talkerRouter = require('./routes/talkerRoutes')
const loginRouter = require('./routes/loginRoutes');

const app = express();

app.use(express.json());
app.use("/talker", talkerRouter);
app.use("/login", loginRouter);

module.exports = app;
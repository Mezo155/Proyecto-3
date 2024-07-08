const creatorError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model")
const { sendEmail } = require("../config/nodemailer")

module.exports.create = (req, res, next) => {
  const {userName, email, password} = req.body;
  const imgUrl = req.file ? req.file.path : null;

  User.create({ userName, email, password, imgUrl })
  .then((userCreated) => {
    // Enviar un correo de bienvenida
    const subject = 'Welcome to Our Service!';
    const html = `
      <h1>¡Bienvenido, ${userName}!</h1>
        <p>Gracias por registrarte con nosotros. ¡Estamos emocionados de tenerte a bordo!</p>
        <p>Aquí tienes una vista rápida de tu perfil:</p>
        <img src="${imgUrl}" alt="Imagen de Perfil" style="max-width: 200px;"/>
      `;

    return sendEmail(email, subject, html)
      .then(() => {
        res.status(201).json(userCreated);
      });
  })
  .catch(next);
};


module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then((user) => {
      if (!user) {
        next(createError(402, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { userName, password } = req.body;
  const imgUrl = req.file ? req.file.path : null;

  const updateData = {};

  if (userName) updateData.userName = userName;
  if (password) updateData.password = password;
  if (imgUrl) updateData.imgUrl = imgUrl;

  User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return next(createError(404, "User not found"));
      }
      res.json(updatedUser);
    })
    .catch(next);
};
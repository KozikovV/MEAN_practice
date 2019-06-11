const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'backend/images'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const imageControll = require('../midellware/avatar')

const User = require('../scemas/user');

const userRouter = express.Router();

userRouter.post('/singup', imageControll, (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        nickName: req.body.nickName,
        email: req.body.email,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        image: url + '/images' + req.file.filename,
        password: hash
      });
      user.save()
        .then((result) => {
          res.status(200).json({
            message: "All good",
            body: result
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Not allowed credentials"
          });
        });
    });
});


userRouter.post('/login', (req, res, next) => {
  let loginedUser;
  User.findOne({nickName: req.body.nickName})
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: 'Such user not found'
        });
      }
      loginedUser = user
      return bcrypt.compare(req.body.password, loginedUser.password)
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
            message: 'Autorisation failed'
        });
      }
      const token = jwt.sign(
        {email: loginedUser.email, userId: loginedUser._id, nickName: loginedUser.nickName},
        'some text',
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token,
        expiresIn: 3600,
        userId: loginedUser._id,
        loginedUser
      });
    })
});

module.exports = userRouter;

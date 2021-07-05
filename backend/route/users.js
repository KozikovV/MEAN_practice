const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'backend/images'});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const imageControl = require('../midellware/avatar')

const User = require('../scemas/user');

const userRouter = express.Router();

userRouter.post('/singup', imageControl, (req, res, next) => {
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
            message: "Singup seccess",
            body: {
              age: result.age,
              email: result.email,
              imagePath: result.image,
              name: result.name,
              nickName: result.nickName,
              surname: result.surname,
              weight: result.weight,
              height: result.height,
              userId: result._id
            }
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
            message: 'Authorisation failed'
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
        loginedUser: {
          age: loginedUser.age,
          email: loginedUser.email,
          imagePath: loginedUser.image,
          name: loginedUser.name,
          nickName: loginedUser.nickName,
          surname: loginedUser.surname,
          weight: loginedUser.weight,
          height: loginedUser.height,
          userId: loginedUser._id
        }
      });
    })
});


userRouter.get('/profile', (req, res, next) => {
  if (!req.header('Authorization')) {
    res.status(401).json({
      message: 'Not Authorize'
    })
  }
  const token = req.header('Authorization').slice(7);
  const userId = jwt.verify(token, 'some text').userId;
  User.findById(userId)
  .then((user) => {
    res.status(200).json({
      message: 'Here your user',
      body: {
        age: user.age,
        email: user.email,
        imagePath: user.image,
        name: user.name,
        nickName: user.nickName,
        surname: user.surname,
        weight: user.weight,
        height: user.height,
        userId: user._id
      }
    })
  })
});

module.exports = userRouter;

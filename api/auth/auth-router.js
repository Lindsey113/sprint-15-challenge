const router = require('express').Router();
const Auth = require('./auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { usernameAvailability, checkUsernameExists, validateLoginInput } = require('./auth-middleware');
const { JWT_SECRET } = require('../secrets/index')

router.post('/register', validateLoginInput, usernameAvailability, (req, res, next) => {
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)
  try {
    if (!username || !password) {
      return res.status(401).json({ message: "username and password required" })
    } else if (username && password) {
      Auth.add({ username, password: hash })
        .then(saved => {
          res.status(201).json(saved)
          console.log(saved)
        })
        .catch(next)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/login', validateLoginInput, checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body
  try {
    if (bcrypt.compareSync(password, req.user.password)) {
      const token = buildToken(req.user)
      res.json({
        message: `welcome, ${username}`, token
      })
    } else {
      return res.status(401).json({ message: "invalid credentials" })
    }
  } catch (err) {
    next(err)
  }
})

function buildToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  }
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router
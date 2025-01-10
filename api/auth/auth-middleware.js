const User = require('./auth-model')

async function usernameAvailability(req, res, next) {
  try {
    const { username } = req.body
    const existingUser = await User.findBy({ username })
    if (existingUser && existingUser.length) {
      res.status(422).json({ message: "username taken" })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateLoginInput(req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(401).json({ message: "username and password required" });
  } else if (username && password) {
    next()
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const { username } = req.body
    const [user] = await User.findBy({ username })
    if (!user || user.username !== username) {
      return res.status(401).json({ message: "invalid credentials" })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  usernameAvailability,
  checkUsernameExists,
  validateLoginInput
}
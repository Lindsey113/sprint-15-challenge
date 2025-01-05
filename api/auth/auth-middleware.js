const User = require('./auth-model')
//const bcrypt = require('bcryptjs')

async function usernameAvailability(req, res, next) {
    try {
        const {username} = req.body
        const existingUser = await User.findBy({username})
        if(existingUser && existingUser.length){
            res.status(422).json({message: "username taken"})
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

async function checkUsernameExists (req, res, next) {
    try {
        const { username } = req.body
        const [user] = await User.findBy({username})
        if(user !== username) {
         res.status(401).json({message: "invalid credentials"})
         next()
        } else {
          req.user = user
          next()
        }
      } catch(err){
        next(err)
      }
}

module.exports = {
    usernameAvailability,
    checkUsernameExists
}
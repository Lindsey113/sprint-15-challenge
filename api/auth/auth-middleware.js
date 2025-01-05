const db = require('../../data/dbConfig')
const User = require('./auth-model')

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

module.exports = {
    usernameAvailability
}
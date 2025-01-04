const db = require('../../data/dbConfig')

function find() {
    return db('users')
}

module.exports = {
    find
}
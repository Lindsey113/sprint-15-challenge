const db = require('../../data/dbConfig')

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

async function findByUsername(username) {
    return db('users').where({ username }).first()
}

async function findById(id) {
    return db('users').select('id', 'username', 'password').where({ id }).first()
}

async function add(user) {
    try {
        const [id] = await db('users').insert(user)
        return findById(id)
    } catch (err) {
        console.log('Error inserting user:', err)
        throw err
    }
}

module.exports = {
    find,
    findById,
    findByUsername,
    findBy,
    add
}
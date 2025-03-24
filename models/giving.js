const db = require('../db')

const givingModel = {
    add: (name, amount, currency, date, phonenumber, email, cb) => {
        db.query(
            'insert into giving (name, amount, currency, date, phonenumber, email) values (?, ?, ?, ?, ?, ?)',
            [name, amount, currency, date, phonenumber, email],
            (err, results) => {
                if(err) return cb(err)
                cb(null)
            }
        )
    }
}

module.exports = givingModel
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    emailId: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }

})

const UserModel = new mongoose.model('users', userSchema)


module.exports.createNewUser = (userParameters) => {
    return new Promise((resolve, reject) => {
        let userInstance = new UserModel(userParameters)
        userInstance.save((err, newUser) => {
            if (err) {
                console.log("Unalbe To Create New User In DB...!")
                console.log(err)
                return reject(err)
            }
            resolve(newUser)
        })
    })
}

module.exports.findSingleUserByQuery = (query) => { 
    return UserModel.findOne(query)
}
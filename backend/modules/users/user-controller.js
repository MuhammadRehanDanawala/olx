let userDBHelper = require('./user-model')
let bcrypt = require('bcrypt')


module.exports.signUpWithDetails = (req, res) => {
    console.log("req.body")
    console.log(req.body)
    bcrypt.hash(req.body.password, 8, function (err, hash) {
        req.body.password = hash
        userDBHelper.createNewUser(req.body)
            .then(newCreatedUser => {
                console.log(newCreatedUser)
                req.session.user = newCreatedUser._id

                res.send({ status: true, created: true, newUser: newCreatedUser })

            })
            .catch(err => {
                res.send({ status: false, created: false, })
            })
    });


}


module.exports.signinWithEmailAndPassword = (req, res) => {
    userDBHelper.findSingleUserByQuery({ emailId: req.body.emailId })

        .then(user => {
            if (!user) {
                res.status(500).send({ status: false, found: false, emailId: false, })

                return
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                if (!result) {
                    console.log("password didnt math")
                    res.send({ status: false, errMessage: "The Password didnt match", auth: false })
                    return;
                }

                if (result) {
                    req.session.user = user._id
                    res.send({ status: true, created: true, signedInUser: user })

                }

            })
        })

        .catch(err => {
            console.log("Unable to find user by id..!")
            console.log(err)

            res.send({ status: false, found: false, email: false, })
        })
}
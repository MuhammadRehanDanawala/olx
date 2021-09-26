const { json } = require('body-parser');
const mongoose = require('mongoose');
const adSchema = new mongoose.Schema({
    companyName:String,
    model:String, 
    location:String,
    email:String,
    mobileNumber:Number,
    headerImage: String,
    category: String,
    discription: String,
    createdAt: { type: Date, default: Date.now }
})

const adModel = new mongoose.model('ads', adSchema);

module.exports.createNewAdInDb = (adDetails) => {
    return new Promise((resolve, reject) => {
        console.log('ad model log')
        console.log(adDetails)
        let adsInstance = new adModel(adDetails)
        adsInstance.save((err, doc) => {
            if (err) {
                console.log('Error in creating new ads in db')
                console.log(err)
                return reject(err)
            }
            console.log('doc')
            console.log(doc)
            resolve(doc)
        })
    })
}

module.exports.findMathingad = (query) => {
    return adModel.findOne(query)
}

module.exports.findAllMatchingads = (query) => {
    console.log(query)
   
    return new Promise((resolve, reject) => {

        adModel.find((query, (err, documents) => {
            if (err) {
                console.log('Error in finding ad from db')
                console.log(err)
                return reject(err)
            }
            console.log(documents)
            resolve(documents)
        }))

    })
}

module.exports.findCategoryItem = (query) => {
    console.log(query)
   JSON.stringify(query)
   console.log(query)

    return new Promise((resolve, reject) => {

        adModel.find(query, (err, documents) => {
            if (err) {
                console.log('Error in finding ad from db')
                console.log(err)
                return reject(err)
            }
            console.log('category items')
            console.log(documents)
            resolve(documents)
        })

    })
}
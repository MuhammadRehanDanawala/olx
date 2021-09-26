const adModel = require('./ads-model')
const fileUploadHelper = require('../../helpers/file-uploader/file-uploader-demo')


module.exports.getListOfAllads = (req, res) => {
    adModel.findAllMatchingads({})
        .then(foundDocumentList => {
            console.log('foundDocumentList');
            console.log(foundDocumentList);
            res.send({ status: true, found: true, list: foundDocumentList })
        })
        .catch(err => {
            res.send({ status: false, found: false })

        })

}

module.exports.findRequestedad = (req, res) => {
    adModel.findMathingad({ _id: req.params.id })
        .then(foundDocumentList => {
            res.send({ status: true, found: true, requestedad: foundDocumentList })
        })
        .catch(err => {
            res.send({ status: false, found: false })

        })

}


module.exports.createNewad = (req, res) => {

    let adDetails = req.body
    // fileUploadHelper.uploadImageOnCloudinary(image)
    //     .then(imageUploadResult => {
    //         console.log(imageUploadResult)
    //         adDetails.headerImage = imageUploadResult.url
    //         delete adDetails.chooseImage
    //         console.log(adDetails)
            
            
    //     })
        adModel.createNewAdInDb(adDetails)
        .then(newCreateDocument => {
            res.send({ status: true, created: true, newDocumentid: newCreateDocument })
        })
        .catch(err => {
            console.log("Got an error", err);
            res.send({ status: false })
        })
}

module.exports.findAllCategoryItem = (req, res) => {
    console.log(req.body)
    adModel.findCategoryItem({category: req.body.name})
        .then(result => {
            res.send({ status: true, result: result, found: true })
        })
        .catch(err => {
            res.send({ status: false })
        })
}
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dhoxnbzqd',
  api_key: '673633388117898',
  api_secret: 'xvVOmhz_GzisV1ccDVKYGPYAjqI'
});




module.exports.uploadImageOnCloudinary = (image) => {

  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload('data:image/jpeg;base64,' + image,
      {
        resource_type: "image", public_id: "demo-images",
      }, function (error, result) {
        if (error) {
          console.log("unable to upload image", error)
          reject(error)
          
        } else {
          console.log("image uploaded successfully")
          resolve(result)
        }
      })
  })
};




// module.exports.uploadImageOnCloudinary = (imageToUpload) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.v2.uploader.upload( 'data:image/jpeg:base64', + imageToUpload, {
//       resource_type: "image", public_id: "demo-images",
//     }, function (error, result) {
//       if (error) {
//         console.log("unable to upload image", error)
//         reject(error)
//       } else {
//         console.log("image uploaded succesfully", result)
//         resolve(result)
//       }
//     });
//   })
// }


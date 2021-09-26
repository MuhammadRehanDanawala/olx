const express = require('express')
const router = express.Router();
const adsController = require('./ads-controller')

router.post('/new',adsController.createNewad )
router.get('/list',adsController.getListOfAllads )
// router.get('/:id',adsController.findRequestedad)
router.post('/category', adsController.findAllCategoryItem)

module.exports = router;    
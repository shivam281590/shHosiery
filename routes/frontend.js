var express = require('express');
const {User} = require('../models');
var router = express.Router();
var mixManifest=require('../middlewares/loadMixManifest');

router.use(mixManifest);
/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.render('frontend/tex');
});

module.exports = router;

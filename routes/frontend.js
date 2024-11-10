var express = require('express');
const {User,Config} = require('../models');
var router = express.Router();
var mixManifest=require('../middlewares/loadMixManifest');
var bycrptjs=require('bcryptjs');

router.use(mixManifest);
/* GET users listing. */
router.get('/abc', async function(req, res, next) {
  // res.send(`<img src="/SH.png" alt="" style="width:180px;">`)

  // var conf=await Config.findOne({where:{key:'shopGST'}});
  // conf.value='09ADIPT3034G1ZG';
  // await conf.save();
  // var conf=await Config.findOne({where:{key:'discount'}});
  // conf.value='4.76';
  // await conf.save();

  // var conf=await Config.findOne({where:{key:'accountNo'}});
  // conf.value='6121008700000313';
  // await conf.save();
  // var conf=await Config.findOne({where:{key:'ifscCode'}});
  // conf.value='PUNB0612100';
  // await conf.save();
  // var conf=await Config.findOne({where:{key:'bankName'}});
  // conf.value='Punjab National Bank Mariahu';
  // await conf.save();

  // await Config.create({
  //   key:'shopGST',
  //   value:'cgfjgffvnfnvnfjfn',
  //   fieldType:'text'
  // })
  // await Config.bulkCreate([
  //   {
  //     key:'shopAddress',
  //     value:"Sadarganj,Sahiktra(Oppsite of Pawan Takies), Mariahu, Jaunpur, Uttar Pradesh, India 222161",
  //     fieldType:'text'
  //   },
  //   {
  //     key:'ShopName',
  //     value:'Shivam Hosiery',
  //     fieldType:'text'
  //   },
  //   {
  //     key:'shopMobile',
  //     value:'+919918300361',
  //     fieldType:'text'
  //   },
  //   {
  //     key:'bankName',
  //     value:'Punjab National Bank',
  //     fieldType:'text'
  //   },
  //   {
  //     key:'accountNo',
  //     value:'612100',
  //     fieldType:'text'
  //   },
  //   {
  //     key:'ifscCode',
  //     value:'PUNB612100',
  //     fieldType:'text'
  //   }
  // ]);

  let allConfig=await Config.findAll();

  console.log(allConfig);


  return res.render('frontend/tex');
});

module.exports = router;

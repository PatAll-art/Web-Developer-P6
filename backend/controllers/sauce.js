
const { error } = require('console');
const { reduce } = require('rxjs');
const { use } = require('../app');
const { validate } = require('../models/sauce');
const Sauce = require('../models/sauce');

console.log('hello saucey');

//exports.getSauces = (req, res, next) => {
 // Sauce.findOne 
  
//}

/* exports.saveSauces = (req, res, next) => {
  console.log(req);
  console.log(req.body);
  console.log(req.payload);
  

  res.status(201).json({
    message: 'boo!'
  });

};*/

exports.createSauce = (req, res, next) =>{
  const sauce = new Sauce({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce saved!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )

};


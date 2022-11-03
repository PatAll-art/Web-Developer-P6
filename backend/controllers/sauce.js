
const { error } = require('console');
const { reduce } = require('rxjs');
const { use } = require('../app');
const { validate } = require('../models/sauce');
const Sauce = require('../models/sauce');
const fs = require('fs');

console.log('hello saucey');

exports.createSauce = (req, res, next) =>{
  //for images use url 
  const url = req.protocol + '://' + req.get('host');
  console.log(url);
  console.log(req);
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    likes: req.body.sauce.likes,
    dislikes: req.body.sauce.dislikes,
    imageUrl:  url + '/images/' + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    usersLiked: req.body.sauce.usersLiked,
    usersDisliked: req.body.sauce.usersDisliked,
    userId: req.body.sauce.userId
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce saved!'
      });
    }
  ).catch(
    (error) => {
      console.log(error);
      res.status(400).json({
        error: error
      })
    }
  )
};

exports.getSauces = (req, res, next ) => {
    Sauce.find().then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.findSauces = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};
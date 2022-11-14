const { error } = require("console");
const { reduce } = require("rxjs");
const { use } = require("../app");
const { validate } = require("../models/sauce");
const Sauce = require("../models/sauce");
const fs = require("fs");
const { EWOULDBLOCK } = require("constants");

console.log("hello saucey");

exports.createSauce = (req, res, next) => {
  //for images use url
  const url = req.protocol + "://" + req.get("host");
  console.log(url);
  console.log(req);
  req.body.sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    imageUrl: url + "/images/" + req.file.filename,
    mainPepper: req.body.sauce.mainPepper,
    usersLiked: req.body.sauce.usersLiked,
    usersDisliked: req.body.sauce.usersDisliked,
    userId: req.body.sauce.userId,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce saved!",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: error,
      });
    });
};

exports.getSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.findSauces = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  console.log(req.file);
  console.log(req.body.file);
  console.log(req.image);
  console.log(req.body.image);

  let sauce = null;
  if (req.file == null) {
    console.log("null");
    sauce = new Sauce({
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      heat: req.body.heat,
      mainPepper: req.body.mainPepper,
      userId: req.body.userId,
    });
  } else {
    const url = req.protocol + "://" + req.get("host");
    req.body.sauce = JSON.parse(req.body.sauce);
    console.log("no null");
    sauce = new Sauce({
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      heat: req.body.sauce.heat,
      imageUrl: url + "/images/" + req.file.filename,
      mainPepper: req.body.sauce.mainPepper,
      userId: req.body.sauce.userId,
    });
  }

  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then((sauce) => {
      res.status(201).json({
        message: "Sauce updated!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.likeButton = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    let like = sauce.usersLiked;
    let userId = req.body.userId;
    let position = like.indexOf(userId);
    let dislike = sauce.usersDisliked;
    let dislikePosition = dislike.indexOf(userId);
    let likedPosition = like.indexOf(userId);
    let neutralLike = like.indexOf(userId);
    let neutralDislike = dislike.indexOf(userId);

    if (req.body.like == 1) {
      console.log("here");
      if (position == -1) {
        like.push(userId);
      }
      if (dislikePosition > -1) {
        dislike.splice(dislikePosition, 1);
      }
    }
    if (req.body.like == -1) {
      if (position == -1) {
        dislike.push(userId);
      }
      if (likedPosition > -1) {
        like.splice(likedPosition, 1);
      }
    }
    if (req.body.like == 0) {
      if (neutralLike > -1) {
        like.splice(neutralLike, 1);
      }
      if (neutralDislike > -1) {
        dislike.splice(neutralDislike, 1);
      }
    }
    
    sauce.likes = like.length;
    sauce.dislikes = dislike.length;

    Sauce.updateOne({ _id: req.params.id }, sauce)
      .then((sauce) => {
        res.status(201).json({
          message: "Sauce updated!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });
};

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { type } = require('os');

const sauceSchema = mongoose.Schema({
    
        name: { type: String, require: true },
        manufacturer: { type: String, require: true },
        description: { type: String, require: true },
        heat: { type: Number, require: true },
        likes: { type: Number, require: false},
        dislikes: { type: Number, require: false},
        imageUrl: { type: String, require: true },
        mainPepper: { type: String, require: true},
        usersLiked: { type: [String]},
        usersDisliked: { type: [String] },
        userId: { type: String, require: true },
});

sauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);

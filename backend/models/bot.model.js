const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
    header:{
        type: String,
    },
    background:{
        type: String,
    },
    prompt:{
        type: String,
    },
    greetings:{
        type: String,
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    missed:{
        type: String,
    },
    welcome:{
        type: String,
    },

})
module.exports = mongoose.model('Bot', botSchema);
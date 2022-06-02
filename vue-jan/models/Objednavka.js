const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const ObjednavkaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    zadal: {
        type: String,
        ref: User
    },
    stav: {
        type: String,
        ref: User
    },

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Objednavka = mongoose.model('objednavka', ObjednavkaSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const CisDlzkaTyce = require('./CisHrubkaTyce');
const CisHrubkaTyce = require('./CisHrubkaTyce');
const ZasobaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typDlzka: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: CisDlzkaTyce
    },
    typHrubka: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: CisHrubkaTyce
    },
    zadal: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: User
    },

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Zasoba = mongoose.model('zasoba', ZasobaSchema);
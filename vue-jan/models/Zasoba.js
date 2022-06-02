const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const CisDlzkaTyce = require('./CisDlzkaTyce');
const CisHrubkaTyce = require('./CisHrubkaTyce');
const ZasobaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    typDlzka: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: CisDlzkaTyce,
        required: true
    },
    typHrubka: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: CisHrubkaTyce,
        required: true
    },
    zadal: {
        type: String,
        ref: User
    },
    exportovana: {
        type: Number,
        default: 0
    },
    pocet: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Zasoba = mongoose.model('zasoba', ZasobaSchema);
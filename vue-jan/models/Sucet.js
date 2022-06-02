const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Zasoba = require('./Zasoba');
const Objednavka = require('./Objednavka');
const CisDlzkaTyce = require('./CisDlzkaTyce');
const CisHrubkaTyce = require('./CisHrubkaTyce');

const SucetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    zasoba: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Zasoba,
    },
    objednavka: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Objednavka,
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
    pozadovanyPocet: {
        type: Number,
        required: true
    },

    priradenyPocet: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Sucet = mongoose.model('sucet', SucetSchema);
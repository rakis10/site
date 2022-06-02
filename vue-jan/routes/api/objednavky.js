const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config').secret;
const User = require('../../models/User');
const Zasoba = require('../../models/Zasoba')
const Objednavka = require('../../models/Objednavka')
const DlzkaTyce = require('../../models/CisDlzkaTyce')
const HrubkaTyce = require('../../models/CisHrubkaTyce')

// nacitaj objednavky
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    //   Ako populate if not null
    Objednavka.find().populate(["typDlzka","typHrubka"]).then(zasoba =>{
        return res.json(zasoba)
    })

});
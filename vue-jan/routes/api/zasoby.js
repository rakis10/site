const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config').secret;
const User = require('../../models/User');
const Zasoba = require('../../models/Zasoba')
const DlzkaTyce = require('../../models/CisDlzkaTyce')
const HrubkaTyce = require('../../models/CisHrubkaTyce')


// nacitaj Zasobu
router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Zasoba.find().then(zasoba =>{
        return res.json(zasoba)
    })
    // return res.json({
    //     zasoby: 'vela'
    // });
});

// nacitaj dlzku
router.get('/dlzka', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    DlzkaTyce.find().then(zasoba =>{
        return res.json(zasoba)
    })
    // return res.json({
    //     zasoby: 'vela'
    // });
});

// create pridajDlzku
router.post('/pridajDlzku', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let {
        name,
    } = req.body
    DlzkaTyce.findOne({
        name: name
    }).then(dlzka => {
        if (dlzka) {
            return res.status(400).json({
                msg: "Dlzka is already taken."
            });
        }
    })
    // ukladame novu
    let nova = new DlzkaTyce({
        name
    });
    nova.save().then(user => {
        return res.status(201).json({
            success: true,
            msg: "Dlzka pridana."
        });
    });
});

// nacitaj hrubku
router.get('/hrubka', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    HrubkaTyce.find().then(zasoba =>{
        return res.json(zasoba)
    })
});

// create pridajDlzku
router.post('/pridajHrubku', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let {
        name,
    } = req.body
    HrubkaTyce.findOne({
        name: name
    }).then(hrubka => {
        if (hrubka) {
            return res.status(400).json({
                msg: "Hrubka is already taken."
            });
        }
    })
    // ukladame novu
    let nova = new HrubkaTyce({
        name
    });
    nova.save().then(user => {
        return res.status(201).json({
            success: true,
            msg: "Hrubka pridana."
        });
    });
});
module.exports = router;
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

    Zasoba.find().populate(["typDlzka","typHrubka"]).then(zasoba =>{
        return res.json(zasoba)
    })
});
// nacitaj zasobu
router.get('/zasoba', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log("parameter id " + req.query.id);
    // HrubkaTyce.find().then(zasoba =>{
    //     return res.json(zasoba)
    // })
    return res.json(req.query.id)

});
// zmaz Zasobu
router.delete('/del', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let id = {
         _id: req.body.id
    }

    // Zasoba.deleteOne(nova).then(resp =>{
    //     console.log(resp)
    //     return res.status(200).json({
    //         success: true,
    //         msg: "Zmazane"
    //     });
    // }).catch(function (e){
    //     console.log(e)
    // })
    console.log(id)
    Zasoba.deleteOne(id).then(zasoba =>{

        return  res.status(200).json({
                    success: true,
                    msg: "Zmazane"
                });
            })

            //
            //                      alebo 204
            // return res.status(409).json({
            //     success: false,
            //     msg: "fail."
            // });





});
// pridaj Zasobu
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let {
        name,
        zadal,
        typDlzka,
        typHrubka,
        pocet
    } = req.body
    console.log("typ dlzkyId" + typDlzka)
    // ukladame novu
    let nova = new Zasoba({
        name,
        zadal,
        typDlzka,
        typHrubka,
        pocet

    });
    DlzkaTyce.findOne({
        _id: typDlzka
    }).then(dlzka => {
        if (dlzka) {
            nova.typDlzka = dlzka._id
        }
    })
    nova.save().then(user => {
        return res.status(201).json({
            success: true,
            msg: "Zasoba pridana."
        });
    });

});

// nacitaj dlzku
router.get('/dlzka', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    DlzkaTyce.find().then(zasoba =>{
        return res.json(zasoba)
    })
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

// create pridaj hrubku
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
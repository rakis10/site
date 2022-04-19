const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DlzkaTyceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});
module.exports = DlzkaTyce = mongoose.model('dlzkaTyce', DlzkaTyceSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HrubkaTyceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});
module.exports = HrubkaTyce = mongoose.model('hrubkaTyce', HrubkaTyceSchema);
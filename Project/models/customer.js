const Joi =  require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(c){
    const s = {
        name: Joi.string().min(3).max(50),
        phone: Joi.string().min(10).max(10),
        isGold: Joi.boolean()
    };

    return Joi.validate(c, s);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
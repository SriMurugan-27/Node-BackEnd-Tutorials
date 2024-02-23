const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const route = express.Router();

route.get('/',async (req, res) => {
    const customer = await Customer.find();
    res.send(customer);
});

route.get('/:id', async (req, res) => {
    const customer = await Customer.find({ _id: req.params.id });
    if(!customer){
        return res.status(404).send('No such customer exists');
    }
    res.send(customer);
});

route.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let customer = await Customer({
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

route.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });
    if(!customer){
        return res.status(404).send('No such customer exists');
    }

    res.send(customer);
});

route.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer){
        return res.status(404).send('No such customer exists');
    }
    res.send(customer);
})

module.exports = route;

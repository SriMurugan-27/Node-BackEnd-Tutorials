const db = require('./db');
const mail = require('./mail');

//Testing Number
module.exports.absolute = (number) => {
  return (number >=0 ) ? number : -number;
};

//Testing String
module.exports.greet = (name) => {
  return 'Welcome ' + name + '!';
};

//Testing Arrays
module.exports.currency = () => {
  return ['USD', 'AUD', 'EUR'];
}

//Testing Objects
module.exports.product = (productId) => {
  return { id: productId, price: 10 };
};

//Testing Exception
module.exports.user = (username) => {
  if(!username) throw new Error('Username is required!');
  return { id: new Date().getTime(), username: username };
};

//Testing Mock Function
module.exports.applyDiscount = (order) => {
  const customer = db.getCustomer(order.id);
  if(customer.points > 10){
    order.totalPrice *= 0.9;
  };
  return;
}

//Testing Fake Function
module.exports.notifyCustomer = (order) => {
  const customer = db.getCustomer(order.id);
  mail.send(customer.email, 'You order is placed!');
}

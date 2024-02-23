
const mongoose = require('mongoose');

const id = mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());
console.log(mongoose.Types.ObjectId.isValid('1234'));
console.log(mongoose.Types.ObjectId.isValid('65c5f3e054b19c28a4aae1e5'));

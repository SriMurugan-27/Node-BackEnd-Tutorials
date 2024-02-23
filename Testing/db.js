
module.exports.getCustomer = function(id){
  console.log('Reading the Customer in MongoDB...');
  return { id: id, points: 11 };
}


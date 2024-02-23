
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

con.connect(function(err){
    if(err) throw err;
    console.log('Connnected');
    // var sql = "CREATE DATABASE mydb"; 
    // var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
    // var sql = "DROP TABLE Customer";
    // var sql = "INSERT INTO Customers (name , address) values ('Michelle', 'Blue Village 1')";
    // var values = [
    //     ['John', 'Highway 71'],
    //     ['Peter', 'Lowstreet 4'],
    //     ['Amy', 'Apple st 652'],
    //     ['Hannah', 'Mountain 21'],
    //     ['Michael', 'Valley 345'],
    //     ['Sandy', 'Ocean blvd 2'],
    //     ['Betty', 'Green Grass 1'],
    //     ['Richard', 'Sky st 331'],
    //     ['Susan', 'One way 98'],
    //     ['Vicky', 'Yellow Garden 2'],
    //     ['Ben', 'Park Lane 38'],
    //     ['William', 'Central st 954'],
    //     ['Chuck', 'Main Road 989'],
    //     ['Viola', 'Sideway 1633']
    // ];
    // var name = "Amy";
    // var adr = "Mountain 21";
    // var sql = "SELECT * FROM customers WHERE address = " + mysql.escape(adr);
    // var sql = "SELECT * FROM customers WHERE address = ?";
    // var sql = "SELECT * FROM customers WHERE name = ? OR address = ?";
    // var sql = "SELECT * FROM customers ORDER BY name DESC";
    // var sql = "DELETE FROM customers WHERE name = 'Sandy'";
    // var sql = "INSERT INTO customers (name, address) VALUES ('Sandy','Ocean blvd 2')";
    // var sql = "UPDATE customers SET address = 'Ocean blvd 2' WHERE address = 'Lowstreet 4'";
    // var sql = "SELECT * FROM customers LIMIT 5 OFFSET 2";
    // var sql = "SELECT * FROM customers LIMIT 2,5"
    // var sql = "CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), favorite_product INT(11))";
    // var sql = "INSERT INTO user (name, favorite_product) VALUES ?";
    // var values = [
    //     ['John',154],
    //     ['Peter',154],
    //     ['Amy',155],
    //     ['Hannah',null],
    //     ['Michael',null]
    // ];
    // var sql = "CREATE TABLE products (id INT(11), name VARCHAR(255))";
    // var sql = "INSERT INTO products (id, name) values ?";
    // var values = [
    //     [154,'Chocolate Heaven'],
    //     [155,'Tasty Lemons'],
    //     [156,'Vanilla Dreams']
    // ];
    // var sql = "SELECT user.name AS user, products.name AS favorite FROM user JOIN products ON user.favorite_product = products.id";
    // var sql = "SELECT user.name AS user, products.name AS favorite FROM user LEFT JOIN products ON user.favorite_product = products.id";
    var sql = "SELECT user.name AS user, products.name AS favorite FROM user RIGHT JOIN products ON user.favorite_product = products.id";
    con.query(sql,function(err,result,fields){
        if(err) throw err;
        // console.log("Table Created!");
        console.log(result);
    })
});
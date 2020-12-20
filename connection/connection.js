const mysql = require("mysql");
const USER = process.env.USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const { user, db_password, db_name, connectionURI } = require("../config/secret.json")
// // create local mysql connection 
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user : user,
//     password: db_password,
//     database: db_name
// })
// //connect to bd
// connection.connect((err)=>{
//     if(err) console.log(err);
// });

// create remote mysql connection 
const connection = mysql.createConnection(connectionURI);
//connect to bd
const con = async () =>{
    await connection.connect((err) => {
        if (err) throw err;
        console.log('connected to db');
    });
}
con();
module.exports = connection;
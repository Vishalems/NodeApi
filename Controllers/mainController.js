const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const conn = require("../Connection/mysqlDB");
const config = dotenv.config();
var bodyParser = require('body-parser')
const getPosts = ( req, res) => {
    jwt.verify( req.token,process.env.AUTH_SECRET_KEY, ( error,authData ) =>{
        if( error ) return res.sendStatus(403)
        const data = null;
        // database query
        conn.connect();
        conn.query('SELECT * from jobs', function (error, results, fields) {
            if (error) throw error;
            console.log( results);
            res.json({
                results,
                authData
            });
        });
        conn.end();
        
    })
}

const loginAuth = (req,res ) => {
    const user = { username : "vaibhawvishalmjk99@gamil.com"};
    const token = jwt.sign({user},process.env.AUTH_SECRET_KEY);
    res.json({
        token: token
    });
}

function ensureToken( req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== undefined ){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
    
}

module.exports = {
    getPosts,
    loginAuth,
    ensureToken
}
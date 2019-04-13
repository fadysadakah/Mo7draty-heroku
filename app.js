var aaa;
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
var cookieParser = require('cookie-parser')
app.use(cookieParser());
const pg = require('pg');
var md5 = require('md5');
var request_first_name;
var request_last_name;
var request_email;
var request_password;
var request_confirm_password;
var s;
var script = "";
// #########################################################################################################################################################################################
const client = new pg.Client({
    user: 'vknjruhfiarkkd',
    password: 'b3cf54047b0ad8234bd442e966993c1eb2a84e47fef50972e8c601de34ed9e83',
    database: 'ded4phd4ba2inh',
    port: 5432,
    host: 'ec2-54-225-242-183.compute-1.amazonaws.com',
    ssl: true
});

client.connect();

// #########################################################################################################################################################################################
app.get('/', function (req, res) {
    res.render('index')
});
// #########################################################################################################################################################################################
app.get('/sign_up', function (req, res) {
    res.render('sign_up', { max: '', script: script })
})
// #########################################################################################################################################################################################
app.post('/sign_up', function (req, res) {
    request_first_name = req.body.first_name;
    request_last_name = req.body.last_name;
    request_email = req.body.email;
    request_password = req.body.password;
    request_confirm_password = req.body.confirm_password;
    if (request_password == request_confirm_password) {
        if (request_password.length < 8) {
            res.render('sign_up', { max: "too short password" })
        } else {
            client.query("SELECT * FROM users WHERE email  = '" + request_email + "'", function (err, result) {
                if (err) {
                    res.render('sign_up', { max: "error" });
                } else if (result.rowCount == 0) {
                    client.query("INSERT INTO users (first_name,last_name,email,password) VALUES ('" + request_first_name + "','" + request_last_name + "','" + request_email + "','" + request_password + "')", function (err, result) {
                    })
                    res.render('sign_up', { max: "account added" });
                } else {
                    res.render('sign_up', { max: "user exists" });
                }
            })
        }
    } else {
        res.render('sign_up', { max: "passwords mismatch" });
    }
})




// #########################################################################################################################################################################################

app.get('/privacy', function (req, res) {
    res.render('privacy')
})
app.get('/terms', function (req, res) {
    res.render('terms')
})
app.get('/get_data', function (req, res) {
    client.query("SELECT * FROM posts", function (err, result) {
        if (err) {
        } else {

            res.send(result.rows);
        }
    })
})
// #########################################################################################################################################################################################

app.get('/ajax', function (req, res) {
    var a = req.query.comment;
    console.log(a.split(''));
    client.query("insert into posts (post) values ('" + a + "')", function (err, result) {
        if (err) { } else {
            res.render('index')

        }
    });
    res.send(a)
})
app.get('*', function (req, res) {
    res.send('Page not found')
})

app.listen(PORT, function () {
    console.log('Server Started')
})


// ################################################################################################################################################################################################

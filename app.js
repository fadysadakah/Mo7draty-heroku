var express = require('express');
var app = express();
var request = require('request');

// request('http://www.google.com', function (error, response, body) {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
// });
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// req.body.parameter
app.use(express.static('public'));
const PORT = process.env.PORT || 5000;
app.set('view engine', 'ejs');
var cookieParser = require('cookie-parser')
app.use(cookieParser());
const pg = require('pg');
var md5 = require('md5');
var image='';
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

    client.query("SELECT * FROM users WHERE email = 'fadysadakah.emh@gmail.com'", function(err,RES)  {
        if (err) console.log(err.detail);
        if (RES.rows.length != 0) {

            first_name = RES.rows[0].first_name;
            last_name = RES.rows[0].last_name;
            var password = RES.rows[0].password;
             image = RES.rows[0].image;

            }
            res.render("index", {image: image });
            
  
    })

 
});

// #########################################################################################################################################################################################


app.get('/sign_up', function (req, res) {
    res.render('sign_up')
})



// #########################################################################################################################################################################################
app.post('/sign_up', function (req, res) {
    
    res.redirect('/')
})









// #########################################################################################################################################################################################

app.get('*', function (req, res) {
    res.send('Page not found')
})

app.listen(PORT, function () {
    console.log('Server Started')
})
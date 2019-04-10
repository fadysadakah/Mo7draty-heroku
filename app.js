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

app.get('/',function(req,res){
    res.render('index')
})




app.get('*',function(req,res){
    res.send('Page not found')
})

app.listen(PORT,function () {
    console.log('Server Started')    
})
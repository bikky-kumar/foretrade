const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

//Init App
const app = express();
//PORT init
const PORT = 2000;


//Load View Engine by setting up basedir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//required middleware for body-parser 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//get request to the homepage 
app.get('/', function(req, res){
    //this code will just send something to the browser
    res.render('index',{
        title: 'Welcome To ForeTrade'
    })
});


//GETS
//get request to the homepage 
app.get('/project/details', function(req, res){
    //this code will just send something to the browser
    res.render('project_details',{
        title: 'Project Details'
    })
});



//Routes
let search = require('./routes/search');
app.use('/search', search)

let predict = require('./routes/predict')
app.use('/predict', predict)

let status = require('./routes/current_status')
app.use('/stock', status)





//Setting Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Start Server
app.listen(PORT, function(){
    console.log(`server started on port ${PORT}`)
})

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

//Init App
const app = express();
//PORT init
const PORT = 2000;

//Express messages Middleware to throw error messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

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


//CATCHING 404 Error
app.use(function(req, res, next) {
    const err = new Error('The Page you are looking for can\'t be found');
    err.status = 404;
    next(err);
  });


    // development error handler
// will print stacktrace msg
/*
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  */
  // production error handler
  // no stacktraces leaked to user
  
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
 



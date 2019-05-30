const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const router = express.Router() 



//getting the stock ID
//REQUEST TO worldtradingdata API for historic data
//Sending the Json Response to Python API to process


function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
}

router.get('/stock/:id', function(req, res){
    const id = req.params.id;
    console.log('lets predict prices for', id)
            //request to the python API for predection
            request(`http://localhost:5000/predict/${id}`, function(err, res_status, body_msg){
                if(err){
                    console.log(err)
                }
                if(!err && res_status.statusCode == 200){
                    try {
                        //Parsing JSON body in {object{object}} structure 
                        //to convert into array of object key format
                        let prediction = JSON.parse(JSON.parse(body_msg))
                        let pred = (Object.values(prediction)).map(x => Object.values(x))
                        let x = pred[0].reverse()
                        //pred[0] holds all the predicted values.
                        console.log("Call successfull to python API ", res_status.statusCode)
                        res.render('predict', {
                            title: 'Prediction',
                            symbol: id,
                            result: x,
                            day: getDate()
                        })
                    } catch (exc) {
                    console.log('Invalid json:', exc);
                    }
                }
                else{
                    console.log("Unsuccessfull call to python API ")
                }
            });
})

module.exports = router;
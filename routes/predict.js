const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const router = express.Router();

//getting the stock ID
//REQUEST TO worldtradingdata API for historic data
//Sending the Json Response to Python API to process

router.get('/stock/:id', function(req, res){
    const id = req.params.id;
    console.log('lets predict prices for', id)
    request(`https://www.worldtradingdata.com/api/v1/history?symbol=${id}&sort=newest&api_token=jtdAAyrRYIsiouNAuG3BnmzERbmJdKRPRXFl7bpE6o8Y3BSnNqhpqYsxGxIj`, function(error, response, body){
        const result = JSON.parse(body); 
        const s_result= JSON.stringify(result)
        if(error){

        }else{
            //Here will be request to python API
            res.render('predict', {
                title: 'Predection',
                symbol: id,
                result: s_result
            })
        }

    });
  

})

module.exports = router;
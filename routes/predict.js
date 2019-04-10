const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const router = express.Router()



//getting the stock ID
//REQUEST TO worldtradingdata API for historic data
//Sending the Json Response to Python API to process

router.get('/stock/:id', function(req, res){
    const id = req.params.id;
    console.log('lets predict prices for', id)
            //request to the python API for predection
            request(`http://localhost:5000/predict/${id}`, function(err, res_status, body_msg){
                const predection_result = JSON.parse(body_msg)
                if(err){
                    console.log(res_status)
                }
                else{
                    console.log("Call successfull to python API ", res_status.statusCode)
                    res.render('predict', {
                        title: 'Predection',
                        symbol: id,
                        result: body_msg
                    })
                }
            });
})

module.exports = router;
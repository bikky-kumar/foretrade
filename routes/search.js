const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const router = express.Router();
const alphavantage_api_key = 'DKEHNKFEN5UFI1F7'


//post request to search endpoint
router.post('/stocks', function(req, res){
    console.log('searching')
    const search = req.body.search
    request(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=${alphavantage_api_key}`, function(error, response, body){
        
        const result = JSON.parse(body); 
        if(error){
            res.render('index', {
                results: error
            });
        }
        if(response.statusCode == 200){
            res.render('index', {
                results: result.bestMatches
            })
        }
    });
    return;
})


module.exports = router;

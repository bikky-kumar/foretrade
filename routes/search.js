const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const router = express.Router();


//post request to search endpoint
router.post('/stocks', function(req, res){
    console.log('submitted')
    const search = req.body.search
    request(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=DKEHNKFEN5UFI1F7`, function(error, response, body){
        
        const result = JSON.parse(body); 
        if(error){
            res.render('index', {
                results: error
            });
        }
        if(response.statusCode == 200){
            const m = result.bestMatches[0]
            console.log('body:', result.bestMatches[0]);
            console.log('name:', m['2. name']);
            res.render('index', {
                results: result.bestMatches
            })
        }
    });
    return;
})


module.exports = router;

const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const router = express.Router();


const alphavantage_api_key = 'DKEHNKFEN5UFI1F7'

router.get('/status/:id/:name', function(req, res){
    //retreiving parameters
    const id = req.params.id;
    const stock_name = req.params.name;
    //daily stock data request
    request(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${id}&interval=5min&outputsize=full&apikey=${alphavantage_api_key}`, function(error, response, body){
        const result = JSON.parse(body);
        
        if(error){
            res.render('stock', {
                error: error
            });
        }
        if(response.statusCode == 200){
            const time = 35
            console.log('success at fetching status')
            const stock_daily_data = result['Time Series (5min)']
            const meta_data = result['Meta Data']
            
            // converting object of object to array of oo=bject using map function
            const stock_array = Object.keys(stock_daily_data).map(data_object => [data_object, stock_daily_data[data_object]])
            
            
            console.log(stock_array[1]['1. open']);
            res.render('stock', {
                title: "Stock : "+stock_name,
                results: stock_array,
                meta_data: meta_data
            })
        }
    })
    return;
})

module.exports = router;

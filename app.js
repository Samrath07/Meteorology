const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){


    //res.send("Server is working");
    res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

    

    const query = req.body.cityName;
    const apiKey = "8dee0dbf17f272e4fefa8df470a7aa56";
    const unit = "metric";

  
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units=" + unit;
    console.log(url);

    https.get(url, function(response){

        response.on('data',function(data){

            const weatherData = JSON.parse(data);
            console.log(weatherData); 
            const desc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const image = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/" +image+ "@2x.png";
            res.write("<h1>Current City:"+query+"</h1>");
            res.write("<p>The current temperature is: "+temp+" Degree Celsius</p>");
            res.write("<h2>Weather Description:"+desc+"</h2>");
            res.write("<img src=" +imageURL+">");

            res.send();
            // const curr_weather = weatherData[0].main.description;
            // console.log(curr_weather);
            // const temp = weatherData.main.temp;
            
        });

    });



});




app.listen(port,function(){

    console.log("Server started at port:" + port);

})
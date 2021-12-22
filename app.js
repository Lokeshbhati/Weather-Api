const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  var city = req.body.cityName;
  const query = city;
  const units = "metric";
const apiKey = "deb0aa142240a9ded9740267fd093963";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
           const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon = weatherData.weather[0].icon;
       const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
       console.log(weatherDescription);
    
       res.write("<p>The weather condition in here is "+weatherDescription);
       res.write("<h1>The temprature in "+city+" is "+temp+" degree Celcius</h1>");
       res.write("<img src="+imgURL+">");
        res.send();
//    const object = { name: "lokesh", favoriteFood: "ramen" } console.log(JSON.stringify(object));
    })
})

// res.send("the server is up and running");

})

app.listen(3000,function(){
    console.log("website running at 3000 ");
})
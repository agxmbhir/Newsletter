const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const https = require('https')


const app = express();

 app.use(express.static("files"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req ,res){
res.sendFile(__dirname + "/SignUp.html")
})

app.post("/", function(req ,res){

  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var email = req.body.emailaddress;

  const data = {
  members:[{
       email_address: email,
       status: "subscribed",
       merge_fields:{
         FNAME: firstName,
         LNAME: lastName,
       }
  }]
}
  const options = {
    method: "POST",
    auth: "agxmbhir:8508921032e4501bb4bd98c9f3b8da30-us1"
  }

  const jsonData = JSON.stringify(data);
  const url = 'https://us1.api.mailchimp.com/3.0/lists/f591beecb3'
  const request1 = https.request(url , options ,function(response){
  response.on("data" , function(data){
    console.log(JSON.parse(data));

    })
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html")
    }
  })
  request1.write(jsonData);
  request1.end();
  })

  app.post("/failure",  function(req , res){
    res.redirect("/");
  })

app.listen(process.env.PORT || 3000 , function(){
  console.log("Server is running on port 3000")
})
// 8508921032e4501bb4bd98c9f3b8da30-us1
// f591beecb3

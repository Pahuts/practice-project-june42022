const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const https = require("https")

mailchimp.setConfig({
  apiKey: "d7901afc1625391f727c3adbdc633959-us18",
  server: "us18",
});

const app = express()

// add public folder
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})



app.post("/", function(req,res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

  const subscribingUser = {firstName: firstName, lastName: lastName, email: email}

  const run = async () => {
    try {
      const response = await mailchimp.lists.addListMember("36e1127224", {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      })
      console.log(response)
      res.sendFile(__dirname + "/success.html")
    } catch(err) {
      console.log("====== ERROR ======")
      console.log(JSON.parse(err.response.error.text),detail)
      res.sendFile(__dirname + "/failure.html")
    }
  }
  run()
})

app.listen(3000, () => console.log('App listening to port 3000!'))

// weather api
// 468e15fb53a3ebcf3bcefdc52d602d1f
// mailchimp api
// d7901afc1625391f727c3adbdc633959-us18
// mailchimp audience id
// 36e1127224

const express = require('express');
const app = express();
//in post method we send JSON data into body
//in express if u want to send JSON data, you need to first parse the JSON data

app.use(express.json());
//express.JSON() is a function that returns another function

/*
let express = {
    JSON: function() {
        return function(req, res, next) {
            // parse the incoming JSON request body
            req.body = JSON.parse(req.rawBody);
            next();
        };
    }
}
*/

/*
express.JSON() under the hood uses bodyParser.JSON()
*/
app.post('/sum', function(req, res){
    console.log(req.body);
    const a = req.body.a;
    const b = req.body.b;
})

app.listen(3000, () => console.log('Server running on port 3000'));
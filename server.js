const bodyParser = require('body-parser')
const express = require("express")
const app = express(); //server object
const router = express.Router();
const port = 4000;
const mongo = require('./mongowrapper')

app.set('port',port);

app.listen(port, () => {
    console.log("We are using port 4000");
})

// This code right here is magic!
app.use(function(req, res, next) { // what is middleware?
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', express.static('public'))

app.use('/api', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// ^^ Magic code!!

router.route('/posts').post(function (req,res) {
    req.body.likes = 0;
    mongo.insertDocument(req.body, "posts", () => {
        console.log("added the post");
        res.status(200).send("successfully added the post")
    })
})

router.route('/posts').get(function(req, res) { // why do I need this?
    mongo.findDocuments({},"posts", (data)=> {
        res.status(200).send(data)
    })
});
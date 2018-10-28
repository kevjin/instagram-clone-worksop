const bodyParser = require('body-parser')
const express = require("express");
const app = express();
const router = express.Router();
const port = 4000;
const mongo = require('./mongowrapper');

app.set('port', port);

app.listen(port, ()=> {
    console.log("We are using port: " + port);
  });

// This code right here is magic!
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
app.use('/api', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// ^^ Magic code!!

router.route('/posts').get(function(req, res) {
    mongo.findDocuments({},"posts", (data)=> {
        res.status(200).send(data)
    })
});

router.route('/posts').post(function(req, res) {
    mongo.insertDocument({test:"testdocumemtn"},"posts", ()=> {
        res.status(200).send("successfully added the post")
    });
})

router.route('/posts').delete(function(req,res) {
    mongo.removeDocument({},"posts",()=> {
        res.status(200).send("successfully removed the post")
    })
})
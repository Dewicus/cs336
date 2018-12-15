const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

var fs = require('fs');
var path = require('path');
var people = [];
var MongoClient = require('mongodb').MongoClient;
var password = process.env.MONGO_PASSWORD;
var db;
var people;

MongoClient.connect('mongodb://cs336:' + password + '@ds119164.mlab.com:191643/cs336', function (err, client) {
    if (err) {
        throw err;
    }

    db = client.db('cs336')

    db.collection('people').find().toArray(function (err, result) {
        if (err) throw err

        people = result;

    })

    app.listen(app.get('port'), function () {
        console.log('Server started: http://localhost:' + app.get('port') + '/');


    })
});

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/people', (req, res) => {
    var collection = db.collection('people');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
            res.json(docs);
        }
    });
});

app.post('/people', (req, res) => {
    db.collection('people').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == req.body.id) {
            res.send({'content':'ERROR: ID already exists, please select another'});
            return;
        }
    }
    var person = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    };
    people.push(person);

    var collection = db.collection('people');
    collection.insertOne({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    });

    res.send({
        'content': 'Added: ' + req.body.firstName + " " + req.body.lastName
    });
});

app.post('/getPerson', (req, res) => {
    var requestedID = req.body.id;
    var person = getPerson(req.body.id);
    if (person != '404') {
        res.send({
            "person": JSON.stringify(person)
        });
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id', (req, res) => {
    var collection = db.collection('people');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });

    var response = getPerson(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/person/:id', (req, res) => {
    db.collection('people').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });
    var peopleEater = req.params.id;
    var collection = db.collection('people');
    collection.deleteMany({
        id: peopleEater
    });

    collection.find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });

    res.send("Person with id: " + peopleEater + " has been removed");
});

app.put('/person/:id', function (req, res) {

    db.collection('people').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });
    var collection = db.collection('people');
    var peoplater = req.params.id;

    collection.updateMany({
        id: peoplater
    }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            startDate: req.body.startDate
        }
    })
    res.send(req.body.firstName + " with ID# " + req.params.id + " has been changed");
    collection.find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
        peopleList = docs;
    })
});

app.get('/person/:id/name', (req, res) => {
    db.collection('people').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });
    
    var request = req.params.id;
    var response = getName(request);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id/years', (req, res) => {
    db.collection('people').find().toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
        } else {
            people = docs;
        }
    });

    var response = getYears(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

function getName(id) {
    for (var i = 0; i < poeple.length; i++) {
        if (people[i].id == id) {
            return (people[i].firstName + " " + people[i].lastName);
        }
    }
    return '404';
}

function getPerson(id) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == id) {
            return people[i];
        }
    }
    return '404';
}

app.all("*", (req, res) => {
    res.sendStatus(404);
})
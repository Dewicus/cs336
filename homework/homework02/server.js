const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use('/', express.static(APP_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', express.static(APP_PATH));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var fs = require('fs');
var path = require('path');
var APP_PATH = path.join(__dirname, 'dist');
var people = [];
var peopleing = path.join(__dirname, 'people.json');


//__________________________________________________________actual codebase


fs.readFile(peopleing, function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    people = JSON.parse(data);
});


// /people functions
app.get('/people', (req, res) => {
    res.json(people);
});

app.post('/people', (req, res) => {
    var person = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        startDate: req.body.startDate
    };
    people.push(person);

    var peopleJSON = JSON.stringify(people);

    fs.writeFile(peopleing, peopleJSON, function (err) {
        console.log(err)
    });
    res.send({
        'content': 'Added: ' + req.body.firstName + " " + req.body.lastName
    });
});


// /getperson
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


// /person/id functions
app.get('/person/:id', (req, res) => {

    var response = getPerson(req.params.id);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.delete('/person/:id', (req, res) => {
    var depeople = req.params.id;

    for (var i = 0; i < people.length; i++) {
        if (people[i].id == depeople) {
            delete people[i];
            var peopleJSON = JSON.stringify(people);
            fs.writeFile(peopleing, peopleJSON, function (err) {
                console.log(err)
            });
            res.send("Person with id: " + depeople + " has been removed");
        }
    }
    res.sendStatus(404);

});

app.put('/person/:id', function (req, res) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == req.body.id) {
            people[i].firstName = req.body.firstName;
            people[i].lastName = req.body.lastName;
            people[i].startDate = req.body.startDate;
            var peopleJSON = JSON.stringify(people);
            fs.writeFile(peopleing, peopleJSON, function (err) {
                console.log(err)
            });
            res.send(req.body.firstName + " with ID# " + req.params.id + " has been changed");
        }
    }
    res.sendStatus(404);

});



app.get('/person/:id/name', (req, res) => {
    var request = req.params.id;
    var response = getName(request);
    if (response != "404") {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});



app.get('/person/:id/years', (req, res) => {
    var request = req.params.id;
    var response = getYears(request);
    if (response != "404") {
        res.send(response.toString());
    } else {
        res.sendStatus(404);
    }
});




function getYears(id) {
    var today = "2018";
    for (var i = 0; i < people.length; i++) {
        if (people[i].loginID == loginID) {
            return (Number("2018") - Number(people[i].startDate));
        }
    }
    return '404';
}


function getName(id) {
    for (var i = 0; i < people.length; i++) {
        if (peopl[i].id == id) {
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

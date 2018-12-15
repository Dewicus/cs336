const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

var people = JSON.parse(`
	[
		{"firstName": "Cameron", "lastName": "Dewey", "loginID": "Dewicus", "startDate": "2013"},
		{"firstName": "Kara", "lastName": "Darland", "loginID": "GreySkies", "startDate": "2013"},
		{"firstName": "Shadow", "lastName": "Darland", "loginID": "BabyDinoKitty", "startDate": "2018"},
		{"firstName": "Snap Dragon", "lastName": "Dewey", "loginID": "BabySharkKitty", "startDate": "2018"}
	]
`);

app.get('/people', (req, res) => {
    res.json(people);
});


 app.get('/person/:loginID', (req, res) => {
    var request = req.params.loginID;
    var response = getPerson(req.params.loginID);
    if (response == "404") {
		res.sendStatus(404);
    } 
    else {
        res.json(response);
    }
});


 function getPerson(loginID) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].loginID == loginID) {
            return people[i];
        }
    }
    return '404';
}


 app.get('/person/:loginID/name', (req, res) => {
    var request = req.params.loginID;
    var response = getName(req.params.loginID);
    if (response == "404") {
		res.sendStatus(404);
    } else {
        res.json(response);
    }
});


 function getName(loginID) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].loginID == loginID) {
            return (people[i].firstName + " " + people[i].lastName);
        }
    }
    return '404';
}


 app.get('/person/:loginID/years', (req, res) => {
    var response = getYears(req.params.loginID);
    if (response == "404") {
		res.sendStatus(404);
    } 
    else {
        res.json(response);
    }
});


 function getYears(loginID) {
    var today = "2018";
    for (var i = 0; i < people.length; i++) {
        if (people[i].loginID == loginID) {
			return (Number("2018") - Number(people[i].startDate));
        }
    }
    return '404';
}


 app.all("*", (req, res) => {
    res.sendStatus(404);
})
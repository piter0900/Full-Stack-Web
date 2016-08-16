var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('AircraftList', ['AircraftList','FlightList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/statics'));
app.use(bodyParser.json());

app.get('/AircraftList', function (req, res) {
  console.log('I received a GET request');

  db.AircraftList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/FlightList', function (req, res) {
  console.log('I received a GET flight request');

  db.FlightList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
//find
/*
app.get('/AircraftList/:', function (req, res) { 
  console.log('I received a find request');

  db.AircraftList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
*/

app.post('/AircraftList', function (req, res) {
  console.log(req.body);
  db.AircraftList.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.post('/FlightList', function (req, res) {
  console.log(req.body);
  db.FlightList.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/AircraftList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.AircraftList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
   res.json(doc);
  });
});
app.delete('/FlightList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.FlightList.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
   res.json(doc);
  });
});

app.get('/AircraftList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.AircraftList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/FlightList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.FlightList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/AircraftList/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.AircraftList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, category: req.body.category, number: req.body.number, price:req.body.price, airport: req.body.airport}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.put('/FlightList/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.deDate);
  db.FlightList.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {deDate: req.body.deDate, deAir: req.body.deAir, arAir: req.body.arAir, price:req.body.price}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");
const axios = require('axios').default;
const express = require('express');

const hbs = require('hbs');

const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  const allBeers = punkAPI.getBeers();
  allBeers.then(beer => {
    res.render('beers', {theBeers:beer})
  })
})

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(random => {
    res.render('random-beer', {newBeer:random})
  })
})

app.get('/beers/beer=:id', (req, res) => {
 let beerNumber = req.params.id;
 let beerID = punkAPI.getBeer(beerNumber);
 beerID.then(beer => {res.render('beer-id', {selectedBeer: beer})})
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

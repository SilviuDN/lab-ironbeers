const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();

// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(`${__dirname}/views/partials`)

const punkAPI = new PunkAPIWrapper();

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', {beersFromApi})
      console.log(beersFromApi)
    }
    )
    .catch( err => console.log(err))
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then( randomBeer => res.render('random-beer', randomBeer[0]))
    .catch( err => console.log(err))
})

app.get('/beers/:id', (req, res) => {
  // console.log(req.params)
  const {id} = req.params  
  punkAPI
    .getBeer(id)
    .then( beerFromApi => res.render('beer', beerFromApi[0]))
    // .then( beerFromApi => console.log(beerFromApi[0]))
    .catch(error => console.log(error))
});

app.get('/salsa', (req, res) => { 
  res.render('salsa') 
  });



app.listen(3000, () => console.log('🏃‍ on port 3000'));

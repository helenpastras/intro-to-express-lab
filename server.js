// Imports
const express = require('express')
const fs = require('fs')
const validator = require('validator');
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'));


// Exercises:
// 1. Be Polite, Greet the User
app.get('/greetings/:username', (req,res) => {
    res.send(`Hello there, ${req.params.username}`)
});



// 2. Rolling the Dice
app.get('/roll/:number', (req,res) => {
    const input = Number(req.params.number);

    if (isNaN(input)){
    return res.send('<h3>You must specify a number</h3>');
    }

    res.send(`You rolled a ${req.params.number}`)
});



// 3. I Want THAT One!
app.get('/collectibles/:index', (req,res) => {
    const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  
  const idxParam = parseInt(req.params.index)
   
    console.log('Requested index:', req.params.index);

  if(isNaN(idxParam) || idxParam <0 || idxParam >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!')
  }
  const item = collectibles[idxParam];
  return res.send(`So, you want the ${item.name}! For ${item.price} it can be yours`)
   
});


// 4. Filter Shoes by Query Parameters
  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

//   Task: Create a route /shoes that filters the list of shoes based on query parameters.
app.get('/shoes', (req,res) => {
    const minPrice = parseFloat(req.query['min-price'])
    const maxPrice = parseFloat(req.query['max-price'])
    const type = req.query.type;

    let shoeFilter = shoes;

    if (!isNaN(minPrice)){
      shoeFilter = shoeFilter.filter(shoe => shoe.price >= minPrice)
    }
   if (!isNaN(maxPrice)) {
      shoeFilter = shoeFilter.filter(shoe => shoe.price <= maxPrice)
    }
    if (type) {
      shoeFilter = shoeFilter.filter(shoe => shoe.type.toLocaleLowerCase() === type.toLocaleLowerCase());
    }
 res.send(shoeFilter);
})




// Listener:
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});



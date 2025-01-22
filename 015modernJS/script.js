// Import are not copies of export they are like a live connection!

// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'
// console.log('Importing module');
// addToCart('bread', 5)
// console.log(price, tq);

console.log("Importing module");

// console.log(shippingCost);

/* import * as ShoppingCart from './shoppingCart.js'
ShoppingCart.addToCart('bread', 6);
console.log(ShoppingCart.totalPrice); */

// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js' // as there as the add we can give any name to it as it will export the default export and usually don't mix default export and named export
// console.log(price);

import add, { cart } from "./shoppingCart.js";
add("pizza", 4);
add("garlic-bread", 2);
add("pepsi", 1);

console.log(cart);

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quality) {
    cart.push({ product, quality });
    console.log(`${quality} ${product} added to cartand shipping cost is ${shippingCost}`);
  };

  const orderStock = function (product, quality) {
    cart.push({ product, quality });
    console.log(`${quality} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('pizza', 4);
shoppingCart2.addToCart('garlic-bread', 2);
console.log(shoppingCart2);
console.log(shoppingCart2.shippingCost);

// 007 commonJS module - we can't use commonJS module without bundler as we download module through npm is also common JS
// EXPORT
/* export.addToCart function (product, quality) {
  cart.push({ product, quality });
  console.log(`${quality} ${product} added to cartand shipping cost is ${shippingCost}`);
};

// IMPORT
const { addToCart } = require('./shoppingCart.js') */

// 008 command line

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

import  cloneDeep  from "lodash-es";


const state = {
  cart: [
    {product: 'bread', quality: 5},
    {product: 'pizza', quality: 5},
  ],
  user: {loggedIn: true},
};

const stateClone = Object.assign({}, state);
const stateDeepClone =  cloneDeep(state);  
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if(module.hot) {
  module.hot.accept()
}

class Person {
  greeting = 'hey'
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const rutu = new Person('Rutu');

console.log('Rutu' ?? null);
console.log(cart.find(el => el.quality >= 2));

Promise.resolve('TEST').then(x => console.log(x));

// import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async fun
// import 'regenerator-runtime/runtime';
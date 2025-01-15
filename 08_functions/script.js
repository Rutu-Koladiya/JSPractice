"use strict";

// 003 default parameters

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 1000); // not possible as it will take 1000 as a passenger
createBooking("LH123", undefined, 1000);

// 004 pass arguments: value vs refrence

const flight = "LH456";
const rutu = {
  name: "rutu koladiya",
  passport: 78366463737,
};
const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Ms. " + passenger.name;

  if (passenger.passport === 78366463737) {
    alert("Checked in");
  } else {
    alert("Wrong passport!");
  }
};

// checkIn(flight, rutu);
// console.log(flight);
// console.log(rutu);

// is the same as doing passing primitve type
// const flightNum = flight;
// const passenger = rutu;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(rutu);
// checkIn(flight, rutu);

//005 first class nd higher order fun

// 006 fun accept callback fun
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// Higher-order fun
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best!", upperFirstWord);
transformer("JavaScript is the best!", oneWord);

// JS uses callback all the time
const high5 = function () {
  console.log("👋");
};

document.body.addEventListener("click", high5);
["Jonas", "Martha", "Adam"].forEach(high5);

// 007 fun returning fun
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Rutu");
greeterHey("Bnsi");

greet("Hello")("Janki");

// arrow fun
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArr("Hellow")("JavaScript!");

// 008 call and apply method
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Rutu Koladiya");
lufthansa.book(635, "Sumita Koladiya");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

// does not work
// book(23, 'rutu koladiya')

// call method
book.call(eurowings, 23, "maitik koladiya");
console.log(eurowings);

book.call(lufthansa, 28, "ramesh koladiya");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Cooper");
console.log(swiss);

// apply method
const flightData = [563, "kello gerg"];
// book.apply(swiss, flightData);
// console.log(swiss);

book.call(swiss, ...flightData);

// 009 bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookSS = book.bind(swiss);
bookEW(23, "rutu koladiya");

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Rutu Koladiya");
bookEW23("Sumita Koladiya");

// with event listners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane;

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

// 011 IIFE
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();
// IIFE
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log("This will ALSO never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

// 012 closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();
console.dir(booker);

// 013 more closure example

// example: 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// re-assigning f function
h();
f();
console.dir(f);

// example: 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(180, 3);

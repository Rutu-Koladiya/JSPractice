//002 actvating strict mode
"use strict";

let hasDriversLicense = false;
const pastTest = true;

// if (pastTest) hasDriverLicense = true; // error while using strict mode
if (hasDriversLicense) console.log("I can drive");

// const interface = "audio"; // error coz it interface is reserve keyword

//003 functions- piece of code we use over n over again
function logger() {
  console.log("My name is Rutu");
}

// calling, running, invoking fun
logger();
logger();

function fruitProcessor(apples, oranges) {
  //   console.log(apples, oranges);
  const juice = `juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

// fruitProcessor(5, 0); // it will give 5, 0 to get return we have to store it in var or do console log directly we just have to capture the value

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

//004 fun declaration vs expression in declaration we can call it first before declaration but in expression calling fun first will produce the error

// fun declaration
function calcAge1(birthYear) {
  return 2024 - birthYear;
}

const age1 = calcAge1(1986);
// console.log(age1);

// fun expression - fun is a value not a object or anything
const calcAge2 = function (birthYear) {
  return 2024 - birthYear;
};

const age2 = calcAge2(2004);
console.log(age1, age2);

//005 arrow fun - a shorter fun
const calcAge3 = (birthYear) => 2024 - birthYear;
const age3 = calcAge3(2004);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2024 - birthYear;
  const retirement = 65 - age;
  //   return retirement;
  return `${firstName} retires in ${retirement} years!`;
};

console.log(yearsUntilRetirement(2004, "Rutu"));

//006 fu calling another fun

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  //   console.log(apples, oranges);
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `juice with ${applePieces} apples and ${orangePieces} oranges.`;
  return juice;
}

console.log(fruitProcessor(2, 3));

//007 reviewing fun
const calcAge = function (birthYeah) {
  return 2024 - birthYeah;
};

const yearUntilRetirement = function (birthYeah, firstName) {
  const age = calcAge(birthYeah);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    // return retirement;
  } else {
    console.log(`${firstName} has already retired 🎉`);
    // return -1;
  }
};

console.log(yearUntilRetirement(1991, "Rutu"));
console.log(yearUntilRetirement(1850, "Nirmay"));

//009 intro to array
const freinds = ["Vidhi", "Janki", "Jadu"];
console.log(freinds);

console.log(freinds[0]);
console.log(freinds[2]);

console.log(freinds.length);
console.log(freinds[freinds.length - 1]);

freinds[2] = "Pinky";
console.log(freinds);

// freinds = ['Bnsi', 'Pinky'] //error
const firstName = "Rutu";
const rutu = [firstName, "Koladiya", 2024 - 2004, "Intern", freinds];
console.log(rutu);

// exercise
const calcuAge = function (birthYear) {
  return 2024 - birthYear;
};

const years = new Array(1997, 2000, 2015, 2024);
// const ageYears1 = calcuAge(years[0]);
// const ageYears2 = calcuAge(years[1]);
// const ageYears3 = calcuAge(years[years.length - 1]);
// console.log(ageYears1, ageYears2, ageYears3);

const ages = [
  calcuAge(years[0]),
  calcuAge(years[1]),
  calcuAge(years[years.length - 1]),
];
console.log(ages);

// 010 basic operation

// 1 push  freinds.push('Bnsi')  -- add at last
// 2 unshift freinds.unshift('Bnsi') -- add at first
// 3 pop freinds.pop()  -- remove last
// 4 shift freinds.shift() -- remove first
// 5 indexOf freinds.indexOf('vidhi') -- give the index num of this
// 6 includes freinds.includes('rutu') -- will check is this included in array or not

// 012 intro to objects
// array for order data and objects for unstructured data
const rutusObject = {
  firstName: "Rutu",
  lastName: "Koladiya",
  age: 2024 - 2004,
  job: "Intern",
  freinds: ["Bnsi", "Pinky", "Janvi"],
};
console.log(rutusObject);

// 013 dot vs bracket notation
console.log(rutusObject.lastName);
console.log(rutusObject["lastName"]);

const nameKey = "Name";
console.log(rutusObject["first" + nameKey]);
console.log(rutusObject["last" + nameKey]);

// console.log(rutusObject."last" + nameKey); // not possible produce error

// const interstedIn = prompt(
//   "What do you want to know about Rutu? Choose between firstNmae, lastname, age, job and friends"
// );
// console.log(rutusObject[interstedIn]); // . is not possible here as it will look for8 interstedIn key in object
// if (rutusObject[interstedIn]) {
//   console.log(rutusObject[interstedIn]);
// } else {
//   console.log("Wrong request, choose from given options!");
// }

rutusObject.location = "Surat";
rutusObject["twitter"] = "@rutukoladiya";
console.log(rutusObject);

console.log(
  `${rutusObject.firstName} has ${rutusObject.freinds.length} friends, and his best friend is called ${rutusObject.freinds[0]}`
);

// 014 object methods
// a fun attach to object is called method
// also pop, push etc..

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYeah: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,

  //   calcAge: function (birthYeah) {
  //     return 2037 - birthYeah;
  //   }, // by using this fun we are repeating value of birthYeah and it is not good

  //   calcAge: function () {
  //     console.log(this);
  //     return 2037 - this.birthYeah; // refernce the object itself
  //   },   // as in if want to calculate the value then it will run each time so it will take more time

  calcAge: function () {
    this.age = 2037 - this.birthYeah;
    return this.age;
  }, // as this fun will calculate the value ones time and after store it

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-years old ${
      jonas.job
    }, and he has a ${this.hasDriversLicense ? "a" : "no "} driver's license `;
  },
};

// 016 iteration the loop

console.log(jonas.age);
console.log(jonas.getSummary());

for (let count = 1; count <= 10; count++) {
  console.log(`Lifting weights repetition ${count}!`);
}

// 017 looping arrays, break n countinues statement

const vidhiArray = [
  "Vidhi",
  "Pankhaniya",
  2024 - 2004,
  "Intern",
  ["Rutu", "Janki", "Jadu"],
];

const types = [];

for (let i = 0; i < vidhiArray.length; i++) {
  // reading from array
  console.log(vidhiArray[i], typeof vidhiArray[i]);

  // filling types array
  //   types[i] = typeof vidhiArray[i]; // way 1

  //   types.push(typeof vidhiArray[i]); // way 2
}

// console.log(types);

const year = [1997, 2024, 2000, 2004];
const age = [];

for (let i = 0; i < year.length; i++) {
  age.push(2037 - year[i]);
}

console.log(age);

// continue n break statement
for (let i = 0; i < vidhiArray.length; i++) {
  if (typeof vidhiArray[i] !== "string") continue;

  console.log(vidhiArray[i], typeof vidhiArray[i]);
}

for (let i = 0; i < vidhiArray.length; i++) {
  if (typeof vidhiArray[i] === "number") break;
}

// 018 looping backwards & loops in loops

for (let i = vidhiArray.length - 1; i >= 0; i--) {
  console.log(vidhiArray[i], typeof vidhiArray[i]);
}

for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`----starting exercise ${exercise}`);

  for (let count = 1; count < 6; count++) {
    console.log(`Exercise ${exercise}: lifting weight repetition ${count}`);
  }
}

// while loop
let count = 1;
while (count < 10) {
  console.log(`lifting weight repetition ${count}`);
  count++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`you rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about to end..");
}

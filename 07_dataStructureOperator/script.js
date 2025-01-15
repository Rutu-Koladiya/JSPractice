"use strict";

// Data needed for a later exercise

// const italianFoods = new Set([
//   'pasta',
//   'gnocchi',
//   'tomatoes',
//   'olive oil',
//   'garlic',
//   'basil',
// ]);

// const mexicanFoods = new Set([
//   'tortillas',
//   'beans',
//   'rice',
//   'tomatoes',
//   'avocado',
//   'garlic',
// ]);

// 003 destructuring arrays

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // objects
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  // also we can write this from //011
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
  },
};

restaurant.orderDelivery({
  time: "22:30",
  address: "via del sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "via del sole, 21",
  starterIndex: 1,
});

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondry] = restaurant.categories;
console.log(main, secondry);

// switching  var
// const temp = main;
// main = secondry;
// secondry = temp;
// console.log(main, secondry);

[main, secondry] = [secondry, main];
console.log(main, secondry);

// receive 2 return value from a fun
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested destructuring
const nested = [2, 3, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r); // 8,9,1

// const [p, q, r] = [8,9];
// console.log(p, q, r);  8,9,undefined

// 004 destructuring objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating var
let u = 111;
let n = 222;
const obj = { u: 23, n: 7, d: 26 };

// {u, n} = obj; // will not work
({ u, n } = obj);
console.log(u, n);

// nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

// const {fri: {open: o, close: c}} = openingHours;
// console.log(o, c);

// 005  spread operator
const arr1 = [7, 8, 9];
const badArr = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log(badArr);

const arr2 = [1, 2, ...arr1];
console.log(arr2);

console.log(...arr2);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu1);

// iterables: arrays, strings, maps, sets NOT objects

const str = "Rutu";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(...str);
// console.log(`${...str} hehe`); // not possible

// real-world example
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Ingredient 2?"),
//   prompt("Ingredient 3?"),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

// objects
const newRestaurant = { foundIn: 2026, ...restaurant, founder: "Rutu" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurant.name);
console.log(restaurantCopy.name);

// 006 rest pattern & parameters

// 1) destructuring

// SPREAD, bcoz on right side of =
const arr3 = [1, 2, ...[3, 4]];

// REST, bcoz on left side of =
const [s, t, ...others] = [1, 2, 3, 4, 5];
console.log(s, t, others);

// const [pizza, , risotto, ...otherFood, bread] = [
//     ...restaurant.mainMenu,
//     ...restaurant.starterMenu,
//   ];  will produce the error

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) function
const add = function (...numbers) {
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const f = [23, 5, 7];
add(...f);

restaurant.orderPizza("mushroom", "onion", "olives", "spinach");
restaurant.orderPizza("mushroom");

// Key Differences:
// Feature	Spread Operator	Rest Operator
// Purpose	Expands elements into individual items.	Gathers multiple items into a collection.
// Syntax Placement	 Used where individual values are expected.	Used where a collection (array/object) is needed.
// Context of Use	Arrays, objects, function calls.	Function arguments, destructuring.

// 007 Short Circuiting (&& and ||)

// console.log('---- OR ----');
// // Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 0;
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log('---- AND ----');
// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && 'jonas');

// // Practical example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushrooms', 'spinach');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// 008 The Nullish Coalescing Operator
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // Nullish: null and undefined (NOT 0 or '')
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// 010 looping arrays for of loop

const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu2) console.log(item);

for (const item of menu2.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

for (const [i, el] of menu2.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// console.log([... menu2.entries()]);

// 011 enhanced object

// 012 optional chaining
// if (restaurant.openingHours.mon)
// console.log(restaurant.openingHours.mon.open);

// if (restaurant.openingHours.fri)
// console.log(restaurant.openingHours.fri.open);

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// with optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// example
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`on ${day}, we open at ${open}`);
}

// methods
console.log(restaurant.order?.(0, 1) ?? "method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "method does not exist");

// arrays
// const users = [{name: 'jonas', email: 'hello@mail.com'}];
const users = [];
console.log(users[0]?.name ?? "user array empty");

// without optional
if (users.length > 0) console.log(users[0].name);
else console.log("user array empty");

// 013 looping objects: object keys, values & entries

// property names
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

// for (const day of Object.keys(openingHours)) {
//     console.log(day);
// }

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// property values
const values = Object.values(openingHours);
console.log(values);

// entire object
const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const [key, { open, close }] of entries) {
  // console.log(x);
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// 015 set

const orderSet = new Set([
  "pasta",
  "pizza",
  "pizza",
  "risotto",
  "pasta",
  "pizza",
]);
console.log(orderSet);

console.log(new Set("rutu"));
console.log(orderSet.size);
console.log(orderSet.has("pizza"));
console.log(orderSet.has("bread"));
orderSet.add("garlic bread");
orderSet.delete("risotto");
// orderSet.clear();
console.log(orderSet);

for (const order of orderSet) console.log(order);

// example
const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
const staffUnique = [];
console.log(staffUnique);
console.log(
  new Set(["waiter", "chef", "waiter", "manager", "chef", "waiter"]).size
);

console.log(new Set("jonasschmedtmann").size);

// 016 maps_fundamentals
const rest = new Map();
rest.set("name", "classico italiano");
rest.set("1", "firenze italy");
console.log(rest.set("2", "lisbon portugal"));

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open :D")
  .set(false, "We are closed :(");

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 28;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
// rest.clear();

const arr4 = [1, 2];
rest.set(arr4, "Test");
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr4));

// 017 maps_iteration
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]);
console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// quiz app
console.log(question.get("question"));

for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
}

//   const answer = Number(prompt('Your answer'));
const answer = 3;

console.log(question.get(question.get("correct") === answer));

// convert map to array
console.log([...question]);
// console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);

// 018 which DS to use?

// 020 working with strings - P01

const airline = "TAP Air Portugal";
const plane = "A320";
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B727"[0]);

console.log(airline.length);
console.log("B727".length);

console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("Portugal"));
console.log(airline.indexOf("p ortugal"));

console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(" ")));
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are mirror seat
  const s = seat.slice(-1);
  if (s === "B" || s === "E") console.log(`You got the middle seat`);
  else console.log("You got lucky");
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

console.log(new String("rutu"));
console.log(typeof new String("rutu"));

console.log(typeof new String("rutu").slice(1));

// 021 working with strings - P02
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fix capitalization in name
const passenger = "RuTU kOLadiYa ";
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// comparing email
const email = "hello@gmail.com";
const loginEmail = "   Hello@Gmail.cOm \n";

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate"));
// console.log(announcement.replace('/door/', 'gate')); it use before introduce replaceall

// booleans
const plane1 = "Airbus A320neo";
console.log(plane1.includes("A320"));
console.log(plane1.includes("Boeing"));
console.log(plane1.startsWith("Air "));

if (plane1.startsWith("Airbus") && plane1.endsWith("neo")) {
  console.log(`part of the NEW Airbus family`);
}

// practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board");
  } else {
    console.log("Welcome aboard!");
  }
};
checkBaggage("I have a laptop, some food and pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

// 021 working with strings - P03
console.log("a+very+nice+string".split("+"));
console.log("rutu koladiya".split(" "));

const [firstName, lastName] = "rutu koladiya".split(" ");

const newName = ["Ms.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(" ");
  const nameUppers = [];
  for (const n of names) {
    // nameUppers.push(n[0].toUpperCase() + n.slice(1));
    nameUppers.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(nameUppers.join(" "));
};

capitalizeName("janki kansagra mahima gandhi");
capitalizeName("rutu Koladiya vidhi pankhaniya");

// padding
const msg = "Go to gate 25!";
console.log(msg.padStart(25, "+").padEnd(30, "+"));
// console.log(msg.padEnd(25, '+'));
console.log("rutu".padEnd(25, "+").padEnd(30, "+"));

const maskCreditCard = function (number) {
  // const str = String(number);
  const str = number + "";
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(4775873675883488));
console.log(maskCreditCard("5490464337676842387"));

// repeat
const msg2 = "Bad waether... All Departues Delayed... ";
console.log(msg2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛩".repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(12);

// 024 string method practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30).
const getCode = str => str.slice(0, 3).toUpperCase();

for(const flight of flights.split('+')) {
    const[type, from, to, time] = flight.split(';');
    // console.log(type);
    
    const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', ' ')} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(46);
    console.log(output); 
}

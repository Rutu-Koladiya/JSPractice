"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

// XMLHttpRequest

const renderCountry = function (data, className = "") {
  // Extracting requried data
  const flag = data.flags.svg;
  const name = data.name.common;
  const region = data.region;
  const population = (data.population / 1000000).toFixed(1);
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `<article class="country ${className}" >
          <img class="country__img" src="${flag}" />
          <div class="country__data">
            <h3 class="country__name">${name}</h3>
            <h4 class="country__region">${region}</h4>
            <p class="country__row"><span>👫</span>${population} people</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${currency}</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};

/* const getCountryAndNeighbour = function (country) {
  // AJAX call country
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  // console.log(this.responseText);

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country
    renderCountry(data);

    // Get neighbour country
    const [neighbours] = data.borders;

    if (!neighbours) return;

    // AJAX call country 2
      const request2 = new XMLHttpRequest();
      request2.open(
        "GET",
        ` https://restcountries.com/v3.1/alpha/${neighbours}`
      );
      request2.send();

      request2.addEventListener("load", function () {
        const data2 = JSON.parse(this.responseText);
        console.log(data2);
        console.log(data2[0].flags);
        
        renderCountry(data2[0], 'neighbour')
    });
  });
};

getCountryAndNeighbour("india"); */
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('germany');

// callback helllllll
/* setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
        console.log('2 second passed');
        setTimeout(() => {
            console.log('3 second passed');
        }, 1000)
    },1000)
}, 1000) */

// const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

// 009 consuming promises
// const request = fetch('https://restcountries.com/v3.1/name/india');
// console.log(request);

//
const getJSON = function (url, errorMsg = "Somethin went wrong.") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);

    return response.json();
  });
};

/* const getCountryData = function (country) {
  // country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      console.log(response);

      if (!response.ok) throw new Error(`Country not found ${response.status}`);

      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // country 2
      return fetch(` https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => {
      console.log(response);

      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}; */

const getCountryData = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error("No neighbour found!");

      // country 2
      return getJSON(
        ` https://restcountries.com/v3.1/alpha/${neighbour}`,
        "Country not found"
      );
    })

    .then((data) => {
      // Check if data is valid and not empty for the neighbour
      if (!data || data.length === 0)
        throw new Error("No data found for the neighbour");

      renderCountry(data[0], "neighbour");
    })
    .catch((err) => {
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener("click", function () {
//    getCountryData("india");
// });

// 015 event loop
/* console.log('Test start'); // 01
setTimeout(() => console.log('0 sec timer'), 0); //04
Promise.resolve('Resolved promise 1').
then(res => console.log(res)); //03

Promise.resolve('Resolved promise 2').
then(res =>{
    for (let i = 0; i < 10000; i++) {
        console.log(res);
        
    } 
});

console.log('Test end'); // 02 */

// 016 building a simple promise
/* const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening!");

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WIN!");
    } else {
      reject(new Error("You lost your money!"));
    }
  }, 2000);
}); */

// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log(`I waited for 2 seconds`);
//     return wait(1);
//   })
//   .then(() => console.log(`I waited for 1 seconds`));

// Promise.resolve("abc").then((x) => console.log(x));
// Promise.reject(new Error("PROBLEM")).catch((x) => console.error(x));

// 017 Promisifying the GEOLOCATION

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));


// 019 consuming promises ASYNC/AWAIT


// 020 error handling with try n catch
// try {
//     let y = 1;
//     const x = 2;
//     x = 3;
// } catch (err) {
//     alert(err.message)
// }


// 022 Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.com/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.com/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('india', 'canada', 'usa');

// 023 other promise combinator(that run parallely)

// Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v2/name/italy`),
//     getJSON(`https://restcountries.com/v2/name/egypt`),
//     getJSON(`https://restcountries.com/v2/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err));

// // Promise.allSettled
// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]).then(res => console.log(res));


// Promise.all
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));


//  Promise.any
Promise.race([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

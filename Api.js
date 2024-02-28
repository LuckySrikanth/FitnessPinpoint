"use strict";

// const response = new XMLHttpRequest();

// response.open("GET", "https://restcountries.com/v3.1/all");
// response.send();

// response.addEventListener("load", function () {
//   console.log(this.responseText);
// });

const request = () =>
  fetch("https://restcountries.com/v3.1/all")
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //   console.log(data);
    // });

    .then((response) => response.json())
    .then((data) => console.log(data));

request();

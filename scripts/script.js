"use strict";
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
let visitorbar = document.getElementById("visitors");
let imageDisplayed = document.getElementById("imageDisplayed");
let triCompare = document.getElementsByClassName("tri")[0];
let goodAns = document.getElementById("ans");
let iframe = document.getElementById("mapFrame");
let hitsWithinLeg = [];
let scope = 100;
let time = 100;
let cost = 100;
let notta = 100;
let count = 0;
let chgimg = 0;
let visits = 0;
let hits = 0;
let sec = 0;
let currentleg = 0;
let leg = 2;
var startStr = 100;
var str = "Visits";

canvas.width = 400;
canvas.height = 300;
triCompare.setAttribute("style", "background-color:#000");
iframe = iframe.contentDocument;
iframe.write("<!DOCTYPE html><html><body><center><h1>Map</h1><img src='./css/media/map.png'></img></center></body></html>");
iframe.close();

window.onload = function(e) {
  drawGraph();
  correctCanvas();
  changeFooterDate();
}

setInterval(() => {
  sec += 1;
  if (sec > 10) {
    leg += 1;
    sec = 0;
    if (leg > 38) {
      leg = 2;
      resetGraph();
    }
  }
}, 1000);

setInterval(() => {
  visitors();
}, 300);

setInterval(() => {
  if (currentleg !== leg) {
    currentleg = leg;
    drawFreqGraph();
    hits = 0;
  }
}, 60);

function correctCanvas() {
  if (screen.width < 400) {
    canvas.style.marginLeft = "-1em";
    canvas.style.padding = "0px";
  }
}

function changeFooterDate() {
  var d = new Date();
  document.getElementById("copy").innerHTML = d.getFullYear() + "&copy; John Nash. All rights reserved."
}

function visitors() {
  if (Math.floor(Math.random() * 100) > 95) {
    visits += 1;
    hits += 1;
    if (visits > 300) {
      visits = 0;
      resetGraph();
    }
    visitorbar.innerText = "Number of visitors " + visits;
  }
}

function resetGraph() {
  ctx.clearRect(0, 0, 400, 300);
  hitsWithinLeg = [];
  hits = 0;
  sec = 0;
  currentleg = 0;
  leg = 2;
  str = "Visits";
  startStr = 100;
  drawGraph();
}

function drawFreqGraph() {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(leg * 10, 250 - (hits * 20) + 1);
  ctx.lineTo(leg * 10, 250);
  ctx.stroke();
  ctx.closePath();
}

function drawGraph() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, 400, 300);
  ctx.fillStyle = "#1cb4bb";
  ctx.strokeStyle = "#1cb4bb";
  ctx.lineWidth = 2;
  ctx.font = "14px serif";
  ctx.fillText("Frequency of (simulated) visits over time.", 60, 50);
  ctx.fillText("Time per 10 sec.", 100, 275);

  for (var i = 0; i < str.length; i++) {
    ctx.strokeStyle = "#1cb4bb";
    ctx.lineWidth = 2;
    ctx.font = "14px serif"
    ctx.fillText(str[i], 5, startStr + (i * 20));
  }

  for (var i = 0; i < 11; i++) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.font = "10px serif"
    ctx.fillText(i, 385, 252 - (i * 20));
  }

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(20, 251);
  ctx.lineTo(20, 250);
  ctx.stroke();
  ctx.closePath();

}

function submission() {
  var formSubmission = document.getElementsByTagName("form")[0];
  //b = b + 4p + w / 6
  var best = parseInt(formSubmission[0].value);
  var prob = parseInt(formSubmission[1].value);
  var worst = parseInt(formSubmission[2].value);
  var answer = Math.floor((best + prob + 4 + worst) / 6);
  goodAns.innerHTML = "&nbsp;=&nbsp;" + answer.toString();
}


function changeimg() {
  switch (count) {
    case 0:
      imageDisplayed.src = "css/media/drop.gif";
      imageDisplayed.alt = "drop.gif";
      break;
    case 1:
      imageDisplayed.src = "css/media/pug.png";
      imageDisplayed.alt = "pug.png";
      break;
    case 2:
      imageDisplayed.src = "css/media/ocean.png";
      imageDisplayed.alt = "ocean.png";
      break;
  }
}

function next() {
  count += 1;
  if (count > 2) {
    count = 0;
  }
  changeimg();
}

function prev() {
  count -= 1;
  if (count < 0) {
    count = 2;
  }
  changeimg();
}

function getCost(c) {
  cost = c;
  scope = (200 - cost);
  setTri();
}

function getScope(s) {
  scope = s;
  cost = (200 - scope);
  setTri();
}

function getTime(t) {
  time = t;
  notta = (200 - time);
  setTri();
}

function setTri() {
  triCompare.setAttribute("style", "border-top:" +
    "solid " + notta + "px #31373e; border-left: solid " + cost + "px red; border-bottom:" +
    "solid " + time + "px green; border-right: solid " + scope + "px blue");
}

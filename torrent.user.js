// ==UserScript==
// @name         torrent
// @namespace    http://github.com/jacobjiggler
// @version      0.2
// @description  Made for ipt-torrents
// @author       https://github.com/matthewbal
// @match        https://ipt-update.com/t*
// @grant        none
// lastupdate:   24/04/2019
// ==/UserScript==

// Highly reccomend you go into your user settings and change "torrents per page" to the max of 255.
// slight bug where the first row is shown regardless of ratio
// decided this is a feature, not a bug

var table = document.getElementById("torrents");

var allrows = table.rows.length;

badrows = [];

for (var i = 1, row; row = table.rows[i]; i++) {
  //iterate through rows
  //rows would be accessed using the "row" variable assigned in the for loop
  seeders =  Number(row.cells[7].innerHTML);
  leachers = Number(row.cells[8].innerHTML);
  size = Number(row.cells[5].innerHTML.substring(0,row.cells[5].innerHTML.length - 3));
  Gb = (row.cells[5].innerHTML.substring(row.cells[5].innerHTML.length - 2) == 'GB');

  ratio = (leachers/seeders).toFixed(2);
  if (size < 10 && ratio > .5 && Gb){
    color = 'green';
  }
  else if(size < 80 && ratio > .1 && Gb){
    color = 'orange';
    badrows.push(i); //remove this if you want to see "okay" torrents
  }
  else {
    color = 'red';
    badrows.push(i);
  }

  row.cells[8].innerHTML = (row.cells[8].innerHTML + '<font color="' + color + '"> &nbsp;' +  ratio + '</font>');
}


//reverse through to maintain structure, delete rows we don't want to see
for (var i = table.rows.length; i > 0 ; i--){
  if (i in badrows){
    table.deleteRow(badrows[i]);
  }
}

//display # of torrents hidden above table
var info = document.getElementsByClassName("info")[0];
var hidden = badrows.length;
info.innerHTML +="We hid " + hidden +"/" + allrows + " torrents";

// ==UserScript==
// @name         torrent
// @namespace    http://github.com/jacobjiggler
// @version      0.1
// @description  Made for ipt-torrents
// @author       You
// @match        https://ipt-update.com/t*
// @grant        none
// ==/UserScript==

var table = document.getElementsByClassName("torrents")[0];
for (var i = 1, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   seeders =  Number(row.cells[7].innerHTML);
   leachers = Number(row.cells[8].innerHTML);
    size = Number(row.cells[5].innerHTML.substring(0,row.cells[5].innerHTML.length - 3));
    Gb = (row.cells[5].innerHTML.substring(row.cells[5].innerHTML.length - 2) == 'GB');
    console.log(Gb);
    
    ratio = (leachers/seeders).toFixed(2);
    if (size < 10 && ratio > .5 && Gb){
    color = 'green';
    }
    else if(size < 80 && ratio > .1 && Gb){
        color = 'orange';
    }
    else {
     color = 'red';
    }
    
    row.cells[8].innerHTML = (row.cells[8].innerHTML + '<font color="' + color + '"> &nbsp;' +  ratio + '</font>');
}
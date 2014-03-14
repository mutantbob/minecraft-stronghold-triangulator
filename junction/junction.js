
/*
    Copyright (C) 2013 Robert Forsman <github@thoth.purplefrog.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

function roundCoord(x)
{
    var x0 = Math.floor(x/64.0) * 64;
    if (x0<0) {
	x0--;
    }
    return x0 + 32;
}

function roundCoordZ(x)
{
    var x0 = Math.floor(x/64.0) * 64;
    if (x0<0) {
	x0--;
    }
    return x0 + 32;
}


function update()
{


    var x_ = $("#x")[0].value;
    x = roundCoord(parseInt(x_));

    for (var i=-1; i<=7; i++) {
	var delta = i+0.5;
	setTspan("axisx"+delta, x+delta);
    }

    var z_ = $("#z")[0].value;
    z = roundCoordZ(parseInt(z_));

    for (var i=-4; i<=1; i++) {
	var delta = i+0.5;
	setTspan("axisz"+delta, z+delta);
    }
}


function setTspan(id, text)
{
    var svg_ = document.getElementById("svg");
    var svgdoc = svg_.getSVGDocument(); 
    var textobj = svgdoc.getElementById(id); 

    textobj.firstChild.data = text;
}



window.onload = function() {
    update()
}

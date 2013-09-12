
function roundCoord(x)
{
    return Math.floor(x/64.0) * 64 + 32
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
    z = roundCoord(parseInt(z_));

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

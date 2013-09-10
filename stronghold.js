/**
   want to make something where there is a grid of randomly colored squares, which change positions (randomly) while maintaining there color
**/
var x = 0;
var z = 0;
var theta = 0;
var length = 1200; // how long are the lines we draw?
var paper;
var paper_width = 800;
var paper_height = 600;
var screen_origin = [ paper_width/2, paper_height/2 ]
var scale = Math.min(paper_width, paper_height) / 2400
var world_min = [ -screen_origin[0] / scale , -screen_origin[1] / scale ]
var world_max = [ (paper_width-screen_origin[0]) / scale , (paper_height-screen_origin[1]) / scale ]

var grid_spacing = 100; //real world coordinates
window.onload = function(){
    // Creates canvas 320 × 200 at 10, 50
    paper = Raphael(document.getElementById('paper'),paper_width,paper_height);
    var bg = paper.rect(0,0,paper_width,paper_height);
    bg.attr("fill", "#ffc");

    annulus();
    gridify();

    if (1) {
	drawVector(-413, 12, 88.88)
	drawVector(-427, 249, 108.687)
	drawVector(-546, 292, 116.48)
	drawVector(-923, 274, 150.38)
    }

}

function fromInputs(){
    x = parseFloat($("#x")[0].value);
    z = parseFloat($("#z")[0].value);
    theta = parseFloat($("#theta")[0].value);
    drawVector(x,z,theta);
 }

function drawVector(x,z,theta)
{
   var to_x = x - length * Math.sin((Math.PI*theta)/180);  
    var to_z =  z + length * Math.cos((Math.PI*theta)/180);
    var path_string = "M" + x +" "+ z + " L" + to_x + " " + to_z;
    //var path_string = "M 0 0 L 100 100";
    line = paper.path(path_string);
    worldToScreen(line);
    console.log(path_string);	   
}

function worldToScreen1(line){
    line.scale(scale, scale, 0, 0);
    line.transform("t" + paper_height * scale + "," + paper_height * scale);			
}

function worldToScreen(line)
{
    line.transform(['m', scale, 0, 0, scale, 
		    screen_origin[0], screen_origin[1]
		   ]
		  );
}


function screenToWorld(x,y)
{
    return [
	(x-screen_origin[0])/scale,
	(y-screen_origin[1])/scale
	] ;
}

function annulus()
{
    var r1 = 640;
    var r2 = 1152;

    a = paper.path("M "+r1+",0"
		   +" A "+r1+","+r1+" 0 0 0 "+(-r1)+",0"
		   +" A "+r1+","+r1+" 0 0 0 "+r1+",0"
		   +" z"
		   +"M "+(-r2)+",0"
		   +" A "+r2+","+r2+" 0 0 1 "+r2+",0"
		   +" A "+r2+","+r2+" 0 0 1 "+(-r2)+",0"
		   +" z"
		  )
    a.attr('stroke', 'none')
    a.attr('fill', '#cfc')
    a.attr('fill-rule', 'evenodd')
    worldToScreen(a);
}

function gridify(){

    //r=1000;
    var j0 = Math.ceil( (world_min[0]) / grid_spacing)
    var j1 = Math.floor( (world_max[0]) / grid_spacing)

    var font_size=36

    //alert(j0+" .. "+j1)

    for(var x_pos = j0*grid_spacing; x_pos <=j1*grid_spacing; x_pos +=grid_spacing){
	var line = paper.path("M "+x_pos+" "+world_min[1]+" L "+x_pos+" "+world_max[1]);
	if (x_pos==0)
	    line.attr("stroke", "#f00");
	worldToScreen(line);

	var text = paper.text(x_pos, 0, ""+x_pos)
	text.attr("font-size", font_size);
	worldToScreen(text);
    }

    //horizontal stripes

    var j0 = Math.ceil( world_min[1] / grid_spacing)
    var j1 = Math.floor( world_max[1] / grid_spacing)

    for(var y_pos = j0*grid_spacing; y_pos <=j1*grid_spacing; y_pos +=grid_spacing){
	var line = paper.path("M "+world_min[0]+" "+y_pos+" L "+world_max[0]+" "+y_pos);
	if (y_pos==0)
	    line.attr("stroke", "#f00");
	else {
	    var text = paper.text(0, y_pos, ""+y_pos)
	    text.attr("font-size", font_size);
	    worldToScreen(text);
	}
	worldToScreen(line);
    }
}


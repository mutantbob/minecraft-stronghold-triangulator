/**
   want to make something where there is a grid of randomly colored squares, which change positions (randomly) while maintaining there color
**/


function Map(elt, cw, ch)
{
    this.fromInputs = fromInputs;
    this.worldToScreen = worldToScreen;
    this.screenToWorld = screenToWorld;
    this.annulus = annulus;
    this.gridify = gridify;
    this.drawVector = drawVector;

    //

    this.paper_width = cw;
    this.paper_height = ch;

    this.length = 1200; // how long are the lines we draw?
    paper;
    this.screen_origin = [ cw/2, ch/2 ]
    this.scale = Math.min(cw, ch) / 2500
    this.world_min = [ -this.screen_origin[0] / this.scale , -this.screen_origin[1] / this.scale ]
    this.world_max = [ (this.paper_width-this.screen_origin[0]) / this.scale , (this.paper_height-this.screen_origin[1]) / this.scale ]

    this.grid_spacing = 100; //real world coordinates


    this.paper = Raphael(elt,cw,ch);
    var bg = this.paper.rect(0,0,cw,ch);
    bg.attr("fill", "#ffc");

    this.annulus();
    this.gridify();

    if (1) {
	this.drawVector(-413, 12, 88.88)
	this.drawVector(-427, 249, 108.687)
	this.drawVector(-546, 292, 116.48)
	this.drawVector(-923, 274, 150.38)
    }

//
//
//

    function fromInputs(){
	x = parseFloat($("#x")[0].value);
	z = parseFloat($("#z")[0].value);
	theta = parseFloat($("#theta")[0].value);
	this.drawVector(x,z,theta);
    }

    function drawVector(x,z,theta)
    {
	var to_x = x - this.length * Math.sin((Math.PI*theta)/180);  
	var to_z =  z + this.length * Math.cos((Math.PI*theta)/180);
	var path_string = "M" + x +" "+ z + " L" + to_x + " " + to_z;
	//var path_string = "M 0 0 L 100 100";
	line = this.paper.path(path_string);
	this.worldToScreen(line);
	console.log(path_string);	   
    }


    function worldToScreen1(line){
	line.scale(this.scale, this.scale, 0, 0);
	line.transform("t" + this.paper_height * this.scale + "," + this.paper_height * scale);			
    }

    function worldToScreen(line)
    {
	line.transform(['m', this.scale, 0, 0, this.scale, 
			this.screen_origin[0], this.screen_origin[1]
		       ]
		      );
    }


    function screenToWorld(x,y)
    {
	return [
	    (x-this.screen_origin[0])/this.scale,
	    (y-this.screen_origin[1])/this.scale
	] ;
    }

    function annulus()
    {
	var r1 = 640;
	var r2 = 1152;

	a = this.paper.path("M "+r1+",0"
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
	this.worldToScreen(a);
    }

    function gridify(){

	//r=1000;
	var j0 = Math.ceil( (this.world_min[0]) / this.grid_spacing);
	var j1 = Math.floor( (this.world_max[0]) / this.grid_spacing);

	var font_size=36;

	console.log("gridify x ["+j0+" .. "+j1+"]");

	for(var x_pos = j0*this.grid_spacing; x_pos <=j1*this.grid_spacing; x_pos +=this.grid_spacing){
	    var line = this.paper.path("M "+x_pos+" "+this.world_min[1]+" L "+x_pos+" "+this.world_max[1]);
	    if (x_pos==0)
		line.attr("stroke", "#f00");
	    this.worldToScreen(line);

	    var text = this.paper.text(x_pos, 0, ""+x_pos)
	    text.attr("font-size", font_size);
	    this.worldToScreen(text);
	}

	//horizontal stripes

	var j0 = Math.ceil( this.world_min[1] / this.grid_spacing)
	var j1 = Math.floor( this.world_max[1] / this.grid_spacing)

	for(var y_pos = j0*this.grid_spacing; y_pos <=j1*this.grid_spacing; y_pos +=this.grid_spacing){
	    var line = this.paper.path("M "+this.world_min[0]+" "+y_pos+" L "+this.world_max[0]+" "+y_pos);
	    if (y_pos==0) 
		line.attr("stroke", "#f00");
	    else {
		var text = this.paper.text(0, y_pos, ""+y_pos)
		text.attr("font-size", font_size);
		this.worldToScreen(text);
	    }

	    this.worldToScreen(line);
	}
    }


}

//
//
//

window.onload = function(){

    map = new Map(document.getElementById('paper'), 800, 600);

}

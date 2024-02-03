const canvas = document.querySelector("canvas");
const size = 1000;
let scale = 1;
let scale_ratio = 1;
let move_x = 0;
let move_y = 0;
let drag = false;
const one_unit = 10;//in pixels
let camera_x = canvas.width/2;
let camera_y = canvas.height/2;
const pos = document.querySelector('h1#pos');
const unit_size = 30;

class CoordinateSystem {
    constructor(){//x, y, w, h, color) {
        //this.x = x;
        //this.y = y;
        //this.w = w;
        //this.h = h;
        //this.color = color;
    }

    draw_horizontal(ctx) {
        //horizontal line
        ctx.moveTo((-canvas.width/2 - move_x*scale)*scale_ratio, 0);
        ctx.lineTo(Math.ceil((canvas.width/2 - move_x*scale)*scale_ratio), 0);
        ctx.stroke();
        //drawing units(optimize by the viewport)
        //the 0.5 is for scale = 2 :D there's a problem when you drag to the right maybe some absolute values would fix it? or it's because im not considering the scale
        for(let i = Math.floor((-canvas.width/2 - move_x*scale)/unit_size*scale_ratio); i<Math.ceil((canvas.width/2 - move_x*scale)/unit_size*scale_ratio); i++) {
            if(i) {
                ctx.moveTo(unit_size * i, 5);
                ctx.lineTo(unit_size * i, -5);
                ctx.font = "12px serif";
                ctx.textAlign = 'center';
                ctx.fillText(`${i}`, unit_size * i, 14);
                ctx.stroke();
            }
        }
    }

    draw_vertical(ctx) {
        //vertical line
        ctx.moveTo(0, (-canvas.height/2 - move_y*scale)*scale_ratio);
        ctx.lineTo(0, Math.ceil((canvas.height/2 - move_y*scale)*scale_ratio));
        ctx.stroke();
        for(let i = Math.floor((-canvas.height/2 - move_y*scale)/unit_size*scale_ratio); i<Math.ceil((canvas.height/2 - move_y*scale)/unit_size*scale_ratio)+5; i++) {
            if(i) {
                let offset = parseInt(i/10) != 0 ? 3 : 0;
                ctx.moveTo(5, unit_size*i);
                ctx.lineTo(-5, unit_size*i);
                ctx.font = "12px serif";
                ctx.textAlign = 'center';
                ctx.fillText(`${i*-1}`, -12 - offset, unit_size * i + 3);
                ctx.stroke();
            }
        }
    }

    draw_function_graph(ctx) {

    }

    draw_object(ctx) {
        ctx.lineWidth = 0.25;
        this.draw_horizontal(ctx);
        this.draw_vertical(ctx);
        ctx.lineWidth = 1;
    }
}


function draw() {
    if (canvas.getContext) { 
      const ctx = canvas.getContext("2d");
      ctx.reset();
      ctx.translate(canvas.width/2 + move_x*scale,canvas.height/2 + move_y*scale);
      ctx.scale(scale,scale);
      const grid = new CoordinateSystem();
      grid.draw_object(ctx);
      ctx.strokeRect(1000,0, 20, 20);
      ctx.strokeRect(-(camera_x*scale - 500*scale)*(1/scale),-(camera_y*scale-500*scale)*(1/scale), 5, 5);//-(camera_x - 500)*(1/scale) is the center x coordinateo f the center of the vieport in the coordinate system
      ctx.strokeRect(-(camera_x - 500),-(camera_y-500), 5, 5);
    }
}

function resize(event) {
    event.preventDefault();

    scale += event.deltaY * -0.001;
    
  
    // Restrict scale
    scale = Math.min(Math.max(0.5, scale), 16);
    scale = Math.round(scale * 10)/10;
    console.log(scale);
    scale_ratio = 1/scale;
  
    // Apply scale transform
    //canvas.style.transform = `scale(${scale})`;
    if (canvas.getContext) { 
        const ctx = canvas.getContext("2d");
        draw();
    }
    console.log('xd');
    pos.innerHTML = `X: ${move_x}, Y: ${move_y} ZOOM: ${scale}`;
}

window.addEventListener("load", draw);
canvas.onwheel = resize;

canvas.addEventListener('mousedown', () => {
    drag = true;
})
canvas.addEventListener('mousemove', (e) => {
    if(drag) {
        move_x += e.movementX;
        move_y += e.movementY;
        camera_x += e.movementX;
        camera_y += e.movementY;
        console.log(camera_x, camera_y);
        draw();
    }
    pos.innerHTML = `X: ${move_x}, Y: ${move_y} ZOOM: ${scale}`;
})
canvas.addEventListener('mouseup', () => {
    drag = false;
})
document.addEventListener('mouseup', () => {
    drag = false;
})
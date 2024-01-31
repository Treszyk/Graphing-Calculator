const canvas = document.querySelector("canvas");
const size = 1000;
let scale = 1;
let move_x = 0;
let move_y = 0;
let drag = false;
const one_unit = 10;//in pixels
let camera_x = canvas.width/2;
let camera_y = canvas.height/2;


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
        ctx.color
        ctx.moveTo(-1000, 0);
        ctx.lineTo(1000, 0);
        ctx.stroke();
        ctx.lineWidth = 0.25;
        //drawing units(optimize by the viewport)
        for(let i = -500/10; i<500/10; i++) {
            if(i) {
                ctx.moveTo(10 * i, 5);
                ctx.lineTo(10*i, -5);
                ctx.stroke();
            }
        }
    }

    draw_vertical(ctx) {
        //vertical line
        ctx.moveTo(0, -1000);
        ctx.lineTo(0, 1000);
        ctx.stroke();
        ctx.lineWidth = 0.25;
        for(let i = -500/10; i<500/10; i++) {
            if(i) {
                ctx.moveTo(5, 10*i);
                ctx.lineTo(-5, 10*i);
                ctx.stroke();
            }
        }
    }
    draw_object(ctx) {
        this.draw_horizontal(ctx);
        this.draw_vertical(ctx);
    }
}


function draw() {
    if (canvas.getContext) { 
      const ctx = canvas.getContext("2d");
      ctx.reset();
      ctx.translate(canvas.width/2 + move_x,canvas.height/2 + move_y);
      ctx.scale(scale,scale);
      
      ctx.strokeRect(0, 0, 5, 5);
      ctx.strokeRect(15, 15, 5, 5);
      ctx.strokeRect(15, 15, 5, 5);
      ctx.strokeRect(-25, 0, 25, 25);
      const grid = new CoordinateSystem();
      grid.draw_object(ctx);
      ctx.strokeRect(-(camera_x - 500)*0.5,-(camera_y-500)*0.5, 5, 5);//0.5 for scale = 2
    }
}

function resize(event) {
    event.preventDefault();

    scale += event.deltaY * -0.001;
    
  
    // Restrict scale
    scale = Math.min(Math.max(1, scale), 8);
    scale = Math.round(scale * 10)/10;
    console.log(scale);
  
    // Apply scale transform
    //canvas.style.transform = `scale(${scale})`;
    if (canvas.getContext) { 
        const ctx = canvas.getContext("2d");
        draw();
    }
    console.log('xd');
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
})
canvas.addEventListener('mouseup', () => {
    drag = false;
})
document.addEventListener('mouseup', () => {
    drag = false;
})
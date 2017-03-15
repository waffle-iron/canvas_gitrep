 function init() {
 
    // Initialise our object
    obj = {x:50, y:50, w:70, h:70};
    canvas = document.getElementById("canvas");
    console.log(canvas);
 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 
    // Add eventlistener to canvas
    canvas.addEventListener('touchmove', function() {
      //Assume only one touch/only process one touch even if there's more
      var touch = event.targetTouches[0];
      
      // Is touch close enough to our object?
      if(detectHit(obj.x, obj.y, touch.pageX, touch.pageY, obj.w, obj.h)) {
        // Assign new coordinates to our object
        obj.x = touch.pageX;
        obj.y = touch.pageY;
 
        // Redraw the canvas
        draw();
      }
      event.preventDefault();
    }, false);
    draw();
  }

  function detectHit(x1,y1,x2,y2,w,h) {
  //Very simple detection here
  if(x2-x1>w) return false;
  if(y2-y1>h) return false;
  return true;
}


  function draw() {
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
 
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    ctx.fillStyle = 'blue';
 
    // Draw our object in its new position
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  }
TouchEmulator();
  init();
  
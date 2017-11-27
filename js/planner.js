document.addEventListener("DOMContentLoaded", function() {
  // code...

var canvas = new fabric.Canvas('c', 
{ selection: false,
  height:	350, 
  width:650
}),
    options = {
        distance: 25,
        width: canvas.width,
        height: canvas.height,
        param: {
          stroke: '#ebebeb',
          strokeDashArray: [5, 5],
          strokeWidth: 1,
          selectable: false
        }
     },
     gridLen = options.width / options.distance;
  
    for (var i = 0; i < gridLen; i++) {
      var distance   = i * options.distance,
          horizontal = new fabric.Line([ distance, 0, distance, options.width], options.param),
          vertical   = new fabric.Line([ 0, distance, options.width, distance], options.param);
      canvas.add(horizontal);
      canvas.add(vertical);
      if(i%2 === 0){
        horizontal.set({stroke: '#cccccc', strokeDashArray: [0,0]});
        vertical.set({stroke: '#cccccc', strokeDashArray: [0,0]});
      };
    };
canvas.uniScaleTransform = true;
var grid = 25;

// create grid

// add objects

canvas.add(new fabric.Rect({ 
  left: 100, 
  top: 100, 
  width: 100, 
  height: 50, 
  fill: '#faa', 
  originX: 'left', 
  originY: 'top',
  centeredRotation: true,
  lockScalingX: true,
  lockScalingY: true,
  lockSkewingX: true,
  lockSkewingY: true,
  transparentCorners: false,
  cornerColor: '#5cff10',
  cornerStrokeColor: '#5cff10',
  borderColor: '#5cff10',
  cornerSize: 12,
  padding: 10,
  cornerStyle: 'circle'
 }));

canvas.add(new fabric.Circle({ 
  left: 300, 
  top: 300, 
  radius: 50, 
  fill: '#9f9', 
  originX: 'left', 
  originY: 'top',
  centeredRotation: true,
  lockScalingX: true,
  lockScalingY: true,
  lockSkewingX: true,
  lockSkewingY: true,
  transparentCorners: false,
  cornerColor: '#5cff10',
  cornerStrokeColor: '#5cff10',
  borderColor: '#5cff10',
  cornerSize: 12,
  padding: 10,
  cornerStyle: 'circle'
}));


fabric.Object.prototype.setControlsVisibility({
      mt: false, 
        mb: false,
        ml: false,
        mr: false,
        tl: false,
        tr: false,
        bl: false,
        br: false
})

canvas.setBackgroundImage('img/canvas_background.png', canvas.renderAll.bind(canvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStretch: false
});

canvas.selectionColor = 'rgba(0,255,0,1)';
 canvas.selectionBorderColor = 'red';
 canvas.selectionLineWidth = 5;

function animate(e, dir) {
  if (e.target) {
    fabric.util.animate({
      startValue: e.target.get('scaleX'),
      endValue: e.target.get('scaleX') + (dir ? 0.1 : -0.1),
      duration: 100,
      onChange: function(value) {
        e.target.scale(value);
        canvas.renderAll();
      },
      onComplete: function() {
        e.target.setCoords();
      }
    });
  }
}
canvas.on('mouse:down', function(e) { animate(e, 1); });
canvas.on('mouse:up', function(e) { animate(e, 0); });

// snap to grid

canvas.on('object:moving', function(options) { 
  options.target.set({
    left: Math.round(options.target.left / grid) * grid,
    top: Math.round(options.target.top / grid) * grid
  });
});

canvas.on('object:rotating', function(options) {
  var step = 90;
  options.target.angle = Math.round(options.target.angle / step) * step;
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById("rectangle").onclick = function() { 
    canvas.add(new fabric.Rect({ 
      left: 200, 
      top: 200, 
      width: 150, 
      height: 100, 
      fill: getRandomColor(), 
      originX: 'left', 
      originY: 'top',
      centeredRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      lockSkewingX: true,
      lockSkewingY: true,
      transparentCorners: false,
      cornerColor: '#5cff10',
      cornerStrokeColor: '#5cff10',
      borderColor: '#5cff10',
      cornerSize: 12,
      padding: 10,
      cornerStyle: 'circle'
     }));
};

document.getElementById("circle").onclick = function() { 
    canvas.add(new fabric.Circle({ 
      left: 100, 
      top: 200, 
      radius: 50, 
      fill: getRandomColor(), 
      originX: 'left', 
      originY: 'top',
      centeredRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      lockSkewingX: true,
      lockSkewingY: true,
      transparentCorners: false,
      cornerColor: '#5cff10',
      cornerStrokeColor: '#5cff10',
      borderColor: '#5cff10',
      cornerSize: 12,
      padding: 10,
      cornerStyle: 'circle'
     }));
};

document.getElementById("remove").onclick = function() {
  canvas.remove(canvas.getActiveObject());
};

});


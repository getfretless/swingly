var Swing = {
  c: myCanvas.getContext('2d'),
  intervals: [],
  n: 20,
  multiplier: 20,
  timeModifier: 0.1,

  stop: function() {
    while (this.intervals.length > 0) {
      var removed_item = this.intervals.pop();
      window.clearInterval(removed_item);
    }
  },

  drawRectangle: function() {
    this.c.fillRect(0, 0, 50, 50);
  },

  makeItRed: function() {
    this.c.fillStyle = 'red';
  },

  makeItAColor: function(color) {
    this.c.fillStyle = color;
  },

  drawBigRectangle: function() {
    this.c.fillRect(0, 0, myCanvas.width, myCanvas.height);
  },

  drawRowOfRectangles: function() {
    var x = 0, y = 0, width = 10, height = 10, n = 10;
    for (var i = 0; i < n; i++) {
      x = i/n * myCanvas.width;
      this.c.fillRect(x, y, width, height);
    }
  },

  drawDiagonalRectangles: function() {
    var x = 0, y = 0, width = 10, height = 10, n = 10;
    for (var i = 0; i < n; i++) {
      x = i/n * myCanvas.width;
      y = i/n * myCanvas.height;
      this.c.fillRect(x, y, width, height);
    }
  },

  redOnBlack: function() {
    this.drawBigRectangle();
    this.makeItRed();
    this.drawRowOfRectangles();
    this.drawDiagonalRectangles();
  },

  clearCanvas: function() {
    this.c.clearRect(0, 0, myCanvas.width, myCanvas.height);
  },

  diagonalAnimation: function() {
    var x = 0, y = 0, width = 10, height = 10, n = 10, time = 0;
    var _this = this;

    var redraw = function() {
      _this.clearCanvas();
      for (var i = 0; i < n; i++) {
        x = i/n * myCanvas.width + time;
        y = i/n * myCanvas.height + time;
        _this.c.fillRect(x, y, width, height);
      }
      time++;
    }
    this.interval = setInterval(redraw, 16);
  },

  sinAnimation: function() {
    var x = 0, y = 150, width = 10, height = 10, n = 10, time = 0;
    var _this = this;

    var redraw = function() {
      _this.clearCanvas();
      for (var i = 0; i < n; i++) {
        x =  myCanvas.width / 2 + Math.sin(time * i) * 20;
        y = i/n * myCanvas.height;
        _this.c.fillRect(x, y, width, height);
      }
      time += 0.1;
    }
    this.interval = setInterval(redraw, 16);
  },

  circleAnimation: function() {
    var x = 0, y = 150, width = 10, height = 10, n = 10, time = 0, sin, cos;
    var _this = this;

    var redraw = function() {
      _this.clearCanvas();
      for (var i = 0; i < n; i++) {
        sin = Math.sin(i / 20 + time) / 2 + 0.5;
        cos = Math.cos(i / 20 + time) / 2 + 0.5;
        x =  sin * (myCanvas.width - width);
        y = cos * (myCanvas.height - height);
        _this.c.fillRect(x, y, width, height);
      }
      time += 0.1;
    }
    this.interval = setInterval(redraw, 16);
  },

  start: function() {
    var x = 0, y = 150, width = 10, height = 10, time = 0;
    var _this = this;

    var redraw = function() {
      _this.clearCanvas();
      var x2;
      for (var i = 0; i < _this.n; i++) {
        x =  myCanvas.width / 2 + Math.sin(time * i) * _this.multiplier;
        x2 = myCanvas.width - x;
        y = i/_this.n * myCanvas.height;
        _this.c.fillRect(x, y, width, height);
        _this.c.fillRect(x2, y, width, height);
      }
      time += _this.timeModifier;
    }
    this.intervals.push(setInterval(redraw, 16));
  }
};

document.querySelector('form').onsubmit = function(ev) {
  ev.preventDefault();
  Swing.n = this.elements.n.value;
  Swing.multiplier = this.elements.multiplier.value;
  Swing.timeModifier = parseFloat(this.elements.time_modifier.value) / 100;
  Swing.start();
};

document.querySelector('#stop-button').onclick = function(ev) {
  ev.preventDefault();
  Swing.stop();
}
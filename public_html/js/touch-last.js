/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60)
        };

var canvas = document.createElement('canvas');
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;
canvas.style.border = "blue 1px solid";
var context = canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

var step = function() {
    update();
    render();
    animate(step);
};

function Ball(x, y, strategy) {
    this.x = x;
    this.y = y;
    this.x_speed = 3;
    this.y_speed = 3;
    this.radius = 5;
    this.strategy = strategy;
    this.waitCtr = strategy ? 50 : 0;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.fillStyle = this.strategy?"#000000":"#FFFFFF";
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fill();
};

Ball.prototype.decrementWaitCtr = function() {
    this.waitCtr--;
};

Ball.prototype.resetWaitCtr = function() {
    this.waitCtr = 50;
};

Ball.prototype.clearWaitCtr = function() {
    this.waitCtr = 0;
};

Ball.prototype.runAwayFromOponent = function (oponent) {
    var roll = getRollOfTheDice();
    if(roll === 1) {
        if (this.x < oponent.x && this.x - this.x_speed - 5 > 0) {
            this.x -= this.x_speed;
        } else if (this.x >= oponent.x && this.x + this.x_speed + 5 < width) {
            this.x += this.x_speed;
        } else { // probably in the corner
            /*if (oponent.x - this.x < oponent.y - this.y) {
                if (this.x - this.x_speed - 5 > 0) {
                    this.x -= this.x_speed;
                } else {
                    this.x += this.x_speed;
                }
            } else {
                if (this.y - this.y_speed - 5 > 0) {
                    this.y -= this.y_speed;
                } else {
                    this.y += this.y_speed;
                }
            }*/
            if (this.y - this.y_speed - 5 > 0) {
                this.y -= this.y_speed;
            } else if (this.y + this.x_speed + 5 < height) {
                this.y += this.y_speed;
            }
        }
    } else {
        if (this.y < oponent.y && this.y - this.y_speed - 5 > 0) {
            this.y -= this.y_speed;
        } else if (this.y >= oponent.y && this.y + this.x_speed + 5 < height) {
            this.y += this.y_speed;
        } else {
            /*if (oponent.x - this.x < oponent.y - this.y) {
                if (this.x - this.x_speed - 5 > 0) {
                    this.x -= this.x_speed;
                } else {
                    this.x += this.x_speed;
                }
            } else {
                if (this.y - this.y_speed - 5 > 0) {
                    this.y -= this.y_speed;
                } else {
                    this.y += this.y_speed;
                }
            }*/
            if (this.x - this.x_speed - 5 > 0) {
                this.x -= this.x_speed;
            } else if (this.x + this.x_speed + 5 < width) {
                this.x += this.x_speed;
            }
        }
    }
};


Ball.prototype.update = function(oponent) {
    if (this.waitCtr === 0) {
        var my_top_x = this.x - 5;
        var my_top_y = this.y - 5;
        var my_bottom_x = this.x + 5;
        var my_bottom_y = this.y + 5;

        var oponent_top_x = oponent.x - 5;
        var oponent_top_y = oponent.y - 5;
        var oponent_bottom_x = oponent.x + 5;
        var oponent_bottom_y = oponent.y + 5;
        if (this.strategy) {
            if (((my_top_x >= oponent_top_x && my_top_x <= oponent_bottom_x)
                    || (my_bottom_x >= oponent_top_x && my_bottom_x <= oponent_bottom_x))
                    && ((my_top_y >= oponent_top_y && my_top_y <= oponent_bottom_y)
                            || (my_bottom_y >= oponent_top_y && my_bottom_y <= oponent_bottom_y))) { //touch oponent
                this.strategy = false;
                oponent.strategy = true;
                this.runAwayFromOponent(oponent);
                this.clearWaitCtr();
                oponent.resetWaitCtr();
            } else { //go for oponent
                var roll = getRollOfTheDice();
                if(roll === 1) {
                    if (this.x < oponent.x) {
                        if (this.x + this.x_speed < width) {
                            this.x += this.x_speed;
                        }
                    } else if (this.x - this.x_speed > 0) {
                        this.x -= this.x_speed;
                    }
                } else {
                    if (this.y < oponent.y) {
                        if (this.y + this.y_speed < height) {
                            this.y += this.y_speed;
                        }
                    } else if (this.y - this.x_speed > 0) {
                        this.y -= this.y_speed;
                    }
                }
            }
        } else { //run away from oponent
            this.runAwayFromOponent(oponent);
        }
    } else {
        this.decrementWaitCtr();
    }
}

var ball1 = new Ball(300, 290, true);
var ball2 = new Ball(300, 310, false);

var render = function() {
    context.fillStyle = "#D9D9D9";
    context.fillRect(0, 0, width, height);
    /*for(var i = 50; i < 600; i+=50) {
      context.beginPath();
      context.moveTo(50, i);
      context.lineTo(550, i);
      context.stroke();
    }
    for(var i = 50; i < 600; i+=50) {
      context.beginPath();
      context.moveTo(i, 50);
      context.lineTo(i, 550);
      context.stroke();
    }*/
    
    //horizontal lines
    context.beginPath();
    context.moveTo(50, 50);
    context.lineTo(150, 50);
    context.stroke();
    
    context.beginPath();
    context.moveTo(250, 250);
    context.lineTo(450, 250);
    context.stroke();
    
    context.beginPath();
    context.moveTo(100, 450);
    context.lineTo(200, 450);
    context.stroke();
    
    //vertical lines
    context.beginPath();
    context.moveTo(150, 50);
    context.lineTo(150, 150);
    context.stroke();
    
    context.beginPath();
    context.moveTo(450, 150);
    context.lineTo(450, 350);
    context.stroke();
    
    context.beginPath();
    context.moveTo(100, 350);
    context.lineTo(100, 550);
    context.stroke();
    
    ball1.render();
    ball2.render();
};


var update = function() {
    ball1.update(ball2);
    ball2.update(ball1);
};

function getRollOfTheDice() {
    return Math.floor(Math.random() * 2);
}

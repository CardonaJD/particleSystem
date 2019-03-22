let system = [];
let b = [];

function setup() {
    createCanvas(1300, 1000);
}

function draw() {
    background(255);

    for (let s of system) {
        s.runSystem();
    }
}

function mouseClicked() {
    system.push(new ParticleSystem(mouseX, mouseY))
}

function Mover(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-0.5, -2));
    this.acele = createVector(0, 0);
    this.m = 1;
    this.lifeSpan = 255;

    this.show = function() {
        stroke(0, this.lifeSpan)
        fill(0, this.lifeSpan);
        ellipse(this.position.x, this.position.y, this.m * 15, this.m * 15);
    }

    this.update = function() {
        this.velocity.add(this.acele);
        this.position.add(this.velocity);
        this.lifeSpan -= 3;

        this.acele.mult(0);
    }

    this.run = function() {
        this.show();
        this.update();
    }

    this.applyForce = function(force) {

        let f = force.copy();
        f.div(this.m);

        this.acele.add(f);
    }

    // this.isDead = function() {
    //   if (this.lifeSpan < 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

    this.edges = function() {
        if (this.position.y > height) {
            this.position.y = 0
        }
        if (this.position.y < 0) {
            this.position.y = height
        }
        if (this.position.x > width) {
            this.position.x = 0
        }
        if (this.position.x < 0) {
            this.position.x = width
        }
    }
}

function ParticleSystem(x, y) {
    this.position = createVector(x, y);
    this.particle = [];

    this.addParticle = function() {
        this.particle.push(new Mover(this.position.x, this.position.y));
    }

    this.runSystem = function() {
        this.addParticle();

        for (let i = this.particle.length - 1; i >= 0; i--) {
            let g = createVector(0, 0.1);
            this.particle[i].run();
            this.particle[i].applyForce(g.mult(this.particle[i].m));

            if (this.particle[i].lifeSpan < 0) {
                this.particle.splice(i, 1);
            }
        }

    }
}


function SquareForm() {};
SquareForm.prototype = Object.Create(Mover());
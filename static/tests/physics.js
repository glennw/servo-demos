class BoxBody {
    constructor(x, y, width, height, angle, options) {
        var div = addDiv();

        div.style.background = "yellow";
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.border = "1px solid red";

        this.mbody = Matter.Bodies.rectangle(x, y, width, height, options);

        var degrees = 3.1415927 * angle / 180;
        Matter.Body.setAngle(this.mbody, degrees);

        this.div = div;
    }
}

class CircleBody {
    constructor(x, y, radius) {
        var div = addDiv();

        div.style.background = "blue";
        div.style.width = (2 * radius) + "px";
        div.style.height = (2 * radius) + "px";
        //div.style.border = "1px solid red";
        div.style.borderRadius = radius + "px";

        this.mbody = Matter.Bodies.circle(x, y, radius);
        this.div = div;
    }
}

class PhysicsTest {
    init() {
        setBackgroundColor('linear-gradient(to bottom, rgba(64,0,0,1), rgba(0,0,0,0))');
        this.bodies = [];
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
    }

    setGravity(x, y) {
        this.world.gravity.x = x;
        this.world.gravity.y = y;
    }

    addCircleBody(x, y, radius) {
        var body = new CircleBody(x, y, radius, {
            friction: 1,
            density: 0.1,
            restitution: 0
        });
        this.bodies.push(body);
        Matter.World.add(this.world, body.mbody);
    }

    addRectBody(x, y, width, height) {
        var body = new BoxBody(x, y, width, height, 0, {
            friction: 1,
            density: 0.1,
            restitution: 0
        });
        this.bodies.push(body);
        Matter.World.add(this.world, body.mbody);
    }

    addStaticRectBody(x, y, width, height, angle) {
        var body = new BoxBody(x, y, width, height, angle, {
            isStatic: true
        });
        this.bodies.push(body);
        Matter.World.add(this.world, body.mbody);
        return body;
    }

    update() {
        Matter.Engine.update(this.engine, 1000 / 60);

        for (var i = 0 ; i < this.bodies.length ; ++i) {
            var body = this.bodies[i];

            var xf = "translate(" +
                     (body.mbody.position.x - 0.5 * body.div.offsetWidth) + "px, " +
                     (body.mbody.position.y - 0.5 * body.div.offsetHeight) + "px) " +
                     "rotate(" + body.mbody.angle + "rad)";

            body.div.style.transform = xf;

            if (!body.mbody.isStatic) {
                var c = Math.min(255, Math.floor(10 * body.mbody.speed));
                body.div.style.backgroundColor = "rgba(" + c + ", 0, 0, 1)";
            }
        }
    }
}

class Test extends PhysicsTest {
    init() {
        super.init();

        super.addStaticRectBody(400, 0, 870, 20, 0);
        super.addStaticRectBody(400, 650, 800, 20, 0);
        super.addStaticRectBody(0, 325, 20, 650, -5);
        super.addStaticRectBody(800, 325, 20, 650, 5);

        for (var i=0 ; i < 20 ; ++i) {
            //super.addRectBody(50 + i * 60, 100, 30, 30);
            super.addCircleBody(50 + i * 15, 50, 10);
        }

        this.obstacles = [];
        this.addObstacle(300, 400, 0);
        this.addObstacle(200, 200, 20);
        this.addObstacle(500, 500, -30);
        this.addObstacle(200, 450, 10);
        this.addObstacle(500, 200, 15);
        this.addObstacle(600, 360, 0);

        this.lastTime = 0;
        this.lastGravityTime = 0;
    }

    addObstacle(x, y, angle) {
        this.obstacles.push({
            angle: angle,
            body: super.addStaticRectBody(x, y, 200, 10, angle)
        });
    }

    update(t) {
        var dt = Math.min(t - this.lastTime, 1000 / 60);
        this.lastTime = t;

        for (var i=0 ; i < this.obstacles.length ; ++i) {
            var obstacle = this.obstacles[i];
            obstacle.angle += 0.002 * dt;
            Matter.Body.setAngle(obstacle.body.mbody, obstacle.angle);
        }

        if (t - this.lastGravityTime > 5000.0) {
            var gx = random(-1.0, 1.0);
            var gy = random(-1.0, 1.0);
            super.setGravity(gx, gy);
            this.lastGravityTime = t;
        }

        super.update();
    }

    deinit() {
    }
}

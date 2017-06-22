class FPSCounter {
    constructor() {
        this._fps = 0;
        this._prevTime = 0;
        this._frames = 0;
    }

    update(t) {
        this._frames++;

        if (t - this._prevTime > 200.0) {
            this._fps = Math.round(this._frames * 1000.0 / (t - this._prevTime));
            this._prevTime = t;
            this._frames = 0;
        }
    }

    getFPS() {
        return this._fps;
    }
}

Pseudo = {
    initialRandomSeed: 49734321,
    randomSeed: 49734321,

    resetRandomSeed: function()
    {
        Pseudo.randomSeed = Pseudo.initialRandomSeed;
    },

    random: function()
    {
        var randomSeed = Pseudo.randomSeed;
        randomSeed = ((randomSeed + 0x7ed55d16) + (randomSeed << 12))  & 0xffffffff;
        randomSeed = ((randomSeed ^ 0xc761c23c) ^ (randomSeed >>> 19)) & 0xffffffff;
        randomSeed = ((randomSeed + 0x165667b1) + (randomSeed << 5))   & 0xffffffff;
        randomSeed = ((randomSeed + 0xd3a2646c) ^ (randomSeed << 9))   & 0xffffffff;
        randomSeed = ((randomSeed + 0xfd7046c5) + (randomSeed << 3))   & 0xffffffff;
        randomSeed = ((randomSeed ^ 0xb55a4f09) ^ (randomSeed >>> 16)) & 0xffffffff;
        Pseudo.randomSeed = randomSeed;
        return (randomSeed & 0xfffffff) / 0x10000000;
    }
};

const fps_counter = new FPSCounter();
const fps_element = document.getElementById('fps');
const root_element = document.getElementById('root');
const stage = document.getElementById('stage');

var setBackgroundColor = function(color) {
    root_element.style.background = color;
}

var clearStage = function() {
    setBackgroundColor('black');
    while (stage.firstChild) {
        stage.removeChild(stage.firstChild);
    }
}

var addToStage = function(element) {
    stage.appendChild(element);
}

var addDivToRoot = function(attrs) {
    var div = document.createElement('div');

    for (var key in attrs)
        div.setAttribute(key, attrs[key]);

    root_element.appendChild(div);

    return div;
}

var addDiv = function(attrs) {
    var div = document.createElement('div');

    for (var key in attrs)
        div.setAttribute(key, attrs[key]);

    addToStage(div);

    return div;
}

var random = function(min, max) {
    return (Pseudo.random() * (max - min)) + min;
}

var randomInt = function(min, max) {
    return Math.floor(this.random(min, max + 1));
}

var test = new Test();
test.init(stage.offsetWidth, stage.offsetHeight);

var tick = function(t) {
    fps_counter.update(t);
    fps_element.innerHTML = "FPS: " + fps_counter.getFPS();

    test.update(t);

    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

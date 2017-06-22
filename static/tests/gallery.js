var photo = function(name, caption) {
    return {
        path: name,
        caption: caption,
    }
}

var photos = [
    photo('/static/images/moz1.jpg', 'Mozilla San Francisco'),
    photo('/static/images/moz2.jpg', 'Hawaii All Hands'),
    photo('/static/images/moz3.jpg', 'Mozilla Mosaic'),
    photo('/static/images/moz4.jpg', 'All Hands Keynote'),
    photo('/static/images/moz5.jpg', 'Mozlando 2015'),
    photo('/static/images/moz6.jpg', 'All Hands Keynote'),
    photo('/static/images/moz7.jpg', '2009 All Hands'),
];

class Item {
    constructor(x, y, i) {
        this.x = x;
        this.y = y;
        this.t = 0;

        var photo = photos[i];

        var caption = document.createElement('div');
        caption.innerHTML = photo.caption;
        caption.className = "caption";

        var div = addDiv();
        var img = document.createElement('img');
        img.style.width = '400px';
        img.style.height = '300px';

        img.addEventListener('load', function() {
            div.appendChild(img);
            div.appendChild(caption);
        }, false);
        img.src = photo.path;

        div.style.padding = "16px";
        div.style.paddingBottom = "40px";
        div.style.border = "2px solid black";
        div.style.width = '400px';
        div.style.height = '300px';
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.background = "linear-gradient(to bottom, rgba(180,180,180,1), rgba(255,255,255,1))";
        div.style.transform = "scale(0)";

        this.img = img;
        this.div = div;
    }

    update(dt) {
        this.t = Math.min(this.t + dt, 1.5);

        var scale = this.t / 1.5;
        if (scale >= 1) {
            this.div.style.transform = "";
        } else {
            this.div.style.transform = "scale(" + scale + ")";
        }
    }
}

class Test {
    init() {
        this.counter = addDivToRoot();
        this.counter.id = "counter";

        this.items = [];
        this.lastTime = 0;
    }

    update(t) {
        var dt = Math.min(t - this.lastTime, 1000 / 60) / 1000;
        this.lastTime = t;

        for (var i=0 ; i < this.items.length ; ++i) {
            var item = this.items[i];
            item.update(dt);
        }

        if (this.items.length < 150 && randomInt(0, 10) == 0) {
            this.items.push(new Item(randomInt(0, 400),
                                     randomInt(0, 300),
                                     randomInt(0, photos.length-1)));
        }

        this.counter.innerHTML = "Images: " + this.items.length;
    }

    deinit() {
    }
}

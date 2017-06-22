class Test {
    init(stage_width, stage_height) {
        this.loaders = [];

        var loader_size = 100;

        var x_count = Math.floor(stage_width / loader_size);
        var y_count = Math.floor(stage_height / loader_size);
        var loader_index = 0;

        var anims = [
            { "class": "ball-clip-rotate", "divs": 1 },
            { "class": "ball-clip-rotate-pulse", "divs": 2 },
            { "class": "square-spin", "divs": 1 },
            { "class": "ball-clip-rotate-multiple", "divs": 2 },
            { "class": "ball-rotate", "divs": 1 },
            { "class": "ball-zig-zag", "divs": 2 },
            { "class": "ball-zig-zag-deflect", "divs": 2 },
            { "class": "ball-triangle-path", "divs": 3 },
            { "class": "ball-scale", "divs": 1 },
            { "class": "ball-spin-fade-loader", "divs": 8 },
            { "class": "line-spin-fade-loader", "divs": 8 },
            { "class": "triangle-skew-spin", "divs": 1 },
            { "class": "ball-scale-random", "divs": 3 },
        ];

        for (var y=0 ; y < y_count ; ++y) {
            for (var x=0 ; x < x_count ; ++x) {
                var loader = anims[loader_index];
                loader_index = (loader_index + 1) % anims.length;

                var outer = document.createElement('div');
                outer.style.width = loader_size + 'px';
                outer.style.height = loader_size + 'px';
                outer.style.left = (x * loader_size) + 'px';
                outer.style.top = (y * loader_size) + 'px';

                var inner = document.createElement('div');
                inner.className = loader.class;
                outer.appendChild(inner);

                for (var i=0 ; i < loader.divs ; ++i) {
                    var div = document.createElement('div');
                    inner.appendChild(div);
                }

                addToStage(outer);
                this.loaders.push(outer);
            }
        }
    }

    update(t) {
        var f = t % 5000.0 / 5000.0;
        var rotation = f * 2 * 3.1415927;

        for (var i=0 ; i < this.loaders.length ; ++i) {
            var loader = this.loaders[i];
            loader.style.transform = "rotate(" + rotation + "rad)";
        }
    }

    deinit() {
    }
}

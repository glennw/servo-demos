class Test {
    addImage(text, x, y, width, height) {
        var outer = addDiv();
        outer.style.left = x + 'px';
        outer.style.top = y + 'px';

        var inner = document.createElement('img');
        inner.src = "/static/images/firefox.png";
        inner.style.width = '128px';
        inner.style.height = '128px';

        var label = document.createElement('div');
        label.style.fontSize = "48px";
        label.style.color = 'white';
        label.innerHTML = text;
        label.style.left = '150px';
        label.style.top = '32px';
        label.style.width = '100px';

        outer.appendChild(inner);
        outer.appendChild(label);

        return inner;
    }

    init() {
        this.invert = this.addImage("Invert", 0, 0);
        this.brightness = this.addImage("Brightness", 0, 150);
        this.contrast = this.addImage("Contrast", 0, 300);
        this.grayScale = this.addImage("Grayscale", 0, 450);
        this.hueRotate = this.addImage("Hue Rotate", 450, 0);
        this.opacity = this.addImage("Opacity", 450, 150);
        this.saturate = this.addImage("Saturate", 450, 300);
        this.sepia = this.addImage("Sepia", 450, 450);
    }

    update(t) {
        var f = t % 3000.0 / 3000.0;
        var pc = 100 * f;

        this.invert.style.filter = 'invert(' + pc + '%)';
        this.brightness.style.filter = 'brightness(' + pc + '%)';
        this.contrast.style.filter = 'contrast(' + pc + '%)';
        this.grayScale.style.filter = 'grayscale(' + pc + '%)';
        this.hueRotate.style.filter = 'hue-rotate(' + 360 * f + 'deg)';
        this.opacity.style.filter = 'opacity(' + pc + '%)';
        this.saturate.style.filter = 'saturate(' + pc + '%)';
        this.sepia.style.filter = 'sepia(' + pc + '%)';
    }

    deinit() {
    }
}

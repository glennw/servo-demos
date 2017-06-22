class Item {
    constructor(text, x, y, color) {
        const colors = [
            "rgb(255, 0, 0)",
            "rgb(0, 255, 0)",
            "rgb(0, 0, 255)",
            "rgb(255, 255, 0)",
            "rgb(255, 0, 255)",
            "rgb(0, 0, 255)",
        ];

        var divs = [addDiv(), addDiv()];

        for (var i=0 ; i < divs.length ; ++i) {
            var div = divs[i];
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.width = '500px';
            div.style.fontSize = '70px';
            div.style.fontFamily = 'Walter Turncoat';

            for (var j=0 ; j < text.length ; ++j) {
                var span = document.createElement('span');
                span.style.color = colors[j % colors.length];
                span.innerHTML = text[j];
                div.appendChild(span);
            }
        }

        this.divs = divs;
    }


    update(af, filter) {
        var yClip = af * 80;
        this.divs[1].style.clip = "rect(0px, 400px, " + yClip + "px, 0px)";
        this.divs[1].style.filter = filter;
    }
}

class Test {
    addText(text, x, y, size, color) {
        return new Item(text, x, y, size, color);
    }

    init() {
        this.invert = this.addText("Invert", 0, 0, 'yellow');
        this.brightness = this.addText("Brightness", 0, 100, 'green');
        this.contrast = this.addText("Contrast", 0, 200, 'orange');
        this.grayScale = this.addText("GrayScale", 0, 300, 'red');
        this.hueRotate = this.addText("Hue Rotate", 470, 0, 'pink');
        this.saturate = this.addText("Saturate", 470, 100, 'green');
        this.sepia = this.addText("Sepia", 470, 200, 'red');
    }

    update(t) {
        var f = t % 24000.0 / 24000.0;
        var pc = 100 * f;

        var af = t % 6000.0 / 6000.0;

        this.invert.update(af, 'invert(' + pc + '%)');
        this.brightness.update(af, 'brightness(' + pc + '%)');
        this.contrast.update(af, 'contrast(' + pc + '%)');
        this.grayScale.update(af, 'grayscale(' + pc + '%)');
        this.hueRotate.update(af, 'hue-rotate(' + 360 * f + 'deg)');
        this.saturate.update(af, 'saturate(' + pc + '%)');
        this.sepia.update(af, 'sepia(' + pc + '%)');
    }

    deinit() {
    }
}

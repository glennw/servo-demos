class Test {
    init() {
        var string = "Smoky Text";
        var outer = addDiv();
        outer.style.fontSize = "128px";
        outer.style.color = 'transparent';
        outer.style.left = '50px';
        outer.style.top = '200px';

        for (var i=0 ; i < string.length ; ++i) {
            var span = document.createElement('span');
            span.innerHTML = string[i];
            span.style.textShadow = "0 0 0 whitesmoke";
            span.style.display = "inline-block";
            if (i & 1) {
                span.style.animation = "smoky-mirror 5s 3s both";
            } else {
                span.style.animation = "smoky 5s 3s both";
            }
            span.style.animationDelay = (3 + i/10) + 's';
            outer.appendChild(span);
        }
    }

    update(t) {
    }

    deinit() {
    }
}

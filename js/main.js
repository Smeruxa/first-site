const _default_choose_value = "- потому что";
var _last_choosed = "именно мы продаем качественный товар, который стоит вашего доверия, и оправдывает свою цену $";
var _choose_values = new Array( 
    " именно мы продаем качественный товар, который стоит вашего доверия, и оправдывает свою цену $",
    " только у нас самые добрые администраторы, с быстрым откликом и действием быстрого реагирования ❤",
    " здесь вы найдете то, что вам по душе! ★",
    " именно в нашем месте самое уютное общение ☺"
);
var _is_showed = false;
var _default_text_x = -1;

function _draw(pixels) {
    return pixels + "px";
}

function _calc_direction() {
    return Math.random() >= 0.5 ? 1 : -1
}

function _unresize(value) {
    var text = document.getElementById("h3_port");
    text.innerHTML = value;

    text.animate(
        [
            { transform: "scale(1)", opacity: "0" },
            { transform: "scale(1.1)", opacity: "0.5" },
            { transform: "scale(1)", opacity: "1" }
        ],
        {
            duration: 1000,
            easing: "linear"
        }
    );
}

function _events_why_we() {
    let _new_selected = _choose_values[Math.floor(Math.random() * _choose_values.length)];
    while (_new_selected == _last_choosed) {
        _new_selected = _choose_values[Math.floor(Math.random() * _choose_values.length)];
    }
    _last_choosed = _new_selected;
    _unresize(_default_choose_value + _new_selected);
}

function _rainbow_line(self) {
    let _line = document.createElement('div');
    let _rect = self.getBoundingClientRect();
    _line.style.position = 'absolute';
    _line.style.width = _draw(self.offsetWidth);
    _line.style.height = '3px';
    _line.style.background = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, purple)';
    _line.style.left = _draw(_rect.left);
    _line.style.top = _draw(_rect.top + self.offsetHeight);
    document.body.appendChild(_line);
}

function _moveObject(self) {
    var _width = document.documentElement.clientWidth;
    var _height = window.innerHeight * 0.1;
    
    var _curr_x = self.getBoundingClientRect().left;
    var _curr_y = self.getBoundingClientRect().top;

    var _dir_x = _calc_direction();
    var _dir_y = _calc_direction();
    
    function move() {
        if (_curr_x + self.offsetWidth >= _width || _curr_x <= 0) 
            _dir_x = (Math.random() * (_width - self.offsetWidth)) > _curr_x ? 1 : -1; 
        if (_curr_y + self.offsetHeight >= _height || _curr_y <= 0)
            _dir_y = (Math.random() * (_height - self.offsetHeight)) > _curr_y ? 1 : -1;
        
        _curr_x += _dir_x;
        _curr_y += _dir_y;
        
        self.style.left = _draw(_curr_x);
        self.style.top = _draw(_curr_y);
        
        requestAnimationFrame(move);
    }
    
    move();
}

function _draw_list(self, buttons, count, links, r) {
    if (_is_showed) {
        let angle = 2 * Math.PI / count;
        let currAngle = 0;
        for (let i = 0; i < count; i++) {
            let _bself = document.createElement("button");
            _bself.classList.add("radial-elements");
            _bself.innerText = buttons[i];
            let eX = (window.innerWidth / 2 - (100 / 2)) + r * Math.cos(currAngle);
            let eY = (self.getBoundingClientRect().top + (25 / 2)) + r * Math.sin(currAngle);
            _bself.style.left = _draw(eX - (_bself.offsetWidth / 2));
            _bself.style.top = _draw(eY - (_bself.offsetHeight / 2));
            _bself.addEventListener("click", function() {
                window.open(links[i], "_blank");
            });
            self.parentNode.insertBefore(_bself, self.nextSibling);
            currAngle += angle;
        }
    }
    else {
        const elements = document.getElementsByClassName('radial-elements');
        for (i = 0; i < elements.length; i++) {
            let _anim = document.createElement('style');
            _anim.innerHTML += `@keyframes _hide {
                0% { opacity: 1; }
                100% { opacity: 0 }
            }`;
            elements[i].appendChild(_anim);
            elements[i].style.animationName = '_hide';
            elements[i].style.animationDuration = '1s';
            elements[i].addEventListener('animationend', _end);
            function _end(event) {
                if (event.animationName == "_hide")
                    this.remove();
            }
        }
    }
}

function moveElement(element, startX, startY, endX, endY) {
    let steps = 100;
    let currentStep = 0;
    let animation = setInterval(function() {

        currentStep++;
        element.style.left = _draw((startX + ((endX - startX) / steps) * currentStep));
        element.style.top = _draw((startY + ((endY - startY) / steps) * currentStep));
    
        if (currentStep >= steps) 
            clearInterval(animation);
    }, 10);
}

function _push_surprise(self, list, _circle_size) {
    let cX = self.getBoundingClientRect().left + (self.getBoundingClientRect().width / 2);
    let cY = self.getBoundingClientRect().top + (self.getBoundingClientRect().height / 2);
    let _offset = document.createElement('div');

    _offset.classList.add("_over_square");
    _offset.style.position = "absolute";
    _offset.style.width = _draw(_circle_size);
    _offset.style.height = _draw(_circle_size);
    _offset.style.top = _draw(cY - _circle_size / 2);
    _offset.style.left = _draw(cX - _circle_size / 2);
    _offset.style.userSelect = "none";

    self.parentNode.insertBefore(_offset, self);

    setInterval(function() {
        if (!_is_showed && document.visibilityState == 'visible') {
            let _symbol = document.createElement('div');
            _symbol.classList.add('_over_symbols');
            _symbol.innerHTML = '<i class="fa ' + list[Math.floor(Math.random() * list.length)] + '"></i>';

            let angle = Math.random() * Math.PI * 2;

            let _to_x = cX + Math.cos(angle) * 135;
            let _to_y = cY + Math.sin(angle) * 135;

            _symbol.style.userSelect = "none";
            _symbol.style.left = _draw(cX);
            _symbol.style.top = _draw(cY);

            moveElement(_symbol, cX, cY, _to_x, _to_y);

            setTimeout(function() {
                _symbol.animate(
                [
                    { transform: 'scale(1) translateX(0) translateY(0) rotate(0deg)' },
                    { transform: 'scale(1.5) translateX(0) translateY(0) rotate(0deg)' }
                ], 
                {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => {
                    _symbol.animate(
                    [
                        { transform: 'scale(1.5) translateX(0) translateY(0) rotate(0deg)' },
                        { transform: 'scale(0) translateX(50px) translateY(0) rotate(' + (360 * _calc_direction()) + 'deg)' }
                    ], 
                    {
                            duration: 1000,
                            easing: 'ease-in'
                    }).onfinish = () => {
                        _symbol.remove();
                    };
                };
            }, 1000)

            _offset.parentNode.insertBefore(_symbol, _offset);
        }
    }, 1000);
}

function _squares(self) {
    setInterval(function() {
        setTimeout(function() {
            let _bg = document.createElement("div");
            _bg.classList.add("square");
            
            let _bg_size = Math.random() * 60 + 60;
            let direction = _calc_direction();
            let offset_x = 200;
            if (direction == 1) {
                let rand_x = (Math.random() * (offset_x - _bg_size)) + _bg.getBoundingClientRect().width;
                let rand_y = (Math.random() * (self.offsetHeight - 15 - _bg_size)) + window.innerHeight * 0.1;

                _bg.style.position = "absolute";
                _bg.style.width = _draw(_bg_size);
                _bg.style.height = _draw(_bg_size);
                _bg.style.left = _draw(rand_x);
                _bg.style.top = _draw(rand_y);
                self.parentNode.insertBefore(_bg, self);

                _bg.animate([
                    { transform: 'rotate(0) scale(1)' },
                    { transform: 'rotate(360deg) scale(0)' }
                ], {
                    duration: 2500 + Math.random() * 1000, 
                    delay: Math.random() * 100, 
                    easing: 'ease-out', 
                    fill: 'forwards'
                }).onfinish = () => {
                    _bg.remove();
                };
            }
            else {
                let rand_x = (Math.random() * (offset_x - _bg_size)) + window.innerWidth - offset_x;
                let rand_y = (Math.random() * (self.offsetHeight - 15 - _bg_size)) + window.innerHeight * 0.1;

                _bg.style.position = "absolute";
                _bg.style.width = _draw(_bg_size);
                _bg.style.height = _draw(_bg_size);
                _bg.style.left = _draw(rand_x);
                _bg.style.top = _draw(rand_y);
                self.parentNode.insertBefore(_bg, self);

                _bg.animate([
                    { transform: 'rotate(0) scale(1)' },
                    { transform: 'rotate(360deg) scale(0)' }
                ], {
                    duration: 2500 + Math.random() * 1000, 
                    delay: Math.random() * 100, 
                    easing: 'ease-out', 
                    fill: 'forwards'
                }).onfinish = () => {
                    _bg.remove();
                };
            }
        }, Math.random() * 500 + 500);
    }, 500);
}

function onPageLoaded(self) {

    // BACKGROUND

    _squares(document.getElementById("main_container"));

    // BACKGROUND 

    _rainbow_line(document.getElementById("main_hiden_container")); // RAINBOW LINE

    // SYMBOLS FROM RADIAL MENU

    let _self_radial = document.getElementById('radial-menu');
    _push_surprise(_self_radial, ['fa-heart', 'fa-star', 'fa-graduation-cap', 'fa-smile', 'fa-umbrella', 'fa-headphones', 'fa-person-dress'], 250);

    // SYMBOLS FROM RADIAL MENU

    // RADIAL MENU

    let _buttons = ["Рюкзаки", "Платья", "Обувь", "Косметика", "Очки", "Футболки", "Канцелярия", "Зонты"];
    let _links = [
        "https://vk.com/album-169307817_292638877", 
        "https://vk.com/album-169307817_292634007",
        "https://vk.com/album-169307817_292635277",
        "https://vk.com/album-169307817_292635866",
        "https://vk.com/album-169307817_292632868",
        "https://vk.com/album-169307817_292633643",
        "https://vk.com/album-169307817_292638391",
        "https://vk.com/album-169307817_292638525"
    ]
    var radial = document.getElementById("radial-menu");
    radial.addEventListener("click", function() {
        _is_showed = !_is_showed;
        _draw_list(radial, _buttons, _buttons.length, _links, 150);
    });
    
    // RADIAL MENU

    // CIRCLES

    var _count = Math.floor((document.documentElement.clientWidth / 45) / 1.5);

    var header = document.getElementById("header");

    var objects = new Array(_count);
    for (var i = 0; i < objects.length; i++) {
        var _onCreate = document.createElement("div");

        _onCreate.style.pointerEvents = "none";
        _onCreate.classList.add("circles_header");

        var _height = header.offsetHeight - 45;
        var _length = header.offsetWidth - 45;

        _onCreate.style.left = _draw(Math.floor(Math.random() * _length));
        _onCreate.style.top = _draw(Math.floor(Math.random() * _height));

        document.body.appendChild(_onCreate);
        _moveObject(_onCreate)
    }

    // CIRCLES

    // FONT
        
    var _text_element = document.getElementById('open_text');
    _text_element.style.fontSize = _draw((document.documentElement.clientHeight * 0.1) * 0.8);

    // FONT

    // EVENT

    var _w_wait = document.getElementById("_we_wait");
    _w_wait.addEventListener("click", () => {
        window.open("https://vk.com/club169307817", "_blank");
    });

    // EVENT
}
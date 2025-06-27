const openMenu = () => {
    const menu = document.querySelector(".header-menu");
    menu.classList.toggle("active");
    if (menu.classList.contains("active")) {
        document.querySelector("header .material-icons").innerHTML = "close"
    }
    else {
        document.querySelector("header .material-icons").innerHTML = "menu"
    }
}

// A $( document ).ready() block.
$(document).ready(function () {
    initMoveSteve();
});

const steve = $('#steve');
var speed = 10;
var jumpHeight = 50;
var introEnd = false;
var keys = {
    'left': false,
    'right': false
};

var steveFly = false;

function initMoveSteve() {
    $(document).on('keydown', function (e) {
        if (e.code === 'ArrowRight') {
            keys['right'] = true;
        }
        if (e.code === 'ArrowLeft') {
            keys['left'] = true;
        }
        if (e.code === 'ArrowUp' && !steveFly) {
            keys['up'] = true;
        }
    });

    $(document).on('keyup', function (e) {
        if (e.code === 'ArrowRight') {
            keys['right'] = false;
        }
        if (e.code === 'ArrowLeft') {
            keys['left'] = false;
        }
    });
}

function jump(){
    steveFly = true
    let steveTop = steve.position().top;
    let steveTopTarget = steveTop - jumpHeight;
    steve.css('top', steveTopTarget + 'px');
    setTimeout(function(){
        steve.css('top', steveTop + 'px');
    }, 300);
    setTimeout(function(){
        steveFly = false;
    }, 600);
}

function startIntro(){
    let halfWindow = $(document).width() * 0.5;
    if(steve.position().left <= halfWindow){
        steve.css('left', steve.position().left + speed); 
    }
    else{
        steve.removeClass('active')
        introEnd = true;
    }
}

function frame(timestamp) {
    let steveLeft = steve.position().left;
    if (introEnd){
        if (keys['right'] && steveLeft + steve.width() + speed <= $(document).width()) {   
            steve.css('left', steveLeft + speed);
            steve.addClass('active');
            steve.removeClass('revert');
        }
        if (keys['left'] && steveLeft - speed >= 0) {
            steve.css('left', steveLeft - speed);
            steve.addClass('active revert');
        }
        if (!keys['right'] && !keys['left']) {
            steve.removeClass('active');
        }
        if ( keys['up']){
            keys['up'] = false;
            jump();
        }
    }
    else {
        startIntro()
    }
    
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);


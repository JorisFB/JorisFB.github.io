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
var speed = 5;
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
    let pos = steve.position();
    if (!pos) return; // Sécurité si l'élément est masqué
    let halfWindow = $(document).width() * 0.5;
    if(pos.left <= halfWindow){
        steve.css('left', pos.left + speed); 
    }
    else{
        steve.removeClass('active');
        introEnd = true;
    }
}

function frame(timestamp) {
    // Si Steve est masqué (ex: sur mobile), on stoppe l'exécution de la frame
    if (!steve.is(':visible')) {
        requestAnimationFrame(frame);
        return;
    }
    
    let pos = steve.position();
    if (!pos) {
        requestAnimationFrame(frame);
        return;
    }
    let steveLeft = pos.left;

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
        if (keys['up']){
            keys['up'] = false;
            jump();
        }
    }
    else {
        startIntro();
    }
    
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);


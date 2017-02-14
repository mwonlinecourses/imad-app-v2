console.log('Loaded!');

//Changes to be done on the main text
var element = document.getElementById('main-text');

element.innerHTML='New Value';

//move image 
var img= document.getElementById('madi');

marginleft=0;
function moveRight(){
    marginleft = marginleft + 10;
    img.style.marginLeft = marginleft+'px'; 
}

img.onclick = function(){
    var interval = setInterval(moveRight,100);
   // img.style.marginLeft='100px';
};
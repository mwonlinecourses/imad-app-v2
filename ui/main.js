var button = document.getElementById('counter');
var counter = 0;
console.log('JS');
button.onClick = function(){
  
  counter = counter + 1;
  console.log("bjchjw");
  var span = document.getElementById('count');
  span.innerHTML = counter.toString();
    
};
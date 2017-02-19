var button = document.getElementById('counter');
var counter = 0;
button.onClick = function(){
  
  counter = counter + 1;
  console.write("bjchjw");
  var span = document.getElementById('count');
  span.innerHTML = counter.toString();
    
};
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function (){
  
  counter = counter + 1;
  
  
    //create request
    var request = new XMLHttpRequest ();
    
    request.onreadystatechange = function (){
      if(request.readyState === XMLHttpRequest.DONE){
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById('count');
            span.innerHTML = counter.toString();
              
          }
      }  
    };
    
    request.open('GET','http://mwonlinecourses.hasura-app.io/counter',true);
    request.send(null);
    
};
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
    
    request.open('GET','http://mwonlinecourses.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

//submit


var submit = document.getElementById('search_button');
submit.onclick = function(){
    
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    
    var request = new XMLHttpRequest()
  
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE){
           if(request.status === 200){
            //var names = ['name1','name2','name3','name4'];
            var names = request.responseText;
            names = JSON.parse(names);
             var li='';
               for(var i=0 ; i<names.length ; i++){
                  li += '<li>'+names[i]+'</li>';
              }
              var ul = document.getElementById('namelist');
              ul.innerHTML = li; 
        }   
     }  
  };
    
  request.open('GET','http://mwonlinecourses.imad.hasura-app.io/submit-name?name='+name,true);
  request.send(null);
  
};

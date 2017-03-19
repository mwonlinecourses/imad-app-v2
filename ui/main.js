
//submit username/password


var submit = document.getElementById('submit_button');
submit.onclick = function(){
    
    
    
    var request = new XMLHttpRequest()
  
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE){
           if(request.status === 200){
            console.log('user is loged in ');
            alert('Logged in Successfully');
        }   else if(request.status === 403){
            alert('Username/ password is invalid');
        } else if(request.status === 500){
            alert('Something went wrong on server');
        }
     }  
  };
   
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST','http://mwonlinecourses.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username : username, password : password}));
  
};



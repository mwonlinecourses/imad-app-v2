//comments JS
var commentbutton = document.getElementById('addcomment');
commentbutton.onclick = function() {
    console.log('asdf');
  var commentInput = document.getElementById('comment');
  var comment = commentInput.value;
  
  var request = new XMLHttpRequest();
  
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE){
        if(request.status === 200){
            var comments = request.responseText;
            comments = JSON.parse(comments);
            var li='';
            for(var i=0;i < comments.length ; i++){
                li += '<li>'+comments[i]+'</li>';
            }
            var commentlist = document.getElementById('commentlist');
            commentlist.innerHTML = li;
        }
    }  
  };
  
  request.open('GET','http://mwonlinecourses.imad.hasura-app.io/submit-comment?currentcomment='+comment,true);
  request.send(null);
};
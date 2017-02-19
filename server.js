var express = require('express');
var morgan = require('morgan');
var path = require('path');


var articles ={
    
    'article-one' : {
    title : 'Article One | Manish Wadhwani',
    heading : 'Article One',
    date : '12 Feb, 2017',
    content : `
     <p>
                    This is article one!This is article one!This is article one!
                    This is article one!This is article one!This is article one!
                    This is article one!This is article one!This is article one!
                </p>
                <p>
                    This is article one!This is article one!This is article one!
                    This is article one!This is article one!This is article one!
                    This is article one!This is article one!This is article one!
                </p>
                <p>
                    This is article one!This is article one!This is article one!
                    This is article one!This is article one!This is article one!
                    This is article one!This is article one!This is article one!
                </p>
    `},
    
    'article-two' : {
        title : 'Article Two | Manish Wadhwani',
    heading : 'Article Two',
    date : '12 Feb, 2017',
    content : `
                <p>
                    This is article Two!
                </p>
            `    
    },
    
    'article-three' : {
        title : 'Article Three | Manish Wadhwani',
    heading : 'Article Three',
    date : '14 Feb, 2017',
    content : `
         <p>
            This is article Three!
        </p>`            
    }
    
};

function createTemplate (data){

var title = data.title;
var heading = data.heading;
var date = data.date;
var content = data.content;

var htmlTemplate =`
<!DOCTYPE html>
<html>
    <head>
        
        <Title>
            ${title}
        </Title>
        <link href="/ui/style.css" rel="stylesheet" />
        
    </head>
    <body>
        <div class="container">
            
            
            <div>
                <a href="/"> Home </a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}

            </div>
        </div>
        
    </body>
</html>
`;
return htmlTemplate;
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var counter = 0;
app.get('/counter', function (req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/:articleName',function (req, res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var names = [];
app.get('/submit-name/' , function (req,res){
  var name=req.query.name;
  names.push(name);
  
  res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

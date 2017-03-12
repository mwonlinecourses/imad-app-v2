var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  username : 'mwonlinecourses',
  database : 'mwonlinecourses',
  host : 'db.imad.hasura-app.io',
  port : '5432',
  password : process.env.DB_PASSWORD 
};

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
                ${date.toDateString()}
            </div>
            <div>
                ${content}

            </div>
            <div>
                <input type='text' id='comment' placeholder='WRITE COMMENT'></input>
                <input type='submit' value='submit' id='addcomment'></input>
                <ul id="commentlist">
                </ul>
            </div>
        </div>
        
        <script src="/ui/article.js">
        
        </script>
        
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

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    pool.query('SELECT * FROM test', function(err, result){
       if(err){
           res.status(500).send(err.toString());
       } else{
           res.send(JSON.stringify(result.rows));
       }
    });
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});

var counter = 0;
app.get('/counter', function (req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name/' , function (req,res){
  var name=req.query.name;
  names.push(name);
  
  res.send(JSON.stringify(names));
});

var comments = [];
app.get('/submit-comment', function(req,res){
    var comment = req.query.currentcomment;
    
    comments.push(comment);
    res.send(JSON.stringify(comments));
});

app.get('/articles/:articleName',function (req, res){
    
    
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName+"'", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else if(result.rows.length === 0){
            res.status(404).send('Article does not exist');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    });
    
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

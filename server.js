var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
  username : 'mwonlinecourses',
  database : 'mwonlinecourses',
  host : 'db.imad.hasura-app.io',
  port : '5432',
  password : process.env.DB_PASSWORD 
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
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512,'sha512');
    
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
   var hashedString = hash(req.params.input,'This-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.getRandomBytes(128).toString();
    var dbString= hash(password, salt); 
    
    pool.query('INSERT into "USER" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result){
      if(err){
           res.status(500).send(err.toString());
       } else{
           res.send('User Successfully cfeated : ' + username);
       }  
    });
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
    
    
    pool.query("SELECT * FROM article WHERE title = $1 ", [req.params.articleName], function(err, result){
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

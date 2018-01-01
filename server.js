const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}; ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next()
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  //res.send('<h1>Hello express !<h1>');
  // res.send({
  //   name: 'Candido',
  //   likes: [
  //     'Aïkido',
  //     'badminton',
  //     'churros',
  //     23
  //   ]
  // });
  res.render('home.hbs', {
    welcomePage: 'Esto es la página de bienvenida',
    welcomeMessage: 'Esto es el mensaje de bienvenida',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About página',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    projectTitle : 'Titulo del proyecto'
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    Errmsg: 'Error on this page'
  });
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});

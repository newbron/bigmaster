const express = require('express'),
http    = require('http'),
path    = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req,res) => {
res.sendFile(path.join(__dirname, 'dist/index.html'));
})

const port = process.env.PORT || '4201';
app.set('port', port);

const server = http.createServer(app);
server.listen(port,() => console.log('Running at port '+port))
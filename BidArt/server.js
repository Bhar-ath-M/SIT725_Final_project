let express = require('express');   //imports the Express framework, which is used to create the web server and handle routing.
let app = express();                //creates an instance of an Express application.
let port = process.env.port || 3000;    //sets the port on which the Express server will listen.
require('./mongoConnect');
let router = require('./routers/router');
let http = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo(http);


app.use(express.static(__dirname + '/'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/bid',router);


app.get('/', function (req,res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User has connected');

    socket.on('disconnect', () => {
        console.log('User has disconnected');
    });

    socket.on('bidsuccess', () => {
        console.log('Bid made succefully . This is a socket.io log');
    });

});


http.listen(port, ()=>{
    console.log('express server started on port ' + port);
});


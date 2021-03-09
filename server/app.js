const bodyParser = require("body-parser")
const userRoutes = require("./routes/user")
const errRoutes = require("./routes/error")
const homeRoutes = require('./routes/base')
const chatRoutes = require('./routes/chat')
const browsingRoutes = require('./routes/browsing')
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/auth")
const pss = require('./util/passport.js')
const passport = require('passport')
const cors = require("cors")
const express = require('express')
const { client, redis } = require('./util/redisModule')
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// we have to fetch for connected user Email To create a room and join the user to it!

io.sockets.on('connection', (socket) => {
  // console.log('a user connected', socket.id)
  // client.set("key", socket.id, redis.print);
  socket.on('join', (data) => {
    socket.join(data.id + 'Room')
    // client.SET(data.id, socket.id), redis.print;
    // console.log(data.id, socket.id)
  })
  socket.on('msg', (data) => {
    // console.log('msgto', data.to);
    io.in(data.to + 'Room').emit('new_msg', { msg: data.text })
    // let socketId = '';
    // client.get(data.to, function(err, reply) {
    // reply is null when the key is missing
    // console.log(reply);
    // socketId = reply
    //   });
    //   console.log(socketId);
    // io.to(socketId).emit("new_msg", data.text);
  })

  socket.on('active', async (data) => {
    client.set("connected_users", data)
    const value = await client.getAsync("connected_users")
    console.log(value)
    io.emit("getActive", value)
  })
  
  socket.on('disconnect', () => {
    client.del("connected_users")
  })
  // socket.on('inResponsive', (id) => {
  //     client.set(id, socket.id, redis.print);
  //     client.set(id+'-'+'time', Date(), redis.print);
  //     client.keys('*', function (err, keys) {
  //         if (err) return console.log(err);
  //         for(var i = 0, len = keys.length; i < len; i++) {
  //         }
  //       });
  // });
})


app.use(express.json());
var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser());

//bodyParser
//extended: false
app.use(bodyParser.urlencoded({extended: true}));

client.on('error', (error) => {
  console.log('error', error)
})

// Images ***************************************************
// need help of package path
const path = require('path');
// static folder to thing like image ...
app.use(express.static(path.join(__dirname, 'public/upload')));
//**********************************************************

// parse application/json
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(authRoutes)
app.use(homeRoutes)
app.use(browsingRoutes)
app.use(userRoutes)
app.use(errRoutes)
app.use('/chat', chatRoutes)

http.listen(3001)
// 실시간 채팅 서버
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 5000;
server.listen(portNo, () => {
    console.log('서버 실행 완료', 'http://localhlost:' + PORT);
})

// app.use('/public', express.static('./public'))
// app.get('/', (req, res) => { // root에 접근하면 /public으로 리다이렉트
//     res.redirect(302, '/public');
// })

const socketio = require('socket.io');
const io = socketio.listen(server);

// io.on('connection', (socket) => {
//     console.log('사용자 접속 : ', socket.client.id);

//     socket.on('chat-msg', (msg) => {
//         console.log('message : ', msg);

//         io.emit('chat-msg', msg);
//     })
// })

io.onconnection('connection', (socket) => {
    socket.on('newUser', (data) => {
        io.emit('enter', data);
    });

    socket.on('message', (data) => {
        console.log('client가 보낸 데이터 : ', data);
        io.emit('upload', data);
    });

    socket.on('leaveUser', (nick) => {
        io.emit('out', nick);
    });
});



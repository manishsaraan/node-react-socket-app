import openSocket from 'socket.io-client';
const  socket = openSocket('http://127.0.0.1:4001');
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function setUserName(username){
  socket.emit('user-joined', { username })
}
export { subscribeToTimer };
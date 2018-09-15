import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';

const  socket = openSocket('http://127.0.0.1:4001');

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      showGame: false,
      onlineUsers: []
    };

    // recieve events
    
    socket.on('join-user', ({username}) => {
      const { onlineUsers } = this.state;
      onlineUsers.push(username);
      this.setState({onlineUsers})
      toast.success(`${username} is online`);
    });

    socket.on('remove-user', ({ username }) => {
      const { onlineUsers } = this.state;

      var index = onlineUsers.indexOf(username);
      if (index > -1) {
        onlineUsers.splice(index, 1);
      }

     this.setState({onlineUsers});     
     toast.warning(`${username} is offline`);

    });
  }

  onChange = (e) => {
     this.setState({username: e.target.value})
  }

  onSubmit = () => {
     const { onlineUsers, username } = this.state;
     onlineUsers.push(username);
     this.setState({showGame: true, onlineUsers});
     socket.emit('add-user', { username })
  }

  logout = () => {
      const { onlineUsers, username } = this.state;

      var index = onlineUsers.indexOf(username);
      if (index > -1) {
        onlineUsers.splice(index, 1);
      }
      
      this.setState({ username: '', showGame: false});
      socket.emit('logout', { username });
     }

  render() {
    const { showGame, username, onlineUsers } = this.state;

    return (
      <div className="App">
       <ToastContainer />
      <div> onlineUsers: {  onlineUsers.join() }</div>
        { showGame  ? (
          <button onClick={this.logout}>logout</button>
        ) : (
          <div style={{ textAlign: "center" }}>
            <input type="text" onChange={this.onChange} value={username}/>
            <input type="submit" onClick={this.onSubmit}/>
          </div>
        )}
      </div>
    );
  }
}

export default App;

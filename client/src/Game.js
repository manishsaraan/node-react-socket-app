import React, { PureComponent } from 'react';

class Game extends PureComponent{
  render(){
      const socket = this.props.socket;
      socket.on('new-user', data => {
          console.log('a new user is connectec', data)
      })
      return(<div> this is gage</div>);
  }
}

export default Game;
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { socket } from '../app';
import Fade from 'react-reveal/Fade';
import Players from './Players';

export class LobbyPage extends React.Component {
    
    onStartGame = () => {
        socket.emit("startGame", undefined, (res) => {
            if(res.code === "success") {
                // Error Handling                
            }
        });
    };
    
    
    render() {
        return (
            <div className="content-container">
                {this.props.type === "" && <Redirect to="/" />}
                <Fade>
                    <div>
                        <div className="list-header">
                            <h2 className={"box-layout__title"}>Waiting for players</h2>
                            {this.props.players.length > 0 && this.props.type === "HOST" && <Fade><button onClick={this.onStartGame} className="button">Start Game</button></Fade>}
                            {this.props.type === "HOST" && <h2 className={"box-layout__title"}>Room: <b>{this.props.room}</b></h2>}

                        </div>
                        {
                            this.props.type === "HOST" &&
                            <Players players={this.props.players} />
                        }

                    </div>
                </Fade>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    type: state.type,
    players: state.players,
    room: state.game.room
});

export default connect(mapStateToProps)(LobbyPage);
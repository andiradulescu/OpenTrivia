import React from 'react';
import { socket } from '../app';
import { connect } from 'react-redux';
import { resetPlayers} from '../actions/players';
import { resetRoom, setQuestion, setMessage, resetGame } from '../actions/game';
import { resetType } from '../actions/clientType';


export class Header extends React.Component {
    
    handleClick = () => {
        socket.disconnect();
        socket.connect();
        this.props.resetPlayers();
        this.props.resetType();
        this.props.resetGame();
        this.props.history.push("/");
    }

    handleCredits = () => {
        window.open('https://github.com/andiradulescu/BlockTrivia', '_blank');
    }
    
    render() {
        return (
            <header className={"header"}>
                <div className={"content-container"}>
                    <div className={"header__content"}>
                        <button className={"header__title button--link button"} onClick={this.handleClick}><h1>BlockTrivia</h1></button>
                        <button className="button--link button " onClick={this.handleCredits}>Built using OpenTrivia</button>
                    </div>
                </div>
            </header>
        )
    }
};


const mapDispatchToProps = (dispatch) => ({
    resetPlayers: () => dispatch(resetPlayers()),
    resetType: () => dispatch(resetType()),
    resetGame: () => dispatch(resetGame())
});

export default connect(undefined, mapDispatchToProps)(Header);
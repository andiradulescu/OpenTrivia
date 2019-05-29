import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Players from './Players';
import { socket } from '../app';
import QuestionOptions from './QuestionOptions';
import { setMessage, resetGame } from '../actions/game';
import { resetType } from '../actions/clientType';
import { resetPlayers } from '../actions/players';
import ReactCountdownClock from 'react-countdown-clock';

export class QuestionPage extends React.Component {

    submitAnswer = (e) => {

        let ans = "";

        if (typeof e !== 'undefined') {
            ans = e.target.value
        } else {
            ans = "False"
        }
        
        socket.emit("submitAnswer", ans, (res) => {

            if (res.code === "correct") {
                this.props.setMessage(`Correct. Your score is ${res.score}`);
            } else if (res.code === "incorrect") {
                this.props.setMessage(`Incorrect, The correct answer was ${res.correct}. Your score is ${res.score}`);
            }
        });
    };

    myCallback = () => {
        console.log("Completed");
    }

    handleReset = () => {
        socket.disconnect();
        socket.connect();
        this.props.resetPlayers();
        this.props.resetType();
        this.props.resetGame();
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="content-container">
                {this.props.type === "" && <Redirect to="/" />}
                <Fade>
                    {
                        this.props.status === "active" ?
                            <div>
                                {
                                    this.props.message === "" ?
                                        <div>
                                            <div className="list-header">
                                                <h2 className={"box-layout__title"}>{this.props.question.question}</h2>
                                            </div>
                                            <ReactCountdownClock 
                                                seconds={10}
                                                color="#fff"
                                                alpha={0.9}
                                                size={100}
                                                onComplete={this.submitAnswer} 
                                            />
                                            <div className="question-background">
                                                <QuestionOptions type={this.props.type} message={this.props.question.message} submitAnswer={this.submitAnswer} options={this.props.question.options} />
                                            </div>
                                            {this.props.type === "HOST" && <Players players={this.props.players} />}
                                        </div>
                                        :
                                        <div>
                                            <Fade>
                                                <div className="box-layout__box">
                                                    <h3 className="box-layout__title">{this.props.message}</h3>
                                                </div>
                                            </Fade>
                                        </div>
                                }
                            </div>
                        : 
                            <div className="scoreboard">

                                <div className="list-item">
                                    <h3>Player</h3>
                                    <h3>Score</h3>
                                </div>
                                
                                {
                                    this.props.scoreboard.map((player) => {
                                        return (
                                            <div key={player.name} className="list-item">
                                                <h3>{player.name}</h3>
                                                <h3>{player.score > 0 ? 'You won ' +  player.score + " BTV!" : player.score}</h3>
                                            </div>
                                        )
                                    })
                                }

                                <div className="list-button">
                                    <button className="button" onClick={this.handleReset}>Start Again</button>
                                </div>
                            
                            </div>
                    }

                </Fade>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    question: state.game.question,
    type: state.type,
    players: state.players,
    message: state.game.message,
    status: state.game.status,
    scoreboard: state.game.scoreboard
});

const mapDispatchToProps = (dispatch) => ({
    setMessage: (msg) => dispatch(setMessage(msg)),
    resetPlayers: () => dispatch(resetPlayers()),
    resetType: () => dispatch(resetType()),
    resetGame: () => dispatch(resetGame())
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
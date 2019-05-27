import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../app';
import { Redirect } from 'react-router-dom';
import { setRoom } from '../actions/game';
import { HuePicker } from 'react-color';
import Fade from 'react-reveal/Fade';


export class JoinGamePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            room: "",
            name: "",
            colour: "#00FFF3",
            error: ""
        }
    };

    onRoomChange = (e) => {
        const room = e.target.value;
        this.setState({ room });
    };

    onNameChange = (e) => {
        const name = e.target.value;

        function hashCode(str) { // java String#hashCode
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
               hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        } 
        
        function intToRGB(i){
            var c = (i & 0x00FFFFFF)
                .toString(16)
                .toUpperCase();
        
            return "00000".substring(0, 6 - c.length) + c;
        }

        this.setState({ colour: '#' + intToRGB(hashCode(name)) });

        this.setState({ name });
    };

    handleChangeComplete = (color) => {
        this.setState({ colour: color.hex });
    };

    submitForm = (e) => {
        e.preventDefault();
        const config = {
           name: this.state.name,
           colour: this.state.colour,
           room: this.state.room 
        }

        socket.emit("joinRoom", config, (res) => {
            //console.log("res!", res);
            if (res.code === "success") {
                this.setState({ error: "" })
                this.props.setRoom(this.state.room);
                this.props.history.push("/lobby");
            } else {
                this.setState({ error: res.msg })
            }
        })
    }

    render() {
        return (
            <div className="content-container">
                {
                    this.props.type === "" && <Redirect to="/" />
                }
                <div className="box-layout__box">
                    <Fade>
                        <form className="form" onSubmit={this.submitForm}>
                            <h1 className={"box-layout__title"}>Join Game</h1>
                            {this.state.error && <p className="form__error">{this.state.error}</p>}

                            <input
                                type="text"
                                placeholder="Room Name"
                                autoFocus
                                value={this.state.room}
                                onChange={this.onRoomChange}
                                className="text-input"
                            />

                            <input
                                type="text"
                                placeholder="Ethereum Address"
                                value={this.state.name}
                                onChange={this.onNameChange}
                                className="text-input"
                            />

                            <div className="form__picker">
                                <HuePicker
                                    color={this.state.colour}
                                    onChangeComplete={this.handleChangeComplete}
                                />
                            </div>

                            <button className="button">Join</button>



                        </form>

                    </Fade>
                </div>
            </div>
        );
    };

};

const mapStateToProps = (state) => ({
    type: state.type
});

const mapDispatchToProps = (dispatch) => ({
    setRoom: (room) => dispatch(setRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinGamePage);
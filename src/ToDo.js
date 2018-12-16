import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDo.css';
import ToDoItem from './components/ToDoItem';
// import Logo from './assets/logo.png';
import axios from "axios"
import { HOST_URL } from "./config"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            // this is where the data goes
            list: [],
            todo: ''
        };
    };


    componentDidMount() {
        let config = {
            method: "get",
            url: `${HOST_URL}todos`
        }
        axios(config).then(res => {
            this.setState({
                list: [...this.state.list, ...res.data]
            })
        }).catch(err => {
            console.log(err)
        })
    }

    createNewToDoItem = () => {
        let config = {
            method: "post",
            url: `${HOST_URL}todos`,
            data: {
                todo: this.state.todo,
                completed: false
            }
        }

        axios(config).then(res => {
            this.setState({
                list: [...this.state.list, res.data],
                todo: ''
            })
        }).catch(err => {
            console.log(err);
        })
    };


    handleKeyPress = e => {
        if (e.target.value !== '') {
            if (e.key === 'Enter') {
                this.createNewToDoItem();
            }
        }
    };

    handleInput = e => {
        this.setState({
            todo: e.target.value
        });
    };


    // this is now being emitted back to the parent from the child component
    deleteItem = todoId => {
        let config = {
            method: "delete",
            url: `${HOST_URL}todos/${todoId}`
        }
        axios(config).then(res => {
            this.setState(({ list }) => ({
                list: list.filter((toDo, index) => toDo.id !== todoId)
            }));
        }).catch(err => {
            console.log(err);
        })
    };


    render() {
        return (
            <div className="ToDo">
                {/* <img className="Logo" src={Logo} alt="React logo" /> */}
                <h1 className="ToDo-Header">Avantation Demo</h1>
                <div className="ToDo-Container">

                    <div className="ToDo-Content">

                        {this.state.list.map((item, key) => {
                            return <ToDoItem
                                key={item.id}
                                item={item.todo}
                                deleteItem={this.deleteItem.bind(this, item.id)}
                            />
                        }
                        )}
                    </div>

                    <div>
                        <input type="text" value={this.state.todo} onChange={this.handleInput} onKeyPress={this.handleKeyPress} />
                        <button className="ToDo-Add" style={{
                            display: "inline-block",
                            marginTop: 0,
                            marginLeft: "10px",
                            verticalAlign: "middle"
                        }} onClick={this.createNewToDoItem}>+</button>
                    </div>

                    <Button variant="outlined" color="secondary" onClick={e => {
                        this.props.onResetClick()
                    }} className={this.props.classes.button}>
                        Logout
                    </Button>

                </div>
            </div>
        );
    }
}

ToDo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDo);

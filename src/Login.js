import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from "axios"
import { HOST_URL } from "./config"


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Login extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        const { classes } = props;
        this.state = {
            email: "demo@avantation.in",
            password: "EC84D5D857ABE",
            classes
        }
    }

    onSubmitClick() {
        let config = {
            method: "post",
            url: `${HOST_URL}login`,
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }
        axios(config)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.props.onLoginComplete(res.data.token);
            }).catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert(error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }

    render() {
        return (
            <main className={this.state.classes.main}>
                <CssBaseline />
                <Paper className={this.state.classes.paper}>
                    <form className={this.state.classes.form}
                        onSubmit={e => {
                            e.preventDefault()
                            this.onSubmitClick()
                        }}>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email"
                                name="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={e => {
                                    this.setState({
                                        email: e.target.value
                                    })
                                }} autoFocus />
                        </FormControl>

                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState(
                                        {
                                            password: e.target.value
                                        }
                                    )
                                }}
                                autoComplete="current-password" />
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.state.classes.submit}>
                            Log In</Button>
                    </form>
                </Paper>
            </main>
        );
    }

}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

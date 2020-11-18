import React, { Component } from 'react';
import { Button, Grid, TextField, Typography, Paper, Slider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import classes from './Misc.module.css';
import * as moment from 'moment';
import axios from 'axios';

class Misc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            name: '',
            age: 0,
            dob: moment().format("YYYY-MM-DD"),
            slideValue: 30
        }
    }

    componentDidMount() {
        console.log('compoentDidMount');
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            this.setState({ content: response.data });
        });
    }

    dateChangeHandler = (event) => {
        console.log(this)
        console.log(event.target.value);
        this.setState({
            age: moment().diff(event.target.value, 'y', false),
            dob: event.target.value
        });
        console.log('after:> ', this.state);
    }

    render() {

        return (
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Signup
        </Typography>
                <form noValidate
                    className={classes.form}
                    onSubmit={this.props.submit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue={this.state.dob}
                                onChange={this.dateChangeHandler}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <Paper className={classes.paper} elevation={3}>
                                <h4>
                                    Age: {this.state.age}
                                </h4>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Slider
                                value={this.state.slideValue}
                                onChange={(_e, newValue) => this.setState({ slideValue: newValue })} aria-labelledby="continuous-slider" />
                        </Grid>

                        {this.state.content.length > 0 ? <Grid item xs={12}>
                            <Autocomplete
                                id="combo-box"
                                options={this.state.content}
                                getOptionLabel={(option) => option.name}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}
                                    label="names"
                                    variant="outlined"
                                    onChange={(e) => this.setState({ name: e.target.value })} />}
                            />
                        </Grid> : null}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="secondary">
                                Misc
                        </Button>
                        </Grid>
                    </Grid>

                </form>
            </div>
        );
    }
};

export default Misc;

import React from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fullwidth: {
        width: '100%'
    },
    errortext: {
        color: 'red',
        margin: 0,
        fontSize: '0.75rem',
        marginTop: '3px',
        textAlign: 'left',
        // font-family: "Roboto", "Helvetica", "Arial", sans-serif,
        fontWeight: '400',
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
        marginLeft: '14px',
        marginRight: '14px'
    }
}));


const validationSchema = Yup.object({
    email: Yup.string()
        .email('it should be a valid email address')
        .required(),
    password: Yup.string()
        .required()
});

const Login = (props) => {
    const classes = useStyles();

    const { handleChange, handleSubmit, errors, values } = useFormik({
        initialValues: props.initialValues ? props.initialValues : {
            email: '',
            password: ''
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema,
        onSubmit: props.submit
    });

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Login
        </Typography>
            <form noValidate
                className={classes.form}
                onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <TextField
                            required
                            className={classes.fullwidth}
                            variant="outlined"
                            name="email"
                            label="Email"
                            placeholder="email@address.com"
                            type="email"
                            onChange={handleChange}
                            defaultValue={values.email}
                        />
                        <p className={classes.errortext}>
                            {errors.email ? errors.email : null}
                        </p>

                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            className={classes.fullwidth}
                            variant="outlined"
                            name="password"
                            label="Password"
                            type="password"
                            onChange={handleChange}
                            defaultValue={values.password}
                        />
                        <p className={classes.errortext}>
                            {errors.password ? errors.password : null}
                        </p>

                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="secondary">
                            Login
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </div>

    );
};

export default Login;
import React from 'react';
import { TextField, Button, Grid, TextareaAutosize, Typography } from '@material-ui/core'
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
        .min(8, 'Password is too short - should be 8 characters minimum')
        .max(16, 'Password is too long - Should be 16 characters maximum')
        .required()
    // .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'not valid')
    ,
    aboutme: Yup
        .string()
        .optional()
        .min(20, 'Must be atleast 20 characters')
        .max(100, 'too long'),
    confirmPass: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    firstname: Yup.string().required(),
    lastname: Yup.string().optional()

});

const Signup = (props) => {
    const classes = useStyles();

    const { handleChange, handleSubmit, errors, values } = useFormik({
        initialValues: props.initialValues ? props.initialValues : {
            email: '',
            password: '',
            confirmPass: '',
            firstname: '',
            lastname: '',
            aboutme: ''
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema,
        onSubmit: values => {
            console.log(values)
        }
    });

    return (
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Signup
        </Typography>
            <form noValidate
                className={classes.form}
                onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.fullwidth}
                            required
                            variant="outlined"
                            name="firstname"
                            label="First Name"
                            type="text"
                            onChange={handleChange}
                            defaultValue={values.firstname}
                        />
                        <p className={classes.errortext}>
                            {errors.firstname ? errors.firstname : null}
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className={classes.fullwidth}
                            variant="outlined"
                            name="lastname"
                            label="Last Name"
                            type="text"
                            onChange={handleChange}
                            defaultValue={values.lastname}
                        />
                        <p className={classes.errortext}>
                            {errors.lastname ? errors.lastname : null}
                        </p>
                    </Grid>
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

                    <Grid item xs={12}>
                        <TextareaAutosize
                            name="aboutme"
                            style={{ width: '100%', padding: '5px' }}
                            rowsMax={8}
                            rowsMin={3}
                            placeholder="About you"
                            value={values.aboutme}
                            onChange={handleChange}
                        />
                        <p className={classes.errortext}>
                            {errors.aboutme ? errors.aboutme : null}
                        </p>
                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            className={classes.fullwidth}
                            variant="outlined"
                            name="password"
                            label="Password"
                            type="password"
                            helperText="Must have atleast 8 characters long. Must have atleat 1 lowercase, 1 uppercase, 1 number and 1 symbol"
                            onChange={handleChange}
                            defaultValue={values.password}
                        />
                        <p className={classes.errortext}>
                            {errors.password ? errors.password : null}
                        </p>

                    </Grid>

                    <Grid item xs={12} >
                        <TextField
                            className={classes.fullwidth}
                            variant="outlined"
                            name="confirmPass"
                            label="Confirm Password"
                            type="password"
                            onChange={handleChange}
                            defaultValue={values.confirmPass}
                        />
                        <p className={classes.errortext}>
                            {errors.confirmPass ? errors.confirmPass : null}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="secondary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </div>

    );
};

export default Signup;
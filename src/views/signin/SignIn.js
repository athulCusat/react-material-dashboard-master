import React,{useState} from 'react';
import {auth} from "./firebase";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { EmailOutlined, ErrorRounded, LockOutlined } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © KWIL'}{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInBtn:{
    backgroundColor:"#2256a3",
    color:"white",
    marginBottom:"20px",
    marginTop:"20px",
    '&:hover': {
     backgroundColor:"#2e98d1"
      },
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = 
          (event,email, password) => {
              event.preventDefault();
              auth.signInWithEmailAndPassword(email, password).catch(error => {
                // TODO: Notify user about error
                console.error(error.code)
                switch(error.code)
               {
                   case 'auth/invalid-email' : 
                     setError('Please enter a valid email!')
                  return ;
                
                   case 'auth/wrong-password' : setError('Wrong password!')
                   return;
                
                   case 'auth/user-not-found' : setError('Email not registered')
                   return;
                   
                   default : setError(  'Oops. Could not log in. Try again')
                   return;
               }
  });
}
  const onChangeHandler = (event) => {
    setError(null)
    const {name, value} = event.currentTarget;
    if(name === 'userEmail') {
        setEmail(value);
    }
    else if(name === 'userPassword'){
      setPassword(value);
    }
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
          type = "email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userEmail"
            value = {email}
            placeholder="Email"
            id="userEmail"
            autoFocus
            onChange = {(event) => onChangeHandler(event)}
            error={error != null && email === ""}
            helperText={error != null && email === "" ? 'Email cannot be empty!' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailOutlined style={{ color: "grey" }}/>
                </InputAdornment>
              ),
            }}
          />
          <TextField
          type = "password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userPassword"
            value = {password}
            placeholder="Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
            error={error != null && password === ""}
            helperText={error != null && password === "" ? 'Password cannot be empty!' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockOutlined style={{ color: "grey" }}/>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button 
          fullWidth
          className={classes.signInBtn}
          onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
          >
            Sign In
         </Button>
         {error != null && password !== '' && email !== "" &&

<TextField type = "text"
value = {error}
variant="outlined"
            margin="normal"
            fullWidth
            error = {true}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ErrorRounded style={{ color: "red" }} />
                </InputAdornment>
              ),
            }}
            >
</TextField>
}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
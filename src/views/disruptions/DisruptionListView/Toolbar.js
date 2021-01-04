import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Input
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import React from "react";
import firebase from 'C:\Users\Chacko\Desktop\shortcuts\Cial\react-material-dashboard-master\src\views\signin\firebase.js'

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { firebaseConfig } from 'src/views/signin/firebase';
// Required for side-effects
require("firebase/firestore");
var serviceAccount = require("./serviceAccount.json");
firebase.initializeApp({
  // apiKey: "AIzaSyBriwSEzrQnePbE_3fiIB4r61QkQO-kRA8",
  // authDomain: "kwil-a2fc9.firebaseapp.com",
  databaseURL: "https://kwil-a2fc9.firebaseio.com",
  // projectId: "kwil-a2fc9",
  // storageBucket: "kwil-a2fc9.appspot.com",
  // messagingSenderId: "592156859177",
  // appId: "1:592156859177:web:ba9df431ee04420dab7538",
  // measurementId: "G-3LS9C5Z341",
  credential: firebase.credential.cert(serviceAccount)
});

var db = firebase.firestore();


const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));


const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
      
   <form
   id="fileform">
     
      <Input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        fullWidth
        required
      />
      <label htmlFor="contained-button-file">
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        color = "primary"
      >
        Add Disruptions
      </Button>
      </label>
      </form>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Disruptions"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
        </div>
    
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;

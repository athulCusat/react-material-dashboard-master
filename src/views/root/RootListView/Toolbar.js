import React from 'react';
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
  
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import * as React from 'react';


const fileStatuses = [
  'UploadFailed',
  'Initial',
  'Selected',
  'Uploading',
  'Uploaded',
  'RemoveFailed',
  'Removing'
];

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
          color="primary"
          variant="contained"
          variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        color = "primary"
        >
          
          Add Routes
        </Button>
        </label>
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
                placeholder="Search route Id"
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

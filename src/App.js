import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Container, CssBaseline, Typography, AppBar, Tab, Box, Tabs, Link } from '@material-ui/core'
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signupHandler = (values) => {
    console.log('signup:::> ', values);
    alert('signup successful');
  }

  const loginHandler = (values) => {
    console.log('login:::> ', values);
    alert('login successful');
  }

  const miscHandler = (values) => {
    console.log('misc:::> ', values);
    alert('misc successful');
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Sign-up" {...a11yProps(0)} />
          <Tab label="Login" {...a11yProps(1)} />
          <Tab label="Misc" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Signup submit={signupHandler} />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Login submit={loginHandler} />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Signup submit={miscHandler} />
        </Container>
      </TabPanel>

      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Link href="https://github.com/vishnuroshan/formik-forms-react" style={{ fontSize: '1.5rem', color: "white" }} onClick={(e) => e.preventDefault}>
          repository link
        </Link>
      </AppBar>
    </div>

  );
}

export default App;

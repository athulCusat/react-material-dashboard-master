import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import 'src/mixins/chartjs';
import UserProvider from './views/signin/UserProvider';
import Application from './views/signin/Application';

const App = () => {

  return (
   <UserProvider>
     <Application/>
   </UserProvider>
  );
};

export default App;

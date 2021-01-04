import React, {useContext} from "react";
import SignIn from "./SignIn";
import { Router } from "@reach/router";
import { UserContext } from "./UserProvider";
import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import theme from 'src/theme';
import routes from 'src/routes';
import { useRoutes } from 'react-router-dom';
function Application() {
  const routing = useRoutes(routes);
    const user = useContext(UserContext);
  return (
        user ?
        <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
      :
      <Router>
      <SignIn path="/" />
    </Router>

  );
}
export default Application;
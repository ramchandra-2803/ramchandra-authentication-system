import { Switch, Route } from "react-router-dom";

import NavBar from "./layouts/navbar";

import { Root } from "./root";

import SignUp from "./futures/signup";
import SignIn from "./futures/signin";

export default function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact={true} path={["/"]} render={() => <Root />} />
        <Route exact={true} path={["/signup"]} render={() => <SignUp />} />
        <Route exact={true} path={["/signin"]} render={() => <SignIn />} />
      </Switch>
    </>
  );
}

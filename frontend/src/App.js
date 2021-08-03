// import logo from './logo.svg';
// import './App.css';
import React,{useEffect} from 'react';
import SignUp from "./SignUp";
import "./SignUp.css";
import "./signin.css";

import Signin from "./Signin";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Route, Switch,useHistory,Redirect } from "react-router-dom";

import Userprofile from './Userprofile';
// import ReactTable from "react-table";

const Routing = () => {
  const history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem("token"))
    {
      history.push("/login");
    }
  }, [localStorage.getItem("token")]);

  return (
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Signin />
        </Route>
        <Route exact path="/">
          <Userprofile />
        </Route>
      </Switch>
  );
}

function App() {

  return (
         <React.Fragment>
        <Router>
          <Routing/>
          <ToastContainer />
        </Router>
    </React.Fragment>
  );
}

export default App;

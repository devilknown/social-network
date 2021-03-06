import React from 'react';
import Home from '../home';
import User from "../user";
import Post from "../post/getAll-post";
import CreatePost from "../post/create-post";
import Profile from "../user/profile";
import NavBar from "../nav";
import SignUp from "../signup";
import SignIn from "../signin";
import SignOut from "../signout";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { connect } from "react-redux";

const Router = (props) => {

  // const { _id } = props.r_user.single_user;

  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/post" component={Post} />
        <Route exact path="/post/create" component={CreatePost} />
        {/* <Route exact path="/user/profile" component={AdminProfile} /> */}
        <Route exact path="/user/:id" component={Profile} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  r_user: state.r_user,
});
export default connect(mapStateToProps, { })(Router);
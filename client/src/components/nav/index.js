import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";

import { connect } from "react-redux";
import { ac_userAuthentication } from "../../redux/actions-creator/user";
  
import { toast } from 'react-toastify';
toast.configure();

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site_name: "<{ AR }>",
      isOpen: false,
    };
    
  }
  
  componentDidMount = () => {
    // console.log("IS Authenticated: " , this.props.r_boolean.isAuthenticated);
    this.props.history.push(this.props.location.path);
  }
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  isActive = (path, url) => {
    return path === url && "active";
  }

  render() {
    const { pathname: path } = this.props.location;
    const { isAuthenticated } = this.props.r_boolean;
    const { _id, name } = this.props.r_user.user;

    return (
        <MDBNavbar color="blue-gradient" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">{this.state.site_name}</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active={this.isActive(path, "/")}>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              { 
                isAuthenticated ?
                <React.Fragment>
                  <MDBNavItem active={this.isActive(path, "/user")}>
                    <MDBNavLink to="/user">Users</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.isActive(path, "/post")}>
                    <MDBNavLink to="/post">Posts</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        { name }
                      </MDBDropdownToggle>
                      <MDBDropdownMenu>
                        <MDBDropdownItem>
                          <MDBNavLink className="blue-text" to={`/user/${_id}`}>Your profile</MDBNavLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavLink className="blue-text" to={`/post/create`}>Create post</MDBNavLink>
                        </MDBDropdownItem>
                        <MDBDropdownItem>
                          <MDBNavLink className='blue-text' to="/signout">Sign Out</MDBNavLink>
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </React.Fragment>
                  :
                <React.Fragment>
                  <MDBNavItem active={this.isActive(path, "/signin")}>
                    <MDBNavLink to="/signin">Sign In</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.isActive(path, "/signup")}>
                    <MDBNavLink to="/signup">Register</MDBNavLink>
                  </MDBNavItem>
                </React.Fragment>
              }
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      );
    }
  }

const mapStateToProps = (state) => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean,
});
export default connect(mapStateToProps, { ac_userAuthentication })(withRouter(NavBar))
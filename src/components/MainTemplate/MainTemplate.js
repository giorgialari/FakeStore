import React, { Component } from "react";
import Header from "./Navbar";
import "../MainTemplate/MainTemplate.css";

export class MainTemplate extends Component {
  render() {
    return (
      <div>
        <Header>{this.props.children}</Header>
      </div>
    );
  }
}

export default MainTemplate;

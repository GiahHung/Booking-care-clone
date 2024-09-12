import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class HomePageFooter extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-content-2">
            <h1>About Us</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis porro eveniet voluptas. Saepe voluptate.
            </p>
          </div>

          <div className="footer-content-2">
            <h1>
              Contact <span>Us</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis porro eveniet voluptas. Saepe voluptat.
            </p>
          </div>

          <div className="footer-content-2">
            <h1>
              Opening <span>Hours</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis porro eveniet voluptas. Saepe voluptate.
            </p>
          </div>
        </div>
        <div className="footer-copy-right">
          <p>
            Copyright @ 2024 AceWevdev ||Provide by
            <span> AceWebdev</span>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageFooter);

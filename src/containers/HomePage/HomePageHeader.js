import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./HomePageHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

class HomePageHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };
  returnHome = () => {
    this.props.history.push(`/home`)
  }
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.0/css/all.css"
        />
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-bars"></i>

              <div className="logo" onClick={() => {this.returnHome()}}></div>
            </div>
            <div className="middle-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.specialty" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.searchDoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.Choose-hospital" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.choose-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.Check-up-package" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i class="fas fa-question-circle"></i>
                <FormattedMessage id="homeHeader.support" />
              </div>
              <div className="language">
                <div
                  className={
                    language === LANGUAGES.VI ? "flag-vn active" : "flag-vn"
                  }
                >
                  <span
                    onClick={() => {
                      this.changeLanguage(LANGUAGES.VI);
                    }}
                  >
                    VN
                  </span>
                </div>
                <div className=""> / </div>
                <div
                  className={
                    language === LANGUAGES.EN ? "flag-en active" : "flag-en"
                  }
                >
                  <span
                    onClick={() => {
                      this.changeLanguage(LANGUAGES.EN);
                    }}
                  >
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner == true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div>
                <div className="search">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.option1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.option2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.option3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.option4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.option5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="text">
                    <FormattedMessage id="banner.option6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePageHeader));

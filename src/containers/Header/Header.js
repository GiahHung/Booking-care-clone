import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import { DiagnosticCategory } from "typescript";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.admin) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.doctor) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu
    })
    // console.log('check login:',this.props.userInfo)
  }
  changeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    // console.log(userInfo)

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        {/* ngon ngu */}
        <div className="right-content">
          <div className="language">
            <span className="welcome">
              <FormattedMessage id={"homeHeader.welcome"} />,{" "}
              <span className="welcome-name">
                {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
              </span>
            </span>
            <span
              onClick={() => {
                this.changeLanguage(LANGUAGES.VI);
              }}
              className={
                language === LANGUAGES.VI ? "language-vi active" : "language-vi"
              }
            >
              VN
            </span>

            <span className=""> / </span>

            <span
              onClick={() => {
                this.changeLanguage(LANGUAGES.EN);
              }}
              className={
                language === LANGUAGES.EN ? "language-en active" : "language-en"
              }
            >
              EN
            </span>
          </div>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log in"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

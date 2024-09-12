import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HomePageHeader from "../../HomePage/HomePageHeader";
import "./DetailDoctor.scss";
import { getDetailDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import HomePageFooter from "../../HomePage/HomePageFooter";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctorArr: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailDoctor(id);
      if (res && res.errCode == 0) {
        this.setState({
          detailDoctorArr: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    console.log("asasas", this.state);
    let { detailDoctorArr } = this.state;
    let nameEn = "",
      nameVi = "";
    let { language } = this.props;
    if (detailDoctorArr && detailDoctorArr.positionData) {
      nameVi = `${detailDoctorArr.positionData.valueVi}, ${detailDoctorArr.lastName} ${detailDoctorArr.firstName}`;
      nameEn = `${detailDoctorArr.positionData.valueEn}, ${detailDoctorArr.lastName} ${detailDoctorArr.firstName}`;
    }

    return (
      <>
        <HomePageHeader isShowBanner={false} />
        <div className="doctor-container">
          <div className="intro-doctor">
            <div className="content-left">
              <div
                className="image"
                style={{ backgroundImage: `url(${detailDoctorArr.image})` }}
              ></div>
            </div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctorArr.MarkDown &&
                  detailDoctorArr.MarkDown.description && (
                    <span>{detailDoctorArr.MarkDown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule"></div>
          <div className="info-doctor">
            {detailDoctorArr &&
              detailDoctorArr.MarkDown &&
              detailDoctorArr.MarkDown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctorArr.MarkDown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment"></div>
          <HomePageFooter/>
        </div>
        
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

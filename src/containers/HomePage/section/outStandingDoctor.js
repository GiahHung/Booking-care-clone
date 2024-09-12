import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorArr: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctor !== this.props.topDoctor) {
      this.setState({
        doctorArr: this.props.topDoctor,
      });
    }
  }

  handleDetailDoctor = (doctor) => {
    console.log("check detail:", doctor)
    this.props.history.push(`/detail-doctor/${doctor.id}`)
  }

  render() {
    console.log(this.props.topDoctor);
    let doctorArr = this.state.doctorArr;
    let language = this.props.language;
    return (
      <div className="section-share section-outStanding-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section section-outStanding-doctor">
              <FormattedMessage id="home-slider.outstanding-doctor"/>
            </span>
            <button className="btn-section"> <FormattedMessage id="home-slider.see-more"/></button>
          </div>
          <Slider {...this.props.settings}>
            {doctorArr &&
              doctorArr.length > 0 &&
              doctorArr.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                return (
                  <div className="img-customize" key={index} onClick={() => {this.handleDetailDoctor(item)}}>
                    <div className="section-img section-img-doctor">
                      <div className="img"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div className="section-content">
                        {language === LANGUAGES.VI ? nameVi : nameEn}
                      </div>
                      <div className="section-content-2">Thần kinh</div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctor: state.admin.topDoctor,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));

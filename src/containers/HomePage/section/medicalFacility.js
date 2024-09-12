import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import MedicalFacilityImg from "../../../assets/medicalFacility/083122lo-go-viet-duc.jpg";
import { FormattedMessage } from "react-intl";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section"> <FormattedMessage id="home-slider.see-more"/></button>
          </div>
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <div className="section-img">
                <img src={MedicalFacilityImg} />
                <div className="section-content">Bệnh viện Hữu nghị Việt Đức 1</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={MedicalFacilityImg} />
                <div className="section-content">Bệnh viện Hữu nghị Việt Đức 2</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={MedicalFacilityImg} />
                <div className="section-content">Bệnh viện Hữu nghị Việt Đức 3</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={MedicalFacilityImg} />
                <div className="section-content">Bệnh viện Hữu nghị Việt Đức 4</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={MedicalFacilityImg} />
                <div className="section-content">Bệnh viện Hữu nghị Việt Đức 5</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={MedicalFacilityImg} />
                <div className="section-content">Bệnh viện Hữu nghị Việt Đức 6</div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);

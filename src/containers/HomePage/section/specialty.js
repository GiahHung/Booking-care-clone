import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import SpecialtyImg from "../../../assets/specialty/101627-co-xuong-khop.png";
class Specialty extends Component {
  render() {
   
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section"> <FormattedMessage id="home-slider.see-more"/></button>
          </div>
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <div className="section-img">
                <img src={SpecialtyImg} />
                <div className="section-content">Cơ xương khớp 1</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={SpecialtyImg} />
                <div className="section-content">Cơ xương khớp 2</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={SpecialtyImg} />
                <div className="section-content">Cơ xương khớp 3</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={SpecialtyImg} />
                <div className="section-content">Cơ xương khớp 4</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={SpecialtyImg} />
                <div className="section-content">Cơ xương khớp 5</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img">
                <img src={SpecialtyImg} />
                <div className="section-content">Cơ xương khớp 6</div>
              </div>
            </div>
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);

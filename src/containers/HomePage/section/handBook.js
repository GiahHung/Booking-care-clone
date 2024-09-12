import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";

import HandBookImg from "../../../assets/HandBook/090626-benh-vien-tu-nhan-chua-benh-tieu-hoa-uy-tin.png";
class HandBook extends Component {
  render() {
   
    return (
      <div className="section-share section-hand-book">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cẩm nang</span>
            <button className="btn-section"> <FormattedMessage id="home-slider.see-more"/></button>
          </div>
          <Slider {...this.props.settings}>
            <div className="img-customize">
              <div className="section-img section-hand-book">
                <img src={HandBookImg} />
                <div className="section-content section-hand-book">6 bệnh viện, phòng khám tư nhân khám chữa bệnh Tiêu hóa uy tín Hà Nội 1</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img section-hand-book">
                <img src={HandBookImg} />
                <div className="section-content section-hand-book">6 bệnh viện, phòng khám tư nhân khám chữa bệnh Tiêu hóa uy tín Hà Nội 2</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img section-hand-book">
                <img src={HandBookImg} />
                <div className="section-content section-hand-book">6 bệnh viện, phòng khám tư nhân khám chữa bệnh Tiêu hóa uy tín Hà Nội 3</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img section-hand-book">
                <img src={HandBookImg} />
                <div className="section-content section-hand-book">6 bệnh viện, phòng khám tư nhân khám chữa bệnh Tiêu hóa uy tín Hà Nội 4</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img section-hand-book">
                <img src={HandBookImg} />
                <div className="section-content section-hand-book">6 bệnh viện, phòng khám tư nhân khám chữa bệnh Tiêu hóa uy tín Hà Nội 5</div>
              </div>
            </div>
            <div className="img-customize">
              <div className="section-img section-hand-book">
                <img src={HandBookImg} />
                <div className="section-content section-hand-book">6 bệnh viện, phòng khám tư nhân khám chữa bệnh Tiêu hóa uy tín Hà Nội 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);

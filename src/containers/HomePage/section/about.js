import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-content">
          <div className="about-title">
            <div>Giới thiệu về BookingCare</div>
            <hr></hr>
          </div>
          <div className="about-content">
            <div className="section-content-left">
              <iframe
                width="80%"
                height="400px"
                src="https://www.youtube.com/embed/147SkAVXEqM?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI"
                title="#51 Kết Thúc Design Giao Diện Clone BookingCare.vn 4 | React.JS Cho Người Mới Bắt Đầu"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="section-content-right">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reiciendis porro eveniet voluptas. Saepe voluptat. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Reiciendis porro
                eveniet voluptas. Saepe voluptat. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Reiciendis porro eveniet voluptas.
                Saepe voluptat. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Reiciendis porro eveniet voluptas. Saepe
                voluptat. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Reiciendis porro eveniet voluptas. Saepe voluptat. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
                porro eveniet voluptas. Saepe voluptat.
              </p>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

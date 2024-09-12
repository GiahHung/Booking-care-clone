import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePageHeader from './HomePageHeader';
import Specialty from './section/specialty';
import MedicalFacility from './section/medicalFacility';
import OutStandingDoctor from './section/outStandingDoctor';
import HandBook from './section/handBook';
import About from './section/about';
import HomePageFooter from './HomePageFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };
        return (
            <div>
                <HomePageHeader isShowBanner={true}/>
                <Specialty settings={settings}/>
                <MedicalFacility settings={settings}/>
                <OutStandingDoctor settings={settings}/>
                <HandBook settings={settings}/>
                <About/>
                <HomePageFooter/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

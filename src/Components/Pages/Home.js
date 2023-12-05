import React, { useEffect, useState } from "react";
import "../assets/css/web.css";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
// import "swiper/swiper.min.css";
import img1 from '../assets/images/bg_1.jpg.webp';
import img2 from '../assets/images/bg_2.jpg.webp';
import img3 from '../assets/images/bg_3.jpg.webp';
import about_img from '../assets/images/about.jpg.webp';
import Tabs from 'react-bootstrap/Tabs'; 
import Tab from 'react-bootstrap/Tab'; 
import News from "../Data/News";

const Home = () => {
  const { t, i18n } = useTranslation();
  const TITLE = "Coffee | Home";

  const Iced = News.Iced
  const Hot = News.Hot
  const Drinks = News.Drinks
  const Desserts = News.Desserts
  const Food = News.Food


  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="header">
        <Swiper pagination={true} modules={[Pagination, Autoplay]} autoplay={{
            "delay": 2500,
            "disableOnInteraction": false
          }} 
          className="mySwiper">
          <SwiperSlide>
            <div className="slider-bg"
                style={{ backgroundImage: `linear-gradient(#00000099, #00000099), url(${img3})` }} >
                <div>
                  <span>{t("welcome")}</span>
                  <h2>{t("slider_1_h2")}</h2>
                  <p>{t("slider_1_p")}</p>
                </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider-bg"
                style={{ backgroundImage: `linear-gradient(#00000099, #00000099), url(${img2})` }} >
              <span>{t("welcome")}</span>
              <h2>{t("slider_1_h2")}</h2>
              <p>{t("slider_1_p")}</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slider-bg"
                style={{ backgroundImage: `linear-gradient(#00000099, #00000099), url(${img1})` }} >
              <span>{t("welcome")}</span>
              <h2>{t("slider_1_h2")}</h2>
              <p>{t("slider_1_p")}</p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="header-details en">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="d-flex">
                  <i className="fa fa-phone"></i>
                  <div className="">
                    <span>01154258770</span>
                    <p>{t("phone_dis")}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex">
                  <i className="fa fa-map"></i>
                  <div className="">
                    <span>198 West 21th Street</span>
                    <p>{t("map_dis")}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-flex">
                  <i className="fa fa-clock"></i>
                  <div className="">
                    <span>Open Monday-Friday</span>
                    <p>{t("clock_dis")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about en">
        <div className="row">
          <div className="col-md-6">
            <img src={about_img} alt="about" />
          </div>
          <div className="col-md-6">
            <div className="about-bg">
              <span>{t("discovery")}</span>
              <h2>{t("about_h2")}</h2>
              <p>{t("about_p")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="order en">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="easy">
                <i className="fa fa-rectangle-list"></i>
                <h2>{t("order_1_h2")}</h2>
                <p>{t("order_1_p")}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="easy">
                <i className="fa fa-truck-moving"></i>
                <h2>{t("order_2_h2")}</h2>
                <p>{t("order_2_p")}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="easy">
                <i className="fa fa-mug-hot"></i>
                <h2>{t("order_3_h2")}</h2>
                <p>{t("order_3_p")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="menu en">
        <div className="container">
          <div className="menu_div">
            <span>{t("discovery")}</span>
            <h2>{t("menu_h2")}</h2>
            <p>{t("menu_p")}</p>
          </div>
          <Tabs defaultActiveKey="Iced" className=""> 
            <Tab eventKey="Iced" title={t("Iced")}> 
              <div className="row">
                {Iced.map((x, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="drink">
                        <img src={x.src} alt="coffee"/>
                        <div className="w-100 d-flex flex-column mt-2">
                          <h3>{x.header} <span>{x.price} EGP</span></h3>
                          <p>{x.dis}</p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </Tab> 
            <Tab eventKey="Hot" title={t("Hot")}> 
                {Hot.map((x, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="drink">
                        <img src={x.src} alt="coffee"/>
                        <div className="w-100 d-flex flex-column mt-2">
                          <h3>{x.header} <span>{x.price} EGP</span></h3>
                          <p>{x.dis}</p>
                        </div>
                      </div>
                    </div>
                ))}
            </Tab> 
            <Tab eventKey="Drinks" title={t("Drinks")}> 
                {Drinks.map((x, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="drink">
                        <img src={x.src} alt="coffee"/>
                        <div className="w-100 d-flex flex-column mt-2">
                          <h3>{x.header} <span>{x.price} EGP</span></h3>
                          <p>{x.dis}</p>
                        </div>
                      </div>
                    </div>
                ))}
            </Tab> 
            <Tab eventKey="Desserts" title={t("Desserts")}> 
                {Desserts.map((x, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="drink">
                        <img src={x.src} alt="coffee"/>
                        <div className="w-100 d-flex flex-column mt-2">
                          <h3>{x.header} <span>{x.price} EGP</span></h3>
                          <p>{x.dis}</p>
                        </div>
                      </div>
                    </div>
                ))}
            </Tab> 
            <Tab eventKey="Food" title={t("Food")}> 
                {Food.map((x, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="drink">
                        <img src={x.src} alt="coffee"/>
                        <div className="w-100 d-flex flex-column mt-2">
                          <h3>{x.header} <span>{x.price} EGP</span></h3>
                          <p>{x.dis}</p>
                        </div>
                      </div>
                    </div>
                ))}
            </Tab> 
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useRef, useEffect, useState } from "react";
import "../assets/css/web.css"
import { Helmet } from "react-helmet";
import bg1 from "../assets/images/6bxva8DmZvNj8kaVrQZZMP.jpg"
import useScrollSpy from 'react-use-scrollspy';
import { useTranslation } from "react-i18next";
// import video from "https://www.youtube.com/embed/ug50zmP9I7s"
import "../translations/i18n";
import Axios from "../../Axios";
import Config from "../../Config";
import Swal from "sweetalert2";

const About = () => {
    const { t, i18n } = useTranslation();
    const [aboutData, setAboutData] = useState({})
    const entity_url = `${Config.apiBaseUrl}/about`
    const abortController = new AbortController()
    let mounted = true
    const TITLE = "Suez Steel | About"; 

    useEffect(() => {
        document.body.classList.remove('pro');
        document.body.classList.remove('pro-nav');
        document.body.classList.remove('blog-nav');

        Axios
            .get(`${entity_url}`, {
                signal: abortController.signal
            })
            .then((response) => {
                setAboutData(response.data.data);
                mounted = false
            })
            .catch((err) => {
                const error = { ...err }
                if (error?.response?.data?.message) Swal.fire({icon: 'error', text: error?.response?.data?.message, title: t("Error"), confirmButtonText: t('Ok')});
            });

        return function () {
            if (!mounted) abortController.abort()
            }
    }, []);

    const sectionRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const activeSection = useScrollSpy({
        sectionElementRefs: sectionRefs,
        offsetPx: -80,
    });

    return (
        <div>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="utility" style={{ backgroundImage: `url(${bg1})` }}>
                <h1>{t("About_solb_misr")}</h1>
            </div>
            <div className="file">
                <div className="container">
                    <div className="">
                        <nav className="App-navigation ar">
                            <a href="#one" className={activeSection === 0 ? "App-navigation-item App-navigation-item--active" : "App-navigation-item"}>{t("company_file")}</a>
                            <a href="#two" className={activeSection === 1 ? "App-navigation-item App-navigation-item--active" : "App-navigation-item"}>{t("company_history")}</a>
                            <a href="#three" className={activeSection === 2 ? "App-navigation-item App-navigation-item--active" : "App-navigation-item"}>{t("company_massage")}</a>
                            <a href="#four" className={activeSection === 3 ? "App-navigation-item App-navigation-item--active" : "App-navigation-item"}>{t("company_team")}</a>
                        </nav>

                        <section className="App-section" id="one" ref={sectionRefs[0]}>
                            <div className="about ar">
                                <div className="about-div">
                                    <span>
                                        <div className="dots"></div>
                                        {t("company_file")}
                                    </span>
                                    <h2>{ aboutData?.company_profile?.title }</h2>
                                    <div dangerouslySetInnerHTML={{__html: aboutData?.company_profile?.description}} />
                                    <img style={{width: '100%', height: '400px'}} alt={ aboutData?.company_profile?.title } src={ aboutData?.company_profile?.cover_image }/>
                                </div>
                            </div>
                        </section>
                        <section className="App-section" id="two" ref={sectionRefs[1]}>
                            <div className="history ar">
                                <span>
                                    <div className="dots"></div>
                                    { t("company_history") }
                                </span>
                                <h2>{ aboutData?.histories?.length > 0 ? aboutData?.histories[0]?.title : "" }</h2>
                                <div dangerouslySetInnerHTML={{__html: aboutData?.histories?.length > 0 ? aboutData?.histories[0]?.description : ""}} />
                                <ul>
                                    {
                                        aboutData?.histories?.map((history, index) => {
                                            return index === 0 ? '' : (
                                                <li>
                                                    <h3>{ history?.title }</h3>
                                                    <div dangerouslySetInnerHTML={{__html: history?.description}} />
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </section>
                        <section className="App-section" id="three" ref={sectionRefs[2]}>
                            <div className="history ar">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <span><div className="dots"></div>{t("company_massage")}</span>
                                    </div>
                                    {
                                        aboutData?.sections?.map((section, index) => {
                                            return index % 2 === 0 ? 
                                            (
                                                <>
                                                    <div className="col-md-6">
                                                        <img src={section?.image} alt={section?.name} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="vision">
                                                            <h2> { section?.name } </h2>
                                                            <div dangerouslySetInnerHTML={{__html: section?.description}} />
                                                        </div>
                                                    </div>
                                                </>
                                            ) :
                                            (
                                                <>
                                                    <div className="col-md-6">
                                                        <div className="vision">
                                                            <h2> { section?.name } </h2>
                                                            <div dangerouslySetInnerHTML={{__html: section?.description}} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <img src={section?.image} alt={section?.name} />
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                        <section className="App-section" id="four" ref={sectionRefs[3]}>
                            <div className="team ar">
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <span><div className="dots"></div>{t("company_team")}</span>
                                    </div>
                                    <div className="col-md-12">
                                        <h2>{t("team_h2")}</h2>
                                    </div>
                                    {
                                        aboutData?.teamwork?.map(teamwork => {
                                            return (
                                                <div className="col-md-4">
                                                    <div className="card">
                                                        <img src={teamwork?.image} className="card-img-top" alt={teamwork?.name} />
                                                        <div className="card-body">
                                                            <h5 className="card-title"> {teamwork?.name} </h5>
                                                            <p className="card-text"> {teamwork?.title} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
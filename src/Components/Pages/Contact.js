import React, { useEffect, useState } from "react";
import "../assets/css/web.css"
import bg1 from "../assets/images/what-is-graphic-design.jpg"
import ContactForm from "../Form/contactForm"
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import 'react-phone-input-2/lib/style.css'
import { Helmet } from "react-helmet";

const Contact = () => {
    const { t, i18n } = useTranslation();
    const [settings, setSettings] = useState([]);
    let mounted = true;
    const TITLE = "Suez Steel | Contact"; 

    const abortController = new AbortController();
    const loadData = () => {
      const storedSettings = JSON.parse(localStorage.getItem("settings"));
      setSettings(storedSettings);
      mounted = false;
    };

    useEffect(() => {
        document.body.classList.remove('pro');
        document.body.classList.remove('pro-nav');
        document.body.classList.remove('blog-nav');
        loadData();
        return function () {
          if (!mounted) abortController.abort();
        };
    }, []);

    return (
      <div>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
        <div className="utility" style={{ backgroundImage: `url(${bg1})` }}>
          <h1>{t("Contact")}</h1>
        </div>
        <div className="contact ar">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <ContactForm />
              </div>
              <div className="col-md-6">
                <div className="visit">
                  <div className="row">
                    <div className="col-md-12">
                      <h2>{t("visit")}</h2>
                    </div>
                    <div className="col-md-4">
                      <div className="factor">
                        <i className="fa-solid fa-envelope"></i>
                        <a
                          href={`mailto:${settings["contact_us_email"]}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {settings["contact_us_email"]}
                        </a>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="factor">
                        <i className="fa-solid fa-phone"></i>
                        {settings["sales_phone_1"] !== "" ? (
                          <p>
                            <span>{t("Sales")}</span>
                            <br />
                            {settings["sales_phone_1"]
                              ?.split(" - ")
                              .map((item, index) => (
                                <span key={index}>
                                  <a href={`tel:${item}`}>{item}</a>
                                  {index !==
                                    settings["sales_phone_1"]?.split(" - ")
                                      .length -
                                      1 && <span>&nbsp; - &nbsp;</span>}
                                </span>
                              ))}
                          </p>
                        ) : (
                          ""
                        )}
                        {settings["sales_phone_2"] !== "" ? (
                          <p>
                            <span>{t("Sales")}</span>
                            <br />
                            {settings["sales_phone_2"]
                              ?.split(" - ")
                              .map((item, index_1) => (
                                <span key={index_1}>
                                  <a href={`tel:${item}`}>{item}</a>
                                  {index_1 !==
                                    settings["sales_phone_2"]?.split(" - ")
                                      .length -
                                      1 && <span>&nbsp; - &nbsp;</span>}
                                </span>
                              ))}
                          </p>
                        ) : (
                          ""
                        )}
                        {settings["factory_office_phone_1"] !== "" ? (
                          <p>
                            <span>{t("Factory")}</span>
                            <br />
                            {settings["factory_office_phone_1"]
                              ?.split(" - ")
                              .map((item, index_2) => (
                                <span key={index_2}>
                                  <a href={`tel:${item}`}>{item}</a>
                                  {index_2 !==
                                    settings["factory_office_phone_1"]?.split(
                                      " - "
                                    ).length -
                                      1 && <span>&nbsp; - &nbsp;</span>}
                                </span>
                              ))}
                          </p>
                        ) : (
                          ""
                        )}
                        {settings["factory_office_phone_2"] !== "" ? (
                          <p>
                            <span>{t("Factory")}</span>
                            <br />
                            {settings["factory_office_phone_2"]
                              ?.split(" - ")
                              .map((item, index_3) => (
                                <span key={index_3}>
                                  <a href={`tel:${item}`}>{item}</a>
                                  {index_3 !==
                                    settings["factory_office_phone_2"]?.split(
                                      " - "
                                    ).length -
                                      1 && <span>&nbsp; - &nbsp;</span>}
                                </span>
                              ))}
                          </p>
                        ) : (
                          ""
                        )}
                        {settings["factory_office_phone_3"] !== "" ? (
                          <p>
                            <span>{t("Factory")}</span>
                            <br />
                            {settings["factory_office_phone_3"]
                              ?.split(" - ")
                              .map((item, index_4) => (
                                <span key={index_4}>
                                  <a href={`tel:${item}`}>{item}</a>
                                  {index_4 !==
                                    settings["factory_office_phone_3"]?.split(
                                      " - "
                                    ).length -
                                      1 && <span>&nbsp; - &nbsp;</span>}
                                </span>
                              ))}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="factor">
                        <i className="fa-solid fa-location-dot"></i>
                        <span className="text-white">
                          {settings["contact_us_address_" + i18n.language]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Contact;
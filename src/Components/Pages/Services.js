import axios from "../../Axios";
import Config from "../../Config";
import React, { useEffect, useState } from "react";
import "../assets/css/web.css";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { Link } from "react-router-dom";
import bg1 from "../assets/images/6bxva8DmZvNj8kaVrQZZMP.jpg";
import Subscribe from "./Subscribe";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Services = () => {
  const { t, i18n } = useTranslation();
  const entity_url = `${Config.apiBaseUrl}/services`;
  let [services, setServices] = useState([]);
let mounted = true;
    const TITLE = "Suez Steel | Services"; 

const abortController = new AbortController();
  const loadData = () => {
    axios
      .get(`${entity_url}`, {
        signal: abortController.signal,
      })
      .then((response) => {
        setServices(response.data.data.services);
         mounted = false;
      })
      .catch((err) => {
        const error = { ...err }
        if (error?.response?.data?.message) Swal.fire({icon: 'error', text: error?.response?.data?.message, title: t("Error"), confirmButtonText: t('Ok')});
      });
  };

  useEffect(() => {
    document.body.classList.remove("pro");
    document.body.classList.remove("pro-nav");
        document.body.classList.remove('blog-nav');
    loadData();
    return function () {
      if (!mounted) abortController.abort();
    };
  }, [setServices, entity_url, i18n.language]);

  return (
    <div>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
      <div className="utility" style={{ backgroundImage: `url(${bg1})` }}>
        <p>
          <Link to="/home">{t("home")}</Link> / <span>{t("Services")}</span>
        </p>
        <h1>{t("Services")}</h1>
      </div>
      <div className="orders ar">
        <div className="container">
          {services.map((service, index) => (
            <div className="row mb-4" key={index}>
              <div className="col-md-6">
                <div className="py-4 mb-4">
                  <h2>{service.name}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: service.description,
                    }}
                  />
                  <Link to={`/orders/service/${service.id}`} className="new-order">
                    {t("new_order")} <i className="fa fa-chevron-left"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <img src={service.image} alt={service.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Subscribe />
    </div>
  );
};

export default Services;

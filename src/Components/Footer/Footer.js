import axios from "../../Axios";
import Config from "../../Config";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/images/logo.png";
import "../translations/i18n";
import "../assets/css/footer.css";
import Swal from "sweetalert2";

function Footer() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState([]);
  const entity_url = `${Config.apiBaseUrl}/newsletter`;
  const [email, setEmail] = useState("");
  const [error, setError] = useState([]);
  let mounted = true;

  const abortController = new AbortController();
  const loadData = () => {
    const storedSettings = JSON.parse(localStorage.getItem("settings"));
    setSettings(storedSettings);
    mounted = false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    if (Config.validateEmail(email)) {
      axios
        .post(entity_url, formData)
        .then((res) => {
          setEmail("");
          setError("");
          Swal.fire({
            position: "center",
            icon: "success",
            title: t("success"),
            text: res.data.message,
            showConfirmButton: true,
            confirmButtonText: t("Ok"),
            timer: 1500,
          });
        })
        .catch((err) => {
          const error = { ...err },
            response = error.response.data;
          setError(JSON.stringify(response.errors.email));
          if (response.message)
            Swal.fire({
              position: "center",
              icon: "error",
              title: t("error"),
              text: response.message,
              showConfirmButton: true,
              confirmButtonText: t("Ok"),
              timer: 1500,
            });
        });
    } else {
      setError(t("validEmail"));
    }
  };

  useEffect(() => {
    loadData();
    return function () {
      if (!mounted) abortController.abort();
    };
  }, []);
  return (
    <footer>
      <div className="footer ar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="nav-logo">
                <Link to="/home">
                  <img src={Logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <p>{settings["footer_message_" + i18n.language] ?? ""}</p>
                <Link to="/Services" className="request">
                  {t("Request")} <i className="fa fa-arrow-left"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-1">
              <div className="footer-links">
                <h2>{t("Products")}</h2>
                <ul>
                  {settings["products"]?.map((product, index) => (
                    <li key={index}>
                      <Link to={`/orders/product/${product?.id}`}>
                        {product?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-1">
              <div className="footer-links">
                <h2>{t("Services")}</h2>
                <ul>
                  {settings["services"]?.map((product, index) => (
                    <li key={index}>
                      <Link to={`/orders/service/${product?.id}`}>
                        {product?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-1">
              <div className="footer-links">
                <h2>{t("company")}</h2>
                <ul>
                  <li>
                    <Link to="/About">{t("about")}</Link>
                  </li>
                  <li>
                    <Link to="/Blogs">{t("All_news")}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <div className="footer-news">
                <h2>{t("Newsletter")}</h2>
                <p>{t("Subscribe")}</p>
                <form>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder={t("email")}
                      className="form-control"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="arrow-left" onClick={handleSubmit}>
                      <i className="fa fa-arrow-left"></i>
                    </button>
                  </div>
                  {error && <span className="text-danger">{error}</span>}
                </form>
                <p>
                  {t("question")} <Link to="/Contact">{t("Click")}</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right">
        <div className="container">
          {/* <p>{t("copyRight")}</p> */}
          <div className="copy-right-div">
            <Link to="/terms">{t("term")}</Link>
            <p>&nbsp; - &nbsp;</p>
            <Link to="/policy">{t("privacy")}</Link>
            {/* <p>&nbsp; - &nbsp;</p>
              <Link to="/About">{t("about")}</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

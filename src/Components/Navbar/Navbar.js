import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "../assets/images/logo-light.png";
import "../translations/i18n";
import "../assets/css/Navbar.css";

function Navbar() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    detectLang();
  }, []);

  const [lang, setLang] = useState("");
  const detectLang = () => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setLang(lang);
      setValue(lang);
      changeLayout(lang);
      i18n.changeLanguage(lang);
    } else {
      localStorage.setItem("lang", "ar");
      setLang("ar");
      setValue("ar");
      changeLayout("ar");
      i18n.changeLanguage("ar");
    }
  };

  const [value, setValue] = useState(lang);
  const handleOnclick = (lang) => {
    const __lang = lang === "ar" ? "ar" : "en";

    localStorage.setItem("lang", __lang);

    setLang(__lang);
    setValue(__lang);
    window.location.reload();
  };

  const changeLayout = (lang) => {
    if (lang === "ar") {
      document.querySelectorAll(".en").forEach((el) => {
        el.classList.add("ar");
        el.classList.remove("en");
      });
    } else {
      document.querySelectorAll(".ar").forEach((el) => {
        el.classList.add("en");
        el.classList.remove("ar");
      });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="navbar ar">
      <div className="container">
        <div className="nav">
          <div className="nav-right">
            <div className="nav-logo">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
              <a
                className="bars"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                href="#!"
                onClick={handleShow}
              >
                <i className="fa fa-bars"></i>
              </a>
            </div>
            <div className="nav-links">
              <NavLink to="/" activeclassname="active" className="nav-item">
                {t("home")}
              </NavLink>
              <NavLink to="/About" activeclassname="active" className="nav-item">
                {t("About")}
              </NavLink>
              <NavLink to="/Products" activeclassname="active" className="nav-item">
                {t("Products")}
              </NavLink>
              <NavLink to="/Services" activeclassname="active" className="nav-item">
                {t("Services")}
              </NavLink>
              <NavLink to="/Contact" activeclassname="active" className="nav-item">
                {t("Contact")}
              </NavLink>
            </div>
          </div>
          <div className="nav-left">
            <div className="d-flex justify-content-between align-items-center">
              <select
                defaultValue={localStorage.getItem("lang")}
                onChange={(e) => {
                  handleOnclick(lang === "ar" ? "en" : "ar");
                }}
                className="nav-item dropdown language-select" >
                <option value="en" className="nav-item">EN 🇺🇸</option>
                <option value="ar" className="nav-item">
                  العربية 🇪🇬
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <Offcanvas.Title>
            <Link href="#!" onClick={handleClose}>
              <i
                className="fa-solid fa-times close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></i>
            </Link>
          </Offcanvas.Title>
          <Link href="/home">
            <img alt="" src={Logo} className="" />
          </Link>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column justify-content-between align-items-center h-100 py-5 text-center">
            <div className="nav-links align-items-center">
              <NavLink to="/" activeclassname="active" className="nav-item" onClick={handleClose}>
                {t("home")}
              </NavLink>
              <NavLink to="/About" activeclassname="active" className="nav-item">
                {t("About")}
              </NavLink>
              <NavLink to="/Products" activeclassname="active" className="nav-item" onClick={handleClose}>
                {t("Products")}
              </NavLink>
              <NavLink to="/Services" activeclassname="active" className="nav-item"onClick={handleClose}>
                {t("Services")}
              </NavLink>
              <NavLink to="/Contact" activeclassname="active" className="nav-item" onClick={handleClose}>
                {t("Contact")}
              </NavLink>
              <select
                defaultValue={localStorage.getItem("lang")}
                onChange={(e) => {
                  handleOnclick(lang === "ar" ? "en" : "ar");
                }}
                className="nav-item dropdown language-select"
              >
                <option
                  value="en"
                  className="nav-item"
                  // selected={lang === "en"}
                >
                  EN 🇺🇸
                </option>
                <option
                  value="ar"
                  className="nav-item"
                  // selected={lang === "ar"}
                >
                  العربية 🇪🇬
                </option>
              </select>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Navbar;

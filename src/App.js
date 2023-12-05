import "./Components/assets/css/lang.css";
import { useState, useEffect } from "react";
import "./Components/translations/i18n";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import ScrollToTop from "./Components/Pages/ScrollToTop";
import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";

function App() {
  const { t } = useTranslation();
  const [lang, setLang] = useState("");

  const detectLang = () => {
    let __lang = localStorage.getItem("lang")
    if (!__lang || (__lang != "en" && __lang != "ar")) {
      __lang = "ar"
      localStorage.setItem("lang", __lang)
    }
    setLang(__lang)
    changeLayout(__lang)
    i18n.changeLanguage(__lang)
  };

  const handleOnclick = (lang) => {
    const __lang = lang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", __lang);
    setLang(__lang);
    changeLayout(__lang);
    i18n.changeLanguage(__lang);
  };

  const changeLayout = (lang) => {
    if (lang == "ar") {
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

  useEffect(() => {
    detectLang();
  }, []);

  return (
    <Router>
      <ScrollToTop detectLang={detectLang} />
      <Navbar changeLang={() => handleOnclick(lang === "ar" ? "en" : "ar")} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
          changeLang={() => handleOnclick(lang === "ar" ? "en" : "ar")}
        />
      </Routes>
      {/* <Footer changeLang={() => handleOnclick(lang === "ar" ? "en" : "ar")} /> */}
    </Router>
  );
}

export default App;

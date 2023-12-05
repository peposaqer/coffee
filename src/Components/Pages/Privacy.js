import axios from "../../Axios";
import Config from "../../Config";
import React, { useEffect, useState } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/web.css";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import bg1 from "../assets/images/0_86jNm7Pte9lROUGd.jpeg";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Privacy = () => {
    const { t } = useTranslation();
    const entity_url = `${Config.apiBaseUrl}/policy`;
    const [privacy, setPrivacy] = useState('');
    let mounted = true;
    const TITLE = "Suez Steel | Privacy"; 

    const abortController = new AbortController();
    const loadData = () => {
        axios
            .get(`${entity_url}`, {
                signal: abortController.signal,
            })
            .then((response) => {
                setPrivacy(response.data.data.policy);
                mounted = false;
            })
            .catch((err) => {
                const error = { ...err };
                if (error?.response?.data?.message)
                  Swal.fire({icon: 'error', text: error?.response?.data?.message, title: t("Error"), confirmButtonText: t('Ok')});
            });
    }

    useEffect(() => {
        document.body.classList.remove("pro");
        document.body.classList.remove("pro-nav");
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
          <h1>
            {t("home")} / {t("privacy")}
          </h1>
        </div>
        <div className="orders ar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-5">
                <div className="py-4 mb-4">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: privacy,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Privacy;
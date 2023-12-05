import axios from "../../Axios";
import Config from "../../Config";
import React, { useEffect, useState } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/web.css";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import bg1 from "../assets/images/0_86jNm7Pte9lROUGd.jpeg";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet";

const Terms = () => {
    const { t } = useTranslation();
    const entity_url = `${Config.apiBaseUrl}/term`;
    const [terms, setTerms] = useState([]);
    let mounted = true;
    const TITLE = "Suez Steel | Terms"; 

    const abortController = new AbortController();
    const loadData = () => {
        axios
            .get(`${entity_url}`, {
                signal: abortController.signal,
            })
            .then((response) => {
                setTerms(response.data.data.term);
                mounted = false;
            })
            .catch((err) => {
                const error = { ...err };
                if (error?.response?.data?.message) {
                    Swal.fire({
                        title: <strong>Good job!</strong>,
                        html: error?.response?.data?.message,
                        icon: 'error',
                        confirmButtonText: t('Ok'),
                    });
                }
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
    }, []);

    return (
        <div>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className="utility" style={{ backgroundImage: `url(${bg1})` }}>
                <h1>
                    {t("home")} / {t("term")}
                </h1>
            </div>
            <div className="orders ar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <div className="py-4 mb-4">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: terms,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terms;
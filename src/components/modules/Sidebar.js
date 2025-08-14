import { Link } from "react-router-dom";
import UserContext from "../context/useContext";
import {useEffect, useState} from "react";

import IconDashboard from '../assets/img/dashboard.png'
import IconAdminBar from '../assets/img/AdminBar.png'
import IconCO2 from '../assets/img/IconCO2.png'
import IconParcelle from '../assets/img/coopIcon.png'
import IconPlanting from '../assets/img/mapPlanting.png'
import IconRDUE from '../assets/img/MapRdue.png'
import IconEnquetes from '../assets/img/Enquete.png'
import IconCampagne from '../assets/img/campagneIcon.png'
import IconProjet from '../assets/img/projetIcon.png'
import IconAgroforet from '../assets/img/agroforetIcon.png'
import BackgroundImage from '../assets/img/bg-2.jpg'
import { useTranslation } from "react-i18next";



function Sidebar({sideID,parent}){
  const {t} = useTranslation();
  const [cooperatives,setCooperatives] = useState([]);
  const user =  UserContext();

    useEffect(()=>{

    },[user,sideID])


    return(
        <nav className="navbar navbar-vertical navbar-expand-lg" style={{backgroundColor: "#eef1de"}} >
        <div className="collapse navbar-collapse" id="navbarVerticalCollapse" style={{backgroundColor: "#eef1de", backgroundImage: `url(${BackgroundImage})`, backgroundSize: "100%", objectFit: "cover"}}>
          <div className="navbar-vertical-content" style={{backgroundColor: "#eef1de"}}>
              <ul className="navbar-nav flex-column " id="navbarVerticalNav">
                  <li className="nav-item">
                      <p className="navbar-vertical-label logo-text text-center ms-2 d-none d-sm-block mt-5"
                         style={{fontSize: "22px", fontWeight: "700", color: "#94a91b"}}>
                          {/* AKIDOMPRO */}
                      </p>
                      <hr className="navbar-vertical-line"/>

                      <div className="nav-item-wrapper mt-3">
                          <Link
                              className={sideID === "dash-coop" ? "nav-link label-1 bg-info bg-opacity-25" : "nav-link label-1"}
                              to="/dash-coop/" role="button" data-bs-toggle="" aria-expanded="false">
                              <div className="d-flex align-items-center">
                              <span className="">
                                <span></span>
                              </span><span className="nav-link-text-wrapper"><span className="nav-link-text"
                                  style={{                                                                                     
                                      color: "#e9a800",
                                      whiteSpace: "nowrap",
                                      fontFamily: "Inter, Helvetica",
                                      fontSize: "19px",
                                      fontWeight: "700",
                                      lineHeight: "normal",
                                  }}>
                                  <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                      <img src={IconDashboard} width="12%" height="100%" alt=""/>
                                  </i>{t("TABLEAU DE BORD")}</span></span>
                              </div>
                          </Link>
                      </div>
                      <div className="nav-item-wrapper">
                          <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                              marginLeft: "20px",
                              marginRight: "",
                              marginTop: "15px",
                              color: "#e9a800",
                              fontFamily: 'Inter, Helvetica',
                              fontSize: '18px',
                              fontWeight: "700",
                              lineHeight: "normal",
                          }}
                          >
                              {t("ADMINISTRATION")} </span></span>
                          </div>
                      </div>
                      <div className="nav-item-wrapper">
                          {user?.is_adg ?
                              <Link
                                  className={sideID === 'cooperatives' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                                  to={`/list-coop/`} data-bs-toggle="" aria-expanded="false">
                                  <div className="d-flex align-items-center"><span
                                      className="nav-link-text" style={{
                                      color: "#94a91b",
                                      fontFamily: "Inter, Helvetica",
                                      fontSize: "16px",
                                      fontWeight: "400",
                                      lineHeight: "normal",
                                  }}>
                                        <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                            <img src={IconParcelle} width="30%" height="100%" alt=""/>
                                        </i> {t("Profil")}
                                      {/* Profil */}
                                      </span>
                                  </div>
                              </Link>
                              :
                              <Link
                                  className={sideID === 'cooperatives' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                                  to={`/list-coop/`} data-bs-toggle="" aria-expanded="false">
                                  <div className="d-flex align-items-center"><span
                                      className="nav-link-text" style={{
                                      color: "#94a91b",
                                      fontFamily: "Inter, Helvetica",
                                      fontSize: "16px",
                                      fontWeight: "400",
                                      lineHeight: "normal",
                                  }}>
                                        <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                            <img src={IconParcelle} width="18%" height="100%" alt=""/>
                                        </i>
                                      {t("Coopératives")}
                                      {/* Coopératives   */}
                                        </span></div>
                              </Link>
                          }
                      </div>

                      <div className="nav-item-wrapper">
                          <Link target='_blank' className="nav-link" to="/carte-parcelles/" data-bs-toggle=""
                                aria-expanded="false">
                              <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                                  color: "#94a91b",
                                  fontFamily: "Inter, Helvetica",
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "normal",
                              }}>
                                <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                    <img src={IconPlanting} width="12%" height="100%" alt=""/>
                                </i> {t("Géoportail planting")}
                                  {/* Géoportail planting */}
                                  </span></div>
                          </Link>
                      </div>
                  </li>

                  <div className="nav-item-wrapper">
                      <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                          marginLeft: "20px",
                          marginRight: "",
                          marginTop: "15px",
                          color: "#e9a800",
                          fontFamily: 'Inter, Helvetica',
                          fontSize: '18px',
                          fontWeight: "700",
                          lineHeight: "normal",
                      }}
                      > {t("RDUE")}
                          {/* RDUE  */}
                              </span></span>
                      </div>
                  </div>
                  <div className="nav-item-wrapper">
                      <Link target='_blank' className="nav-link" to="/carte-coops-gpt/" data-bs-toggle=""
                            aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                              <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                  <img src={IconRDUE} width="15%" height="100%" alt=""/>
                              </i> {t("Géoportail RDUE")}
                              {/* Géoportail RDUE */}
                                </span></div>
                      </Link>
                  </div>

                  <div className="nav-item-wrapper">
                      <Link className="nav-link" to="/dash-coop/" data-bs-toggle=""
                            aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                              <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                  <img src={IconRDUE} width="15%" height="100%" alt=""/>
                              </i>
                                Rapport d'analyse</span></div>
                      </Link>
                  </div>

                  <div className="nav-item-wrapper">
                      <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                          marginLeft: "20px",
                          marginRight: "",
                          marginTop: "15px",
                          color: "#e9a800",
                          fontFamily: 'Inter, Helvetica',
                          fontSize: '18px',
                          fontWeight: "700",
                          lineHeight: "normal",
                      }}
                      > {t("DECRETS AGROFORETS")}
                          {/* DECRETS AGROFORETS  */}
                            </span></span>
                      </div>
                  </div>

                  <div className="nav-item-wrapper">
                      <a className="nav-link" target='_blank' href="/decret-agrogorets" data-bs-toggle=""
                         aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                                    <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                        <img src={IconAgroforet} width="18%" height="15%" alt=""/>
                                    </i> {t("Décret 2024 - (74)")}                                    
                                      </span>
                          </div>
                      </a>
                  </div>
                  <div className="nav-item-wrapper">
                      <a className="nav-link" target='_blank' href="/decret-haut-dodo/" data-bs-toggle=""
                         aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                                    <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                        <img src={IconAgroforet} width="25%" height="100%" alt=""/>
                                    </i> {t("Haute-Dodo")}                                    
                                      </span>
                          </div>
                      </a>
                  </div>
                  <div className="nav-item-wrapper">
                      <a className="nav-link" target='_blank' href="/decret-rapid-grah/" data-bs-toggle=""
                         aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                                    <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                        <img src={IconAgroforet} width="20%" height="100%" alt=""/>
                                    </i> {t("Rapides-Grah")}                                    
                                      </span>
                          </div>
                      </a>
                  </div>
                  <div className="nav-item-wrapper">
                      <a className="nav-link" target='_blank' href="/decret-scio/" data-bs-toggle=""
                         aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                                    <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                        <img src={IconAgroforet} width="50%" height="100%" alt=""/>
                                    </i> {t("Scio")}                                    
                                      </span>
                          </div>
                      </a>
                  </div>

                  <div className="nav-item-wrapper">
                      <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                          marginLeft: "20px",
                          marginRight: "",
                          marginTop: "15px",
                          color: "#e9a800",
                          fontFamily: 'Inter, Helvetica',
                          fontSize: '18px',
                          fontWeight: "700",
                          lineHeight: "normal",
                      }}
                      >  {t("SIMULATEUR")}
                          {/* PARAMETRES  */}
                              </span></span>
                      </div>
                  </div>

                  <div className="nav-item-wrapper">
                      <Link className={sideID === '' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                            to="/simulation-carbon/" data-bs-toggle="" aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                                        <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                            <img src={IconCO2} width="20%" height="100%" alt=""/>
                                        </i>
                              {t("Carbone")}
                              {/* Campagnes */}
                                </span></div>
                      </Link>
                  </div>

                  <div className="nav-item-wrapper">
                      <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                          marginLeft: "20px",
                          marginRight: "",
                          marginTop: "15px",
                          color: "#e9a800",
                          fontFamily: 'Inter, Helvetica',
                          fontSize: '18px',
                          fontWeight: "700",
                          lineHeight: "normal",
                      }}
                      >  {t("PAIEMENTS PSE")}
                          {/* PARAMETRES  */}
                              </span></span>
                      </div>
                  </div>

                  <div className="nav-item-wrapper">
                      <Link className={sideID === '' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                            to='/psepaiements/' data-bs-toggle="" aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                              <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                  <img src={IconCampagne} width="20%" height="100%" alt=""/>
                              </i> {t("Monitoring")}
                              {/* Campagnes */}
                                </span></div>
                      </Link>                      
                  </div>

                  <div className="nav-item-wrapper">
                      <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                          marginLeft: "20px",
                          marginRight: "",
                          marginTop: "15px",
                          color: "#e9a800",
                          fontFamily: 'Inter, Helvetica',
                          fontSize: '18px',
                          fontWeight: "700",
                          lineHeight: "normal",
                      }}
                      >  {t("PLANTINGS")}
                          {/* PARAMETRES  */}
                              </span></span>
                      </div>
                  </div>

                  <div className="nav-item-wrapper">
                      <Link className={sideID === '' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                            to='/plantings/' data-bs-toggle="" aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                              <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                  <img src={IconCampagne} width="25%" height="100%" alt=""/>
                              </i> {t("Planting")}
                              {/* Campagnes */}
                                </span></div>
                      </Link>                      
                  </div>

                  <div className="nav-item-wrapper">
                      <div className="d-flex align-items-center mt-3">
                            <span className="">
                              <span></span>
                            </span><span className="nav-link-text-wrapper"><span className="nav-link-text" style={{
                          marginLeft: "20px",
                          marginRight: "",
                          marginTop: "15px",
                          color: "#e9a800",
                          fontFamily: 'Inter, Helvetica',
                          fontSize: '18px',
                          fontWeight: "700",
                          lineHeight: "normal",
                      }}
                      >  {t("PARAMETRES")}
                          {/* PARAMETRES  */}
                              </span></span>
                      </div>
                  </div>

                  <div className="nav-item-wrapper">
                      <Link className={sideID === 'campagne' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                            to='/list-campagnes/' data-bs-toggle="" aria-expanded="false">
                          <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                              color: "#94a91b",
                              fontFamily: "Inter, Helvetica",
                              fontSize: "16px",
                              fontWeight: "400",
                              lineHeight: "normal",
                          }}>
                              <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                  <img src={IconCampagne} width="20%" height="100%" alt=""/>
                              </i> {t("Campagnes")}
                              {/* Campagnes */}
                                </span></div>
                      </Link>
                      {user && user.is_responsable ?
                          <Link className={sideID === 'projet' ? "nav-link bg-info bg-opacity-25 active" : "nav-link"}
                                to="/list-projets/" data-bs-toggle="" aria-expanded="false">
                              <div className="d-flex align-items-center"><span className="nav-link-text" style={{
                                  color: "#94a91b",
                                  fontFamily: "Inter, Helvetica",
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "normal",
                              }}>
                                  <i className="text-start" style={{marginLeft: "-20px", marginRight: "10px"}}>
                                      <img src={IconCampagne} width="30%" height="100%" alt=""/>
                                  </i> {t("Projet")}
                                  {/* Campagnes */}
                                    </span></div>
                          </Link> :
                          ""
                      }
                  </div>


                  
              </ul>
          </div>
        </div>
            {/* <div className="navbar-vertical-footer"><button className="btn navbar-vertical-toggle border-0 fw-semi-bold w-100 white-space-nowrap d-flex align-items-center"><span className="uil uil-left-arrow-to-left fs-0"></span><span className="uil uil-arrow-from-right fs-0"></span><span className="navbar-vertical-footer-text ms-2">Collapsed View</span></button></div> */}
        </nav>
    )
}

export default Sidebar;
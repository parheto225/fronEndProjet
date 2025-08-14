import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../../../Content";
import { useEffect, useState, useRef, useCallback } from "react";
import personIcon from '../../../assets/img/avatar.jpg';
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import BaseUrl from "../../../config/baseUrl";

// const baseUrl = 'http://127.0.0.1:8000/api';
const url = BaseUrl();
function Paiement(){
    const {t} = useTranslation();
    const [paiements, setPaiements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultats, setResultats] = useState([]);

    useEffect(() => {
      fetchPaiements();
    }, []);

    const fetchPaiements = async () => {
      try {
        const res = await axios.get(url+'/paiement-monitoring/group-wave/attente/');
        setPaiements(res.data);
      } catch (err) {
        console.error('Erreur de récupération', err);
      }
    };

    const handlePaiement = async () => {
      setLoading(true);
      try {
        const res = await axios.post(url+'/paiement-monitoring/group-wave/');
        setResultats(res.data);
        fetchPaiements(); // mise à jour des paiements restants
      } catch (err) {
        console.error('Erreur de paiement', err);
      } finally {
        setLoading(false);
      }
    };

    return(
        <>
            <Content sideID={"cooperatives"} parent={"generalite"}>
            <h2 className="text-bold text-1100 mb-5">{t("Paiement(s) en attente")}({paiements.length})</h2>
              <div id="members" >
              <div className="row align-items-center justify-content-between g-3 mb-4">
                  <div className="col-auto">
                    <div className="d-flex align-items-center">
                        {/* <button className="btn btn-link text-900 me-4 px-0" data-bs-toggle="modal" data-bs-target="#exampleModal" ><span className="fa-solid fa-file-export fs--1 me-2"></span>Export</button> */}
                        <button 
                          className="btn btn-sm" 
                          type="button" 
                          style={{
                            backgroundColor: paiements.length > 0 ? "#0096c7" : "#94a91b",
                            color: "#fff", 
                            fontWeight: "bold"
                          }}
                          onClick={handlePaiement}
                          disabled={paiements.length <= 0 || loading}
                        >
                          <span className="fas fa-plus pe-2 fs--2"></span>
                          {loading ? 'Paiement en cours...' : 'Payer avec Wave'}
                        </button>
                    </div>
                    {resultats.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold">Statut Paiements</h3>
                        <ul className="list-disc pl-6">
                          {resultats.map((res, i) => (
                            <li key={i} className={res.statut === 'succès' ? 'text-green-600' : 'text-red-600'}>
                              {res.producteur} - {res.montant_total} FCFA : {res.statut} le paiement à échoué
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row align-items-center justify-content-between g-3 mb-4">
                </div>
                <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-white border-y border-300 mt-2 position-relative top-1">
                  <div className="table-responsive scrollbar ms-n1 ps-1">
                    <table className="table fs--1 mb-0">
                          <thead>
                          <tr className="" style={{backgroundColor: "#EE9F27", color: "#fff", fontWeight: "bold"}}>
                              <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount">{t("Producteur")}</th>                              
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Contact")}</th> 
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Campagne")}</th>  
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Monitoring")}</th> 
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Taux Réussite")}</th>
                              {/* <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">PU/ARBRE</th> */}
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Montant")}</th> 
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Statut")}</th>           
                              
                          </tr>
                          </thead>
                          <tbody className="list" id="lead-details-table-body">
                               {paiements.map((parc,index)=>
                            <tr className="hover-actions-trigger text-center btn-reveal-trigger position-static">
                                  <td className="name align-middle white-space-nowrap py-2 ps-0 ">
                                    <span className="d-flex align-items-center text-1000 cursor-pointer" >
                                      <div className="avatar avatar-m me-3 status-online">
                                        {parc?.planting?.parcelle?.producteur?.photo ?
                                          <img className="rounded-circle" src={parc?.producteur?.photo} alt="" />
                                          :
                                          <>
                                          <img className="rounded-circle" src={personIcon} alt="" />
                                          </>
                                        }
                                        
                                      </div>
                                      <h6 className="mb-0 text-1000 fw-bold " style={{color: "#168bc9"}}>{parc?.producteur?.nomComplet}</h6>
                                    </span>                                    
                                  </td>
                                  <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">(+225){parc?.producteur.contacts}</td>
                                  <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{parc?.monitoring?.campagne?.libelle}</td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.total_vivants} / {parc?.total_plantes} </td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.taux_survie} %</td>
                                  {/* <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.monitoring?.tarif?.pu}</td> */}
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.statut}</td>
                              </tr>
                              )}  
                          </tbody>
                     </table>
                  </div>
                </div>
              </div>

            </Content>
        </>
    )
}

export default Paiement;
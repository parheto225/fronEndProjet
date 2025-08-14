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
function ExportModule(){
    const {t} = useTranslation();
    const {coopID} = useParams();
    const [selectedModule, setSelectedModule] = useState("cooperatives");
    const [selectedCampagne, setSelectedCampagne] = useState("");
    const [previewData, setPreviewData] = useState([]);

    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
      search: '',
      page: 1,
      campagne: '',
      cooperative: '',
      section: '',
    });
    const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });


    const navigate = useNavigate();
    const [cooperative,setCooperative] = useState([]);
    const campagne = localStorage.getItem('campagne');
    const [monitorings, setMonitorings] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(url+"/monitorings/avant-paiement/?page_size=50");
    const loaderRef = useRef(null);
    const [campagnes, setCampagnes] = useState([]);

    const [modules] = useState([
      { label: "Cooperatives", value: "cooperatives" },
      { label: "Producteurs", value: "producteurs" },
      { label: "Parcelles", value: "parcelles" },
      { label: "Plantings", value: "plantings" },
      { label: "Monitorings", value: "monitorings" },
    ]);

    useEffect(() => {
      axios.get(`${url}/campagnes/`).then(res => {
        setCampagnes(res.data);
      });
    }, []);

    const fetchPreview = () => {
      axios.get(`${url}/export-preview/`, {
        params: {
          module: selectedModule,
          campagne: selectedCampagne,
          format: "json"   // Ajout ici pour ne pas déclencher le Excel ou PDF
        }
      }).then(res => {
        setPreviewData(res.data);
      }).catch(err => {
        console.error("Erreur lors du chargement de l'aperçu :", err);
      });
    };

    return (
    <div className="container mt-5">
      <h3>📦 Module d'Exportation</h3>

      <div className="row mt-3">
        <div className="col-md-4">
          <label>🗂 MODULE</label>
          <select
            className="form-control description align-left white-space-nowrap text-uppercase fw-bold text-left text-700 py-2 pe-6"
            value={selectedModule}
            onChange={e => setSelectedModule(e.target.value)}
          >
            {modules.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label>📅 CAMPAGNE</label>
          <select
            className="form-control description align-left white-space-nowrap fw-bold text-left text-700 py-2 pe-6"
            value={selectedCampagne}
            onChange={e => setSelectedCampagne(e.target.value)}
          >
            <option value="">Toutes</option>
            {campagnes.map(c => (
              <option key={c.id} value={c.id}>{c.libelle}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-primary me-2" onClick={fetchPreview}>
            Voir les données
          </button>
          <a
            className="btn btn-success me-2"
            href={`${url}/export-data/?module=${selectedModule}&campagne=${selectedCampagne}&format=excel`}
            target="_blank"
            rel="noreferrer"
          >
            Export Excel
          </a>
          <a
            className="btn btn-danger"
            href={`${url}/export-data/?module=${selectedModule}&campagne=${selectedCampagne}&format=pdf`}
            target="_blank"
            rel="noreferrer"
          >
            Export PDF
          </a>
        </div>
      </div>

      <div className="mt-4 table-responsive">
        {previewData.length > 0 && (
          <table className="table table-bordered table-striped">
            <thead class="table-dark">
              <tr>
                {Object.keys(previewData[0]).map((key, i) => (
                  <th key={i} className="sort white-space-nowrap align-middle pe-3 ps-0 text-uppercase text-center" scope="col">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, idx) => (
                <tr className="hover-actions-trigger text-center btn-reveal-trigger position-static" key={idx}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} className="description align-center white-space-nowrap text-center text-650 text-uppercase py-2 pe-6">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

    // return(
    //     <>
    //         <Content sideID={"cooperatives"} parent={"generalite"}>
    //         {/* {monitorings.map((mon,index)=> */}
    //           <h2 className="text-bold text-1100 mb-5">
    //             {t("Producteurs éligibles pour les PSE")}
    //             (239) - ({t("Arbres Vivants")})
    //             {/* ({mon?.critere_paiement}) */}
    //           </h2>
    //         {/* )} */}


    //           <div id="members" >
    //             <div className="row align-items-center justify-content-between g-3 mb-4">
    //               <div className="col col-auto">
    //                 <div className="search-box">
    //                   <div className="position-relative" data-bs-toggle="search" data-bs-display="static">
    //                       <input 
    //                         className="form-control search-input search" 
    //                         type="search" 
    //                         placeholder={t("")} 
    //                         aria-label="Search"  
    //                         value={search} 
    //                         onChange={(e) => {
    //                           const selectedCampagne = e.target.value;
    //                           localStorage.setItem("campagne", selectedCampagne);
    //                           setFilters(prev => ({...prev, campagne: selectedCampagne}));
    //                         }}
    //                       />
    //                     <span className="fas fa-search search-box-icon"></span>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-auto">
    //                 <div className="d-flex align-items-center">
    //                   <div className="col-md-4">                          
    //                       <select
    //                       style={{backgroundColor: "#f2f2f2", textAlign: "center", color: "#000", fontWeight: "bold", padding: "0.5rem 1rem", borderRadius: "0.25rem", margin: "0 0.5rem", border: "1px solid #ccc", width: "170px"}}
    //                         className="form-control"
    //                         value={campagne}
    //                         onChange={(e) => {
    //                           localStorage.setItem("campagne", e.target.value);
    //                           window.location.reload(); // ou bien setCampagne(e.target.value);
    //                         }}
    //                       >
    //                           <option value="" >{t("Toutes les campagnes")}</option>                            
    //                           <option value="2023-2024">2023/2024</option>
    //                           <option value="2024-2025">2024/2025</option>                        
    //                       </select>
    //                     </div>
    //                     {/* <button className="btn btn-link text-900 me-4 px-0" data-bs-toggle="modal" data-bs-target="#exampleModal" ><span className="fa-solid fa-file-export fs--1 me-2"></span>Export</button> */}
    //                     <a className="btn btn-sm btn-info" type="button" href="/paiements/" style={{ color: "#fff", fontWeight: "bold", marginLeft: "60px"}}>
    //                       <span className=""></span>
    //                       {t("Paiement")}
    //                     </a> 
    //                     <a className="btn btn-sm btn-danger" type="button" href={url+`/monitorings/export/pdf/`} style={{ color: "#fff", fontWeight: "bold", marginLeft: "60px"}} target="_blank" rel="noreferrer">
    //                       <span className=""></span>
    //                       {t("PDF")}
    //                     </a>  
    //                     <a className="btn btn-sm btn-success" type="button" href={url+`/monitorings/export/excel/`} style={{ color: "#fff", fontWeight: "bold", marginLeft: "60px"}} target="_blank" rel="noreferrer">
    //                       <span className=""></span>
    //                       {t("EXCEL")}
    //                     </a> 
    //                     {/* <a className="btn btn-sm btn-success" type="button" href={`http://127.0.0.1:8000/api/monitorings/export/pdf/?campagne=${campagne}&cooperative=${coopID}`} style={{ color: "#fff", fontWeight: "bold", marginLeft: "60px"}} target="_blank" rel="noreferrer">
    //                       <span className=""></span>
    //                       {t("PDF filtré")}
    //                     </a>  */}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-white border-y border-300 mt-2 position-relative top-1">
    //               <div className="table-responsive scrollbar ms-n1 ps-1">
    //                 <table className="table fs--1 mb-0">
    //                       <thead>
    //                       <tr className="" style={{backgroundColor: "#EE9F27", color: "#fff", fontWeight: "bold"}}>
                              
    //                           <th className="sort white-space-nowrap align-middle pe-3 ps-0 text-uppercase text-center" scope="col">{t("Parcelle")}</th>
    //                           <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount">{t("Producteur")}</th>                              
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Contact")}</th> 
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Campagne")}</th>  
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Superficie")}</th>  
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Monitoring")}</th> 
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Taux Réussite")}</th>
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("PU/Arbre")}</th>  
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Revenu")}</th>           
                              
    //                       </tr>
    //                       </thead>
    //                       <tbody className="list" id="lead-details-table-body">
    //                           {monitorings.map((parc,index)=>
    //                             <tr className="hover-actions-trigger text-center btn-reveal-trigger position-static">
    //                               <td className="description align-middle white-space-nowrap text-black text-center text-700 py-2 pe-6" onClick={()=>ViewProducteur(parc?.planting?.parcelle?.producteur?.code)}>{parc?.code_parcelle}</td>
    //                               <td className="name align-middle white-space-nowrap py-2 ps-0 ">
    //                                 <span className="d-flex align-items-center text-1000 cursor-pointer" >
    //                                   <div className="avatar avatar-m me-3 status-online">
    //                                     {parc?.planting?.parcelle?.producteur?.photo ?
    //                                       <img className="rounded-circle" src={parc?.planting?.parcelle?.producteur?.photo} alt="" />
    //                                       :
    //                                       <>
    //                                       <img className="rounded-circle" src={personIcon} alt="" />
    //                                       </>
    //                                     }
                                        
    //                                   </div>
    //                                   <h6 className="mb-0 text-1000 fw-bold " style={{color: "#168bc9"}}>{parc?.producteur_nom}</h6>
    //                                 </span>                                    
    //                               </td>
    //                               <td className="description align-middle white-space-nowrap fw-bold  text-center text-700 py-2 pe-6">{parc?.producteur_contact}</td>
    //                               <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{parc?.campagne}</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.superficie}</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.arbre_vivants} / {parc?.arbre_plantes} </td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc?.taux_reussite} %</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6"> {parc?.tarif_unitaire}</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6"> {parc?.montant_a_payer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
    //                             </tr>
    //                           )}  
    //                       </tbody>
    //                  </table>
    //                 {/* Loader invisible pour observer */}
    //                 <div ref={loaderRef} className="h-10"></div>
    //                 {loading && <p className="text-center py-4">Chargement...</p>}
    //               </div>
    //             </div>
    //           </div>

    //         </Content>
    //     </>
    // )
}

export default ExportModule;
import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../../../Content";
import { useEffect, useState, useRef, useCallback } from "react";
import personIcon from '../../../assets/img/avatar.jpg';
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import BaseUrl from "../../../config/baseUrl";

const url = BaseUrl();
function Monitorings(){
    const {t} = useTranslation();
    const {coopID} = useParams();

    const [annees, setAnnees] = useState([]);
    const [selectedAnnee, setSelectedAnnee] = useState("");
    const navigate = useNavigate();
    const [cooperative,setCooperative] = useState([]);
    const campagne = localStorage.getItem('campagne');
    const [monitorings, setMonitorings] = useState([]);
    const [totalPlanting,setTotalPlanting] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");
    const [nextPageUrl, setNextPageUrl] = useState(url+"/plantings-list/?page_size=50");
    const loaderRef = useRef(null);
    const [campagnes, setCampagnes] = useState([]);

    // 1️⃣ Charger les années au montage
    useEffect(() => {
      axios
        .get(`${url}/monitoring-years/`)
        .then((res) => {
          setAnnees(res.data);
        })
        .catch((err) => console.error(err));
    }, []);

    // 2️⃣ Charger les données filtrées par année
    const fetchMonitorings = (annee = "") => {
      setLoading(true);
      axios
        .get(`${url}/monitorings/`, {
          params: annee ? { annee } : {},
        })
        .then((res) => {
          setMonitorings(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    };

    // Charger toutes les données par défaut au début
    useEffect(() => {
      fetchMonitorings();
    }, []);

    // 3️⃣ Gestion du changement d'année
    const handleYearChange = (e) => {
      const value = e.target.value;
      setSelectedYear(value);
      fetchMonitorings(value || "");
    };

    // useEffect(() => {
    //   const fetchCampagnes = async () => {
    //     try {
    //       const res = await axios.get(`${url}/plantings-list/campagnes/`, {
    //         // headers: {
    //         //   Authorization: `Token ${tonToken}`, // ou via un hook auth
    //         // },
    //       });
    //       setCampagnes(res.data);
    //       console.log(res.data)
    //     } catch (err) {
    //       console.error("Erreur chargement campagnes :", err);
    //     }
    //   };
    
    //   fetchCampagnes();
    // }, []);


    // Charger les campagnes
    // useEffect(() => {
    //   axios.get(`${url}/campagnes/`) // ⚠️ Change si différent
    //     .then(res => {
    //       setCampagnes(res.data);
    //     });
    // }, []);

    // const fetchMonitorings = useCallback(async () => {
    //   if (!nextPageUrl || loading) return;
  
    //   setLoading(true);
    //   try {
    //     const response = await axios.get(nextPageUrl, {
    //     });
  
    //     setMonitorings((prev) => [...prev, ...response.data.results]);
    //     setNextPageUrl(response.data.next);
    //   } catch (error) {
    //     console.error("Erreur lors du chargement des données :", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // }, [nextPageUrl, loading]);
  
    // // Intersection Observer
    // useEffect(() => {
    //   const observer = new IntersectionObserver((entries) => {
    //     const target = entries[0];
    //     if (target.isIntersecting) {
    //       fetchMonitorings();
    //     }
    //   }, {
    //     rootMargin: "100px",
    //   });
  
    //   if (loaderRef.current) {
    //     observer.observe(loaderRef.current);
    //   }
  
    //   return () => {
    //     if (loaderRef.current) observer.unobserve(loaderRef.current);
    //   };
    // }, [fetchMonitorings]);
  




    // const ViewProducteur=(prodID)=>{
    //   navigate('/views-producteur/'+prodID+'/');
    // }

  //   useEffect(() => {
  //   axios.get(url+'/plantings-list/')  // Remplace par l'URL réelle
  //     .then(res => {
  //       setData(res.data.results)
  //       setTotalPlanting(res.data.count)
  //       // console.log(res.data.results)
  //       // Extraire toutes les espèces distinctes
  //       const allEspeces = new Set()
  //       res.data.results.forEach(item => {
  //         item.espece_data.forEach(e => {
  //           allEspeces.add(e.espece)
  //           // console.log(allEspeces)
  //         })
  //       })
  //       setEspeces(Array.from(allEspeces))
  //     })
  // }, [])

    // useEffect(() => {
    //   const fetchCoop = async () => {
    //     try {
    //       const res = await axios.get(`${url}/cooperatives/${coopID}/`);
    //       setCooperative(res.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };
    
    //   if (coopID) fetchCoop();
    // }, [coopID]);

    // useEffect(() => {
    //   const delayDebounce = setTimeout(() => {
    //     setFilters(prev => ({...prev, search: search}));
    //   }, 500); // pour debounce
    
    //   return () => clearTimeout(delayDebounce);
    // }, [search]);

    // return(
    //     <>
    //         <Content sideID={"cooperatives"} parent={"generalite"}>
    //         {/* {monitorings.map((mon,index)=> */}
    //           <h2 className="text-bold text-1100 mb-5">
    //             {t("📊 Liste des Monitorings")} ({})
              
    //             {/* ({mon?.critere_paiement}) */}
    //           </h2>
    //         {/* )} */}


    //           <div id="members" >
    //             <div className="row align-items-center justify-content-between g-3 mb-4">
    //               <div className="col col-auto">
    //                 <div className="search-box">
    //                   <div className="position-relative" data-bs-toggle="search" data-bs-display="static">
    //                       {/* <input 
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
    //                       /> */}
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
    //                         value={selectedYear}
    //                         onChange={handleYearChange}
    //                       >
    //                           <option value="" >{t("Toutes les années")}</option>                            
    //                           {annees.map((year) => (
    //                             <option key={year} value={year}>{year}</option>
    //                           ))}
    //                            <option value="2024-2025">2024/2025</option>
    //                       </select>
    //                     </div>
                      
    //                     <a className="btn btn-sm btn-success" 
    //                       type="button" 
    //                       href={""}
    //                       // href={url+`/plantings/export/excel/`} 
    //                       style={{ color: "#fff", fontWeight: "bold", marginLeft: "60px"}} 
    //                       target="_blank" rel="noreferrer">
    //                       <span className=""></span>
    //                       {t("Export EXCEL")}
    //                     </a> 
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
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Campagne")}</th>  
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Superficie")}</th>  
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Monitoring")}</th> 
    //                           <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Taux Réussite")}</th>
                              
    //                       </tr>
    //                       </thead>
    //                       <tbody>
    //                         {data.map((planting, i) => {
    //                           const especeMap = {}
    //                           planting.espece_data.forEach(e => {
    //                             especeMap[e.espece] = e.plants
    //                           })

    //                           return (                               
    //                             <tr className="hover-actions-trigger text-center btn-reveal-trigger position-static" key={i}>
    //                               <td className="description align-middle white-space-nowrap text-black text-center text-700 py-2 pe-6" onClick={()=>ViewProducteur(planting.producteur?.code)}>{planting.parcelle_code}</td>
    //                               <td className="name align-middle white-space-nowrap py-2 ps-0 ">
    //                                 <span className="d-flex align-items-center text-1000 cursor-pointer" >
    //                                   <div className="avatar avatar-m me-3 status-online">
    //                                     {planting.producteur?.photo ?
    //                                       <img className="rounded-circle" src={planting.producteur?.photo} alt="" />
    //                                       :
    //                                       <>
    //                                       <img className="rounded-circle" src={personIcon} alt="" />
    //                                       </>
    //                                     }
                                        
    //                                   </div>
    //                                   <h6 className="mb-0 text-1000 fw-bold " style={{color: "#168bc9"}}>{planting.producteur}</h6>
    //                                 </span>                                    
    //                               </td>                                    
    //                               <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{planting.campagne}</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{planting.superficie}</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{planting.date}</td>
    //                               <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{planting.total_plants}</td>
    //                               {especes.map((libelle, j) => (
    //                                 <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6" key={j}> {especeMap[libelle] || 0}</td>                                   
    //                               ))}                                                                      
    //                             </tr>                                 
                                
    //                           )
    //                         })}
    //                       </tbody>
    //                  </table>
                
                  
    //               </div>
    //             </div>
    //           </div>

    //         </Content>
    //     </>
    // )


    return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Liste des Monitorings</h2>

      {/* Sélecteur d'années */}
      <label>Filtrer par année : </label>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Toutes les années</option>
        {annees.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Liste des données */}
      {loading ? (
        <p>⏳ Chargement...</p>
      ) : (
        <ul>
          {monitorings.length > 0 ? (
            monitorings.map((item) => (
              <li key={item.id}>
                <strong>{item.nom}</strong> — {item.created_at}
              </li>
            ))
          ) : (
            <p>Aucune donnée trouvée</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Monitorings;
import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../../../Content";
import { useEffect, useState } from "react";
import personIcon from '../../../assets/img/avatar.jpg';
import axios from "axios";
import Swal from "sweetalert2";
import Validation from "../../../Validation";
import { useTranslation } from "react-i18next";

import IconCooperative from '../../../assets/img/Cooperative.png'
import IconProducteur from '../../../assets/img/Paysan.png'
import IconProduction from '../../../assets/img/Production.png'

// import IconParcelle from '../../assets/img/Parcelle.png'

import BaseUrl from "../../../config/baseUrl";

// const baseUrl = 'http://127.0.0.1:8000/api';
const url = BaseUrl();
function ProductionList(){
    const {t} = useTranslation();
    const {coopID} = useParams();
    const navigate = useNavigate();
    const [cooperative,setCooperative] = useState([]);
    const campagne = localStorage.getItem('campagne');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const [errors, setErrorM] = useState({});
    const [anneeLists,setAnneeLists] = useState([]);
    const [totalParc,setTotalParc] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextUrl,setnextUrl] = useState();
    const [prevUrl,setprevUrl] = useState();
    const [isDisabled, setIsDisabled] = useState(false);

    const [parcelleList,setParcelleList] = useState([]);
    const [parcelleData,setParcelleData] = useState({
      "latitude":"",
      "longitude":"",
      "superficie":"0",
      "certification":"",
      "annee_certificat":"",
      "annee_acquis":"",
      "culture":"",
      "acquisition":"",
      "code_certif":""
    });
    const [cultures,setCulutres] = useState([]);
    const [acquisitions,setModeAcquisitions] = useState([]);
    const [campagneList,setCampagneList] = useState([]);
    const [certifications,setCertifications] = useState([]);



    useEffect(()=>{
        if(coopID){
            try {

                axios.get(url+'/cooperative-list/?coopID='+coopID).then((resp)=>{
                    setCooperative(resp.data[0]);
                });
                axios.get(url+'/culture-list/?coopID='+coopID).then((resp)=>{
                  setCulutres(resp.data);
                })
  
                axios.get(url+'/mode-acquisition-list/').then((resp)=>{
                  setModeAcquisitions(resp.data);
                });

                axios.get(url+'/certification-list/').then((resp)=>{
                  setCertifications(resp.data);
                });
            } catch (error) {
                console.log(error)
            }
            fetchData();
        } 
    },[functAnneeList(),coopID,totalPages]);

    useEffect(()=>{
     
      try {
        if(cooperative && cooperative.projet?.id){
          axios.get(url+'/campagne-proj-list/?projId='+cooperative.projet?.id).then((resp)=>{
            setCampagneList(resp.data);
          });

        }
         
          
        } catch (error) {
          console.log(error);
      }   

  },[functAnneeList(),cooperative]) 

    const fetchData = () => {
        axios.get(url+'/productions-list/?coopID='+coopID)
          .then((resp) => {
            setnextUrl(resp.data.next);
            setprevUrl(resp.data.previous)
            setParcelleList(resp.data.results);
            setTotalPages(resp.data.count / resp.data.results.length);
            setTotalParc(resp.data.count)
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const paginationHandler=(url,ls)=>{
        if(ls==0){
          setPage(page - 1);
        }else{
          setPage(page + 1);
        }
        try {
            axios.get(url).then((resp)=>{
                setnextUrl(resp.data.next);
                setprevUrl(resp.data.previous)
                setParcelleList(resp.data.results);
                
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSearchParcelle=(event)=>{
        try {
          axios.get(url+'/productions-list/?q='+event.target.value+'&co='+coopID).then((resp)=>{
            
            setParcelleList(resp.data.results);
          });
        } catch (error) {
            console.log(error);
        }
      }

    const ViewProducteur=(prodID)=>{
    
        navigate('/views-producteur/'+prodID+'/');
        //window.location.reload();
    }

    const onDeleteParc=(Code,nomComplet)=>{
      try {
        Swal.fire({
          title: 'Êtes-vous sûre?',
          html: "Cette action va supprimer la parcelle de <b>"+nomComplet+"</b> <br/> Code parcelle : <b>"+Code+"</b>",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmer',
          cancelButtonText: "Refuser",
          showLoaderOnConfirm:true
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              axios.get(url+'/parcelles-list/?code='+Code+'&coop='+coopID).then((resp)=>{

                setParcelleList(resp.data.results);
                setTotalPages(resp.data.count / resp.data.results.length);
                setTotalParc(resp.data.count)
                Swal.fire(
                  'Supprimé',
                  'Producteur supprimé avec succès',
                  'success'
                )
              })
            } catch (error) {
              
            }
            
          }
        })
      } catch (error) {
        console.log(error);
      }
    }

    // UPDATE PARCELLE
    const [parcEdit,setParcEdit] = useState([]);

    const modalOpenParc=(code)=>{
      window.$(`#addEventModalParc-${code}`).modal("show");
      axios.get(url+'/parcelles-list/?parcId='+code).then((resp)=>{
        setParcEdit(resp.data.results[0]);

        setParcelleData({
          "longitude":resp.data.results[0].longitude,
          "latitude":resp.data.results[0].latitude,
          "annee_acquis":resp.data.results[0].annee_acquis,
          "acquisition":resp.data.results[0].acquisition?.id,
          "annee_certificat":resp.data.results[0].annee_certificat,
          "culture":resp.data.results[0].culture?.id,
          "superficie":resp.data.results[0].superficie,
          "certification":resp.data.results[0].certificat?.id,
          "code_certif":resp.data.results[0].code_certif
          
        })
      }); 

    }   

    //console.log(parcelleData);

    const handleChangeParcelle=(event)=>{
      setParcelleData({
          ...parcelleData,
          [event.target.name]:event.target.value
      });
    }

    const submitParc=()=>{
      setErrorM(Validation(parcelleData));
      if( parcelleData.acquisition !="" && parcelleData.superficie !="" && parcelleData.culture !="" )
      {
        const _formData = new FormData();
        _formData.append('latitude',parcelleData.latitude);
        _formData.append('longitude',parcelleData.longitude);
        _formData.append('superficie',parcelleData.superficie);
        _formData.append('certification',parcelleData.certification);
        _formData.append('acquisition',parcelleData.acquisition);
        _formData.append('annee_certificat',parcelleData.annee_certificat);
        _formData.append('annee_acquis',parcelleData.annee_acquis);
        _formData.append('culture',parcelleData.culture);
        _formData.append('code_certif',parcelleData.code_certif);
        _formData.append('code',parcEdit.code);
  
        //console.log(_formData);
  
        Swal.fire({
          title: 'Enregistrement...',
          html: 'Veillez patientez...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
          
        });
  
          try {
          axios.post(url+'/update-coop-parcelle/',_formData).then((resp)=>{
            Swal.close()
  
            if(resp.data.bool)
            {
              window.$(`#addEventModalParc-${parcEdit.code}`).modal('hide');
              Swal.fire({
                title: 'FELICITATION !',
                html: "La parcelle a bien été modifiée.",
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  axios.get(url+'/parcelles-list/?coopID='+coopID).then((resp)=>{
                    setnextUrl(resp.data.next);
                    setprevUrl(resp.data.previous)
                    setParcelleList(resp.data.results);
                    setTotalPages(resp.data.count / resp.data.results.length);
                    setTotalParc(resp.data.count)
                  }); 
                    
  
                }
              });
  
              setParcelleData({ 
                "latitude":"",
                "longitude":"",
                "superficie":"0",
                "certification":"",
                "annee_certificat":"",
                "annee_acquis":"",
                "culture":"",
                "acquisition":"",
                "code_certif":""
              })

              setParcEdit([]);
            }
            else
            {
              Swal.fire({
                title: 'ATTENTION !',
                html: resp.data.msg,
                icon: 'error',
                showCancelButton: false,
                confirmButtonColor: 'red',
                confirmButtonText: 'OK'
              })
            }
          })
        } catch (error) {
          console.log(error);
        }  
        
      }
    }

    function functAnneeList(){
        
      for (let i = year; i >= year - 60; i--) {
           anneeLists.push(`${i}`)
      }
  
   }

   const [campagne_exp,setCampagne_exp] = useState('');
   const [format_exp,setFormat_exp] = useState('');

   var fileDownload = require('js-file-download');

   const onSubmitExporteData=(e)=>{
     e.preventDefault()

     try {
       axios.get(url+'/generate_pdf_with_qrcode-cooperative/?format='+format_exp+'&campagne='+campagne_exp+'&coopID='+coopID,
         {responseType:'blob'}
       ).then((response)=>{
           if (format_exp == 'PDF'){
             fileDownload(response.data,'tracability.pdf');
           }else{
             fileDownload(response.data,'liste_parcelles.xlsx')
           }
           

       })
     } catch (error) {
       console.error('Erreur lors de l\'export :', error);
     }

   }


   const viewParcelleProd=(code, parcTotal)=>{
      if (parcTotal === 0){
        navigate(`/carte-producteur-parcelle/${code}/`);
      }else{
        Swal.fire({
          title: 'Oops !',
          html: "Aucune parcelle enregistrée pour cet producteur",
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#ff3232',
          confirmButtonText: 'OK'
        })
      }
    }

    const viewParcelleProdNew = (code, parcTotal) => {
        if(parcelleList) {
          if(parcelleList.length > 0) {
            {
              parcelleList.map((parc, index) => {
                code = parc?.parcelle?.producteur.code
                if (parcTotal === 0){
                  navigate(`/carte-producteur-parcelle/${code}/`);
                }else{
                  Swal.fire({
                    title: 'Oops !',
                    html: "Aucune parcelle enregistrée pour ce producteur",
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#ff3232',
                    confirmButtonText: 'OK'
                  })
                }
              })
            }
        }
      }

    }


//console.log(parcelleList);
    return(
        <>
            <Content sideID={"cooperatives"} parent={"generalite"}>
            <h2 className="text-bold text-1100 mb-5">{t("Liste des Productions")} ({totalParc})</h2>
            <div className="mb-5 bg-white p-3 border-2 rounded-2">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        {/* <h5 className="card-header bg-info text-white p-2 text-center">
                            Coopérative
                        </h5> */}
                        <div className="card-body p-2">
                            <h5 class="card-title" style={{
                                backgroundColor: "#fbffe9",
                                // marginTop: "-15px",
                                textAlign: "center",
                                borderRadius: "10px",  
                                paddingTop: "10px",                             
                                height: "30px",  
                                color: "#607929", 
                                whiteSpace: "nowrap",
                                fontFamily: "Inter, Helvetica",
                                fontSize: "18px",
                                fontWeight: "700",
                                lineHeight: "normal",                             
                            }}>{t("Coopérative")}</h5>
                            <div className="row">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="" >
                                            <img src={IconCooperative} width="50" height="50" alt=""/>
                                        </i>
                                    </div>
                                    <div className="col-xs-9" >                                                    
                                      <h3 className="card-title text-end" style={{marginTop: "-35px", fontWeight: "900", fontSize: "1.5rem"}}> <Link to={`/views-coop/${coopID}/`}>{cooperative.nomCoop}</Link> </h3>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        {/* <h5 className="card-header bg-success text-white p-2 text-center">
                            Producteur total
                        </h5> */}
                        <div className="card-body p-2">
                        <h5 class="card-title" style={{
                                backgroundColor: "#fbffe9",
                                // marginTop: "-15px",
                                textAlign: "center",
                                borderRadius: "10px",  
                                paddingTop: "10px",                             
                                height: "30px",  
                                color: "#607929", 
                                whiteSpace: "nowrap",
                                fontFamily: "Inter, Helvetica",
                                fontSize: "18px",
                                fontWeight: "700",
                                lineHeight: "normal",                             
                            }}>{t("Producteur total")}</h5>
                            <div className="row">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="" >
                                            <img src={IconProducteur} width="50" height="50" alt=""/>
                                        </i>
                                    </div>
                                    <div className="col-xs-9" >                                                    
                                      <h3 className="card-title text-end" style={{marginTop: "-35px", fontWeight: "900", fontSize: "1.5rem"}}>{cooperative.total_producteurs_coop}</h3>
                                    </div>
                                </div>
                            </div>   
                            {/* <h3 className= "card-title text-center">{cooperative.total_producteurs_coop}</h3> */}
                        </div>
                    </div>
                </div> 

                <div className="col-md-4">
                <div className="card">
                        {/* <h5 className="card-header bg-info text-white p-2 text-center">
                            Production totale (Kg)
                        </h5> */}
                        <div className="card-body p-2">
                        <h5 class="card-title" style={{
                                backgroundColor: "#fbffe9",
                                // marginTop: "-15px",
                                textAlign: "center",
                                borderRadius: "10px",  
                                paddingTop: "10px",                             
                                height: "30px",  
                                color: "#607929", 
                                whiteSpace: "nowrap",
                                fontFamily: "Inter, Helvetica",
                                fontSize: "18px",
                                fontWeight: "700",
                                lineHeight: "normal",                             
                            }}>{t("Production totale")} (Kg)</h5>
                            <div className="row">
                                <div className="row">
                                    <div className="col-xs-3">
                                        <i className="" >
                                            <img src={IconProduction} width="50" height="50" alt=""/>
                                        </i>
                                    </div>
                                    <div className="col-xs-9" >                                                    
                                      <h3 className="card-title text-end" style={{marginTop: "-35px", fontWeight: "900", fontSize: "1.5rem"}}>{cooperative.total_production_coop?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h3>
                                    </div>
                                </div>
                            </div>   
                            {/* <h3 className= "card-title text-center">{cooperative.total_production_coop?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h3> */}
                        </div>
                    </div>
                </div> 
            </div> 
            </div>
              <div id="members" >
                <div className="row align-items-center justify-content-between g-3 mb-4">
                  <div className="col col-auto">
                    <div className="search-box">
                      <div className="position-relative" data-bs-toggle="search" data-bs-display="static">
                          <input className="form-control search-input search" type="search" placeholder={t("Recherche une parcelle")} aria-label="Search"  onChange={onSearchParcelle} />
                        <span className="fas fa-search search-box-icon"></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <button className="btn btn-link text-900 me-4 px-0" data-bs-toggle="modal" data-bs-target="#exampleModal" ><span className="fa-solid fa-file-export fs--1 me-2"></span>Export</button>
                      
                    </div>
                  </div>
                </div>
                <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-white border-y border-300 mt-2 position-relative top-1">
                  <div className="table-responsive scrollbar ms-n1 ps-1">
                    <table className="table fs--1 mb-0">
                          <thead>
                          <tr className="" style={{backgroundColor: "#EE9F27", color: "#fff", fontWeight: "bold"}}>
                              
                              <th className="sort white-space-nowrap align-middle pe-3 ps-0 text-uppercase text-center" scope="col">{t("Code")}</th>
                              <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount">{t("Producteur")}</th>                              
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Campagne")}</th>  
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Superficie")}</th>
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Coordonnées")}</th>  
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Estimation")} (Kg)</th> 
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("QTE Livrée")} (kg)</th>
                              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Gap")}</th>
                              {/* <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type">{t("Position")}</th>                */}
                          </tr>
                          </thead>
                          <tbody className="list text-center" id="lead-details-table-body">
                               {parcelleList.map((parc,index)=>
                            <tr className="hover-actions-trigger btn-reveal-trigger position-static text-center">
                                  <td className="description align-middle white-space-nowrap text-black text-center text-700 py-2 pe-6" onClick={()=>ViewProducteur(parc.parcelle?.producteur?.code)}>{parc.code}</td>
                                  <td className="name align-middle white-space-nowrap py-2 ps-0 ">
                                    <span className="d-flex align-items-center text-1000 cursor-pointer" >
                                      <div className="avatar avatar-m me-3 status-online">
                                        {parc.parcelle?.producteur?.photo ?
                                          <img className="rounded-circle" src={parc.parcelle?.producteur?.photo} alt="" />
                                          :
                                          <>
                                          <img className="rounded-circle" src={personIcon} alt="" />
                                          </>
                                        }
                                        
                                      </div>
                                      <h6 className="mb-0 text-1000 fw-bold " style={{color: "#94a91b"}}>{parc.parcelle?.producteur?.nomComplet}</h6>
                                    </span>
                                    
                                  </td>

                                  {/* <td className="description align-middle white-space-nowrap fw-bold text-700 py-2 pe-6">{parc.parcelle?.producteur?.section?.libelle}</td> */}
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc.campagne?.libelle}</td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc.parcelle?.superficie}</td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc.parcelle?.latitude} , {parc.parcelle?.longitude}</td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc.estimation_production.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                                  <td className="align-middle text-center white-space-nowrap pe-0 action py-2 ">
                                    {parc.poids_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}                          
                                  </td>
                                  <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">
                                    {parc && parc.gap > 0 ? 
                                      <span className="text-danger" style={{fontWeight : "bold"}}>{parc.gap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}   
                                        <i className="fa-solid fa-arrow-up text-success" style={{fontWeight: "bold", fontSize: "12px"}}></i>
                                      </span> : ""
                                      // <span className="text-success" style={{fontWeight : "bold"}}>0</span>
                                    }  
                                  </td> 
                                  {/* <td className="description align-middle white-space-nowrap text-center fw-bold text-success text-700 py-2 pe-6">
                                    <button className="btn btn-default btn-sm p-2 mx-1" style={{backgroundColor: "#2ec27e", color: "#fff", fontWeight: "bold"}} onClick={()=>viewParcelleProd(parc.parcelle.producteur.code, parc.parcelle.producteur.total_parcelle_prod)}><i class="fa-sharp fa-solid fa-map-location text-white"></i></button>
                                  </td> */}
                                                            
                              </tr>
                              )}  
                          </tbody>
            </table>
                  </div>
                  <div className="row align-items-end justify-content-end py-2 pe-0 fs--1">
                    <div className="col-auto d-flex">
                         {prevUrl && (
                          <button className="btn btn-primary btn-sm py-0 " onClick={() => paginationHandler(prevUrl,0)}>{t("Précédent")}</button>
                        )}
                        {t("Page")} {page} {t("sur")} {totalPages}
                        {nextUrl  && (
                          <button className="btn btn-primary btn-sm py-0 " onClick={() => paginationHandler(nextUrl,1)}>{t("Suivant")}</button>
                        )} 
                      </div>
                    </div>
                 
                </div>
              </div>



                {/* exportation modal */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h6 class="modal-title" id="exampleModalLabel">Exporter la liste</h6>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={onSubmitExporteData}>
                    <div class="mb-1">
                      <label for="recipient-name" class="col-form-label">Format</label>
                      <select className="form-control" name="format_exp" onChange={(e)=>setFormat_exp(e.target.value)}>
                        <option value="" selected disabled>Choisir un format</option>
                        <option value="PDF">FORMAT PDF</option>
                        <option value="EXCEL">FORMAT EXCEL</option>
                     </select>
                    </div>
                    <div class="mb-1">
                      <label for="recipient-name" class="col-form-label">Campagne</label>
                      <select className="form-control" name="campagne_exp" onChange={(e)=>setCampagne_exp(e.target.value)}>
                        <option value="" selected>Toutes les campagnes</option>
                        {campagneList.map((camp,index)=>
                          <option value={camp.campagne?.id}>{camp.campagne?.libelle}</option>
                        )}
                        
                     </select>
                    </div>
                     <button type="submit" class="btn btn-primary float-end" >Exporter</button>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
            </Content>
        </>
    )
}

export default ProductionList;
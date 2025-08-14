import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../../Content";
import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../context/useContext";
import Validation from "../../Validation";
import Swal from "sweetalert2";
import person from '../../assets/img/avatar.jpg';
import { useTranslation } from "react-i18next";

import BaseUrl from "../../config/baseUrl";

// const baseUrl = 'http://127.0.0.1:8000/api';
const url = BaseUrl();
function ViewProj(){
  const {t} = useTranslation(); 
  const user = UserContext();
  const [errors, setErrorM] = useState({});
  const navigate = useNavigate();

  const {projetID} = useParams();
  const [proj,setProj] = useState([]);
  const [regionList,setRegionList] = useState([]);
  const [coopData,setCoopData] = useState({
    "region":"",
    "respCoop":"",
    "nomCoop":"",
    "contacts":"",
    "logo":"",
    "siege":""
  });
  const [errorNameCoop,setErrorNameCoop] = useState('');
  const [coopList,setCoopList] = useState([]);

  useEffect(()=>{
    try {
      axios.get(url+'/proj-list/?projID='+projetID, { cache: true }).then((resp)=>{
          setProj(resp.data[0]);
      })
    } catch (error) { 
      console.log(error);
    }

    try {
      axios.get(url+'/cooperative-list/?projID='+projetID, { cache: true }).then((resp)=>{
        setCoopList(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
    


    try {
      axios.get(url+'/region-list/', { cache: true }).then((resp)=>{
        setRegionList(resp.data);
      })
    } catch (error) { 
      console.log(error);
    }
  },[user]);

  const handleChangeCoop=(event)=>{
    setCoopData({
      ...coopData,
      [event.target.name]: event.target.value
    })
  }

  const handleFileChangeCoop=(event)=>{
    setCoopData({
        ...coopData,
        [event.target.name]:event.target.files[0]
    });
}

  function generateUniqueID() {
    const timestamp = new Date().getTime().toString(); 
    const randomNum = Math.random().toString(36).substr(2, 9);
    return timestamp + randomNum; 
  }

  const submitCoop=()=>{
    setErrorM(Validation(coopData));

    if(coopData.siege !="" && coopData.region !="" && coopData.nomCoop !="" && coopData.respCoop !="" && coopData.contacts !="" )
    {
      const _formData = new FormData();
      _formData.append('region',coopData.region);
      _formData.append('respCoop',coopData.respCoop);
      _formData.append('nomCoop',coopData.nomCoop);
      _formData.append('contacts',coopData.contacts);
      _formData.append('siege',coopData.siege);
      _formData.append('projetID',projetID);
      _formData.append('userID',user.id);

      if (coopData.logo !=""){

          const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
          const originalExtension = coopData.logo.name.split('.').pop();
          const newFileName = `${currentTimeInSeconds}_logo_${coopData.nomCoop}_${generateUniqueID()}.${originalExtension}`;
          const photo = new File([coopData.logo], newFileName, { type: coopData.logo.type });
        _formData.append('logo',photo);

      }

      setErrorNameCoop('');

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
        axios.post(url+'/create-new-cooperative/',_formData).then((resp)=>{
          Swal.close()

          if(resp.data.bool)
          {
            window.$('#addEventModal').modal('hide');
            Swal.fire({
              title: 'FELICITATION !',
              html: "La coopérative <b>"+coopData.nomCoop+"</b> a bien été enregistrée.",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                  axios.get(url+'/cooperative-list/?projID='+projetID, { cache: true }).then((resp)=>{
                    setCoopList(resp.data);
                  });
              }
            });

            setCoopData({
              "region":"",
              "respCoop":"",
              "logo":"",
              "nomCoop":"",
              "contacts":""
            })
          }
          else
          {
            setErrorNameCoop(resp.data.msg);
          }
        })
      } catch (error) {
        console.log(error);
      } 
      
    } 
  }

  const goToViewCooperative=(coopID)=>{
    navigate('/views-coop/'+coopID+'/');
    //window.location.reload();
  }

    return (
        <>
          <Content sideID={'projets'} parent={"params"}>        
            <div className="mb-9">
              <div className="row align-items-center justify-content-between g-3 mb-4">
                <div className="col-auto">
                  <h2 className="mb-0 mt-6">{proj?.nomProjet}</h2>
                </div>
              </div>
              <div className="row g-5">
                <div className="col-12 col-xxl-4">
                  <div className="row g-3 g-xxl-0 h-10">
                    <div className="col-12 col-md-7 col-xxl-12 mb-xxl-3">
                      <div className="card h-100">
                        <div className="card-body d-flex flex-column justify-content-between pb-3">
                          <div className="row align-items-center g-5 mb-3 text-center text-sm-start">
                            <div className="col-12 col-sm-auto mb-sm-2">
                              <div className="avatar avatar-5xl">
                                {
                                  proj.logo
                                      ? <img className="rounded-circle" src={proj.logo} alt={proj.nomProjet} />
                                      : <img className="rounded-circle" src={person} alt=""/>
                                }
                              </div>
                            </div>
                            <div className="col-12 col-sm-auto flex-1">
                              <h3>{user?.prenom}</h3>
                              <p className="text-800">{user?.email}</p>
                            </div>
                          </div>
                          <div className="d-flex flex-between-center border-top border-dashed border-300 pt-4">
                            <div>
                              <h6>{t('Coopératives')}</h6>
                              {
                                proj.total_coop_projet
                                    ? <p className="fs-1 text-800 mb-0 text-warning text-center">{proj.total_coop_projet}</p>
                                    : <p className="fs-1 text-800 mb-0 text-warning text-center">0</p>
                              }
                            </div>
                            <div>
                              <h6>{t('Producteurs')}</h6>
                              {
                                proj.total_producteurs_projet
                                    ? <p className="fs-1 text-800 mb-0 text-warning text-center">{proj.total_producteurs_projet}</p>
                                    : <p className="fs-1 text-800 mb-0 text-warning text-center">0</p>
                              }
                            </div>
                            <div>
                            <h6>{t('Parcelles')}</h6>
                              {
                                proj.total_parcelles_projet
                                    ? <p className="fs-1 text-800 mb-0 text-warning text-center">{proj.total_parcelles_projet}</p>
                                    : <p className="fs-1 text-800 mb-0 text-warning text-center">0</p>
                              }
                              {/*<p className="fs-1 text-800 mb-0 text-warning text-center">0</p>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-5 col-xxl-12 mb-xxl-3">
                      <div className="card h-10">
                        <div className="card-body pb-3">
                          <div className="d-flex align-items-center mb-3">
                            <h3 className="me-1">{t('Information du projet')}</h3>
                            <button className="btn btn-link p-0"><span className="fas fa-pen fs-0 ms-3 text-500"></span>
                            </button>
                          </div>
                          <h5 className="text-800 border-bottom pb-2">{proj?.nomProjet}</h5>
                          <p className="text-800 pt-3">{t('Catégorie')} : <b>{proj?.objectif}</b>
                          </p>
                          <div className="mb-3">
                            <h5 className="text-800">{t('Pays')}</h5><a href="#"><b>{proj?.countrie?.libelle}</b></a>
                          </div>
                          <h5 className="text-800 border-top pt-3">{t('Objectifs')}</h5>
                          <Link className="btn btn-warning btn-sm mt-2 form-control" to="/carte-coops/">{t('GEOPORTAIL')}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xxl-8">
                  <div className="mb-6">
                    <h3 className="mb-4">{t('COOPERATIVES')} <span className="text-700 fw-normal">({coopList.length})</span> 
                      {/* <button className="btn btn-primary btn-sm float-end" type="button" data-bs-toggle="modal" data-bs-target="#addEventModal">Ajouter une cooperative</button> */}
                    </h3>
                    <div className="border-top border-bottom border-200" id="customerOrdersTable" >
                      <div className="table-responsive scrollbar">
                        <table className="table text-center table-sm fs--1 mb-0">
                          <thead>
                          <tr className="bg-warning text-center">                          
                            <th className="sort white-space-nowrap align-content-center ps-0 pe-3 text-center" scope="col"
                                data-sort="order" style={{"width": "30%"}}>{t('Coopérative')}
                            </th> 
                            <th className="sort white-space-nowrap align-content-center ps-0 pe-3 text-center" scope="col"
                                data-sort="order" style={{"width": "30%"}}>{t('Fournisseur')}
                            </th>
                            <th className="sort white-space-nowrap align-content-center ps-0 pe-3 text-center" scope="col"
                                data-sort="order" style={{"width": "30%"}}>{t('Campagne')}
                            </th>                          
                           
                            <th className="sort align-content-center text-end pe-7 text-center" scope="col" data-sort="total"
                                style={{"width": "20%"}}>{t('Pays')}
                            </th>
                            <th className="sort align-content-center white-space-nowrap text-center pe-3" scope="col"
                                data-sort="payment_status" style={{"width": "20%"}}>{t('Région')}
                            </th>
                            <th className="sort align-content-center white-space-nowrap text-center " scope="col"
                                data-sort="delivery_type" style={{"width": "15%", "paddingRight" : "15px"}}>{t("Sections")}
                            </th>
                            <th className="sort align-content-center white-space-nowrap text-center pe-3" scope="col"
                                data-sort="fulfilment_status" style={{"width": "15%"}}>{t('Producteurs')}
                            </th>
                            <th className="sort align-content-center white-space-nowrap text-center pe-3" scope="col"
                                data-sort="fulfilment_status" style={{"width": "15%"}}>{t('Parcelles')}
                            </th>
                          </tr>
                          </thead>
                          <tbody className="list text-center" id="customer-order-table-body">
                          {coopList.map((coop,index)=>
                              <tr className="hover-actions-trigger btn-reveal-trigger position-static">                                
                                <td className="order align-middle white-space-nowrap ps-0 text-center"><span
                                  className="fw-semi-bold text-primary cursor-pointer"
                                  onClick={() => goToViewCooperative(coop?.id)}>{coop?.nomCoop}</span>
                                </td>
                                <td className="total align-middle text-center fw-semi-bold pe-7 text-1000">
                                  {coop?.get_fournisseur}
                                </td>
                                <td className="total align-middle text-center fw-semi-bold pe-7 text-1000">
                                  {coop?.campagne?.libelle}
                                </td>                                
                                <td className="total align-middle text-center fw-semi-bold pe-7 text-1000">
                                  {coop?.region?.countrie?.code}
                                </td>
                                <td className="payment_status align-middle white-space-nowrap text-center fw-bold text-700">
                                  {coop?.region?.libelle}
                                </td>
                                <td className="delivery_type align-middle white-space-nowrap text-900 fs--1 text-center">{coop?.total_sections_coop}</td>
                                <td className="fulfilment_status align-middle white-space-nowrap text-center fw-bold text-700">
                                  {coop?.total_producteurs_coop}
                                </td>
                                <td className="fulfilment_status align-middle white-space-nowrap text-center fw-bold text-700">
                                  {coop?.total_parcelles_coop}
                                </td>
                                
                              </tr>
                          )}

                          </tbody>
                        </table>
                      </div>
                      <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">                     
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* modal add cooperatives */}
            <div className="modal fade" id="addEventModal" data-bs-backdrop="static" role="dialog" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-md">
                <div className="modal-content border">
                  <div id="addEventForm" autoComplete="off">
                    <div className="modal-header px-card border-0">
                      <div className="w-100 d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-0 lh-sm text-1000">Création d'une coopérative</h5>
                        </div><button className="btn p-1 fs--2 text-900" type="button" data-bs-dismiss="modal" aria-label="Close">Fermer </button>
                      </div>
                    </div>
                    <div className="modal-body p-card py-0">
                      <div className="form-floating mb-5">
                        <select className="form-select" id="categorie" name="region" onChange={handleChangeCoop} value={coopData.region}>
                          <option selected="selected" value="">...</option>
                          {regionList.map((region,index)=>
                            <option value={region.id}>{region.libelle}</option>
                          )}
                        </select>
                        {errors.region && <span className="text-danger p-0 m-0">{errors.region}</span>}
                        <label htmlFor="eventLabel" className="pb-2 text-warning">Région</label>
                      </div>
                      
                      <div className="form-floating mb-3">
                        <input className="form-control" id="sigle" type="text" name="nomCoop" onChange={handleChangeCoop} value={coopData.nomCoop} />
                        {errors.nomCoop && <span className="text-danger p-0 m-0">{errors.nomCoop}</span>}
                        {errorNameCoop !="" && <span className="text-danger p-0 m-0">{errorNameCoop}</span>}
                        <label htmlFor="eventTitle" className="pb-2 text-warning">Nom de la coopérative</label>
                      </div>

                      <div className="form-floating mb-3">
                            <input className="form-control" id="sigle" type="text" name="siege" onChange={handleChangeCoop} value={coopData.siege} />
                            {errors.siege && <span className="text-danger p-0 m-0">{errors.siege}</span>}
                            <label htmlFor="eventTitle" className="pb-2 text-warning">Siege de la coopérative (Ville)</label>
                          </div>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="chef" type="text" name="respCoop" onChange={handleChangeCoop} value={coopData.respCoop} />
                        {errors.respCoop && <span className="text-danger p-0 m-0">{errors.respCoop}</span>}
                        <label htmlFor="eventTitle" className="pb-2 text-warning">Nom complet du responsable</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input className="form-control" id="titre" type="text" name="contacts" onChange={handleChangeCoop} value={coopData.contacts} />
                        {errors.contacts && <span className="text-danger p-0 m-0">{errors.contacts}</span>}
                        <label htmlFor="eventTitle" className="pb-2 text-warning">Contact de la coopérative</label>
                      </div>

                      <div className="form-floating mb-3">
                        <input className="form-control" id="titre" type="file" name="logo" onChange={handleFileChangeCoop} />
                        <label htmlFor="eventTitle" className="pb-2 text-warning">Logo de la coopérative (Facultatif)</label>
                      </div>
                      
                      
                      </div>
                      <div className="modal-footer d-flex justify-content-between align-items-center border-0">
                        <button className="btn btn-primary px-4 form-control" type="button" onClick={submitCoop}>Ajouter</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </>
    )
}

export default ViewProj;
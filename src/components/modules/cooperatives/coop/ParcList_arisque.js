import React, { Fragment, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../../../Content";
import personIcon from '../../../assets/img/avatar.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import BaseUrl from '../../../config/baseUrl';

const url = BaseUrl();
function ParcListRisque(){
  const { t } = useTranslation();
  const {coopID} = useParams();
  const navigate = useNavigate();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const [totalParc,setTotalParc] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [parcelleList, setParcelleList] = useState([]);


    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      axios.get(`${BaseUrl()}/parcelleArisque_projet/?page=${page}`, { cache: true })
        .then((resp) => {
          setParcelleList((prevList) => [...prevList, ...resp.data.results]); // Ajoute les nouvelles données
          setHasMore(resp.data.next !== null); // Met à jour hasMore en fonction de resp.data.next
          setPage((prevPage) => prevPage + 1); // Incrémente correctement la page
          setTotalParc(resp.data.count);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const onSearchParcelle=(event)=>{
        try {
          axios.get(url+'/parcelleArisque_projet/?q='+event.target.value+'', { cache: true }).then((resp)=>{
            
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

    //console.log(parcelleData);

   const [campagne_exp,setCampagne_exp] = useState('');
   const [format_exp,setFormat_exp] = useState('');

   var fileDownload = require('js-file-download');

   const onSubmitExporteData=(e)=>{
     e.preventDefault()

     try {
       axios.get(url+'/parcelleList_sup_4ha_projet/?format='+format_exp+'&campagne='+campagne_exp+'&coopID='+coopID,
         {responseType:'blob'}
       ).then((response)=>{
           if (format_exp == 'PDF'){
             fileDownload(response.data,'liste_parcelles.pdf');
           }else{
             fileDownload(response.data,'liste_parcelles.xlsx')
           }
           

       })
     } catch (error) {
       console.error('Erreur lors de l\'export :', error);
     }

   }


//console.log(parcelleList);


    return(
        <Fragment>
            <Content sideID={"cooperatives"} parent={"generalite"}>
            <h2 className="text-bold text-1100 mb-5 mt-5">{t('Liste des Parcelles à Risque')} ({totalParc})</h2>
                <div id="members">
                    <div className="row align-items-center justify-content-between g-3 mb-4">
                        <div className="col col-auto">
                            <div className="search-box">
                                <div className="position-relative" data-bs-toggle="search" data-bs-display="static">
                                    <input className="form-control search-input search" type="search"
                                           placeholder="Recherche une parcelle" aria-label="Search"
                                           onChange={onSearchParcelle}/>
                                    <span className="fas fa-search search-box-icon"></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="d-flex align-items-center">
                               
                            </div>
                        </div>
                </div>
                <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-white border-y border-300 mt-2 position-relative top-1">
                  <div className="table-responsive scrollbar ms-n1 ps-1">
                    <InfiniteScroll
                      dataLength={parcelleList.length} // Longueur actuelle des données
                      next={fetchData} // Fonction pour charger plus de données
                      hasMore={hasMore} // Condition pour continuer à charger
                      loader={<h4>Chargement...</h4>} // Indicateur de chargement
                    >
                      <table className="table fs--1 mb-0">
                            <thead>
                            <tr className="bg-warning">
                                
                                <th className="sort white-space-nowrap align-middle pe-3 ps-0 text-uppercase text-center" scope="col"  >{t('Code')}</th>
                                <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount" >{t('Producteur')}</th>
                                <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount" >{t('Section')}</th>
                                {/* <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage" >Campagne</th> */}
                                {/* <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="probability" >Certification</th>
                                <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="probability" >Code Certificat</th> */}
                                <th className="sort align-middle ps-0 text-center text-uppercase" scope="col" data-sort="date" >{t('Latitude')}</th>
                                <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type" >{t('Longitude')}</th>
                                {/* <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type" >Culture</th> */}
                                <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type" >{t('Superficie')} (ha)</th>
                                <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type" >{t('Risque')}</th>
                                {/*<th className="sort align-middle text-center text-uppercase" scope="col" data-sort="type" >Actions</th>*/}
                            </tr>
                            </thead>
                            <tbody className="list" id="lead-details-table-body">
                                {parcelleList.map((parc,index)=>
                              <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                                    <td className="description align-middle white-space-nowrap text-primary text-center fw-bold text-700 py-2 pe-6" onClick={()=>ViewProducteur(parc.producteur?.code)}>{parc.code}</td>
                                    <td className="name align-middle white-space-nowrap py-2 ps-0 ">
                                      <span className="d-flex align-items-center text-1000 cursor-pointer" >
                                        <div className="avatar avatar-m me-3 status-online">
                                          {parc.producteur?.photo ?
                                            <img className="rounded-circle" src={parc.producteur?.photo} alt="" />
                                            :
                                            <>
                                            <img className="rounded-circle" src={personIcon} alt="" />
                                            </>
                                          }
                                          
                                        </div>
                                        <h6 className="mb-0 text-1000 fw-bold " >{parc.producteur?.nomComplet}</h6>
                                      </span>
                                      
                                    </td>

                                    <td className="description align-middle white-space-nowrap fw-bold text-700 py-2 pe-6">{parc.producteur?.section?.libelle}</td>
                                    {/* <td className="description align-middle white-space-nowrap text-center fw-bold text-700 py-2 pe-6">{parc.campagne?.libelle}</td> */}
                                    {/* <td className="create_date text-end align-middle white-space-nowrap text-900 py-2 text-center">{parc.code_certif ? <b className="text-success">CERTIFIE</b> : <b className="text-danger"></b>}</td>
                                    <td className="create_by align-middle white-space-nowrap fw-semi-bold text-1000 text-center"><b className="text-success">{parc.code_certif}</b></td> */}
                                    <td className="create_by align-middle white-space-nowrap fw-semi-bold text-1000 text-center">{parc.latitude}</td>
                                    <td className="last_activity align-middle text-center py-2">
                                      <span className="fw-bold fs--1 text-900">{parc.longitude}</span>
                                    </td>
                                    {/* <td className="align-middle text-center white-space-nowrap pe-0 action py-2 ">
                                    {parc.culture?.libelle}
                                    </td> */}
                                    <td className="align-middle text-center white-space-nowrap pe-0 action py-2 ">
                                    {parc.superficie}
                                    </td>
                                    {parc.risque.id === 3 ? (
                                      <td className="align-middle text-center danger-space-nowrap pe-0 action py-2 ">
                                      <span style={{color: "red", fontWeight: 'bold'}}>{parc.risque.libelle}</span>
                                    </td>
                                    ): (
                                      <td className="align-middle text-center warning-space-nowrap pe-0 action py-2">
                                      <span>{parc.risque.libelle}</span>
                                    </td>
                                    )}
                                </tr>
                                )}  
                            </tbody>
                      </table>
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            </Content>
        </Fragment>
    )
}

export default ParcListRisque;
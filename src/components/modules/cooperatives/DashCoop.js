import { useEffect, useState } from "react";
import Content from "../../Content";
import UserContext from "../../context/useContext";
import Chart from 'react-apexcharts';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

import IconProducteur from '../../assets/img/Paysan.png'
import IconParcelle from '../../assets/img/Parcelle.png'
import IconSuperficie from '../../assets/img/Superficie.png'
import IconCO2 from '../../assets/img/IconCO2.png'
import IconSup4Ha from '../../assets/img/Icon4Ha.png'
import IconRisque from '../../assets/img/IconRisque.png'
import IconArbres from '../../assets/img/IconArbres.png'
import IconProduction from '../../assets/img/Production.png'
import { useTranslation } from "react-i18next";



import BaseUrl from "../../config/baseUrl";
import Validation from "../../Validation";
import Swal from "sweetalert2";

// const baseUrl = 'http://127.0.0.1:8000/api';
const url = BaseUrl();
function DashCoop(){
    const {t} = useTranslation();
    const user = UserContext();
    const [errors, setErrorM] = useState({});
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [dataPlantingCoop, setDataPlantingCoop] = useState([]);
    const [dataProducteur, setDataProducteurCoop] = useState([]);
    const [dataParcelle, setDataParcelleCoop] = useState([]);
    const [dataSuperficie, setDataSuperficieCoop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total_plants: 0, total_counted: 0, success_rate: 0 });
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

    useEffect(() => {
        axios.get(url+'/plants_par_espece/', { cache: true })
            .then((response) => {
                setData(response.data);
                console.log('data: ', response.data)
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        axios.get(url+'/global-stats/', { cache: true })
        .then(res => setStats(res.data))
        .catch(err => console.error(err));
    }, []);

    const chartData = {
        labels: data.map(item => item.espece__libelle),
        datasets: [
            {
                label: "",
                data: data.map(item => item.plants),
                backgroundColor: "#607929"
            }
        ]
    };

    useEffect(() => {
        axios.get(url+'/producteur_par_coop/', { cache: true })
            .then((response) => {
                setDataProducteurCoop(response.data);
                console.log('data: ', response.data)
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const chartDataProducteurCop = {
        labels: dataProducteur.map(item => item.section__cooperative__nomCoop),
        datasets: [
            {
                label: "",
                data: dataProducteur.map(item => item.total_producteur),
                backgroundColor: "#607929"
            }
        ]
    };

    useEffect(() => {
        axios.get(url+'/parcelle_par_coop/', { cache: true })
            .then((response) => {
                setDataParcelleCoop(response.data);
                console.log('data: ', response.data)
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const chartDataParcelleCop = {
        labels: dataParcelle.map(item => item.producteur__section__cooperative__nomCoop),
        datasets: [
            {
                label: "",
                data: dataParcelle.map(item => item.total_parcelles),
                backgroundColor: "#607929"
            }
        ]
    };


    useEffect(() => {
        axios.get(url+'/superficie_par_coop/', { cache: true })
            .then((response) => {
                setDataSuperficieCoop(response.data);
                console.log('data: ', response.data)
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const chartDataSuperficieCop = {
        labels: dataSuperficie.map(item => item.producteur__section__cooperative__nomCoop),
        datasets: [
            {
                label: "",
                data: dataSuperficie.map(item => item.superficie),
                backgroundColor: "#607929"
            }
        ]
    };

    useEffect(() => {
        axios.get(url+'/plants_par_coop/', { cache: true })
            .then((response) => {
                setDataPlantingCoop(response.data);
                console.log('data: ', response.data)
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    const chartDatalantingCoop = {
        labels: dataPlantingCoop.map(item => item.parcelle__producteur__section__cooperative__nomCoop),
        datasets: [
            {
                label: "",
                data: dataPlantingCoop.map(item => item.plant_recus),
                backgroundColor: "#607929"
            }
        ]
    };


    const chartDataRisque = {
        labels: ["ZÉRO", "MODÉRÉ", "ÉLEVÉ"],
        datasets: [
            {
                label: "",
                data: [4135, 58, 3],
                backgroundColor: "#607929"
            }
        ]
    };

//   useEffect(()=>{
//     try {
//       axios.get(url+'/proj-list/?projID='+projetID).then((resp)=>{
//           setProj(resp.data[0]);
//       })
//     } catch (error) {
//       console.log(error);
//     }

//     try {
//       axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
//         setCoopList(resp.data);
//       });
//     } catch (error) {
//       console.log(error);
//     }



//     try {
//       axios.get(url+'/region-list/').then((resp)=>{
//         setRegionList(resp.data);
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   },[user]);

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

//   const submitCoop=()=>{
//     setErrorM(Validation(coopData));

//     if(coopData.siege !="" && coopData.region !="" && coopData.nomCoop !="" && coopData.respCoop !="" && coopData.contacts !="" )
//     {
//       const _formData = new FormData();
//         _formData.append('region',coopData.region);
//         _formData.append('respCoop',coopData.respCoop);
//         _formData.append('nomCoop',coopData.nomCoop);
//         _formData.append('contacts',coopData.contacts);
//         _formData.append('siege',coopData.siege);
//         _formData.append('projetID',projetID);
//         _formData.append('userID',user.id);

//       if (coopData.logo !=""){
//           const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
//           const originalExtension = coopData.logo.name.split('.').pop();
//           const newFileName = `${currentTimeInSeconds}_logo_${coopData.nomCoop}_${generateUniqueID()}.${originalExtension}`;
//           const photo = new File([coopData.logo], newFileName, { type: coopData.logo.type });
//         _formData.append('logo',photo);

//       }

//       setErrorNameCoop('');

//       Swal.fire({
//         title: 'Enregistrement...',
//         html: 'Veillez patientez...',
//         allowEscapeKey: false,
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading()
//         },

//       });

//        try {
//         axios.post(url+'/create-new-cooperative/',_formData).then((resp)=>{
//           Swal.close()

//           if(resp.data.bool)
//           {
//             window.$('#addEventModal').modal('hide');
//             Swal.fire({
//               title: 'FELICITATION !',
//               html: "La coopérative <b>"+coopData.nomCoop+"</b> a bien été enregistrée.",
//               icon: 'success',
//               showCancelButton: false,
//               confirmButtonColor: '#3085d6',
//               confirmButtonText: 'OK'
//             }).then((result) => {
//               if (result.isConfirmed) {
//                   axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
//                     setCoopList(resp.data);
//                   });

//               }
//             });

//             setCoopData({
//               "region":"",
//               "respCoop":"",
//               "logo":"",
//               "nomCoop":"",
//               "contacts":""
//             })
//           }
//           else
//           {
//             setErrorNameCoop(resp.data.msg);
//           }
//         })
//       } catch (error) {
//         console.log(error);
//       }

//     }
//   }

  const goToViewCooperative=(coopID)=>{
    navigate('/views-coop/'+coopID+'/');
    //window.location.reload();
  }


    const [firstChart,setFirstChart] = useState({
      options: { 
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        },
        {
          name: "series-2",
          data: [3, 50, 405, 10, 19, 80, 30, 21]
        },
        //on peut creer plusieur series
      ]
    });

    // useEffect(()=>{
    //   if(user && user?.id){
    //       // console.log(user.id)
    //     try {
    //           axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
    //           setCoopList(resp.data);
    //         // console.log(resp.data[0]);

    //         // axios.get(url+'/producteurs-by-section/?cooperative='+resp.data[0]?.id).then((response)=>{
    //         //   const states = Object.keys(response.data.dataSection).map(key=> response.data.dataSection[key]);
    //         //   // console.log(states)
    //         //    SetSectionStateData(
    //         //     {
    //         //       series: Object.values(response.data.dataSection),
    //         //       labels: states.map((lab)=>lab.libelle)
    //         //     }
    //         //   )
    //         //
    //         // });

    //         // // Parcelles Par Risque
    //         // axios.get(url+'/parcelle_by_risque/?cooperative='+resp.data[0]?.id).then((response)=>{
    //         //   const states2 = Object.keys(response.data.dataRisque).map(key=> response.data.dataRisque[key]);
    //         //   // console.log(states2)
    //         //    SetRisqueStateData(
    //         //     {
    //         //       series: Object.values(response.data.dataRisque),
    //         //       labels: states2.map((lab)=>lab.libelle)
    //         //     }
    //         //   )
    //         //
    //         // });

    //         // axios.get(url+'/parcelles-carte/?manager='+user.id).then((resp)=>{
    //         //     //setDataIsLoading(false);
    //         //     setAllpoints(resp.data.results);
    //         //     setTotalPoint(resp.data.count)
    //         //     console.log(resp.data)
    //         //   })

    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // },[user]);

    const options3 = {
        colors: ["#607929"],
      // colors: ['#FF9800'],
      xaxis: {
          categories: [                
                "CAFUVA SCOOPS",
                "COOP CA CADESA",
                "COOP CA COOPRATE",
                "COOP CA ECPSB",
                "COOP CA LANA",
                "COOP CA SCABK",
                "COOP CA SCAD",
                "COOP CA SCOWED-2",
                "CPI SCOOPS",
                "SCANEB COOP CA",
                "SCANT SCOOPS",
                "SCELA COOP-CA",
                "SCOOPANAB COOP CA",
                "SCOOPEN COOP CA",
                "SCOOPS CAF2B",
                "SCOOPS CAMVA",
                "SCOOPS-CPAM",
                "SOCOB SCOOPS",
                "SPAD BLOLEQUIN",
                "SPAD GAGNOA 2"
          ]
      }
    }

    // const optionsPlantingEspèce = {
    //     colors: ["#607929"],
    //   // colors: ['#FF9800'],
    //   xaxis: {
    //       categories: [
    //           "ACAJOU",
    //           "CEDRELA",
    //           "BETE",
    //           "FRAKE",
    //           "FRAMIRE",
    //           "PETIT COLA",
    //       ]
    //   }
    // }

    //  const seriePlantingEspèce = [
    //   {
    //     colors: ["#607929"],
    //       name: "Espèce",
    //       data: [500, 700, 300, 1000, 400 , 200]
    //   },
    // ]

    const serie2 = [
      {
        colors: ["#607929"],
          name: "Section",
          data: [46, 184, 91, 287, 240, 174, 229, 108, 262, 141, 141, 114, 214, 266, 100, 90, 292, 227, 330, 326]
      },
    ]

    const seriePlantingSection = [
      {
        colors: ["#607929"],
          name: "Section",
          data: [0, 0, 0, 0, 0 , 0]
      },
    ]

    const seriesPie= [{
        name: "Risque",
        data: [0, 0, 0]
    }]

    const optionsPie= {
      colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
      chart: {
        width: "100%",
        type: 'pie',
      },
      labels: [],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }

    const options4 = {
      // colors: ['#008000'],
      colors: ["#607929"],
      //   colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
    //   colors: ["#d5d5d5"],
        labels: []
      // xaxis: {
      //     categories: risqueStateData.labels
      // }
    }
    const labels = []
    // const responsive: {
    //     breakpoint: "480",
    //     options: {
    //       chart: {
    //         width: "200",
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    // }
    const serie4 = [
      {
          colors: ["#607929"],
          name: "Risque",
          data: [0, 0, 0]
          // data: risqueStateData.series.map((serie)=>serie.parcelle_num)
      },
    ]

    // const PieChart = () => {
    //     const [state, setState] = React.useState({
          
    //         series: [4132, 61, 3],
    //         options: {
    //           chart: {
    //             width: 380,
    //             type: 'pie',
    //           },
    //           labels: ['zéro', 'modéré', 'élevé'],
    //           responsive: [{
    //             breakpoint: 480,
    //             options: {
    //               chart: {
    //                 width: 200
    //               },
    //               legend: {
    //                 position: 'bottom'
    //               }
    //             }
    //           }]
    //         },
          
          
    // });

    const optionsRisque = {
        colors: ["#607929"],
        xaxis: {
            categories: [                
                "Zéro",
                "Modéré",
                "Elevé",
            ]
        }
    }

    const serieRisque = [
        {
            colors: ["#607929"],
            name: "Risque",
            data: [3, 61, 4132]
            // data: risqueStateData.series.map((serie)=>serie.parcelle_num)
        },
      ]

    


    return (
        <Content sideID={"dash-coop"} parent={""}>
          <h2 className="mt-5">{t("Bienvenue")} | {user?.nom}</h2>
        <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 pt-3 pb-2 border-top border-300">
            <div className="row">
                <div className="col-md-6">
                    <div class="card">
                        <div class="card-body" style={{marginBottom : "-20px"}}>
                            <h5 class="card-title" style={{
                                backgroundColor: "#fbffe9",
                                marginTop: "-15px",
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
                            }}>{t("Vue Principale")}</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="card mb-2">
                                            <div class="card-body" style={{marginBottom: "-20px"}}>
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <i className="" >
                                                            <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconProduction} width="50" height="50" alt=""/>
                                                        </i>
                                                    </div>
                                                    <div className="col-xs-9">
                                                        <h2 className="card-title text-end text-primary"
                                                            style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                            <h2 style={{
                                                                color: "#000",
                                                                whiteSpace: "nowrap",
                                                                fontFamily: "Inter, Helvetica",
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                lineHeight: "normal",
                                                            }}>{t("Production")} (Kg)</h2>
                                                            <Link style={{color: "#000"}}
                                                                to="">
                                                                0
                                                                {/*<i className="fa-solid fa-1x fa-arrow-circle-right"*/}
                                                                {/*style={{color: "#000"}}></i>*/}
                                                            </Link>
                                                        </h2>

                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="card mb-2">
                                            <div class="card-body" style={{marginBottom: "-20px"}}>
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <i className="" >
                                                            <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconProducteur} width="50" height="50" alt=""/>
                                                        </i>
                                                    </div>
                                                    <div className="col-xs-9">

                                                            <h2 className="card-title text-end text-primary"
                                                                style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                                <h2 style={{
                                                                    color: "#000",
                                                                    whiteSpace: "nowrap",
                                                                    fontFamily: "Inter, Helvetica",
                                                                    fontSize: "16px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "normal",
                                                                }}>{t("Producteurs")}</h2>
                                                                <Link style={{color: "#000"}}
                                                                    to="">
                                                                        <span style={{
                                                                            color: "#000",
                                                                            
                                                                        }}
                                                                        >314</span>
                                                                    {/*<i className="fa-solid fa-1x fa-arrow-circle-right"*/}
                                                                    {/*style={{color: "#000"}}></i>*/}
                                                                </Link>
                                                            </h2>

                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div class="card mb-2">
                                            <div class="card-body" style={{marginBottom: "-20px"}}>
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <i className="" >
                                                            <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconParcelle} width="50" height="50" alt=""/>
                                                        </i>
                                                    </div>
                                                    <div className="col-xs-9">

                                                            <h2 className="card-title text-end text-primary"
                                                                style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                                <h2 style={{
                                                                    color: "#000",
                                                                    whiteSpace: "nowrap",
                                                                    fontFamily: "Inter, Helvetica",
                                                                    fontSize: "16px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "normal",
                                                                }}>{t("Parcelles")}</h2>
                                                                <Link style={{color: "#000"}}
                                                                    to="">
                                                                    320
                                                                    
                                                                </Link>
                                                            </h2>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div class="card mb-2">
                                            <div class="card-body" style={{marginBottom: "-20px"}}>
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <i className="" >
                                                            <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconSuperficie} width="50" height="50" alt=""/>
                                                        </i>
                                                    </div>
                                                    <div className="col-xs-9">
                                                            <h2 className="card-title text-end text-primary"
                                                                style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                                <h2 style={{
                                                                    color: "#000",
                                                                    whiteSpace: "nowrap",
                                                                    fontFamily: "Inter, Helvetica",
                                                                    fontSize: "16px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "normal",
                                                                }}>{t("Superficie")}(Ha)</h2>

                                                                <span style={{
                                                                color: "#000",
                                                            }}
                                                            >633.169</span>
                                                            </h2>

                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div class="card">
                        <div class="card-body" style={{marginBottom : "-20px"}}>
                            <h5 class="card-title" style={{
                                backgroundColor: "#fbffe9",
                                marginTop: "-15px",
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
                            }}>{t("CO2 & Conformité RDUE")}</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="card mb-2">
                                        <div class="card-body" style={{marginBottom: "-20px"}}>
                                            <div className="row">
                                                <div className="col-xs-3">
                                                    <i className="" >
                                                        <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconCO2} width="50" height="50" alt=""/>
                                                        {/* <i className="fa-solid fa-4x fa-smog" style={{color: "#92ACF0", marginLeft: "-20px", marginTop: "-10px"}}></i> */}
                                                    </i>
                                                </div>
                                                <div className="col-xs-9">
                                                 <h2 className="card-title text-end text-primary"
                                                            style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                            <h2 style={{
                                                                color: "#000",
                                                                whiteSpace: "nowrap",
                                                                fontFamily: "Inter, Helvetica",
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                lineHeight: "normal",
                                                            }}>{t("CO2 éq(T)")}</h2>
                                                            <span style={{
                                                                color: "#000",
                                                                

                                                            }}
                                                            >19.5932 </span>
                                                        </h2>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="card mb-2">
                                            <div class="card-body" style={{marginBottom: "-20px"}}>
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <i className="" >
                                                            <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconSup4Ha} width="50" height="50" alt=""/>
                                                        </i>
                                                    </div>
                                                    <div className="col-xs-9">
                                                       <h2 className="card-title text-end text-primary"
                                                                style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                                <h2 style={{
                                                                    color: "#000",
                                                                    whiteSpace: "nowrap",
                                                                    fontFamily: "Inter, Helvetica",
                                                                    fontSize: "16px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "normal",
                                                                }}>{t("Parcelles > à (4Ha)")}</h2>
                                                                <Link style={{color: "#000"}}
                                                                    to="/parcelleList_sup_4ha_projet/">
                                                                    <span>19</span>&#160;                                                                    
                                                                    <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i>
                                                                </Link>
                                                            </h2>

                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div class="card mb-2">
                                            <div class="card-body" style={{marginBottom: "-20px"}}>
                                                <div className="row">
                                                    <div className="col-xs-3">
                                                        <i className="" >
                                                            <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconArbres} width="50" height="50" alt=""/>
                                                        </i>
                                                    </div>
                                                    <div className="col-xs-9">
                                                            <h2 className="card-title text-end text-primary"
                                                                style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                                <h2 style={{
                                                                    color: "#000",
                                                                    whiteSpace: "nowrap",
                                                                    fontFamily: "Inter, Helvetica",
                                                                    fontSize: "16px",
                                                                    fontWeight: "400",
                                                                    lineHeight: "normal",
                                                                }}>{t("Monitoring / Planting")}</h2>
                                                                    <Link style={{color: "#000"}}
                                                                        to="/carte-parcelles/">
                                                                        <span style={{
                                                                            color: "#000",                                                                                                                                         

                                                                        }}
                                                                        >{stats.total_counted} ({stats.success_rate} %) / {stats.total_plants}
                                                                            {/*{cooperative.total_parcelles_coop_risk_modere.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}*/}
                                                                        </span>&#160;                                                                    
                                                                        <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i>
                                                                    </Link>                                                                

                                                            </h2>

                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div class="card mb-2">
                                        <div class="card-body" style={{marginBottom: "-20px"}}>
                                            <div className="row">
                                                <div className="col-xs-3">
                                                    <i className="" >
                                                        <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconRisque} width="50" height="50" alt=""/>
                                                    </i>
                                                </div>
                                                <div className="col-xs-9">
                                                     <h2 className="card-title text-end text-primary"
                                                            style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
                                                            <h2 style={{
                                                                color: "#000",
                                                                whiteSpace: "nowrap",
                                                                fontFamily: "Inter, Helvetica",
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                lineHeight: "normal",
                                                            }}>{t("Parcelles à risque")}</h2>
                                                            <Link style={{color: "#000"}}
                                                                to="/parcelle_arisque_projet/">
                                                                <span style={{
                                                                    color: "#000",                                                                     

                                                                }}
                                                                >0
                                                                    {/*{cooperative.total_parcelles_coop_risk_modere.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}*/}
                                                                </span>&#160;                                                                    
                                                                <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i>
                                                            </Link>
                                                        </h2>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-5 bg-opacity-50 border-2 rounded-2">
                {user &&
                    <>
                        <hr/>
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
                                    <div className="card-body">
                                        <h4 class="card-title" style={{
                                            backgroundColor: "#fbffe9",
                                            marginTop: "-15px",
                                            textAlign: "center",
                                            borderRadius: "10px",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            height: "30px",
                                            color: "#607929",
                                            whiteSpace: "nowrap",
                                            fontFamily: "Inter, Helvetica",
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            lineHeight: "normal",
                                        }}>{t("Producteurs / Coopérative")}</h4>
                                        {loading ? (
                                            <p>Chargement des statistiques...</p>
                                        ) : (
                                            <Bar data={chartDataProducteurCop} />
                                        )}
                                        {/* <Chart
                                            options={options3}
                                            series={serie2}
                                            type="bar"
                                            width="100%"
                                        /> */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-xs-12">
                                <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
                                    <div className="card-body" id="chart">
                                        <h4 class="card-title" style={{
                                            backgroundColor: "#fbffe9",
                                            marginTop: "-15px",
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
                                        }}>{t("Parcelles / Risque")}</h4>
                                            <Chart
                                                options={options4}
                                                series={serie4}
                                                type="bar"
                                                width="100%"
                                            />
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-xs-12">
                                <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
                                    <div className="card-body">
                                        <h4 class="card-title" style={{
                                            backgroundColor: "#fbffe9",
                                            marginTop: "-15px",
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
                                        }}>{t("Parcelles / Coopérative")}</h4>
                                        {loading ? (
                                            <p>Chargement des statistiques...</p>
                                        ) : (
                                            <Bar data={chartDataParcelleCop} />
                                        )}
                                        {/* <Chart
                                            options={options3}
                                            series={serie2}
                                            type="bar"
                                            width="100%"
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-xs-12">
                                <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
                                    <div className="card-body">
                                    <h4 class="card-title" style={{
                                            backgroundColor: "#fbffe9",
                                            marginTop: "-15px",
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
                                        }}>{t("Superficie / Coopérative")}</h4>
                                        {loading ? (
                                            <p>Chargement des statistiques...</p>
                                        ) : (
                                            <Bar data={chartDataSuperficieCop} />
                                        )}
                                        {/* <Chart
                                            options={options3}
                                            series={serie2}
                                            type="bar"
                                            width="100%"
                                        /> */}
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-xs-12">
                                <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
                                    <div className="card-body">
                                        <h4 class="card-title" style={{
                                            backgroundColor: "#fbffe9",
                                            marginTop: "-15px",
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
                                        }}>{t("Plantings / Coopérative")}</h4>
                                        {loading ? (
                                            <p>Chargement des statistiques...</p>
                                        ) : (
                                            <Bar data={chartDatalantingCoop} />
                                        )}
                                        {/* <Chart
                                            options={options3}
                                            series={serie2}
                                            type="bar"
                                            width="100%"
                                        /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-xs-12">
                                <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
                                    <div className="card-body">
                                    <h4 class="card-title" style={{
                                            backgroundColor: "#fbffe9",
                                            marginTop: "-15px",
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
                                        }}>{t("Plantings / espèces")}</h4>
                                        {loading ? (
                                            <p>Chargement des statistiques...</p>
                                        ) : (
                                            <Bar data={chartData} />
                                        )}
                                        {/* <Chart
                                            options={optionsPlantingEspèce}
                                            series={seriePlantingEspèce}
                                            type="bar"
                                            width="100%"
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
        </Content>

    )
}

export default DashCoop;


// import { useEffect, useState } from "react";
// import Content from "../../Content";
// import UserContext from "../../context/useContext";
// import Chart from 'react-apexcharts';
// import { Chart as ChartJS } from 'chart.js/auto'
// import { Bar, Doughnut } from "react-chartjs-2";
// import axios from "axios";
// import {Link, useNavigate, useParams} from "react-router-dom";

// import IconProducteur from '../../assets/img/Paysan.png'
// import IconParcelle from '../../assets/img/Parcelle.png'
// import IconSuperficie from '../../assets/img/Superficie.png'
// import IconCO2 from '../../assets/img/IconCO2.png'
// import IconSup4Ha from '../../assets/img/Icon4Ha.png'
// import IconRisque from '../../assets/img/IconRisque.png'
// import IconArbres from '../../assets/img/IconArbres.png'
// import IconProduction from '../../assets/img/Production.png'
// import { useTranslation } from "react-i18next";



// import BaseUrl from "../../config/baseUrl";
// import Validation from "../../Validation";
// import Swal from "sweetalert2";

// // const baseUrl = 'http://127.0.0.1:8000/api';
// const url = BaseUrl();
// function DashCoop(){
//     const {t} = useTranslation();
//     const user = UserContext();
//     const [errors, setErrorM] = useState({});
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [dataPlantingCoop, setDataPlantingCoop] = useState([]);
//     const [dataProducteur, setDataProducteurCoop] = useState([]);
//     const [dataParcelle, setDataParcelleCoop] = useState([]);
//     const [dataSuperficie, setDataSuperficieCoop] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const {projetID} = useParams();
//     const [proj,setProj] = useState([]);
//     const [regionList,setRegionList] = useState([]);
//     const [coopData,setCoopData] = useState({
//         "region":"",
//         "respCoop":"",
//         "nomCoop":"",
//         "contacts":"",
//         "logo":"",
//         "siege":""
//   });
//   const [errorNameCoop,setErrorNameCoop] = useState('');
//   const [coopList,setCoopList] = useState([]);

//     useEffect(() => {
//         axios.get(url+'/plants_par_espece/', { cache: true })
//             .then((response) => {
//                 setData(response.data);
//                 console.log('data: ', response.data)
//                 setLoading(false);
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const chartData = {
//         labels: data.map(item => item.espece__libelle),
//         datasets: [
//             {
//                 label: "",
//                 data: data.map(item => item.plants),
//                 backgroundColor: "#607929"
//             }
//         ]
//     };

//     useEffect(() => {
//         axios.get(url+'/producteur_par_coop/', { cache: true })
//             .then((response) => {
//                 setDataProducteurCoop(response.data);
//                 console.log('data: ', response.data)
//                 setLoading(false);
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const chartDataProducteurCop = {
//         labels: dataProducteur.map(item => item.section__cooperative__nomCoop),
//         datasets: [
//             {
//                 label: "",
//                 data: dataProducteur.map(item => item.total_producteur),
//                 backgroundColor: "#607929"
//             }
//         ]
//     };

//     useEffect(() => {
//         axios.get(url+'/parcelle_par_coop/', { cache: true })
//             .then((response) => {
//                 setDataParcelleCoop(response.data);
//                 console.log('data: ', response.data)
//                 setLoading(false);
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const chartDataParcelleCop = {
//         labels: dataParcelle.map(item => item.producteur__section__cooperative__nomCoop),
//         datasets: [
//             {
//                 label: "",
//                 data: dataParcelle.map(item => item.total_parcelles),
//                 backgroundColor: "#607929"
//             }
//         ]
//     };


//     useEffect(() => {
//         axios.get(url+'/superficie_par_coop/', { cache: true })
//             .then((response) => {
//                 setDataSuperficieCoop(response.data);
//                 console.log('data: ', response.data)
//                 setLoading(false);
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const chartDataSuperficieCop = {
//         labels: dataSuperficie.map(item => item.producteur__section__cooperative__nomCoop),
//         datasets: [
//             {
//                 label: "",
//                 data: dataSuperficie.map(item => item.superficie),
//                 backgroundColor: "#607929"
//             }
//         ]
//     };

//     useEffect(() => {
//         axios.get(url+'/plants_par_coop/', { cache: true })
//             .then((response) => {
//                 setDataPlantingCoop(response.data);
//                 console.log('data: ', response.data)
//                 setLoading(false);
//             })
//             .catch((error) => console.error(error));
//     }, []);

//     const chartDatalantingCoop = {
//         labels: dataPlantingCoop.map(item => item.parcelle__producteur__section__cooperative__nomCoop),
//         datasets: [
//             {
//                 label: "",
//                 data: dataPlantingCoop.map(item => item.plant_recus),
//                 backgroundColor: "#607929"
//             }
//         ]
//     };


//     const chartDataRisque = {
//         labels: ["ZÉRO", "MODÉRÉ", "ÉLEVÉ"],
//         datasets: [
//             {
//                 label: "",
//                 data: [0, 0, 0],
//                 backgroundColor: "#607929"
//             }
//         ]
//     };

// //   useEffect(()=>{
// //     try {
// //       axios.get(url+'/proj-list/?projID='+projetID).then((resp)=>{
// //           setProj(resp.data[0]);
// //       })
// //     } catch (error) {
// //       console.log(error);
// //     }

// //     try {
// //       axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
// //         setCoopList(resp.data);
// //       });
// //     } catch (error) {
// //       console.log(error);
// //     }



// //     try {
// //       axios.get(url+'/region-list/').then((resp)=>{
// //         setRegionList(resp.data);
// //       })
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   },[user]);

//   const handleChangeCoop=(event)=>{
//     setCoopData({
//       ...coopData,
//       [event.target.name]: event.target.value
//     })
//   }

//   const handleFileChangeCoop=(event)=>{
//     setCoopData({
//         ...coopData,
//         [event.target.name]:event.target.files[0]
//     });
// }

//   function generateUniqueID() {
//     const timestamp = new Date().getTime().toString();
//     const randomNum = Math.random().toString(36).substr(2, 9);
//     return timestamp + randomNum;
//   }

// //   const submitCoop=()=>{
// //     setErrorM(Validation(coopData));

// //     if(coopData.siege !="" && coopData.region !="" && coopData.nomCoop !="" && coopData.respCoop !="" && coopData.contacts !="" )
// //     {
// //       const _formData = new FormData();
// //         _formData.append('region',coopData.region);
// //         _formData.append('respCoop',coopData.respCoop);
// //         _formData.append('nomCoop',coopData.nomCoop);
// //         _formData.append('contacts',coopData.contacts);
// //         _formData.append('siege',coopData.siege);
// //         _formData.append('projetID',projetID);
// //         _formData.append('userID',user.id);

// //       if (coopData.logo !=""){
// //           const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
// //           const originalExtension = coopData.logo.name.split('.').pop();
// //           const newFileName = `${currentTimeInSeconds}_logo_${coopData.nomCoop}_${generateUniqueID()}.${originalExtension}`;
// //           const photo = new File([coopData.logo], newFileName, { type: coopData.logo.type });
// //         _formData.append('logo',photo);

// //       }

// //       setErrorNameCoop('');

// //       Swal.fire({
// //         title: 'Enregistrement...',
// //         html: 'Veillez patientez...',
// //         allowEscapeKey: false,
// //         allowOutsideClick: false,
// //         didOpen: () => {
// //           Swal.showLoading()
// //         },

// //       });

// //        try {
// //         axios.post(url+'/create-new-cooperative/',_formData).then((resp)=>{
// //           Swal.close()

// //           if(resp.data.bool)
// //           {
// //             window.$('#addEventModal').modal('hide');
// //             Swal.fire({
// //               title: 'FELICITATION !',
// //               html: "La coopérative <b>"+coopData.nomCoop+"</b> a bien été enregistrée.",
// //               icon: 'success',
// //               showCancelButton: false,
// //               confirmButtonColor: '#3085d6',
// //               confirmButtonText: 'OK'
// //             }).then((result) => {
// //               if (result.isConfirmed) {
// //                   axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
// //                     setCoopList(resp.data);
// //                   });

// //               }
// //             });

// //             setCoopData({
// //               "region":"",
// //               "respCoop":"",
// //               "logo":"",
// //               "nomCoop":"",
// //               "contacts":""
// //             })
// //           }
// //           else
// //           {
// //             setErrorNameCoop(resp.data.msg);
// //           }
// //         })
// //       } catch (error) {
// //         console.log(error);
// //       }

// //     }
// //   }

//   const goToViewCooperative=(coopID)=>{
//     navigate('/views-coop/'+coopID+'/');
//     //window.location.reload();
//   }


//     const [firstChart,setFirstChart] = useState({
//       options: { 
//         chart: {
//           id: "basic-bar"
//         },
//         xaxis: {
//           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
//         }
//       },
//       series: [
//         {
//           name: "series-1",
//           data: [30, 40, 45, 50, 49, 60, 70, 91]
//         },
//         {
//           name: "series-2",
//           data: [3, 50, 405, 10, 19, 80, 30, 21]
//         },
//         //on peut creer plusieur series
//       ]
//     });

//     // useEffect(()=>{
//     //   if(user && user?.id){
//     //       // console.log(user.id)
//     //     try {
//     //           axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
//     //           setCoopList(resp.data);
//     //         // console.log(resp.data[0]);

//     //         // axios.get(url+'/producteurs-by-section/?cooperative='+resp.data[0]?.id).then((response)=>{
//     //         //   const states = Object.keys(response.data.dataSection).map(key=> response.data.dataSection[key]);
//     //         //   // console.log(states)
//     //         //    SetSectionStateData(
//     //         //     {
//     //         //       series: Object.values(response.data.dataSection),
//     //         //       labels: states.map((lab)=>lab.libelle)
//     //         //     }
//     //         //   )
//     //         //
//     //         // });

//     //         // // Parcelles Par Risque
//     //         // axios.get(url+'/parcelle_by_risque/?cooperative='+resp.data[0]?.id).then((response)=>{
//     //         //   const states2 = Object.keys(response.data.dataRisque).map(key=> response.data.dataRisque[key]);
//     //         //   // console.log(states2)
//     //         //    SetRisqueStateData(
//     //         //     {
//     //         //       series: Object.values(response.data.dataRisque),
//     //         //       labels: states2.map((lab)=>lab.libelle)
//     //         //     }
//     //         //   )
//     //         //
//     //         // });

//     //         // axios.get(url+'/parcelles-carte/?manager='+user.id).then((resp)=>{
//     //         //     //setDataIsLoading(false);
//     //         //     setAllpoints(resp.data.results);
//     //         //     setTotalPoint(resp.data.count)
//     //         //     console.log(resp.data)
//     //         //   })

//     //       });
//     //     } catch (error) {
//     //       console.log(error);
//     //     }
//     //   }
//     // },[user]);

//     const options3 = {
//         colors: ["#607929"],
//       // colors: ['#FF9800'],
//       xaxis: {
//           categories: [                
//                 "CAFUVA SCOOPS",
//                 "COOP CA CADESA",
//                 "COOP CA COOPRATE",
//                 "COOP CA ECPSB",
//                 "COOP CA LANA",
//                 "COOP CA SCABK",
//                 "COOP CA SCAD",
//                 "COOP CA SCOWED-2",
//                 "CPI SCOOPS",
//                 "SCANEB COOP CA",
//                 "SCANT SCOOPS",
//                 "SCELA COOP-CA",
//                 "SCOOPANAB COOP CA",
//                 "SCOOPEN COOP CA",
//                 "SCOOPS CAF2B",
//                 "SCOOPS CAMVA",
//                 "SCOOPS-CPAM",
//                 "SOCOB SCOOPS",
//                 "SPAD BLOLEQUIN",
//                 "SPAD GAGNOA 2"
//           ]
//       }
//     }

//     // const optionsPlantingEspèce = {
//     //     colors: ["#607929"],
//     //   // colors: ['#FF9800'],
//     //   xaxis: {
//     //       categories: [
//     //           "ACAJOU",
//     //           "CEDRELA",
//     //           "BETE",
//     //           "FRAKE",
//     //           "FRAMIRE",
//     //           "PETIT COLA",
//     //       ]
//     //   }
//     // }

//     //  const seriePlantingEspèce = [
//     //   {
//     //     colors: ["#607929"],
//     //       name: "Espèce",
//     //       data: [500, 700, 300, 1000, 400 , 200]
//     //   },
//     // ]

//     const serie2 = [
//       {
//         colors: ["#607929"],
//           name: "Section",
//           data: [46, 184, 91, 287, 240, 174, 229, 108, 262, 141, 141, 114, 214, 266, 100, 90, 292, 227, 330, 326]
//       },
//     ]

//     const seriePlantingSection = [
//       {
//         colors: ["#607929"],
//           name: "Section",
//           data: [0, 0, 0, 0, 0 , 0]
//       },
//     ]

//     const seriesPie= [{
//         name: "Risque",
//         data: [0, 0, 0]
//     }]

//     const optionsPie= {
//       colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
//       chart: {
//         width: "100%",
//         type: 'pie',
//       },
//       labels: [],
//       responsive: [{
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200
//           },
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }]
//     }

//     const options4 = {
//       // colors: ['#008000'],
//       colors: ["#607929"],
//       //   colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
//     //   colors: ["#d5d5d5"],
//         labels: []
//       // xaxis: {
//       //     categories: risqueStateData.labels
//       // }
//     }
//     const labels = []
//     // const responsive: {
//     //     breakpoint: "480",
//     //     options: {
//     //       chart: {
//     //         width: "200",
//     //       },
//     //       legend: {
//     //         position: 'bottom'
//     //       }
//     //     }
//     // }
//     const serie4 = [
//       {
//           colors: ["#607929"],
//           name: "Risque",
//           data: [3, 61, 4132]
//           // data: risqueStateData.series.map((serie)=>serie.parcelle_num)
//       },
//     ]

//     // const PieChart = () => {
//     //     const [state, setState] = React.useState({
          
//     //         series: [4132, 61, 3],
//     //         options: {
//     //           chart: {
//     //             width: 380,
//     //             type: 'pie',
//     //           },
//     //           labels: ['zéro', 'modéré', 'élevé'],
//     //           responsive: [{
//     //             breakpoint: 480,
//     //             options: {
//     //               chart: {
//     //                 width: 200
//     //               },
//     //               legend: {
//     //                 position: 'bottom'
//     //               }
//     //             }
//     //           }]
//     //         },
          
          
//     // });

//     const optionsRisque = {
//         colors: ["#607929"],
//         xaxis: {
//             categories: [                
//                 "Zéro",
//                 "Modéré",
//                 "Elevé",
//             ]
//         }
//     }

//     const serieRisque = [
//         {
//             colors: ["#607929"],
//             name: "Risque",
//             data: [3, 61, 4132]
//             // data: risqueStateData.series.map((serie)=>serie.parcelle_num)
//         },
//       ]

    


//     return (
//         <Content sideID={"dash-coop"} parent={""}>
//           <h2 className="mt-5">{t("Bienvenue")} | {user?.prenom}</h2>
//         <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 pt-3 pb-2 border-top border-300">
//             <div className="row">
//                 <div className="col-md-6">
//                     <div class="card">
//                         <div class="card-body" style={{marginBottom : "-20px"}}>
//                             <h5 class="card-title" style={{
//                                 backgroundColor: "#fbffe9",
//                                 marginTop: "-15px",
//                                 textAlign: "center",
//                                 borderRadius: "10px",
//                                 paddingTop: "10px",
//                                 height: "30px",
//                                 color: "#607929",
//                                 whiteSpace: "nowrap",
//                                 fontFamily: "Inter, Helvetica",
//                                 fontSize: "18px",
//                                 fontWeight: "700",
//                                 lineHeight: "normal",
//                             }}>{t("Vue Principale")}</h5>
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div class="card mb-2">
//                                             <div class="card-body" style={{marginBottom: "-20px"}}>
//                                                 <div className="row">
//                                                     <div className="col-xs-3">
//                                                         <i className="" >
//                                                             <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconProduction} width="50" height="50" alt=""/>
//                                                         </i>
//                                                     </div>
//                                                     <div className="col-xs-9">
//                                                         <h2 className="card-title text-end text-primary"
//                                                             style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                             <h2 style={{
//                                                                 color: "#000",
//                                                                 whiteSpace: "nowrap",
//                                                                 fontFamily: "Inter, Helvetica",
//                                                                 fontSize: "16px",
//                                                                 fontWeight: "400",
//                                                                 lineHeight: "normal",
//                                                             }}>{t("Production")} (Kg)</h2>
//                                                             <Link style={{color: "#000"}}
//                                                                 to="">
//                                                                 0
//                                                                 {/*<i className="fa-solid fa-1x fa-arrow-circle-right"*/}
//                                                                 {/*style={{color: "#000"}}></i>*/}
//                                                             </Link>
//                                                         </h2>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div class="card mb-2">
//                                             <div class="card-body" style={{marginBottom: "-20px"}}>
//                                                 <div className="row">
//                                                     <div className="col-xs-3">
//                                                         <i className="" >
//                                                             <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconProducteur} width="50" height="50" alt=""/>
//                                                         </i>
//                                                     </div>
//                                                     <div className="col-xs-9">

//                                                             <h2 className="card-title text-end text-primary"
//                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                                 <h2 style={{
//                                                                     color: "#000",
//                                                                     whiteSpace: "nowrap",
//                                                                     fontFamily: "Inter, Helvetica",
//                                                                     fontSize: "16px",
//                                                                     fontWeight: "400",
//                                                                     lineHeight: "normal",
//                                                                 }}>{t("Producteurs")}</h2>
//                                                                 <Link style={{color: "#000"}}
//                                                                     to="">
//                                                                         <span style={{
//                                                                             color: "#000",
//                                                                             // textAlign: "right",
//                                                                             // whiteSpace: "nowrap",
//                                                                             // fontFamily: "Inter, Helvetica",
//                                                                             // fontSize: "25px",
//                                                                             // fontWeight: "700",
//                                                                             // lineHeight: "normal",                                                                       

//                                                                         }}
//                                                                         >124</span>
//                                                                     {/*<i className="fa-solid fa-1x fa-arrow-circle-right"*/}
//                                                                     {/*style={{color: "#000"}}></i>*/}
//                                                                 </Link>
//                                                             </h2>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                 <div class="card mb-2">
//                                             <div class="card-body" style={{marginBottom: "-20px"}}>
//                                                 <div className="row">
//                                                     <div className="col-xs-3">
//                                                         <i className="" >
//                                                             <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconParcelle} width="50" height="50" alt=""/>
//                                                         </i>
//                                                     </div>
//                                                     <div className="col-xs-9">

//                                                             <h2 className="card-title text-end text-primary"
//                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                                 <h2 style={{
//                                                                     color: "#000",
//                                                                     whiteSpace: "nowrap",
//                                                                     fontFamily: "Inter, Helvetica",
//                                                                     fontSize: "16px",
//                                                                     fontWeight: "400",
//                                                                     lineHeight: "normal",
//                                                                 }}>{t("Parcelles")}</h2>
//                                                                 <Link style={{color: "#000"}}
//                                                                     to="">
//                                                                     124
//                                                                     {/*<i className="fa-solid fa-1x fa-arrow-circle-right"*/}
//                                                                     {/*style={{color: "#000"}}></i>*/}
//                                                                 </Link>
//                                                             </h2>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                 <div class="card mb-2">
//                                             <div class="card-body" style={{marginBottom: "-20px"}}>
//                                                 <div className="row">
//                                                     <div className="col-xs-3">
//                                                         <i className="" >
//                                                             <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconSuperficie} width="50" height="50" alt=""/>
//                                                         </i>
//                                                     </div>
//                                                     <div className="col-xs-9">
//                                                             <h2 className="card-title text-end text-primary"
//                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                                 <h2 style={{
//                                                                     color: "#000",
//                                                                     whiteSpace: "nowrap",
//                                                                     fontFamily: "Inter, Helvetica",
//                                                                     fontSize: "16px",
//                                                                     fontWeight: "400",
//                                                                     lineHeight: "normal",
//                                                                 }}>{t("Superficie")}(Ha)</h2>

//                                                                 <span style={{
//                                                                 color: "#000",
//                                                                 // textAlign: "right",
//                                                                 // whiteSpace: "nowrap",
//                                                                 // fontFamily: "Inter, Helvetica",
//                                                                 // fontSize: "25px",
//                                                                 // fontWeight: "700",
//                                                                 // lineHeight: "normal",

//                                                             }}
//                                                             >245.80</span>
//                                                             </h2>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <div class="card">
//                         <div class="card-body" style={{marginBottom : "-20px"}}>
//                             <h5 class="card-title" style={{
//                                 backgroundColor: "#fbffe9",
//                                 marginTop: "-15px",
//                                 textAlign: "center",
//                                 borderRadius: "10px",
//                                 paddingTop: "10px",
//                                 height: "30px",
//                                 color: "#607929",
//                                 whiteSpace: "nowrap",
//                                 fontFamily: "Inter, Helvetica",
//                                 fontSize: "18px",
//                                 fontWeight: "700",
//                                 lineHeight: "normal",
//                             }}>{t("CO2 & Conformité RDUE")}</h5>
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div class="card mb-2">
//                                         <div class="card-body" style={{marginBottom: "-20px"}}>
//                                             <div className="row">
//                                                 <div className="col-xs-3">
//                                                     <i className="" >
//                                                         <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconCO2} width="50" height="50" alt=""/>
//                                                         {/* <i className="fa-solid fa-4x fa-smog" style={{color: "#92ACF0", marginLeft: "-20px", marginTop: "-10px"}}></i> */}
//                                                     </i>
//                                                 </div>
//                                                 <div className="col-xs-9">
//                                                  <h2 className="card-title text-end text-primary"
//                                                             style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                             <h2 style={{
//                                                                 color: "#000",
//                                                                 whiteSpace: "nowrap",
//                                                                 fontFamily: "Inter, Helvetica",
//                                                                 fontSize: "16px",
//                                                                 fontWeight: "400",
//                                                                 lineHeight: "normal",
//                                                             }}>{t("CO2 éq(T)")}</h2>
//                                                             <span style={{
//                                                                 color: "#000",
//                                                                 // textAlign: "right",
//                                                                 // whiteSpace: "nowrap",
//                                                                 // fontFamily: "Inter, Helvetica",
//                                                                 // fontSize: "25px",
//                                                                 // fontWeight: "700",
//                                                                 // lineHeight: "normal",

//                                                             }}
//                                                             >0 </span>
//                                                         </h2>

//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div class="card mb-2">
//                                             <div class="card-body" style={{marginBottom: "-20px"}}>
//                                                 <div className="row">
//                                                     <div className="col-xs-3">
//                                                         <i className="" >
//                                                             <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconSup4Ha} width="50" height="50" alt=""/>
//                                                         </i>
//                                                     </div>
//                                                     <div className="col-xs-9">
//                                                        <h2 className="card-title text-end text-primary"
//                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                                 <h2 style={{
//                                                                     color: "#000",
//                                                                     whiteSpace: "nowrap",
//                                                                     fontFamily: "Inter, Helvetica",
//                                                                     fontSize: "16px",
//                                                                     fontWeight: "400",
//                                                                     lineHeight: "normal",
//                                                                 }}>{t("Parcelles > à (4Ha)")}</h2>
//                                                                 <Link style={{color: "#000"}}
//                                                                     to="/parcelleList_sup_4ha_projet/">
//                                                                     <span>9</span>&#160;                                                                    
//                                                                     <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i>
//                                                                 </Link>
//                                                             </h2>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                 <div class="card mb-2">
//                                             <div class="card-body" style={{marginBottom: "-20px"}}>
//                                                 <div className="row">
//                                                     <div className="col-xs-3">
//                                                         <i className="" >
//                                                             <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconArbres} width="50" height="50" alt=""/>
//                                                         </i>
//                                                     </div>
//                                                     <div className="col-xs-9">
//                                                             <h2 className="card-title text-end text-primary"
//                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                                 <h2 style={{
//                                                                     color: "#000",
//                                                                     whiteSpace: "nowrap",
//                                                                     fontFamily: "Inter, Helvetica",
//                                                                     fontSize: "16px",
//                                                                     fontWeight: "400",
//                                                                     lineHeight: "normal",
//                                                                 }}>{t("Arbres plantés")}</h2>
//                                                                     <Link style={{color: "#000"}}
//                                                                         to="/carte-parcelles/">
//                                                                         <span style={{
//                                                                             color: "#000",
//                                                                             // textAlign: "right",
//                                                                             // whiteSpace: "nowrap",
//                                                                             // fontFamily: "Inter, Helvetica",
//                                                                             // fontSize: "25px",
//                                                                             // fontWeight: "700",
//                                                                             // lineHeight: "normal",                                                                       

//                                                                         }}
//                                                                         >9 007
//                                                                             {/*{cooperative.total_parcelles_coop_risk_modere.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}*/}
//                                                                         </span>&#160;                                                                    
//                                                                         <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i>
//                                                                     </Link>

//                                                                     {/* <span style={{
//                                                                         color: "#000",
//                                                                         // textAlign: "right",
//                                                                         // whiteSpace: "nowrap",
//                                                                         // fontFamily: "Inter, Helvetica",
//                                                                         // fontSize: "25px",
//                                                                         // fontWeight: "700",
//                                                                         // lineHeight: "normal",

//                                                                     }}>
//                                                                         347 077
//                                                                     </span>&#160;                                                                    
//                                                                     <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i> */}

//                                                             </h2>

//                                                     </div>
//                                                 </div>
//                                             </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                 <div class="card mb-2">
//                                         <div class="card-body" style={{marginBottom: "-20px"}}>
//                                             <div className="row">
//                                                 <div className="col-xs-3">
//                                                     <i className="" >
//                                                         <img style={{marginLeft: "-20px", marginTop: "-20px"}} src={IconRisque} width="50" height="50" alt=""/>
//                                                     </i>
//                                                 </div>
//                                                 <div className="col-xs-9">
//                                                      <h2 className="card-title text-end text-primary"
//                                                             style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
//                                                             <h2 style={{
//                                                                 color: "#000",
//                                                                 whiteSpace: "nowrap",
//                                                                 fontFamily: "Inter, Helvetica",
//                                                                 fontSize: "16px",
//                                                                 fontWeight: "400",
//                                                                 lineHeight: "normal",
//                                                             }}>{t("Parcelles à risque")}</h2>
//                                                             <Link style={{color: "#000"}}
//                                                                 to="/parcelle_arisque_projet/">
//                                                                 <span style={{
//                                                                     color: "#000",
//                                                                     // textAlign: "right",
//                                                                     // whiteSpace: "nowrap",
//                                                                     // fontFamily: "Inter, Helvetica",
//                                                                     // fontSize: "25px",
//                                                                     // fontWeight: "700",
//                                                                     // lineHeight: "normal",                                                                       

//                                                                 }}
//                                                                 >0
//                                                                     {/*{cooperative.total_parcelles_coop_risk_modere.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}*/}
//                                                                 </span>&#160;                                                                    
//                                                                 <i className="fa-solid fa-1x fa-arrow-circle-right" style={{color: "#000"}}></i>
//                                                             </Link>
//                                                         </h2>

//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="mb-5 bg-opacity-50 border-2 rounded-2">
//                 {user &&
//                     <>
//                         <hr/>
//                         <div className="row">
//                             <div className="col-md-6 col-xs-12">
//                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
//                                     <div className="card-body">
//                                         <h4 class="card-title" style={{
//                                             backgroundColor: "#fbffe9",
//                                             marginTop: "-15px",
//                                             textAlign: "center",
//                                             borderRadius: "10px",
//                                             paddingTop: "10px",
//                                             paddingBottom: "10px",
//                                             height: "30px",
//                                             color: "#607929",
//                                             whiteSpace: "nowrap",
//                                             fontFamily: "Inter, Helvetica",
//                                             fontSize: "18px",
//                                             fontWeight: "700",
//                                             lineHeight: "normal",
//                                         }}>{t("Producteurs / Coopérative")}</h4>
//                                         {loading ? (
//                                             <p>Chargement des statistiques...</p>
//                                         ) : (
//                                             <Bar data={chartDataProducteurCop} />
//                                         )}
//                                         {/* <Chart
//                                             options={options3}
//                                             series={serie2}
//                                             type="bar"
//                                             width="100%"
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-6 col-xs-12">
//                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
//                                     <div className="card-body" id="chart">
//                                         <h4 class="card-title" style={{
//                                             backgroundColor: "#fbffe9",
//                                             marginTop: "-15px",
//                                             textAlign: "center",
//                                             borderRadius: "10px",
//                                             paddingTop: "10px",
//                                             height: "30px",
//                                             color: "#607929",
//                                             whiteSpace: "nowrap",
//                                             fontFamily: "Inter, Helvetica",
//                                             fontSize: "18px",
//                                             fontWeight: "700",
//                                             lineHeight: "normal",
//                                         }}>{t("Parcelles / Risque")}</h4>
//                                         {loading ? (
//                                             <p>Chargement des statistiques...</p>
//                                         ) : (
//                                             <Bar data={chartDataRisque} />
//                                         )}
//                                         {/* <Chart
//                                             options={optionsRisque}
//                                             series={serieRisque}
//                                             type="pie"
//                                             width={380}
//                                             // options={state.options} series={state.series} type="pie" width={380}
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-6 col-xs-12">
//                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
//                                     <div className="card-body">
//                                         <h4 class="card-title" style={{
//                                             backgroundColor: "#fbffe9",
//                                             marginTop: "-15px",
//                                             textAlign: "center",
//                                             borderRadius: "10px",
//                                             paddingTop: "10px",
//                                             height: "30px",
//                                             color: "#607929",
//                                             whiteSpace: "nowrap",
//                                             fontFamily: "Inter, Helvetica",
//                                             fontSize: "18px",
//                                             fontWeight: "700",
//                                             lineHeight: "normal",
//                                         }}>{t("Parcelles / Coopérative")}</h4>
//                                         {loading ? (
//                                             <p>Chargement des statistiques...</p>
//                                         ) : (
//                                             <Bar data={chartDataParcelleCop} />
//                                         )}
//                                         {/* <Chart
//                                             options={options3}
//                                             series={serie2}
//                                             type="bar"
//                                             width="100%"
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6 col-xs-12">
//                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
//                                     <div className="card-body">
//                                     <h4 class="card-title" style={{
//                                             backgroundColor: "#fbffe9",
//                                             marginTop: "-15px",
//                                             textAlign: "center",
//                                             borderRadius: "10px",
//                                             paddingTop: "10px",
//                                             height: "30px",
//                                             color: "#607929",
//                                             whiteSpace: "nowrap",
//                                             fontFamily: "Inter, Helvetica",
//                                             fontSize: "18px",
//                                             fontWeight: "700",
//                                             lineHeight: "normal",
//                                         }}>{t("Superficie / Coopérative")}</h4>
//                                         {loading ? (
//                                             <p>Chargement des statistiques...</p>
//                                         ) : (
//                                             <Bar data={chartDataSuperficieCop} />
//                                         )}
//                                         {/* <Chart
//                                             options={options3}
//                                             series={serie2}
//                                             type="bar"
//                                             width="100%"
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-6 col-xs-12">
//                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
//                                     <div className="card-body">
//                                         <h4 class="card-title" style={{
//                                             backgroundColor: "#fbffe9",
//                                             marginTop: "-15px",
//                                             textAlign: "center",
//                                             borderRadius: "10px",
//                                             paddingTop: "10px",
//                                             height: "30px",
//                                             color: "#607929",
//                                             whiteSpace: "nowrap",
//                                             fontFamily: "Inter, Helvetica",
//                                             fontSize: "18px",
//                                             fontWeight: "700",
//                                             lineHeight: "normal",
//                                         }}>{t("Plantings / Coopérative")}</h4>
//                                         {loading ? (
//                                             <p>Chargement des statistiques...</p>
//                                         ) : (
//                                             <Bar data={chartDatalantingCoop} />
//                                         )}
//                                         {/* <Chart
//                                             options={options3}
//                                             series={serie2}
//                                             type="bar"
//                                             width="100%"
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-6 col-xs-12">
//                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>
//                                     <div className="card-body">
//                                     <h4 class="card-title" style={{
//                                             backgroundColor: "#fbffe9",
//                                             marginTop: "-15px",
//                                             textAlign: "center",
//                                             borderRadius: "10px",
//                                             paddingTop: "10px",
//                                             height: "30px",
//                                             color: "#607929",
//                                             whiteSpace: "nowrap",
//                                             fontFamily: "Inter, Helvetica",
//                                             fontSize: "18px",
//                                             fontWeight: "700",
//                                             lineHeight: "normal",
//                                         }}>{t("Plantings / espèces")}</h4>
//                                         {loading ? (
//                                             <p>Chargement des statistiques...</p>
//                                         ) : (
//                                             <Bar data={chartData} />
//                                         )}
//                                         {/* <Chart
//                                             options={optionsPlantingEspèce}
//                                             series={seriePlantingEspèce}
//                                             type="bar"
//                                             width="100%"
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 }
//             </div>
//         </div>
//         </Content>

//     )
// }

// export default DashCoop;



// // import { useEffect, useState } from "react";
// // import Content from "../../Content";
// // import UserContext from "../../context/useContext";
// // import Chart from 'react-apexcharts';
// // import axios from "axios";
// // import {Link, useParams} from "react-router-dom";

// // import IconProducteur from '../../assets/img/Paysan.png'
// // import IconParcelle from '../../assets/img/Parcelle.png'
// // import IconSuperficie from '../../assets/img/Superficie.png'
// // import IconCO2 from '../../assets/img/IconCO2.png'
// // import IconSup4Ha from '../../assets/img/Icon4Ha.png'
// // import IconRisque from '../../assets/img/IconRisque.png'
// // import IconArbres from '../../assets/img/IconArbres.png'
// // import IconProduction from '../../assets/img/Production.png'
// // import { useTranslation } from "react-i18next";



// // import BaseUrl from "../../config/baseUrl";

// // // const baseUrl = 'http://127.0.0.1:8000/api';
// // const url = BaseUrl();
// // function DashCoop(){
// //     const {t} = useTranslation();
// //     const user = UserContext();
// //     const {projetID} = useParams();
// //     const [cooperative,setCooperative] = useState([]);
// //     const [sectionProd,setSectionProd] = useState([]);
// //     const [totalPoint,setTotalPoint] = useState([]);
// //     const [allpoints, setAllpoints] = useState([]);
// //     const [proj,setProj] = useState([]);
// //     const [coopList,setCoopList] = useState([]);
// //     const [sectionStateData,SetSectionStateData] = useState({series: [],labels: []})
// //     const [risqueStateData,SetRisqueStateData] = useState({series: [],labels: []})

// //     // useEffect(()=>{
// //     //     try {
// //     //       axios.get(url+'/proj-list/?projID='+projetID).then((resp)=>{
// //     //           setProj(resp.data[0]);
// //     //       })
// //     //     } catch (error) { 
// //     //       console.log(error);
// //     //     }

// //     //     try {
// //     //       axios.get(url+'/cooperative-list/?projID='+projetID).then((resp)=>{
// //     //         setCoopList(resp.data);
// //     //       });
// //     //     } catch (error) {
// //     //       console.log(error);
// //     //     }

// //     //     // try {
// //     //     //   axios.get(url+'/region-list/').then((resp)=>{
// //     //     //     setRegionList(resp.data);
// //     //     //   })
// //     //     // } catch (error) { 
// //     //     //   console.log(error);
// //     //     // }
// //     //   },[user]);

// //     const [firstChart,setFirstChart] = useState({
// //       options: { 
// //         chart: {
// //           id: "basic-bar"
// //         },
// //         xaxis: {
// //           categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
// //         }
// //       },
// //       series: [
// //         {
// //           name: "series-1",
// //           data: [30, 40, 45, 50, 49, 60, 70, 91]
// //         },
// //         {
// //           name: "series-2",
// //           data: [3, 50, 405, 10, 19, 80, 30, 21]
// //         },
// //         //on peut creer plusieur series
// //       ]
// //     });



// //     useEffect(()=>{
// //       if(user && user?.id){
// //           // console.log(user.id)
// //         try {
// //             axios.get(url+'/cooperative-list/?userID='+user.id).then((resp)=>{
// //             setCooperative(resp.data[0]);
// //             // console.log(resp.data[0]);

// //             axios.get(url+'/producteurs-by-section/?cooperative='+resp.data[0]?.id).then((response)=>{
// //               const states = Object.keys(response.data.dataSection).map(key=> response.data.dataSection[key]);
// //               // console.log(states)
// //                SetSectionStateData(
// //                 {
// //                   series: Object.values(response.data.dataSection),
// //                   labels: states.map((lab)=>lab.libelle)
// //                 }
// //               ) 

// //             });

// //             // Parcelles Par Risque
// //             axios.get(url+'/parcelle_by_risque/?cooperative='+resp.data[0]?.id).then((response)=>{
// //               const states2 = Object.keys(response.data.dataRisque).map(key=> response.data.dataRisque[key]);
// //               // console.log(states2)
// //                SetRisqueStateData(
// //                 {
// //                   series: Object.values(response.data.dataRisque),
// //                   labels: states2.map((lab)=>lab.libelle)
// //                 }
// //               )

// //             });

// //             axios.get(url+'/parcelles-carte/?manager='+user.id).then((resp)=>{
// //                 //setDataIsLoading(false);
// //                 setAllpoints(resp.data.results);
// //                 setTotalPoint(resp.data.count)
// //                 console.log(resp.data)
// //               })

// //           });
// //         } catch (error) {
// //           console.log(error);
// //         }
// //       }
// //     },[user]);

// //     const options3 = {
// //         colors: ["#607929"],
// //       // colors: ['#FF9800'],
// //       xaxis: {
// //           categories: sectionStateData.labels
// //       }
// //     }

// //     const optionsPlantingEspèce = {
// //         colors: ["#607929"],
// //       // colors: ['#FF9800'],
// //       xaxis: {
// //           categories: [
// //               "ACAJOU",
// //               "CEDRELA",
// //               "BETE",
// //               "FRAKE",
// //               "FRAMIRE",
// //               "PETIT COLA",
// //           ]
// //       }
// //     }

// //      const seriePlantingEspèce = [
// //       {
// //         colors: ["#607929"],
// //           name: "Espèce",
// //           data: [0, 0, 0, 0, 0 , 0]
// //       },
// //     ]

// //     const serie2 = [
// //       {
// //         colors: ["#607929"],
// //           name: "Section",
// //           data: sectionStateData.series.map((serie)=>serie.prod_num)
// //       },
// //     ]

// //     const seriePlantingSection = [
// //       {
// //         colors: ["#607929"],
// //           name: "Section",
// //           data: [0, 0, 0, 0, 0 , 0]
// //       },
// //     ]

// //     const seriesPie= [{
// //         name: "Risque",
// //         data: risqueStateData.series.map((serie)=>serie.parcelle_num)
// //     }]

// //     const optionsPie= {
// //       colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
// //       chart: {
// //         width: "100%",
// //         type: 'pie',
// //       },
// //       labels: [risqueStateData.labels],
// //       responsive: [{
// //         breakpoint: 480,
// //         options: {
// //           chart: {
// //             width: 200
// //           },
// //           legend: {
// //             position: 'bottom'
// //           }
// //         }
// //       }]
// //     }

// //     const options4 = {
// //       // colors: ['#008000'],
// //       colors: ['#E4C470'],
// //       //   colors: ['#93C3EE', '#E5C6A0', '#669DB5', '#94A74A'],
// //     //   colors: ["#d5d5d5"],
// //         labels: risqueStateData.labels
// //       // xaxis: {
// //       //     categories: risqueStateData.labels
// //       // }
// //     }
// //     const labels = risqueStateData.labels
// //     // const responsive: {
// //     //     breakpoint: "480",
// //     //     options: {
// //     //       chart: {
// //     //         width: "200",
// //     //       },
// //     //       legend: {
// //     //         position: 'bottom'
// //     //       }
// //     //     }
// //     // }
// //     const serie4 = [
// //       {
// //           colors: ["#f4f4f4"],
// //           name: "Risque",
// //           data: risqueStateData.series.map((serie)=>serie.parcelle_num)
// //       },
// //     ]
// //     return (
// //         <Content sideID={"dash-coop"} parent={""}>
// //           {user && user.is_adg ? 
// //             <h2 className="mt-5">{t("Bienvenue")} | {user?.nom} {user?.prenom} (225) {cooperative.contacts}</h2> :
// //             <h2 className="mt-5">{t("Bienvenue")} | {user?.nom} {user?.prenom}</h2>
// //           }
// //         <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 pt-3 pb-2 border-top border-300">
// //             <div className="row">
// //                 <div className="col-md-6">
// //                     <div class="card">                        
// //                         <div class="card-body" style={{marginBottom : "-20px"}}>
// //                             <h5 class="card-title" style={{
// //                                 backgroundColor: "#fbffe9",
// //                                 marginTop: "-15px",
// //                                 textAlign: "center",
// //                                 borderRadius: "10px",  
// //                                 paddingTop: "10px",                             
// //                                 height: "30px",  
// //                                 color: "#607929", 
// //                                 whiteSpace: "nowrap",
// //                                 fontFamily: "Inter, Helvetica",
// //                                 fontSize: "18px",
// //                                 fontWeight: "700",
// //                                 lineHeight: "normal",                             
// //                             }}>{t("Vue Principale")}</h5>
// //                             <div className="row">
// //                                 {/* {user && user.is_adg ? 
// //                                     <div className="col-md-6">
// //                                         <div class="card mb-2">
// //                                                 <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                     <div className="row">
// //                                                         <div className="col-xs-3">
// //                                                             <i className="" >
// //                                                                 <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconProduction} width="50" height="50" alt=""/>
// //                                                             </i>
// //                                                         </div>
// //                                                         <div className="col-xs-9">                                                    
                                                        
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                         </div>
// //                                     </div> 
// //                                     : */}
// //                                     <div className="col-md-6">
// //                                         <div class="card mb-2">
// //                                                 <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                     <div className="row">
// //                                                         <div className="col-xs-3">
// //                                                             <i className="" >
// //                                                                 <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconProduction} width="50" height="50" alt=""/>
// //                                                             </i>
// //                                                         </div>
// //                                                         <div className="col-xs-9">                                                    
// //                                                         {proj.total_coop_projet > 0 
// //                                                                 ? <h2 className="card-title text-end text-primary"
// //                                                                     style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
// //                                                                     <h2 style={{
// //                                                                         color: "#000",                                                                
// //                                                                         whiteSpace: "nowrap",
// //                                                                         fontFamily: "Inter, Helvetica",
// //                                                                         fontSize: "16px",
// //                                                                         fontWeight: "400",
// //                                                                         lineHeight: "normal",
// //                                                                     }}>{t("Coopératives")}</h2>    
// //                                                                     <Link style={{color: "#000"}}
// //                                                                         to="">
// //                                                                         {proj.total_coop_projet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#160;
// //                                                                         <i className="fa-solid fa-1x fa-arrow-circle-right"
// //                                                                         style={{color: "#000"}}></i>
// //                                                                     </Link>
// //                                                                 </h2>
// //                                                                 : <h2 className="card-title text-end text-primary"
// //                                                                     style={{marginTop: "-35px", fontWeight: "900"}}>0</h2>
// //                                                             }
// //                                                         </div>
// //                                                     </div>
// //                                                 </div>
// //                                         </div>
// //                                     </div>
// //                                 {/* } */}
// //                                 <div className="col-md-6">
// //                                     <div class="card mb-2">
// //                                             <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                 <div className="row">
// //                                                     <div className="col-xs-3">
// //                                                         <i className="" >
// //                                                             <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconProducteur} width="50" height="50" alt=""/>
// //                                                         </i>
// //                                                     </div>
// //                                                     <div className="col-xs-9">                                                    
// //                                                         {proj.total_producteurs_projet
// //                                                             ? <h2 className="card-title text-end text-primary"
// //                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
// //                                                                 <h2 style={{
// //                                                                     color: "#000",                                                                
// //                                                                     whiteSpace: "nowrap",
// //                                                                     fontFamily: "Inter, Helvetica",
// //                                                                     fontSize: "16px",
// //                                                                     fontWeight: "400",
// //                                                                     lineHeight: "normal",
// //                                                                 }}>{t("Producteurs")}</h2>    
// //                                                                 <Link style={{color: "#000"}}
// //                                                                     to="">
// //                                                                         <span style={{
// //                                                                             color: "#000",                                                                        
// //                                                                             // textAlign: "right",
// //                                                                             // whiteSpace: "nowrap",
// //                                                                             // fontFamily: "Inter, Helvetica",
// //                                                                             // fontSize: "25px",
// //                                                                             // fontWeight: "700",
// //                                                                             // lineHeight: "normal",                                                                       
                                                                            
// //                                                                         }} 
// //                                                                         >{proj.total_producteurs_projet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span> &#160;
// //                                                                     <i className="fa-solid fa-1x fa-arrow-circle-right"
// //                                                                     style={{color: "#000"}}></i>
// //                                                                 </Link>
// //                                                             </h2>
// //                                                             : <h2 className="card-title text-end text-primary"
// //                                                                 style={{marginTop: "-35px", fontWeight: "900"}}>0</h2>
// //                                                         }
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                 <div class="card mb-2">
// //                                             <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                 <div className="row">
// //                                                     <div className="col-xs-3">
// //                                                         <i className="" >
// //                                                             <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconParcelle} width="50" height="50" alt=""/>
// //                                                         </i>
// //                                                     </div>
// //                                                     <div className="col-xs-9">                                                    
// //                                                         {proj.total_parcelles_projet
// //                                                             ? <h2 className="card-title text-end text-primary"
// //                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
// //                                                                 <h2 style={{
// //                                                                     color: "#000",                                                                
// //                                                                     whiteSpace: "nowrap",
// //                                                                     fontFamily: "Inter, Helvetica",
// //                                                                     fontSize: "16px",
// //                                                                     fontWeight: "400",
// //                                                                     lineHeight: "normal",
// //                                                                 }}>{t("Parcelles")}</h2>    
// //                                                                 <Link style={{color: "#000"}}
// //                                                                     to="">
// //                                                                     {proj.total_parcelles_projet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} &#160;
// //                                                                     <i className="fa-solid fa-1x fa-arrow-circle-right"
// //                                                                     style={{color: "#000"}}></i>
// //                                                                 </Link>
// //                                                             </h2>
// //                                                             : <h2 className="card-title text-end text-primary"
// //                                                                 style={{marginTop: "-35px", fontWeight: "900"}}>0</h2>
// //                                                         }
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                 <div class="card mb-2">
// //                                             <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                 <div className="row">
// //                                                     <div className="col-xs-3">
// //                                                         <i className="" >
// //                                                             <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconSuperficie} width="50" height="50" alt=""/>
// //                                                         </i>
// //                                                     </div>
// //                                                     <div className="col-xs-9">                                                    
// //                                                         {proj.total_superficie_projet > 0
// //                                                             ? <h2 className="card-title text-end text-primary"
// //                                                                 style={{marginTop: "-50px", fontWeight: "700", fontSize: "1.2rem"}}>
// //                                                                 <h2 style={{
// //                                                                     color: "#000",                                                                
// //                                                                     whiteSpace: "nowrap",
// //                                                                     fontFamily: "Inter, Helvetica",
// //                                                                     fontSize: "16px",
// //                                                                     fontWeight: "400",
// //                                                                     lineHeight: "normal",
// //                                                                 }}>{t("Superficie")}(Ha)</h2>    
                                                                
// //                                                                 <span style={{
// //                                                                 color: "#000",                                                                        
// //                                                                 // textAlign: "right",
// //                                                                 // whiteSpace: "nowrap",
// //                                                                 // fontFamily: "Inter, Helvetica",
// //                                                                 // fontSize: "25px",
// //                                                                 // fontWeight: "700",
// //                                                                 // lineHeight: "normal",                                                                       
                                                                
// //                                                             }} 
// //                                                             >{proj.total_superficie_projet.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
                                                                    
// //                                                             </h2>
// //                                                             : <h2 className="card-title text-end text-primary"
// //                                                                 style={{marginTop: "-35px", fontWeight: "900"}}>0</h2>
// //                                                         }
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                     <div class="card">                        
// //                         <div class="card-body" style={{marginBottom : "-20px"}}>
// //                             <h5 class="card-title" style={{
// //                                 backgroundColor: "#fbffe9",
// //                                 marginTop: "-15px",
// //                                 textAlign: "center",
// //                                 borderRadius: "10px",  
// //                                 paddingTop: "10px",                             
// //                                 height: "30px",  
// //                                 color: "#607929", 
// //                                 whiteSpace: "nowrap",
// //                                 fontFamily: "Inter, Helvetica",
// //                                 fontSize: "18px",
// //                                 fontWeight: "700",
// //                                 lineHeight: "normal",                             
// //                             }}>{t("CO2 & Conformité RDUE")}</h5>
// //                             <div className="row">
// //                                 <div className="col-md-6">
// //                                     <div class="card mb-2">
// //                                         <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                             <div className="row">
// //                                                 <div className="col-xs-3">
// //                                                     <i className="" >
// //                                                         <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconCO2} width="50" height="50" alt=""/>
// //                                                         {/* <i className="fa-solid fa-4x fa-smog" style={{color: "#92ACF0", marginLeft: "-20px", marginTop: "-10px"}}></i> */}
// //                                                     </i>
// //                                                 </div>
// //                                                 <div className="col-xs-9">                                                    
                                                    
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                     <div class="card mb-2">
// //                                             <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                 <div className="row">
// //                                                     <div className="col-xs-3">
// //                                                         <i className="" >
// //                                                             <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconSup4Ha} width="50" height="50" alt=""/>
// //                                                         </i>
// //                                                     </div>
// //                                                     <div className="col-xs-9">                                                    
                                                        
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                 <div class="card mb-2">
// //                                             <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                                 <div className="row">
// //                                                     <div className="col-xs-3">
// //                                                         <i className="" >
// //                                                             <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconArbres} width="50" height="50" alt=""/>
// //                                                         </i>
// //                                                     </div>
// //                                                     <div className="col-xs-9">                                                    
                                                        
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-6">
// //                                 <div class="card mb-2">
// //                                         <div class="card-body" style={{marginBottom: "-20px"}}>
// //                                             <div className="row">
// //                                                 <div className="col-xs-3">
// //                                                     <i className="" >
// //                                                         <img style={{marginLeft: "-20px", marginTop: "-20px", marginTop: "-20px"}} src={IconRisque} width="50" height="50" alt=""/>
// //                                                     </i>
// //                                                 </div>
// //                                                 <div className="col-xs-9">                                                    
                                                    
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
          
// //             <div className="mb-5 bg-opacity-50 border-2 rounded-2">
// //                 {user &&
// //                     <>
// //                         <hr/>
// //                         <div className="row">
// //                             <div className="col-md-6 col-xs-12">
// //                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>                                    
// //                                     <div className="card-body">  
// //                                         <h4 class="card-title" style={{
// //                                             backgroundColor: "#fbffe9",
// //                                             marginTop: "-15px",
// //                                             textAlign: "center",
// //                                             borderRadius: "10px",  
// //                                             paddingTop: "10px", 
// //                                             paddingBottom: "10px",                            
// //                                             height: "30px",  
// //                                             color: "#607929", 
// //                                             whiteSpace: "nowrap",
// //                                             fontFamily: "Inter, Helvetica",
// //                                             fontSize: "18px",
// //                                             fontWeight: "700",
// //                                             lineHeight: "normal",                             
// //                                         }}>{t("Producteurs / sections")}</h4>                              
// //                                         {/* <Chart
// //                                             options={options3}
// //                                             series={serie2}
// //                                             type="bar"
// //                                             width="100%"
// //                                         /> */}
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="col-6 col-xs-12">
// //                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>                                    
// //                                     <div className="card-body" id="chart">                                     
// //                                         <h4 class="card-title" style={{
// //                                             backgroundColor: "#fbffe9",
// //                                             marginTop: "-15px",
// //                                             textAlign: "center",
// //                                             borderRadius: "10px",  
// //                                             paddingTop: "10px",                             
// //                                             height: "30px",  
// //                                             color: "#607929", 
// //                                             whiteSpace: "nowrap",
// //                                             fontFamily: "Inter, Helvetica",
// //                                             fontSize: "18px",
// //                                             fontWeight: "700",
// //                                             lineHeight: "normal",                             
// //                                         }}>{t("Parcelles / risque modéré")}</h4>  
// //                                         {/* <Chart
// //                                             options={options4}
// //                                             series={serie4}
// //                                             type="bar"
// //                                             width="100%"
// //                                         /> */}
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="col-6 col-xs-12">
// //                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>                                    
// //                                     <div className="card-body">
// //                                         <h4 class="card-title" style={{
// //                                             backgroundColor: "#fbffe9",
// //                                             marginTop: "-15px",
// //                                             textAlign: "center",
// //                                             borderRadius: "10px",  
// //                                             paddingTop: "10px",                             
// //                                             height: "30px",  
// //                                             color: "#607929", 
// //                                             whiteSpace: "nowrap",
// //                                             fontFamily: "Inter, Helvetica",
// //                                             fontSize: "18px",
// //                                             fontWeight: "700",
// //                                             lineHeight: "normal",                             
// //                                         }}>{t("Parcelles / Sections")}</h4>
// //                                         {/* <Chart
// //                                             options={options3}
// //                                             series={serie2}
// //                                             type="bar"
// //                                             width="100%"
// //                                         /> */}
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <div className="col-6 col-xs-12">
// //                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>                                   
// //                                     <div className="card-body">
// //                                     <h4 class="card-title" style={{
// //                                             backgroundColor: "#fbffe9",
// //                                             marginTop: "-15px",
// //                                             textAlign: "center",
// //                                             borderRadius: "10px",  
// //                                             paddingTop: "10px",                             
// //                                             height: "30px",  
// //                                             color: "#607929", 
// //                                             whiteSpace: "nowrap",
// //                                             fontFamily: "Inter, Helvetica",
// //                                             fontSize: "18px",
// //                                             fontWeight: "700",
// //                                             lineHeight: "normal",                             
// //                                         }}>{t("Production / section")}</h4>                                    
// //                                         {/* <Chart
// //                                             options={options3}
// //                                             series={serie2}
// //                                             type="bar"
// //                                             width="100%"
// //                                         /> */}
// //                                     </div>
// //                                 </div>
// //                             </div>  

// //                             <div className="col-6 col-xs-12">
// //                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>                                    
// //                                     <div className="card-body">
// //                                         <h4 class="card-title" style={{
// //                                             backgroundColor: "#fbffe9",
// //                                             marginTop: "-15px",
// //                                             textAlign: "center",
// //                                             borderRadius: "10px",  
// //                                             paddingTop: "10px",                             
// //                                             height: "30px",  
// //                                             color: "#607929", 
// //                                             whiteSpace: "nowrap",
// //                                             fontFamily: "Inter, Helvetica",
// //                                             fontSize: "18px",
// //                                             fontWeight: "700",
// //                                             lineHeight: "normal",                             
// //                                         }}>{t("Plantings / sections")}</h4>
// //                                         {/* <Chart
// //                                             options={options3}
// //                                             series={serie2}
// //                                             type="bar"
// //                                             width="100%"
// //                                         /> */}
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                             <div className="col-6 col-xs-12">
// //                                 <div className="card text-center mb-3" style={{backgroundColor: "#f4f4f4"}}>                                   
// //                                     <div className="card-body">
// //                                     <h4 class="card-title" style={{
// //                                             backgroundColor: "#fbffe9",
// //                                             marginTop: "-15px",
// //                                             textAlign: "center",
// //                                             borderRadius: "10px",  
// //                                             paddingTop: "10px",                             
// //                                             height: "30px",  
// //                                             color: "#607929", 
// //                                             whiteSpace: "nowrap",
// //                                             fontFamily: "Inter, Helvetica",
// //                                             fontSize: "18px",
// //                                             fontWeight: "700",
// //                                             lineHeight: "normal",                             
// //                                         }}>{t("Planting / espece")}</h4>                                    
// //                                         {/* <Chart
// //                                             options={options3}
// //                                             series={serie2}
// //                                             type="bar"
// //                                             width="100%"
// //                                         /> */}
// //                                     </div>
// //                                 </div>
// //                             </div>    
// //                         </div>
// //                     </>
// //                 }
// //             </div>
// //         </div>
// //         </Content>

// //     )
// // }

// // export default DashCoop;
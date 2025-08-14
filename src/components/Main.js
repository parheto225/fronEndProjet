import {Routes as Switch, Route} from 'react-router-dom';
import { useEffect, useState, Suspense, lazy } from 'react';
import Connexion from './auth/Connexion';
import Login from './auth/Login';
import Home from './modules/Home';
import SimulationCarbon from './modules/carbone/Simulation';
import CreateProjet from './parametres/projets/Create';
import DashCoop from './modules/cooperatives/DashCoop';
import ListeProj from './parametres/projets/Liste';
import ViewProj from './parametres/projets/Views';
import ViewsCoop from './modules/cooperatives/coop/Views';
import ViewsProd from './modules/cooperatives/producteur/Views';
import ProducteurList from './modules/cooperatives/producteur/Liste';
import ListCoop from './modules/cooperatives/coop/Liste';
import CampagneList from './parametres/campagnes/Liste';
import RecolteProdList from './modules/cooperatives/producteur/RecolteList';
import HistoriqueCoopList from './modules/cooperatives/coop/HistoriqueCoopList';
import ProdCoopList from './modules/cooperatives/coop/ProdList';
import ParcList from './modules/cooperatives/coop/ParcList';
import CarteProjet from './modules/cooperatives/Carte';
import CarteCoop from './modules/cooperatives/CarteCoop';
import CarteCoopGtp from './modules/cooperatives/CarteCoopGpt';
import CarteProducteur from './modules/cooperatives/producteur/CarteProd';
import Analyse from "./modules/rdue/Analyses";
import RapideGrah from "./modules/rdue/RapidGrah";
import HautDodo from "./modules/rdue/HtDodo";
import Scio from "./modules/rdue/Scio";
import ParcListInf4ha from "./modules/cooperatives/coop/ParcList_inf_4ha";
import ParcListSup4ha from "./modules/cooperatives/coop/ParcList_sup_4ha";
import ParcListRisque from "./modules/cooperatives/coop/ParcList_arisque";
import RapportAnalyseAgrial from "./modules/cooperatives/coop/RapportAnalyseAgrial";
import Decret from './modules/rdue/Decrets';
import RapportAnalyseCoopaahs from "./modules/cooperatives/coop/RapportAnalyseCOOPAAHS";
import CarteParcelle from "./modules/cooperatives/CarteParcelles";
import ParcListModere from "./modules/cooperatives/coop/ParcListModere";
import ParcListSup4haNonMapper from './modules/cooperatives/coop/ParcList_sup_4ha_non_mapper';
import ProductionList from './modules/cooperatives/coop/ProductionList';
import PseList from './modules/cooperatives/coop/PseList';
import MapWithTiff from './modules/cooperatives/CarteTiff';
// import NewConnexion from './auth/NewLogin';
import LoadingScreen from './auth/LoadingScreen';

import Points from './modules/cooperatives/Points';
import MapCarte from './MapCarte';
import CarteCoopGpt from './modules/cooperatives/CarteCoopGpt';

import PsePaiement from './modules/cooperatives/coop/PseListPaiements';
import Plantings from './modules/cooperatives/coop/AllPlantings';
import Paiement from './modules/cooperatives/coop/Paiements';
import ExportModule from './modules/cooperatives/coop/ExportModule';
import AllFormations from './modules/cooperatives/coop/AllFormations';
import Monitorings from './modules/cooperatives/coop/AllMonitorings';

// Lazy load uniquement pour Login
const NewConnexion = lazy(() => import('./auth/NewLogin'));

function Main(){
    return (
        <div>
             <Switch>
                <Route path="/dashboard/" element={<Home />} />
                {/* Utilisation de Suspense uniquement pour Login */}
                <Route
                    path="/"
                    element={
                        <Suspense fallback={LoadingScreen}>
                            <NewConnexion />
                        </Suspense>
                    }
                />

                {/* <Route path="/" element={<NewConnexion />} /> */}
                {/* <Route path="/" element={<Connexion />} /> */}
                <Route path="/login/" element={<Login />} />
                <Route path="/simulation-carbon/" element={<SimulationCarbon />} />

                {/* cooperatives */}
                <Route path="/dash-coop/" element={<DashCoop />} />
                <Route path="/carte-coops/" element={<CarteCoop />} />
                <Route path="/carte-coops-gpt/" element={<CarteCoopGpt />} />
                <Route path='/carte-tif/' element={<MapCarte />} />
                <Route path="/carte-parcelles/" element={<CarteParcelle />} />
                <Route path="/producteur-recoltes-views/:prodCode/" element={<RecolteProdList /> } />
                <Route path="/views-coop/:coopID/" element={<ViewsCoop />} />
                <Route path="/views-producteur/:prodID/" element={<ViewsProd />} />
                <Route path="/list-producteur/" element={<ProducteurList />} />
                <Route path="/list-coop/" element={<ListCoop />} />
                <Route path="/historiques-synchronisation-list/" element={<HistoriqueCoopList />} />
                <Route path="/coops/producteur-list/:coopID/" element={<ProdCoopList />} />
                <Route path="/coops/parcelles-list/:coopID/" element={<ParcList />} />

                <Route path="/carte-producteur-parcelle/:prodCode/" element={<CarteProducteur />} />
                <Route path="/analyseAGRIAL/" element={<RapportAnalyseAgrial />} />
                <Route path="/rapport/" element={<RapportAnalyseAgrial />} />
                <Route path="/decret-agrogorets/" element={<Decret />} />
                <Route path="/decret-rapid-grah/" element={<RapideGrah />} />
                <Route path="/decret-haut-dodo/" element={<HautDodo />} />
                <Route path="/decret-scio/" element={<Scio />} />
                <Route path="/analyseCOOPAAHS/" element={<RapportAnalyseCoopaahs />} />

                {/* Paramètres */}
                <Route path="/create-projets/" element={<CreateProjet />} />
                <Route path="/list-projets/" element={<ListeProj />} />
                <Route path="/views-projet/:projetID/" element={<ViewProj />} />
                <Route path="/list-campagnes/" element={<CampagneList />} />

                 {/*ANALYSE RDUE*/}
                <Route path="/analyses/" element={<Analyse />} />
                {/* <Route path="/coops/parcelles-list-inf-4ha/:coopID/" element={<ParcListInf4ha />} /> */}
                {/* <Route path="/parcelles-list-inf-4ha/" element={<ParcListInf4ha />} /> */}
                {/* <Route path="/coops/parcelles-list-sup-4ha/:coopID/" element={<ParcListSup4ha />} /> */}
                <Route path="/parcelleList_sup_4ha_projet/" element={<ParcListSup4ha />} />
                <Route path="/parcelle_arisque_projet/" element={<ParcListRisque />} />
                <Route path="/coops/parcelles-list-sup-4ha-non-mapper/:coopID/" element={<ParcListSup4haNonMapper />} />
                <Route path="/coops/parcelles-list-modere/:coopID/" element={<ParcListModere />} />
                <Route path="/coops/productions-list/:coopID/" element={<ProductionList />} />
                <Route path="/coops/pse-list/:coopID/" element={<PseList />} />
                <Route path="/psepaiements/" element={<PsePaiement />} />
                <Route path="/paiements/" element={<Paiement />} />
                <Route path="/plantings/" element={<Plantings />} />
                <Route path="/stats/" element={<ExportModule />} />
                <Route path="/formations/" element={<AllFormations />} />

                <Route path="/monitorings/" element={<Monitorings />} />

                <Route path="/points" element={<Points />} />
               
            </Switch>
        </div>
    )
}

export default Main;


// import {Routes as Switch, Route} from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Connexion from './auth/Connexion';
// import Login from './auth/Login';
// import Home from './modules/Home';
// import SimulationCarbon from './modules/carbone/Simulation';
// import CreateProjet from './parametres/projets/Create';
// import DashCoop from './modules/cooperatives/DashCoop';
// import ListeProj from './parametres/projets/Liste';
// import ViewProj from './parametres/projets/Views';
// import ViewsCoop from './modules/cooperatives/coop/Views';
// import ViewsProd from './modules/cooperatives/producteur/Views';
// import ProducteurList from './modules/cooperatives/producteur/Liste';
// import ListCoop from './modules/cooperatives/coop/Liste';
// import CampagneList from './parametres/campagnes/Liste';
// import RecolteProdList from './modules/cooperatives/producteur/RecolteList';
// import HistoriqueCoopList from './modules/cooperatives/coop/HistoriqueCoopList';
// import ProdCoopList from './modules/cooperatives/coop/ProdList';
// import ParcList from './modules/cooperatives/coop/ParcList';
// import CarteProjet from './modules/cooperatives/Carte';
// import CarteCoop from './modules/cooperatives/CarteCoop';
// import CarteCoopGtp from './modules/cooperatives/CarteCoopGpt';
// import CarteProducteur from './modules/cooperatives/producteur/CarteProd';
// import Analyse from "./modules/rdue/Analyses";
// // import RapideGrah from "./modules/rdue/RapidGrah";
// // import HautDodo from "./modules/rdue/HtDodo";
// // import Scio from "./modules/rdue/Scio";
// import ParcListInf4ha from "./modules/cooperatives/coop/ParcList_inf_4ha";
// import ParcListSup4ha from "./modules/cooperatives/coop/ParcList_sup_4ha";
// import ParcListRisque from "./modules/cooperatives/coop/ParcList_arisque";
// import RapportAnalyseAgrial from "./modules/cooperatives/coop/RapportAnalyseAgrial";
// import Decret from './modules/rdue/Decrets';
// import RapportAnalyseCoopaahs from "./modules/cooperatives/coop/RapportAnalyseCOOPAAHS";
// import CarteParcelle from "./modules/cooperatives/CarteParcelles";
// import ParcListModere from "./modules/cooperatives/coop/ParcListModere";
// import ParcListSup4haNonMapper from './modules/cooperatives/coop/ParcList_sup_4ha_non_mapper';
// import ProductionList from './modules/cooperatives/coop/ProductionList';
// import PseList from './modules/cooperatives/coop/PseList';
// import MapWithTiff from './modules/cooperatives/CarteTiff';
// import NewConnexion from './auth/NewLogin';

// import Points from './modules/cooperatives/Points';
// import MapCarte from './MapCarte';
// import CarteCoopGpt from './modules/cooperatives/CarteCoopGpt';

// function Main(){
//     return (
//         <div>
//              <Switch>
//                 <Route path="/dashboard/" element={<Home />} />
//                 <Route path="/" element={<NewConnexion />} />
//                 <Route path="/" element={<Connexion />} />
//                 <Route path="/login/" element={<Login />} />
//                 <Route path="/simulation-carbon/" element={<SimulationCarbon />} />

//                 {/* cooperatives */}
//                 <Route path="/dash-coop/" element={<DashCoop />} />
//                 <Route path="/carte-coops/" element={<CarteCoop />} />
//                 <Route path="/carte-coops-gpt/" element={<CarteCoopGpt />} />
//                 <Route path='/carte-tif/' element={<MapCarte />} />
//                 <Route path="/carte-parcelles/" element={<CarteParcelle />} />
//                 <Route path="/producteur-recoltes-views/:prodCode/" element={<RecolteProdList /> } />
//                 <Route path="/views-coop/:coopID/" element={<ViewsCoop />} />
//                 <Route path="/views-producteur/:prodID/" element={<ViewsProd />} />
//                 <Route path="/list-producteur/" element={<ProducteurList />} />
//                 <Route path="/list-coop/" element={<ListCoop />} />
//                 <Route path="/historiques-synchronisation-list/" element={<HistoriqueCoopList />} />
//                 <Route path="/coops/producteur-list/:coopID/" element={<ProdCoopList />} />
//                 <Route path="/coops/parcelles-list/:coopID/" element={<ParcList />} />

//                 <Route path="/carte-producteur-parcelle/:prodCode/" element={<CarteProducteur />} />
//                 <Route path="/analyseAGRIAL/" element={<RapportAnalyseAgrial />} />
//                 <Route path="/rapport/" element={<RapportAnalyseAgrial />} />
//                 <Route path="/decret-agrogorets/" element={<Decret />} />
//                 {/* <Route path="/decret/" element={<RapideGrah />} /> */}
//                 {/* <Route path="/decret-haut-dodo" element={<HautDodo />} /> */}
//                 {/* <Route path="/decret-scio" element={<Scio />} /> */}
//                 <Route path="/analyseCOOPAAHS/" element={<RapportAnalyseCoopaahs />} />

//                 {/* Paramètres */}
//                 <Route path="/create-projets/" element={<CreateProjet />} />
//                 <Route path="/list-projets/" element={<ListeProj />} />
//                 <Route path="/views-projet/:projetID/" element={<ViewProj />} />
//                 <Route path="/list-campagnes/" element={<CampagneList />} />

//                  {/*ANALYSE RDUE*/}
//                 <Route path="/analyses/" element={<Analyse />} />
//                 {/* <Route path="/coops/parcelles-list-inf-4ha/:coopID/" element={<ParcListInf4ha />} /> */}
//                 {/* <Route path="/parcelles-list-inf-4ha/" element={<ParcListInf4ha />} /> */}
//                 {/* <Route path="/coops/parcelles-list-sup-4ha/:coopID/" element={<ParcListSup4ha />} /> */}
//                 <Route path="/parcelleList_sup_4ha_projet/" element={<ParcListSup4ha />} />
//                 <Route path="/parcelle_arisque_projet/" element={<ParcListRisque />} />
//                 <Route path="/coops/parcelles-list-sup-4ha-non-mapper/:coopID/" element={<ParcListSup4haNonMapper />} />
//                 <Route path="/coops/parcelles-list-modere/:coopID/" element={<ParcListModere />} />
//                 <Route path="/coops/productions-list/:coopID/" element={<ProductionList />} />
//                 <Route path="/coops/pse-list/:coopID/" element={<PseList />} />

//                 <Route path="/points" element={<Points />} />
//             </Switch>
//         </div>
//     )
// }

// export default Main;
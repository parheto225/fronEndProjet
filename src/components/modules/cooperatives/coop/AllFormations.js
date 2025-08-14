import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Content from "../../../Content";
import BaseUrl from "../../../config/baseUrl";
import { useTranslation } from "react-i18next";

const url = BaseUrl();

function AllFormations() {
  const { t } = useTranslation();
  const [formations, setFormations] = useState([]);
  const [campagnes, setCampagnes] = useState([]);
  const [thematiques, setThematiques] = useState([]);
  const [campagneSelected, setCampagneSelected] = useState('');
  const [thematiqueSelected, setThematiqueSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(`${url}/formations/?page_size=20`);
  const loaderRef = useRef(null);
  const [totalFormations, setTotalFormations] = useState(0);

  // Charger campagnes
  useEffect(() => {
    axios.get(`${url}/campagnes/`) // ⚠️ Change si différent
      .then(res => {
        setCampagnes(res.data);
      });
  }, []);

  // Charger les thematiques
    useEffect(() => {
      axios.get(`${url}/thematiques/`) // ⚠️ Change si différent
        .then(res => {
          setThematiques(res.data);
        });
    }, []);
  // useEffect(() => {
  //   // axios.get(`${url}/campagnes/`).then(res => setCampagnes(res.data));
  //   axios.get(`${url}/thematiques/`).then(res => setThematiques(res.data));
  // }, []);

  const fetchFormations = useCallback(async () => {
    if (!nextPageUrl || loading) return;
    setLoading(true);

    try {
      const response = await axios.get(nextPageUrl, {
        params: {
          campagne: campagneSelected,
          thematique: thematiqueSelected,
        },
      });

      setFormations(prev => [...prev, ...response.data.results]);
      setNextPageUrl(response.data.next);
      setTotalFormations(response.data.count);
    } catch (error) {
      console.error("Erreur chargement formations:", error);
    } finally {
      setLoading(false);
    }
  }, [nextPageUrl, loading, campagneSelected, thematiqueSelected]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if (target.isIntersecting) fetchFormations();
    }, { rootMargin: "100px" });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchFormations]);

  // Remettre à zéro les résultats quand on filtre
  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        const response = await axios.get(`${url}/formations/`, {
          params: {
            campagne: campagneSelected,
            thematique: thematiqueSelected,
          },
        });
        setFormations(response.data.results);
        setNextPageUrl(response.data.next);
        setTotalFormations(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFiltered();
  }, [campagneSelected, thematiqueSelected]);

  return (
    <Content sideID={"cooperatives"} parent={"generalite"}>
      <h2 className="text-bold text-1100 mb-5">
        {t("Liste des Formations")} ({totalFormations})
      </h2>

      <div className="row align-items-center justify-content-between g-3 mb-4">
        <div className="col-md-4">
          <select
            className="form-control"
            value={campagneSelected}
            onChange={e => setCampagneSelected(e.target.value)}
          >
            <option value="">{t("Choisir une Campagne")}</option>
            {campagnes.map(c => (
              <option key={c.id} value={c.id}>{c.libelle}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            value={thematiqueSelected}
            onChange={e => setThematiqueSelected(e.target.value)}
          >
            <option value="">{t("Choisir une Thématique")}</option>
            {thematiques.map(t => (
              <option key={t.id} value={t.id}>{t.libelle}</option>
            ))}
          </select>
        </div>

        <div className="col-auto">
          <a
            className="btn btn-sm btn-danger"
            href={`${url}/formations/export/excel/?campagne=${campagneSelected}&thematique=${thematiqueSelected}`}
            target="_blank" rel="noreferrer"
          >
            {t("Export PDF")}
          </a>
        </div>

        <div className="col-auto">
          <a
            className="btn btn-sm btn-success"
            href={`${url}/formations/export/excel/?campagne=${campagneSelected}&thematique=${thematiqueSelected}`}
            target="_blank" rel="noreferrer"
          >
            {t("Export EXCEL")}
          </a>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table fs--1 mb-0">
          <thead>
            <tr style={{ backgroundColor: "#EE9F27", color: "#fff", fontWeight: "bold" }}>
              <th className="sort white-space-nowrap align-middle pe-3 ps-0 text-uppercase text-center" scope="col">{t("Coopérative")}</th>
              <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount">{t("Formateur")}</th>
              <th className="sort align-middle pe-6 text-uppercase " scope="col" data-sort="amount">{t("Structure")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Thématique")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Campagne")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Thématique")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Date début")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Date fin")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Durée (Jour)")}</th>
              <th className="sort align-middle text-center text-uppercase" scope="col" data-sort="stage">{t("Participants")}</th>
            </tr>
          </thead>
          <tbody>
            {formations.map((f, index) => (
              <tr key={index}>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.entite_nom}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.formateur}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.structure_formateur}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.intitule_libelle}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.campagne_libelle}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.intitule_libelle}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.debut}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.fin}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">{f.duree}</td>
                <td className="description align-middle white-space-nowrap fw-bold text-center text-700 py-2 pe-6">
                  <a
                    className="btn btn-sm btn-success" 
                    // style={{marginTop : "-10px"}}
                    href=""
                    target="_blank" rel="noreferrer"
                  >
                    {t("Participants")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={loaderRef} className="h-10"></div>
        {loading && <p className="text-center py-3">Chargement...</p>}
      </div>
    </Content>
  );
}

export default AllFormations;

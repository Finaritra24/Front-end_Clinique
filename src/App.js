import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccueilAdmin from "./admin/AccueilAdmin";
import AjoutAdmin from "./admin/AjoutAdmin";
import Budget from "./admin/budget/Budget";
import Depense from "./admin/depense/Depense";
import ModifDepense from "./admin/depense/ModifDepense";
import LoginAdmin from "./admin/LoginAdmin";
import ModifPatient from "./admin/patient/ModifPatient";
import Patient from "./admin/patient/Patient";
import ModifRecette from "./admin/recette/ModifRecette";
import Recette from "./admin/recette/Recette";
import './App.css';
import AccueilUser from "./user/AccueilUser";
import AchatPatient from "./user/AchatPatient/AchatPatient";
import ModifAchatPatient from "./user/AchatPatient/ModifAchatPatient";
import AjoutUser from "./user/AjoutUser";
import DepenseClinique from "./user/Depense/DepenseClinique";
import ModifDepenseClinique from "./user/Depense/ModifDepenseClinique";
import LoginUser from "./user/LoginUser";

function App() {
  return (
    <div>
    <div className="background">
      
    <div className="myHeader">
      <p><i className="pi pi-plus" style={{ color: 'var(--primary-color)' }}></i>Clinique</p>
    </div>
    <br/>
    {/* Le contenu de votre application */}
    <Router>
    <div className='App'>
    <Routes>
      {/* admin */}
      <Route exact path="/admin" element={<LoginAdmin />} />
      <Route exact path="/ajoutadmin" element={<AjoutAdmin />} />
      <Route exact path="/accueiladmin" element={<AccueilAdmin />} />
      {/* recette */}
      <Route exact path="/recette" element={<Recette />} />
      <Route exact path="/modifrecette" element={<ModifRecette />} />
      {/* depense */}
      <Route exact path="/depense" element={<Depense />} />
      <Route exact path="/modifdepense" element={<ModifDepense />} />
      {/* accueil */}
      {/* user */}
      <Route exact path="/user" element={<LoginUser />} />
      <Route exact path="/ajoutuser" element={<AjoutUser/>} />
      <Route exact path="/accueiluser" element={<AccueilUser />} />
      {/* patient */}
      <Route exact path="/patient" element={<Patient />} />
      <Route exact path="/modifpatient" element={<ModifPatient />} />
      {/* achatpatient */}
      <Route exact path="/clirecette" element={<AchatPatient />} />
      <Route exact path="/modifachatPatient" element={<ModifAchatPatient />} />
      {/* achatpatient */}
      <Route exact path="/clidepense" element={<DepenseClinique />} />
      <Route exact path="/modifclidepense" element={<ModifDepenseClinique />} />
      {/* budget */}
      <Route exact path="/budget" element={<Budget />} />
    </Routes>
    </div>
    </Router>
  </div>
  </div>
  );
}

export default App;

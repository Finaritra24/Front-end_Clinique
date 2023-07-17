import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccueilAdmin from "./admin/AccueilAdmin";
import AjoutAdmin from "./admin/AjoutAdmin";
import Depense from "./admin/depense/Depense";
import ModifDepense from "./admin/depense/ModifDepense";
import LoginAdmin from "./admin/LoginAdmin";
import ModifRecette from "./admin/recette/ModifRecette";
import Recette from "./admin/recette/Recette";
import './App.css';
import AccueilUser from "./user/AccueilUser";
import AjoutUser from "./user/AjoutUser";
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
    </Routes>
    </div>
    </Router>
  </div>
  </div>
  );
}

export default App;

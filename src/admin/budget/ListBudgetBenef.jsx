import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import * as XLSX from 'xlsx';
import GeneratePdf from '../../pdf/GeneratePdf';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function ListBudgetBenef() {
  const [recettes, setRecettes] = useState([]);
  const [depenses, setDepenses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/listrecette', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setRecettes(data);
      })
      .catch(error => console.error(error));

    fetch('http://localhost:8081/listdepense', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setDepenses(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDownloadPDF = () => {
    const htmlContent = document.getElementById('partiePdf').innerHTML;
    GeneratePdf(htmlContent);
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(recettes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des Recettes');
    XLSX.writeFile(workbook, 'listes_recettes.xlsx');
  };

  const getTotalReel = (data) => {
    let total = 0;
    data.forEach(item => {
      total += item.reel;
    });
    total=Math.round(total);
    return total;
  };

  const getTotalBudget = (data) => {
    let total = 0;
    data.forEach(item => {
      total += item.budget;
    });
    total=Math.round(total);
    return total;
  };

  const getPercentage = (reel, budget) => {
    let total= (reel / budget) * 100;
    total=Math.round(total);
    return total;
  };

  const getDifference = (reel, budget) => {
    return Math.round(reel - budget);
  };
  const benefrecette=getTotalReel(recettes)-getTotalReel(depenses);
  const benefdepense=getTotalBudget(recettes)-getTotalBudget(depenses);
  const benefice=[
    {nom:"Recette",reel:getTotalReel(recettes),budget:getTotalBudget(recettes),realisation:Math.round(getPercentage(getTotalReel(recettes),getTotalBudget(recettes)))},
    {nom:"Depense",reel:getTotalReel(depenses),budget:getTotalBudget(depenses),realisation:Math.round(getPercentage(getTotalReel(depenses),getTotalBudget(depenses)))},
    {nom:"",reel:getTotalReel(recettes)-getTotalReel(depenses),budget:getTotalBudget(recettes)-getTotalBudget(depenses),realisation:Math.round(getPercentage(benefrecette,benefdepense))}
  ];
  const [annee,setAnnee]=useState('');
  const [mois,setMois]=useState('');
  const changeAnnee = () => {
    fetch('http://localhost:8081/setCookie-Budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id:annee}),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
      }
    })
    .catch(error => {
      console.error(error);
    });
    }
    const changeMois = () => {
      fetch('http://localhost:8081/setCookie-BudgetBenef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:annee}),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
        }
      })
      .catch(error => {
        console.error(error);
      });
      }
      const change=()=>{
        changeAnnee();
        changeMois();
      }
  return (
    <div>
      <div>
        <p>Recette : </p>
        <div id="partiePdf">
          <InputText value={mois} placeholder="Mois" onChange={(e) => setMois(e.target.value)} />
          <InputText value={annee} placeholder="Annee" onChange={(e) => setAnnee(e.target.value)} />
              <Button label="Changer" icon="pi pi-plus" className="w-10rem mx-auto" onClick={change}/>
          <div className="card">
            <DataTable value={recettes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column sortable field="typeacte" header="Type acte" style={{ width: '25%' }}></Column>
              <Column sortable field="reel" header="Reel" style={{ width: '25%' }}></Column>
              <Column sortable field="budget" header="Budget" style={{ width: '25%' }}></Column>
              <Column sortable field="realisation" header="Realisation" style={{ width: '25%' }}></Column>
            </DataTable>
            <p>Total reel:{getTotalReel(recettes)} - Total budget: {getTotalBudget(recettes)} - Realisation: {getPercentage(getTotalReel(recettes),getTotalBudget(recettes))}</p>
          </div>
        </div>
      </div>
      <div>
        <p>Depense : </p>
        <div id="partiePdf">
          <div className="card">
            <DataTable value={depenses} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column sortable field="typeacte" header="Type acte" style={{ width: '25%' }}></Column>
              <Column sortable field="reel" header="Reel" style={{ width: '25%' }}></Column>
              <Column sortable field="budget" header="Budget" style={{ width: '25%' }}></Column>
              <Column sortable field="realisation" header="Realisation" style={{ width: '25%' }}></Column>
            </DataTable>
            <p>Total reel:{getTotalReel(depenses)} - Total budget: {getTotalBudget(depenses)} - Realisation: {getPercentage(getTotalReel(depenses),getTotalBudget(depenses))}</p>
          </div>
        </div>
      </div>
      <div>
        <p>Benefice : </p>
        <div id="partiePdf">
          <div className="card">
            <DataTable value={benefice} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
              <Column sortable field="nom" header="Type" style={{ width: '25%' }}></Column>
              <Column sortable field="reel" header="Reel" style={{ width: '25%' }}></Column>
              <Column sortable field="budget" header="Budget" style={{ width: '25%' }}></Column>
              <Column sortable field="realisation" header="Realisation" style={{ width: '25%' }}></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}

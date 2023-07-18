import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import * as XLSX from 'xlsx';
import GeneratePdf from '../../pdf/GeneratePdf';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListBudget() {
  //listes
  const [budgets,setBudgets]=useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/listbudget', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {setBudgets(data);
      })
      .catch(error => console.error(error));
  }, []);
  //Generer pdf
  const handleDownloadPDF = () => {
    const htmlContent = document.getElementById('partiePdf').innerHTML;
    GeneratePdf(htmlContent);
  };
  //Generer excel
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(budgets);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des Budgets");
    XLSX.writeFile(workbook, "listes_budgets.xlsx");
  };
  //show error
  const[annee,setAnnee]=useState('');
  const changeAnnee = () => {
    fetch('http://localhost:8081/setCookie-Budget', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id:annee}),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
        window.location.reload();
      }
    })
    .catch(error => {
      console.error(error);
    });
    }
  return (
        <div>
            <label htmlFor="Nom" className="font-bold block mb-2">
                Annee :
              </label>
              <InputText value={annee} onChange={(e) => setAnnee(e.target.value)} />
              <Button label="Changer" icon="pi pi-plus" className="w-10rem mx-auto" onClick={changeAnnee}/>
              <div id="partiePdf">
  
                    <div className="card">
                        <DataTable value={budgets} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column sortable field="annee" header="Annee" style={{ width: '25%' }}></Column>
                            <Column sortable filter filterPlaceholder="Chercher par mois" field="mois" header="Mois" style={{ width: '25%' }}></Column>
                            <Column sortable field="totalachats" header="Total Achats" style={{ width: '25%' }}></Column>
                            <Column sortable field="totaldepenses" header="Total Depenses" style={{ width: '25%' }}></Column>
                            <Column sortable field="differences" header="Reste" style={{ width: '25%' }}></Column>
                            
                        </DataTable>
                        <button onClick={handleDownloadPDF}>Générer PDF</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
              </div>
        </div>
  );
}

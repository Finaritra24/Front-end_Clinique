import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import * as XLSX from 'xlsx';
import { Button } from 'primereact/button';
import GeneratePdf from '../../pdf/GeneratePdf';
import { useNavigate } from 'react-router-dom';

export default function ListDepenseClinique() {
  // listes
  const [depenses, setDepenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8081/listg-VDepense', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erreur lors de la récupération des données.');
        }
      })
      .then(data => {
        setDepenses(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Generer pdf
  const handleDownloadPDF = () => {
    const htmlContent = document.getElementById('partiePdf').innerHTML;
    GeneratePdf(htmlContent);
  };

  // Generer excel
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(depenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des Depenses');
    XLSX.writeFile(workbook, 'listes_depenses.xlsx');
  };

  // show error
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'No Profil', life: 3000 });
  };

  // vers modifier
  const handleOnClick = (id) => {
    fetch('http://localhost:8081/setCookie-Depense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          navigate('/modifclidepense');
        } else {
          showError();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteClick = (id) => {
    fetch('http://localhost:8081/dropg-Depense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          showError();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div id="partiePdf">
      <div className="card">
        <DataTable
          value={depenses}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50,400]}
          tableStyle={{ minWidth: '50rem' }}
          filterDisplay="row"
        >
          <Column
            filter
            filterPlaceholder="Chercher par date"
            sortable
            field="dateDepense"
            header="dateDepense"
            style={{ width: '25%' }}
          ></Column>
          <Column
            sortable
            filter
            filterPlaceholder="Chercher par nom utilisateur"
            field="nomUtilisateur"
            header="nomUtilisateur"
            style={{ width: '25%' }}
          ></Column>
          <Column sortable field="idDepense" header="idDepense" style={{ width: '25%' }}></Column>
          <Column
            sortable
            filter
            filterPlaceholder="Chercher par nom"
            field="nom"
            header="nom"
            style={{ width: '25%' }}
          ></Column>
          <Column
            sortable
            filter
            filterPlaceholder="Chercher par categorie"
            field="nomCateg"
            header="nomCateg"
            style={{ width: '25%' }}
          ></Column>
          <Column sortable field="prix" header="prix" style={{ width: '25%' }}></Column>
          <Column
            field="button"
            header="button"
            style={{ width: '25%' }}
            body={(rowData) => {
              return (
                <div>
                  <Button icon="pi pi-file-edit" onClick={() => handleOnClick(rowData.idDepense)} />
                  <Button icon="pi pi-times" onClick={() => deleteClick(rowData.idDepense)} />
                </div>
              );
            }}
          ></Column>
        </DataTable>
        <button onClick={handleDownloadPDF}>Générer PDF</button>
        <button onClick={generateExcel}>Générer excel</button>
      </div>
    </div>
  );
}
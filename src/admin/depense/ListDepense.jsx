import React, { useState,useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import * as XLSX from 'xlsx';
import { Button } from 'primereact/button';
import GeneratePdf from '../../pdf/GeneratePdf';
import { useNavigate} from 'react-router-dom';

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListDepense() {
  //listes
  const [depenses,setDepenses]=useState([]);
  const imageBodyTemplate = (rowData) => {
    const base64Image = rowData.img; // Supposons que la propriété 'image' contient la représentation Base64 de l'image
    return <img src={`${base64Image}`} alt="Image" style={{width:'4rem', height:'4rem'}}/>;
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8081/listg-CategorieDepense', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {setDepenses(data);
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
    const worksheet = XLSX.utils.json_to_sheet(depenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des Depenses");
    XLSX.writeFile(workbook, "listes_depenses.xlsx");
  };
  //show error
  const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'No Profil', life: 3000});
    }
  //vers modifier
  const handleOnClick = (id) => {
    fetch('http://localhost:8081/setCookie-CategorieDepense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
        navigate('/modifdepense')
      } else {
        // si la connexion a échoué, affichez un message d'erreur
        showError()
      }
    })
    .catch(error => {
      console.error(error);
    });
    }

    const deleteClick = (id) => {
      fetch('http://localhost:8081/dropg-CategorieDepense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id}),
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
          window.location.reload();
        } else {
          // si la connexion a échoué, affichez un message d'erreur
          showError()
        }
      })
      .catch(error => {
        console.error(error);
      });
      }
  
  return (
              <div id="partiePdf">
  
                    <div className="card">
                        <DataTable value={depenses} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column sortable field="idCategorieDepense" header="idCategorieDepense" style={{ width: '25%' }}></Column>
                            <Column sortable field="nom" header="nom" style={{ width: '25%' }}></Column>
                            <Column header="Image" body={imageBodyTemplate}></Column>
                            <Column   field="button" header="button" style={{ width: '25%' }}
                              body={(rowData) => {
                                  return <div><Button icon="pi pi-file-edit" onClick={() => handleOnClick(rowData.idCategorieDepense)}/> <Button icon="pi pi-times" onClick={() => deleteClick(rowData.idCategorieDepense)}/></div>;
                              }} >
                            </Column>
                        </DataTable>
                        <button onClick={handleDownloadPDF}>Générer PDF</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
              </div>
        
  );
}

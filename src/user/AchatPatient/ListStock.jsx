import React, { useState,useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import * as XLSX from 'xlsx';
import { Button } from 'primereact/button';
import GeneratePdf from '../../pdf/GeneratePdf';
import { useNavigate} from 'react-router-dom';

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListStock() {
  //listes
  const [stocks,setStocks]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8081/listg-Stock', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {setStocks(data);
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
    const worksheet = XLSX.utils.json_to_sheet(stocks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des Stocks");
    XLSX.writeFile(workbook, "listes_stocks.xlsx");
  };
  //show error
  const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'No Profil', life: 3000});
    }
  //vers modifier
  const handleOnClick = (id) => {
    fetch('http://localhost:8081/setCookie-Stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
        navigate('/modifstock')
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
      fetch('http://localhost:8081/dropg-Stock', {
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
                        <DataTable value={stocks} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                            <Column sortable field="idStock" header="idStock" style={{ width: '25%' }}></Column>
                            <Column sortable field="idProduit" header="idProduit" style={{ width: '25%' }}></Column>
                            <Column sortable field="nombre" header="nombre" style={{ width: '25%' }}></Column>
                            <Column   field="button" header="button" style={{ width: '25%' }}
                              body={(rowData) => {
                                  return <div><Button icon="pi pi-file-edit" onClick={() => handleOnClick(rowData.idStock)}/> <Button icon="pi pi-times" onClick={() => deleteClick(rowData.idStock)}/></div>;
                              }} >
                            </Column>
                        </DataTable>
                        <button onClick={handleDownloadPDF}>Générer PDF</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
              </div>
        
  );
}

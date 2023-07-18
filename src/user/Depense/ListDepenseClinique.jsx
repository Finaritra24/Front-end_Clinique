import React, { useState,useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import * as XLSX from 'xlsx';
import { Button } from 'primereact/button';
import GeneratePdf from '../../pdf/GeneratePdf';
import { useNavigate} from 'react-router-dom';

<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListDepenseClinique() {
  //listes
  const [depenses,setDepenses]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8081/listg-VDepense', { credentials: 'include' })
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
    fetch('http://localhost:8081/setCookie-Depense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
        navigate('/modifclidepense')
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
      fetch('http://localhost:8081/dropg-Depense', {
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
      const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à partir de 0
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  const dataTableRef = useRef(null);

  useEffect(() => {
    // Mettre à jour la valeur du filtre lorsque currentDate change
    if (dataTableRef.current) {
      dataTableRef.current.filter(currentDate, 'dateDepense', 'equals');
    }
  }, [currentDate]);
  
  
  return (
    <div id="partiePdf">
      <div className="card">
        <DataTable
          ref={dataTableRef}
          value={depenses}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
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
                            <Column sortable filter filterPlaceholder="Chercher par nom utilisateur" field="nomUtilisateur" header="nomUtilisateur" style={{ width: '25%' }}></Column>
                            <Column sortable field="idDepense" header="idDepense" style={{ width: '25%' }}></Column>
                            <Column sortable field="nom" header="nom" filter filterPlaceholder="Chercher par nom" style={{ width: '25%' }}></Column>
                            <Column sortable filter filterPlaceholder="Chercher par categorie" field="nomCateg" header="nomCateg" style={{ width: '25%' }}></Column>
                            <Column sortable field="prix" header="prix" style={{ width: '25%' }}></Column>
                            
                            <Column   field="button" header="button" style={{ width: '25%' }}
                              body={(rowData) => {
                                  return <div><Button icon="pi pi-file-edit" onClick={() => handleOnClick(rowData.idDepense)}/> <Button icon="pi pi-times" onClick={() => deleteClick(rowData.idDepense)}/></div>;
                              }} >
                            </Column>
                        </DataTable>
                        <button onClick={handleDownloadPDF}>Générer PDF</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
              </div>
        
  );
}

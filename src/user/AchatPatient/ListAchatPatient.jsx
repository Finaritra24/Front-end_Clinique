import React, { useState,useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import * as XLSX from 'xlsx';
import { Button } from 'primereact/button';
import GeneratePdf from '../../pdf/GeneratePdf';
import { useNavigate} from 'react-router-dom';
import { InputSwitch } from 'primereact/inputswitch';
import { Dialog } from 'primereact/dialog';
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>
        
export default function ListAchatPatient() {
  //listes
  const [achatPatients,setAchatPatients]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8081/listg-VAchatPatient', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {setAchatPatients(data);
      })
      .catch(error => console.error(error));
  }, []);
  
  //Generer excel
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(achatPatients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Liste des AchatPatients");
    XLSX.writeFile(workbook, "listes_achatPatients.xlsx");
  };
  //show error
  const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'No Profil', life: 3000});
    }
  //vers modifier
  const handleOnClick = (id) => {
    fetch('http://localhost:8081/setCookie-AchatPatient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include'
    })
    .then(response => {
      if (response.ok) {
        // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
        navigate('/modifachatPatient')
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
      fetch('http://localhost:8081/dropg-AchatPatient', {
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
      const [nom, setNom] = useState('');
      const [nomPatient,setNomPatient]=useState('');
      const [nomCateg,setNomCateg]=useState('');
      

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à partir de 0
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
    setNom('');
    setNomPatient('');
    setNomCateg('');
  }, []);

  const dataTableRef = useRef(null);
//Generer pdf
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [rowClick, setRowClick] = useState(true);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  function handlePasswordSubmit(event) {
    const htmlContent = document.getElementById('partiePdf').innerHTML;
    GeneratePdf(htmlContent);
  }

  return (
    <div>
      <div className="card">
      <div className="flex justify-content-center align-items-center mb-4 gap-2">
          <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
          <label htmlFor="input-rowclick">Row Click</label>
      </div>
        <DataTable
          value={achatPatients}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: '50rem' }}
          filterDisplay="row" selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column
            filter
            filterField="dateRecette"
            filterPlaceholder="Chercher par date"
            sortable
            field="dateRecette"
            header="dateRecette"
            style={{ width: '25%' }}
          ></Column>
          
                            <Column sortable filter filterField="nom" filterPlaceholder="Chercher par nom " field="nom" header="nom" style={{ width: '25%' }}></Column>
                            <Column sortable filter filterField="nomPatient" filterPlaceholder="Chercher par nom du patient" field="nomPatient" header="nomPatient" style={{ width: '25%' }}></Column>
                            <Column sortable field="idAchatPatient" header="idAchatPatient" style={{ width: '25%' }}></Column>
                            <Column sortable filter filterField="nomCateg" filterPlaceholder="Chercher par categorie" field="nomCateg" header="nomCateg" style={{ width: '25%' }}></Column>
                            <Column sortable field="prix" header="prix" style={{ width: '25%' }}></Column>
                            
                            <Column   field="button" header="button" style={{ width: '25%' }}
                              body={(rowData) => {
                                  return <div><Button icon="pi pi-file-edit" onClick={() => handleOnClick(rowData.idAchatPatient)}/> <Button icon="pi pi-times" onClick={() => deleteClick(rowData.idAchatPatient)}/></div>;
                              }} >
                            </Column>
                        </DataTable>
                        <button onClick={() => setShowPasswordDialog(true)}>Valider</button>
                        <button onClick={generateExcel}>Générer excel</button>
                    </div>
                    <Dialog header="Pdf" visible={showPasswordDialog} modal onHide={() => setShowPasswordDialog(false)}>
                      <div>
                      <div id="partiePdf">
                        <div class="invoice">
                          <div class="header">
                            <h1>Facture Actes</h1>
                          </div>
                          <table>
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Nom d'utilisateur</th>
                                <th>Nom</th>
                                <th>Catégorie</th>
                                <th>Prix</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedProducts.map((depense) => (
                                <tr>
                                  <td>{depense.dateRecette}</td>
                                  <td>{depense.nomPatient}</td>
                                  <td>{depense.nom}</td>
                                  <td>{depense.nomCateg}</td>
                                  <td>{depense.prix}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div class="footer">
                            <p>Signature :</p>
                          </div>
                        </div>
                      </div>

                              <button onClick={handlePasswordSubmit}>Générer PDF</button>
                      </div>
                    </Dialog>
        </div>
  );
}

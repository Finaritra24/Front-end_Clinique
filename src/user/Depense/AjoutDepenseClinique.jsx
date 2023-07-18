import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import GenerDropdown from '../../composant/GenerDropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default function AjoutDepenseClinique() {
  const selectedTypesRef2 = useRef('');
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [dateDepense, setDateDepense] = useState('');
  const toast = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedType2 = selectedTypesRef2.current;
    if ( !selectedType2) {
      showError();
      return;
    }
    const data = {
      nom,
      prix,
      datedepense:dateDepense,
      idcategoriedepense:selectedType2
    };
    sendFormData(data);
  };

  const sendFormData = (data) => {
    fetch('http://localhost:8081/ajoutg-Depense',{
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Succès
          window.location.reload();
        } else {
          // Erreur
          showError();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Veuillez remplir le formulaire',
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toast} />

      <form onSubmit={handleSubmit}>
        <div className="flex flex-column md:flex-row">
          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
          <div className="flex flex-wrap gap-2">
                <label htmlFor="Produit" className="font-bold block mb-2">
                  Date :
                </label>
                <Calendar value={dateDepense} onChange={(e) => setDateDepense(e.value)} dateFormat="dd/mm/yy" />
              </div>
            <div className="flex flex-wrap gap-2">
              <label htmlFor="Km debut" className="font-bold block mb-2">
                Categorie  :
              </label>
              <GenerDropdown nomClass="CategorieDepense" labels="nom" selectedTypesRef={selectedTypesRef2} />
{/* Passez la référence selectedTypesRef */}{/* Passez la référence selectedTypesRef */}
            </div>
            <div className="flex flex-wrap  gap-2">
              <label htmlFor="Nom" className="font-bold block mb-2">
                Nom :
              </label>
              <InputText value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
          </div>
          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex" />
            <Divider layout="horizontal" className="flex md:hidden" align="center" />
          </div>
          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
          <div className="flex flex-wrap gap-2">
              <label htmlFor="carburant" className="font-bold block mb-2">
                Prix:
              </label>
              <InputNumber
                inputId="minmaxfraction"
                value={prix}
                onValueChange={(e) => setPrix(e.value)}
                minFractionDigits={2}
                maxFractionDigits={2}
              />
            </div>
          </div>
        </div>
        <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto" />
      </form>
    </div>
  );
}

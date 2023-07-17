import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import GenerDropdown from '../../composant/GenerDropdown';
import { InputNumber } from 'primereact/inputnumber';

export default function AjoutAchatPatient() {
  const selectedTypesRef = useRef('');
  const [nombre, setNombre] = useState('');
  const toast = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedType = selectedTypesRef.current;
    if (!selectedType) {
      showError();
      return;
    }
    const data = {
      idproduit:selectedType,
      nombre:nombre
    };
    sendFormData(data);
  };

  const sendFormData = (data) => {
    fetch('http://localhost:8081/ajoutg-AchatPatient', {
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
              <label htmlFor="Km debut" className="font-bold block mb-2">
                Produit :
              </label>
              <GenerDropdown nomClass="Produit" labels="nom" selectedTypesRef={selectedTypesRef} /> {/* Passez la référence selectedTypesRef */}
            </div>
          </div>
          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex" />
            <Divider layout="horizontal" className="flex md:hidden" align="center" />
          </div>
          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
          <div className="flex flex-wrap gap-2">
              <label htmlFor="carburant" className="font-bold block mb-2">
                Nombre:
              </label>
              <InputNumber
                inputId="minmaxfraction"
                value={nombre}
                onValueChange={(e) => setNombre(e.value)}
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

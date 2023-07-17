import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';

export default function AjoutRecette() {
  const [nom, setNom] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useRef(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Image convertie en base64

        const data = {
          nom: nom,
          img: base64Image,
        };

        sendFormData(data);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const sendFormData = (data) => {
    fetch('http://localhost:8081/ajoutg-CategorieRecette', {
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
            <input type="file" name="file" accept="image/*" onChange={handleFileInputChange} />
          </div>
        </div>
        <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto" />
      </form>
    </div>
  );
}

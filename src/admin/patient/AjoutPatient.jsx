import React, { useRef,useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import GenerDropdown from '../../composant/GenerDropdown';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
        

export default function AjoutProduit() {
  const selectedTypesRef = useRef('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [selectedrembours, setSelectedrembours] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const rembourse = [
    { nom: "remboursable", value: 0 },
    { nom: "non remboursable", value: 1 }
  ];
  
  const toast = useRef(null);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedType = selectedTypesRef.current;
    if (!selectedType) {
      showError();
      return;
    }
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Image convertie en base64

        const data = {
          nom: nom,
          prenom:prenom,
          datenaissance:dateNaissance,
          idgenre:selectedType,
          remboursement:selectedrembours,
          img: base64Image,
        };

        sendFormData(data);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const sendFormData = (data) => {
    fetch('http://localhost:8081/ajoutg-Patient', {
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
            <div className="flex flex-wrap  gap-2">
              <label htmlFor="Prenom" className="font-bold block mb-2">
                Prenom :
              </label>
              <InputText value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-2">
              <label htmlFor="Km debut" className="font-bold block mb-2">
                Genre :
              </label>
              <GenerDropdown nomClass="Genre" labels="nom" selectedTypesRef={selectedTypesRef} /> {/* Passez la référence selectedTypesRef */}
            </div>
          </div>
          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex" />
            <Divider layout="horizontal" className="flex md:hidden" align="center" />
          </div>
          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
            <div className="flex flex-wrap gap-2">
                <label htmlFor="Produit" className="font-bold block mb-2">
                  Date de naissance :
                </label>
                <Calendar value={dateNaissance} onChange={(e) => setDateNaissance(e.value)} dateFormat="dd/mm/yy" />
              </div>
            <div className="flex flex-wrap gap-2">
              <label htmlFor="carburant" className="font-bold block mb-2">
                Remboursement :
              </label>
              <Dropdown
                value={selectedrembours}
                onChange={(e) => setSelectedrembours(e.value)}
                options={rembourse}
                optionLabel="nom"
                optionValue="value"
                placeholder="Selectionner"
                className="w-full md:w-14rem"
              />
            </div>
            <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
            <input type="file" name="file" accept="image/*" onChange={handleFileInputChange} />
          </div>
        </div>
      </div>
        <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto" />
      </form>
    </div>
  );
}

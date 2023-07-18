import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import GenerDropdown from '../../composant/GenerDropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";

export default function AjoutDepenseClinique() {
  const selectedTypesRef2 = useRef('');
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const toast = useRef(null);
  //date
  const [jour,setJour]=useState('');
  const[annee,setAnnee]=useState('');
  const listmois=[
    {id:'01',nom:'Janvier'},
    {id:'02',nom:'Fevrier'},
    {id:'03',nom:'Mars'},
    {id:'04',nom:'Avril'},
    {id:'05',nom:'Mai'},
    {id:'06',nom:'Juin'},
    {id:'07',nom:'Juillet'},
    {id:'08',nom:'Aout'},
    {id:'09',nom:'Septembre'},
    {id:'10',nom:'Octobre'},
    {id:'11',nom:'Novembre'},
    {id:'12',nom:'Decembre'},
  ];
  const[selectedMois,setSelectedMois]=useState([]); // Initialisez selectedMois avec un tableau vide

  const onMoisChange = (e) => {
    const checkedMois = e.checked;
    const moisId = e.value.id;
  
    if (checkedMois) {
      // Ajouter le mois à la liste des mois sélectionnés
      setSelectedMois((prevSelectedMois) => [...prevSelectedMois, moisId]);
    } else {
      // Retirer le mois de la liste des mois sélectionnés
      setSelectedMois((prevSelectedMois) =>
        prevSelectedMois.filter((mois) => mois !== moisId)
      );
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedType2 = selectedTypesRef2.current;
    if ( !selectedType2) {
      showError();
      return;
    }
    const data = {
      jour,
      annee,
      mois: selectedMois,
      categorie: selectedType2,
      nom,
      prix,
    };
    sendFormData(data);
  };

  const sendFormData = (data) => {
    fetch('http://localhost:8081/ajoutdepense', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Succès
          // window.location.reload();
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
      <div className="w-full md:w-4/12 flex flex-column align-items-s justify-content-center gap-3 py-5">
        <div className="flex flex-wrap gap-2">
          <label htmlFor="Nom" className="font-bold block mb-2">
            Jour :
          </label>
          <InputNumber value={jour} onValueChange={(e) => setJour(e.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <label htmlFor="Nom" className="font-bold block mb-2">
            Année :
          </label>
          <InputNumber value={annee} onValueChange={(e) => setAnnee(e.value)} />
        </div>
      </div>

      <div className="w-full md:w-4/12 flex flex-column align-items-s justify-content-center gap-3 py-5">
        <div className="flex flex-wrap gap-2">
          <label htmlFor="Produit" className="font-bold block mb-2">
            Mois :
          </label>
          <div className="card flex justify-content-center">
            <div className="flex flex-column gap-3">
              <ScrollPanel style={{ height: '200px' }}>
                <div className="flex flex-column gap-3">
                  {listmois.map((category) => {
                    return (
                      <div key={category.id} className="flex align-items-center">
                        <Checkbox
                          inputId={category.id}
                          name="mois"
                          value={category}
                          onChange={onMoisChange}
                          checked={selectedMois.includes(category.id)}
                        />
                        <label htmlFor={category.id} className="ml-2">
                          {category.nom}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </ScrollPanel>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/12 flex flex-column align-items-s justify-content-center gap-3 py-5">
        <div className="flex flex-wrap gap-2">
          <label htmlFor="Km debut" className="font-bold block mb-2">
            Catégorie :
          </label>
          <GenerDropdown nomClass="CategorieDepense" labels="nom" selectedTypesRef={selectedTypesRef2} />
        </div>
        <div className="flex flex-wrap gap-2">
          <label htmlFor="Nom" className="font-bold block mb-2">
            Nom :
          </label>
          <InputText value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          <label htmlFor="carburant" className="font-bold block mb-2">
            Prix :
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

import React, { useState,useRef,useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';
import GenerDropdown from '../../composant/GenerDropdown';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
// import { useNavigate } from 'react-router-dom';
export default function ModifPatient() {
    const navigate=useNavigate();
    // const id=Cookies.get('userId');
    //ajout
    //ajout-component
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
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const[patient,setPatient]=useState('');
    useEffect(() => {
      if (patient !== null) {
        setNom(patient.nom);
        setPrenom(patient.prenom);
        setDateNaissance(patient.dateNaissance);
      }
    }, [patient]);

    useEffect(() => {
      fetch('http://localhost:8081/getObject-Patient', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          setPatient(data);
        })
        .catch(error => console.error(error));
    }, []);
    //post ajout assurance
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Erreur de modification', life: 3000});
    }
    const showErrorMdp = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Mot de passe incorrecte', life: 3000});
    }
  
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
      fetch('http://localhost:8081/modif-Patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            navigate("/patient");
          } else {
            // Erreur
            showError();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    //fin post ajout assurance
  //fin ajoutt
  //popup
  const [password, setPassword] = useState('password1');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  function handlePasswordSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:8081/ifMdpAdmin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mdp:password }),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            setShowPasswordDialog(false);
            handleSubmit(event);
          } else {
            showErrorMdp()
            setPassword('');
            setShowPasswordDialog(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
}

if (patient === null) {
  return <p>Chargement...</p>;
}
  return (
      <div>
                <Toast ref={toast} />
                <div className="card">
                  <Fieldset legend="Modifier un patient" style={{width:'60%', margin:'auto'}}>
                     <h1>Modifier Patient</h1>
           
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
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <Button label="Modifier" icon="pi pi-plus" className="w-10rem mx-auto" onClick={() => setShowPasswordDialog(true)}></Button>
                      </div>
                  </div>
                    </Fieldset>
                {/* </form> */}
                <Dialog header="Vérification de mot de passe" visible={showPasswordDialog} modal onHide={() => setShowPasswordDialog(false)}>
                <form onSubmit={handlePasswordSubmit}>
                    <div className="p-field">
                        <label htmlFor="password">Mot de passe</label>
                        <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                    </div>
                    <Button type="submit" label="Vérifier" className="mr-2" />
                    <Button label="Annuler" className="p-button-secondary" onClick={() => setShowPasswordDialog(false)} />
                    </form>
                </Dialog>
                  </div>
      </div>
  )
}

import React, { useState,useRef ,useEffect} from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';
import GenerDropdown from '../../composant/GenerDropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
// import { useNavigate } from 'react-router-dom';
export default function ModifAchatPatient() {
    const navigate=useNavigate();
    const [achatPatient, setAchatPatient] = useState(null);
    useEffect(() => {
      if (achatPatient !== null) {
        setNom(achatPatient.nom);
        setPrix(achatPatient.prix);
      }
    }, [achatPatient]);

    useEffect(() => {
      fetch('http://localhost:8081/getObject-AchatPatient', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          setAchatPatient(data);
        })
        .catch(error => console.error(error));
    }, []);
    // const id=Cookies.get('userId');
    //ajout
    //ajout-component
    const selectedTypesRef = useRef('');
  const selectedTypesRef2 = useRef('');
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [dateRecette, setDateRecette] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedType = selectedTypesRef.current;
    const selectedType2 = selectedTypesRef2.current;
    if (!selectedType || !selectedType2) {
      showError();
      return;
    }
    const data = {
      nom,
      prix,
      daterecette:dateRecette,
      idpatient:selectedType2,
      idcategorierecette:selectedType
    };
    sendFormData(data);
  };
    
    //post ajout assurance
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Erreur de modification', life: 3000});
    }
    const showErrorMdp = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Mot de passe incorrecte', life: 3000});
    }
  
    const sendFormData = (data) => {
      fetch('http://localhost:8081/modif-AchatPatient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            navigate("/clirecette");
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

if (achatPatient === null) {
  return <p>Chargement...</p>;
}
  return (
      <div>
                <Toast ref={toast} />
                <div className="card">
                  <Fieldset legend="Modifier un achatPatient" style={{width:'60%', margin:'auto'}}>
                     <h1>Modifier AchatPatient</h1>
           
                     <div className="flex flex-column md:flex-row">
                      <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                      <div className="flex flex-wrap gap-2">
                            <label htmlFor="Produit" className="font-bold block mb-2">
                              Date :
                            </label>
                            <Calendar value={dateRecette} onChange={(e) => setDateRecette(e.value)} dateFormat="dd/mm/yy" />
                          </div>
                        <div className="flex flex-wrap gap-2">
                          <label htmlFor="Km debut" className="font-bold block mb-2">
                            Categorie  :
                          </label>
                          <GenerDropdown nomClass="CategorieRecette" labels="nom" selectedTypesRef={selectedTypesRef} /> {/* Passez la référence selectedTypesRef */}
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
                      <div className="flex flex-wrap  gap-2">
                          <label htmlFor="Patient" className="font-bold block mb-2">
                            Patient :
                          </label>
                          <GenerDropdown nomClass="Patient" labels="nom" selectedTypesRef={selectedTypesRef2} /> 
                        </div>
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

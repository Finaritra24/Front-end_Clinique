import React, { useState,useRef,useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
import { Divider } from 'primereact/divider';
import { InputNumber } from 'primereact/inputnumber';
// import { useNavigate } from 'react-router-dom';
export default function ModifRecette() {
    const navigate=useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    
  const[budget,setBudget]=useState('');
  const [code,setCode]=useState('');
    // const id=Cookies.get('userId');
    //ajout
    //ajout-component
    const [nom, setNom] = useState('');
    const [recette, setCategorieRecette] = useState(null);
    useEffect(() => {
      if (recette !== null) {
        setNom(recette.nom);
      }
    }, [recette]);

    useEffect(() => {
      fetch('http://localhost:8081/getObject-CategorieRecette', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          setCategorieRecette(data);
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
          budget:budget,
          code:code
          };
  
          sendFormData(data);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    const sendFormData = (data) => {
      fetch('http://localhost:8081/modif-CategorieRecette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            navigate("/recette");
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

if (recette === null) {
  return <p>Chargement...</p>;
}
  return (
      <div>
                <Toast ref={toast} />
                <div className="card">
                  <Fieldset legend="Modifier un recette" style={{width:'60%', margin:'auto'}}>
                     <h1>Modifier CategorieRecette</h1>
           
                     <div className="flex flex-column md:flex-row">
          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
            <div className="flex flex-wrap  gap-2">
              <label htmlFor="Nom" className="font-bold block mb-2">
                Nom :
              </label>
              <InputText value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
            <div className="flex flex-wrap  gap-2">
              <label htmlFor="Nom" className="font-bold block mb-2">
                Code :
              </label>
              <InputText value={code} onChange={(e) => setCode(e.target.value)} maxLength={3} />
            </div>
          </div>
          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex" />
            <Divider layout="horizontal" className="flex md:hidden" align="center" />
          </div>
          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
          <div className="flex flex-wrap gap-2">
              <label htmlFor="carburant" className="font-bold block mb-2">
                Budget:
              </label>
              <InputNumber
                inputId="minmaxfraction"
                value={budget}
                onValueChange={(e) => setBudget(e.value)}
                minFractionDigits={2}
                maxFractionDigits={2}
              />
            </div>
            <input type="file" name="file" accept="image/*" onChange={handleFileInputChange} />
          </div>
          
        </div>
        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <Button label="Modifier" icon="pi pi-plus" className="w-10rem mx-auto" onClick={() => setShowPasswordDialog(true)}></Button>
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

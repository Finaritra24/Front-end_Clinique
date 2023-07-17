import React, { useState,useRef,useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Fieldset } from 'primereact/fieldset';
// import { useNavigate } from 'react-router-dom';
export default function ModifDepense() {
    const navigate=useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    // const id=Cookies.get('userId');
    //ajout
    //ajout-component
    const [nom, setNom] = useState('');
    const [depense, setCategorieDepense] = useState(null);
    useEffect(() => {
      if (depense !== null) {
        setNom(depense.nom);
      }
    }, [depense]);

    useEffect(() => {
      fetch('http://localhost:8081/getObject-CategorieDepense', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
          setCategorieDepense(data);
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
          };
  
          sendFormData(data);
        };
        reader.readAsDataURL(selectedFile);
      }
    };
  
    const sendFormData = (data) => {
      fetch('http://localhost:8081/modif-CategorieDepense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            navigate("/depense");
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

if (depense === null) {
  return <p>Chargement...</p>;
}
  return (
      <div>
                <Toast ref={toast} />
                <div className="card">
                  <Fieldset legend="Modifier un depense" style={{width:'60%', margin:'auto'}}>
                     <h1>Modifier CategorieDepense</h1>
           
                      <div className="flex flex-column md:flex-row">
                        <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                          <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                              <label htmlFor="username" className="w-6rem">
                                  Nom :
                              </label>
                            <InputText value={nom} onChange={(e) => setNom(e.target.value)} />
                          </div>
                          
                        </div>   
                        <div className="flex flex-wrap  gap-2">
                          <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                            <input type="file" name="file" accept="image/*" onChange={handleFileInputChange} />
                          </div>
                      </div>
                      </div>
                    <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                      
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

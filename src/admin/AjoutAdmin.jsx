import React, { useState, useRef } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { Fieldset } from 'primereact/fieldset';
// import { useNavigate } from 'react-router-dom';
export default function AjoutAdmin() {
    //ajout
    //ajout-component
    const [identification, setIdentification] = useState('');
    const [passwrd, setPasswrd] = useState('');
    //post ajout vehicule
    // const navigate = useNavigate();
    const toast = useRef(null);
    const showError = () => {
      toast.current.show({severity:'error', summary: 'Error', detail:'Veuillez remplir le formulaire', life: 3000});
    }
    const showSuccess = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Ajout effectué' });
    }
    function handleSubmit(event) {
        event.preventDefault(); // empêche la soumission du formulaire
      
        fetch('http://localhost:8081/ajoutg-Administrateur', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identification,passwrd }),
          credentials: 'include'
        })
        .then(response => {
          if (response.ok) {
            // si la connexion a réussi, redirigez l'utilisateur vers une page de réussite
            showSuccess()
            window.location.reload();
          } else {
            // si la connexion a échoué, affichez un message d'erreur
            showError()
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    //fin post ajout vehicule


    
  //fin ajoutt
  return (
                <div>
                <Toast ref={toast} />
                <div className="card">
                  <Fieldset legend="Ajouter un administrateur" style={{width:'50%', margin:'auto'}}>
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-column md:flex-row">
                            <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                    <label htmlFor="username" className="w-6rem"  style={{width:'50%', margin:'auto'}}>
                                        Identification:
                                    </label>
                                  <InputText value={identification} onChange={(e) => setIdentification(e.target.value)} placeholder="Enter a name"  style={{margin:'auto',width:'13.5rem'}}/>
                                </div>
                                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                                  <label  style={{width:'50%', margin:'auto'}}>Mot de passe : </label>
                                  <Password value={passwrd} onChange={(e) => setPasswrd(e.target.value)} toggleMask  style={{ margin:'auto'}} />
                                <div>
                            </div>
                            </div>
                    </div>
                      </div>
                      <Button label="Ajouter" icon="pi pi-plus" className="w-10rem mx-auto" ></Button>
                    </form>
                    </Fieldset>
                    </div>
                  </div>
  )
}

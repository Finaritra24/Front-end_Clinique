
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';
export default function NavUser() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        navigate(url);
    };
    const handleOnClick = () => {
      
        fetch('http://localhost:8081/deconnexion', {
          method: 'GET',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
          .then(response => {
            if (response.ok) {
             navigate("/user")
            }
          })
          .catch(error => {
            console.error(error);
          });
      };
    const items = [
        {
            label: 'Element de base',
            icon: 'pi pi-sliders-h',
            items: [
                {
                label: 'Depense clinique',
                icon: 'pi pi-fw pi-file',
                command: () => handleNavigation('/clidepense'),
                },
                {
                label: 'Achat patient',
                icon: 'pi pi-fw pi-file',
                command: () => handleNavigation('/clirecette'),
                }
            ],
        },
        {
            label:'Deconnexion',
            icon:'pi pi-fw pi-sign-out',
            command: () => handleOnClick(),
        },
    ];
    return (
        <div className="card flex justify-content-center">
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Menu</h2>
                <div className="card flex justify-content-center">
                    <PanelMenu model={items} className="w-full md:w-25rem" />
                </div>
            </Sidebar>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} />
        </div>
    )
}
        

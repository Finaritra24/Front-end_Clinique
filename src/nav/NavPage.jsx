
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from 'react-router-dom';
export default function NavPage() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        navigate(url);
    };
    const items = [
        {
            label: 'Accueil',
            icon: 'pi pi-sliders-h',
            command: () => handleNavigation('/accueil'),
        },
        {
            label: 'Panier',
            icon: 'pi pi-sliders-h',
            command: () => handleNavigation('/panier'),
        },
        {
            label: 'Se connecter',
            icon: 'pi pi-sliders-h',
            command: () => handleNavigation('/user'),
        }
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
        

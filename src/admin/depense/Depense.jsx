import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import NavAdmin from '../../nav/NavAdmin';
import AjoutDepense from './AjoutDepense';
import ListDepense from './ListDepense';
import IfAdmin from '../IfAdmin';
        
export default function Depense() {
  
    const userId = IfAdmin();
  return (
    <div>
        <NavAdmin/>
        <h1>Depense</h1>
        <div className="card">
            <Accordion activeIndex={0}>
              <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-plus mr-2"></i>
                            <span className="vertical-align-middle">Ajouter Depense</span>
                        </div>
                    }
                >
                    <AjoutDepense/>
              </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-list mr-2"></i>
                            <span className="vertical-align-middle">Liste Depense</span>
                        </div>
                    }
                >
                    <ListDepense/>
                </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-search mr-2"></i>
                            <span className="vertical-align-middle">Autres</span>
                            <i className="pi pi-cog ml-2 ml-2"></i>
                        </div>
                    }
                >
                    <p className="m-0">
                        
                    </p>
                </AccordionTab>
            </Accordion>
        </div>
    </div>
  );
}

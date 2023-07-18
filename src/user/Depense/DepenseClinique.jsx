import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import NavUser from '../../nav/NavUser';
import AjoutDepenseClinique from './AjoutDepenseClinique';
import ListDepenseClinique from './ListDepenseClinique';
import IfUser from '../IfUser';
        
export default function DepenseClinique() {
  
    const userId =IfUser();
  return (
    <div>
        <NavUser/>
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
                    <AjoutDepenseClinique/>
              </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-list mr-2"></i>
                            <span className="vertical-align-middle">Liste Depense</span>
                        </div>
                    }
                >
                    <ListDepenseClinique/>
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

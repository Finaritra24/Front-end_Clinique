import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import NavAdmin from '../../nav/NavAdmin';
import AjoutAchatPatient from './AjoutAchatPatient';
import ListAchatPatient from './ListAchatPatient';
import IfUser from '../IfUser';
        
export default function AchatPatient() {
  
    const userId =IfUser();
  return (
    <div>
        <NavAdmin/>
        <h1>AchatPatient</h1>
        <div className="card">
            <Accordion activeIndex={0}>
              <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-plus mr-2"></i>
                            <span className="vertical-align-middle">Ajouter AchatPatient</span>
                        </div>
                    }
                >
                    <AjoutAchatPatient/>
              </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-list mr-2"></i>
                            <span className="vertical-align-middle">Liste AchatPatient</span>
                        </div>
                    }
                >
                    <ListAchatPatient/>
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

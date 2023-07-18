import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import NavAdmin from '../../nav/NavAdmin';
import ListBudget from './ListBudget';
import IfAdmin from '../IfAdmin';
import ListBudgetBenef from './ListBudgetBenef';
        
export default function Budget() {
  
    const userId = IfAdmin();
  return (
    <div>
        <NavAdmin/>
        <h1>Budget</h1>
        <div className="card">
            <Accordion activeIndex={0}>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-list mr-2"></i>
                            <span className="vertical-align-middle">Liste Budget</span>
                        </div>
                    }
                >
                    <ListBudget/>
                </AccordionTab>
                <AccordionTab
                    header={
                        <div className="flex align-items-center">
                            <i className="pi pi-search mr-2"></i>
                            <span className="vertical-align-middle">Budget Benefice</span>
                            <i className="pi pi-cog ml-2 ml-2"></i>
                        </div>
                    }
                >
                    <ListBudgetBenef/>
                </AccordionTab>
            </Accordion>
        </div>
    </div>
  );
}

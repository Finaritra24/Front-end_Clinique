import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';

const GenerDropdown = ({ nomClass, labels, selectedTypesRef }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/listg-${nomClass}`)
      .then(response => response.json())
      .then(data => setTypes(data))
      .catch(error => console.error(error));
  }, [nomClass]);

  const optsTypes = types.map(type => ({
    value: type[`id${nomClass}`],
    label: type[labels],
  }));

  const selectType = (option) => {
    if (option && option.label) {
      return (
        <div className="flex align-items-center">
          <div>{option.label}</div>
        </div>
      );
    }
  
    return <span>Sélectionner</span>;
  };
  

  if (types.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dropdown
        value={selectedTypesRef.current} // Utilisez selectedTypesRef.current pour la valeur
        onChange={(e) => selectedTypesRef.current = e.value} // Mettez à jour la valeur avec selectedTypesRef.current
        options={optsTypes}
        optionLabel="label"
        placeholder="Select a type"
        filter
        valueTemplate={selectType}
        className="w-full md:w-14rem"
      />
    </div>
  );
};

export default GenerDropdown;

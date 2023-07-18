import React, { useState, useEffect } from 'react';

export default function ImportCsv() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const handleSubmit = async () => {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          await fetch('http://localhost:8081/ajoutdepensecsv', {
            method: 'POST',
            body: formData,
          });
          console.log('Fichier CSV importé avec succès.');
        } catch (error) {
          console.error('Erreur lors de l importation du fichier CSV.', error);
        }
      } else {
        console.error('Aucun fichier sélectionné.');
      }
    };

    handleSubmit();
  }, [file]);

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
}

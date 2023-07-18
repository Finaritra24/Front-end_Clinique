import React from 'react';
import { useEffect } from 'react';
import GeneratePdf from '../../pdf/GeneratePdf';

const SelectedProductsTable = ({ selectedProducts }) => {
  // Calculez le total des prix
  const totalPrice = selectedProducts.reduce((total, product) => total + product.prix, 0);
    useEffect(()=>{
        const html=(
            <div>
        <div id="partiePdf">
      <table>
        <thead>
          <tr>
            <th>Date Recette</th>
            <th>Nom Patient</th>
            <th>ID Achat Patient</th>
            <th>Nom</th>
            <th>Nom Categorie</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div>
        <p>Total des prix: {totalPrice}</p>
        <p>Mot de signature</p>
      </div>
      </div>
    </div>
        );
        console.log("tonga");
        const htmlContent = document.getElementById('partiePdf').innerHTML;
        GeneratePdf(html);
    },[])
  // Générez le tableau propre sans boutons
  const tableRows = selectedProducts.map((product) => (
    <tr key={product.idAchatPatient}>
      <td>{product.dateRecette}</td>
      <td>{product.nomPatient}</td>
      <td>{product.idAchatPatient}</td>
      <td>{product.nom}</td>
      <td>{product.nomCateg}</td>
      <td>{product.prix}</td>
    </tr>
  ));

  return (
    <div>
        <div id="partiePdf">
      <table>
        <thead>
          <tr>
            <th>Date Recette</th>
            <th>Nom Patient</th>
            <th>ID Achat Patient</th>
            <th>Nom</th>
            <th>Nom Categorie</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <div>
        <p>Total des prix: {totalPrice}</p>
        <p>Mot de signature</p>
      </div>
      </div>
    </div>
  );
};

export default SelectedProductsTable;

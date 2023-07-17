import React, { useEffect, useState } from 'react';
import NavUser from '../nav/NavUser';
import IfUser from './IfUser';

export default function AccueilUser() {
  const userId = IfUser();

  return (
    <div>
      <div>
        <NavUser />
        <p>Bienvenue dans SHOPWISE {userId}</p>
      </div>
    </div>
  );
}

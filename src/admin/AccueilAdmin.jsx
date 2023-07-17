import NavAdmin from '../nav/NavAdmin';
import IfAdmin from './IfAdmin';

export default function AccueilAdmin() {
  const userId = IfAdmin();

  return (
    <div>
      <div>
        <NavAdmin />
        <p>Bienvenue dans SHOPWISE {userId}</p>
      </div>
    </div>
  );
}

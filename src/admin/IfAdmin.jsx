import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IfAdmin = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const response = await fetch('http://localhost:8081/getAdminId', { credentials: 'include' });
        const data = await response.text();
        setUserId(data);
        if (data === null) {
          navigate('/admin');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdminId();
  }, [navigate]);

  return userId;
};

export default IfAdmin;

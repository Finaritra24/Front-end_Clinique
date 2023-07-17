import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IfUser = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:8081/getUserId', { credentials: 'include' });
        const data = await response.text();
        setUserId(data);
        if (data === null) {
          navigate('/admin');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, [navigate]);

  return userId;
};

export default IfUser;

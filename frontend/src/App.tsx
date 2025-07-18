import React, { useState, useEffect } from 'react';
import Auth from './components/Auth.tsx';
import YouTubeSearch from './components/YouTubeSearch.tsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay token al cargar la app
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Manejar login exitoso
  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  // Manejar logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <header style={{ 
        backgroundColor: '#ffffff', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        padding: '15px 20px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ 
              color: '#ff0000', 
              margin: 0, 
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              🎵 YouTube Search App
            </h1>
            <p style={{ 
              margin: '5px 0 0 0', 
              color: '#666', 
              fontSize: '14px' 
            }}>
              {isAuthenticated ? 'Busca y reproduce videos de YouTube' : 'Inicia sesión para buscar videos'}
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {!isAuthenticated ? (
          <Auth onLogin={handleLogin} />
        ) : (
          <YouTubeSearch />
        )}
      </main>
    </div>
  );
}

export default App;

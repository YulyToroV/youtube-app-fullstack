import React, { useState } from 'react';
import axios from 'axios';

// Tipo para los datos de video
interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
  channel: string;
}

const YouTubeSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Manejar el cambio en el input
  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  // Realizar la búsqueda
  const handleSearch = async () => {
    setError('');
    setVideos([]);
    if (!query.trim()) {
      setError('Por favor ingresa un término de búsqueda.');
      return;
    }
    setLoading(true);
    try {
      // Obtener el token JWT desde localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No estás autenticado. Por favor inicia sesión.');
        setLoading(false);
        return;
      }
      // Realizar la petición al backend
      const res = await axios.get(`http://localhost:5000/api/youtube/search`, {
        params: { q: query },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Procesar los resultados
      const items = res.data.items || [];
      if (items.length === 0) {
        setError('No se encontraron resultados.');
      }
      const videosData: Video[] = items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
      }));
      setVideos(videosData);
    } catch (err) {
      setError('Error al buscar videos. Verifica tu conexión o autenticación.');
    } finally {
      setLoading(false);
    }
  };

  // Permitir búsqueda con Enter
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Manejar reproducción de video
  const handleVideoPlay = (videoId: string) => {
    console.log('🎵 CLICK DETECTADO! Video ID:', videoId);
    console.log('🎵 Estado anterior selectedVideo:', selectedVideo);
    setSelectedVideo(videoId);
    console.log('🎵 Nuevo estado selectedVideo:', videoId);
    
    // Forzar actualización del estado
    setTimeout(() => {
      console.log('🎵 Estado después de setTimeout:', selectedVideo);
    }, 100);
  };

  // Cerrar reproductor
  const handleClosePlayer = () => {
    console.log('❌ Cerrando reproductor');
    setSelectedVideo(null);
  };

  console.log('🎵 RENDER - selectedVideo actual:', selectedVideo);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* Debug info */}
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '10px', 
        marginBottom: '20px', 
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>Debug:</strong> selectedVideo = {selectedVideo || 'null'}
      </div>

      {/* Input de búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar videos en YouTube..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Buscar
        </button>
      </div>
      
      {/* Mensaje de error */}
      {error && (
        <div style={{ color: '#ff0000', marginBottom: '20px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          {error}
        </div>
      )}
      
      {/* Loader */}
      {loading && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          Buscando videos...
        </div>
      )}
      
      {/* Reproductor de video - VERSIÓN SIMPLIFICADA */}
      {selectedVideo && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            position: 'relative',
            width: '80%',
            maxWidth: '800px',
            aspectRatio: '16/9',
            backgroundColor: 'black'
          }}>
            <button
              onClick={handleClosePlayer}
              style={{
                position: 'absolute',
                top: '-60px',
                right: '0',
                background: '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 20px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                zIndex: 10000
              }}
            >
              ✕ CERRAR
            </button>
            
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '0',
              color: 'white',
              fontSize: '14px'
            }}>
              Reproduciendo: {selectedVideo}
            </div>
            
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                border: 'none',
                borderRadius: '8px'
              }}
            ></iframe>
          </div>
        </div>
      )}

      {/* Resultados con botones de prueba */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {videos.map((video: any) => (
          <div 
            key={video.videoId} 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              border: '2px solid transparent'
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              
              {/* Botón de play grande y visible */}
              <button
                onClick={() => handleVideoPlay(video.videoId)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  fontSize: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#cc0000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                  e.currentTarget.style.backgroundColor = '#ff0000';
                }}
              >
                ▶
              </button>
            </div>
            
            <div style={{ padding: '15px' }}>
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px', 
                fontSize: '14px',
                lineHeight: '1.3'
              }}>
                {video.title}
              </div>
              <div style={{ color: '#666', fontSize: '12px', fontWeight: '500', marginBottom: '10px' }}>
                {video.channel}
              </div>
              
              {/* Botón de prueba adicional */}
              <button
                onClick={() => handleVideoPlay(video.videoId)}
                style={{
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                🎵 REPRODUCIR AHORA
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch; 
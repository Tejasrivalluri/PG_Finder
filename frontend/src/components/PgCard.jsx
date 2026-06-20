import { useNavigate } from "react-router-dom";

const PgCard = ({ pg, onFavorite }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pg/${pg.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if(onFavorite) onFavorite(pg.id);
  };

  // 100% Reliable Image generation based on PG ID to ensure we NEVER get a broken image again.
  const displayImage = `https://picsum.photos/seed/${pg.id + 100}/400/300`;

  return (
    <div className="pg-card" onClick={handleCardClick} style={{ padding: 0 }}>
      <img 
        src={displayImage} 
        alt="PG Thumbnail" 
        style={{ width: '100%', height: '220px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
      />
      <div style={{ padding: '1.5rem' }}>
        <h3>{pg.pgName}</h3>
        <p>📍 {pg.city}</p>
        <p className="rent">💰 ₹{pg.rent}</p>
        {onFavorite && (
          <button 
            onClick={handleFavoriteClick} 
            style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)' }}
          >
            ❤️ Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
};

export default PgCard;
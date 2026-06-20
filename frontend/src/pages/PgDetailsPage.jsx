import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosConfig";

// Removed Unsplash array completely since we are using Picsum seeds

const PgDetailsPage = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);

  useEffect(() => {
    api.get(`/pgs/${id}`)
      .then((res) => setPg(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!pg) return <h2 className="text-center" style={{ marginTop: '5rem' }}>Loading details...</h2>;

  const displayImage = `https://picsum.photos/seed/${pg.id + 100}/800/600`;

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
      <Link to="/pgs" style={{ color: 'var(--primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '2rem', fontWeight: '500' }}>
        <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>←</span> Back to all PGs
      </Link>

      <div className="pg-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', padding: '3rem', cursor: 'default' }}>
        {/* Left Column: Image */}
        <div style={{ width: '100%', height: '100%' }}>
          <img 
            src={displayImage} 
            alt={pg.pgName} 
            style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", borderRadius: "16px", boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} 
          />
        </div>

        {/* Right Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{pg.pgName}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>📍</span> {pg.address}
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{pg.city}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Rent per month</p>
              <p className="rent" style={{ fontSize: '1.5rem', margin: 0 }}>₹{pg.rent}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Rooms Available</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{pg.roomsAvailable}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Gender</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{pg.gender}</p>
            </div>
          </div>
          
          <Link to={`/book/${pg.id}`} style={{ textDecoration: 'none' }}>
            <button style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', borderRadius: '50px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', border: 'none', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)', cursor: 'pointer', color: 'white', fontWeight: 'bold', transition: 'all 0.3s ease' }}>
              Book This PG Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PgDetailsPage;
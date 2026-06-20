import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [pgs, setPgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);
    
    if (user.role !== 'OWNER') {
      navigate("/");
      return;
    }

    // Use /pgs endpoint and filter by owner locally for now
    api.get("/pgs")
      .then((res) => {
        const ownerPgs = res.data.filter(pg => pg.ownerId === user.id);
        setPgs(ownerPgs);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this PG?")) {
      api.delete(`/pgs/${id}`)
        .then(() => setPgs(pgs.filter((pg) => pg.id !== id)))
        .catch((err) => alert("Failed to delete"));
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Owner Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your listed properties</p>
        </div>
        <Link to="/add-pg">
          <button style={{ padding: '0.8rem 1.5rem', borderRadius: '50px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}>
            + Add New PG
          </button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Properties</p>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{pgs.length}</h2>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Capacity</p>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{pgs.reduce((acc, pg) => acc + (pg.roomsAvailable || 0), 0)}</h2>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Avg Rent</p>
          <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>₹{pgs.length ? Math.round(pgs.reduce((acc, pg) => acc + (pg.rent || 0), 0) / pgs.length) : 0}</h2>
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>Your Listings</h2>
      {pgs.length === 0 ? (
        <div style={{ background: 'var(--glass-bg)', padding: '4rem 2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>You haven't listed any properties yet.</p>
          <Link to="/add-pg">
            <button style={{ padding: '0.8rem 1.5rem', borderRadius: '50px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer' }}>Add your first PG</button>
          </Link>
        </div>
      ) : (
        <div style={{ background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(0,0,0,0.3)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Name</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>City</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Rent</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Rooms</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pgs.map((pg) => (
                <tr key={pg.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{pg.pgName}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{pg.city}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--accent)' }}>₹{pg.rent}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{pg.roomsAvailable}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <Link to={`/edit-pg/${pg.id}`} style={{ color: 'var(--primary)', marginRight: '1rem', textDecoration: 'none' }}>Edit</Link>
                    <button onClick={() => handleDelete(pg.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const AddPgPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pgName: "",
    address: "",
    city: "",
    rent: "",
    gender: "Boys",
    roomsAvailable: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    const payload = {
      ...form,
      rent: parseFloat(form.rent),
      roomsAvailable: parseInt(form.roomsAvailable, 10),
      latitude: 0.0, 
      longitude: 0.0,
      ownerId: user ? user.id : null,
      imageUrl: `https://picsum.photos/seed/${Math.random()}/400/300`
    };

    api.post("/pgs", payload)
      .then(() => {
        alert("PG Added Successfully!");
        navigate("/pgs");
      })
      .catch((err) => alert("Failed to add PG: " + (err.response?.data || err.message)));
  };

  return (
    <div className="auth-card" style={{ maxWidth: '600px' }}>
      <h2>🏠 Add New PG</h2>
      <p className="mb-4">List your PG for customers to see.</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="PG Name"
          value={form.pgName}
          onChange={(e) => setForm({ ...form, pgName: e.target.value })}
          required
        />
        <input
          placeholder="City (e.g., Vijayawada)"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        <input
          placeholder="Full Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Rent per month (₹)"
          value={form.rent}
          onChange={(e) => setForm({ ...form, rent: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Rooms Available"
          value={form.roomsAvailable}
          onChange={(e) => setForm({ ...form, roomsAvailable: e.target.value })}
          required
        />
        <select 
          value={form.gender} 
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontFamily: 'Outfit', fontSize: '1rem', marginBottom: '1rem', outline: 'none' }}
        >
          <option value="Boys">Boys Only</option>
          <option value="Girls">Girls Only</option>
          <option value="Co-ed">Co-ed</option>
        </select>
        
        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>List PG</button>
      </form>
    </div>
  );
};

export default AddPgPage;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const EditPgPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/pgs/${id}`)
      .then((res) => {
        setForm({
          pgName: res.data.pgName || "",
          address: res.data.address || "",
          city: res.data.city || "",
          rent: res.data.rent || "",
          gender: res.data.gender || "Boys",
          roomsAvailable: res.data.roomsAvailable || "",
        });
      })
      .catch(err => alert("Error fetching PG details"));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      ...form,
      rent: parseFloat(form.rent),
      roomsAvailable: parseInt(form.roomsAvailable, 10),
    };

    api.put(`/pgs/${id}`, payload)
      .then(() => {
        alert("PG Updated Successfully!");
        navigate("/owner-dashboard");
      })
      .catch((err) => alert("Failed to update PG: " + (err.response?.data || err.message)));
  };

  if(!form) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="auth-card" style={{ maxWidth: '600px' }}>
      <h2>✏️ Edit PG</h2>
      <p className="mb-4">Update the details for your listed property.</p>

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
          style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-main)', fontFamily: 'Outfit', fontSize: '1rem', marginBottom: '1rem', outline: 'none' }}
        >
          <option value="Boys">Boys Only</option>
          <option value="Girls">Girls Only</option>
          <option value="Co-ed">Co-ed</option>
        </select>
        
        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Update PG</button>
      </form>
    </div>
  );
};

export default EditPgPage;

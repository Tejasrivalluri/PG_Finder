import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { showToast } from "../utils/toast";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    moveInDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      showToast("Please login first!", "error");
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);

    const payload = {
      ...form,
      pgId: id,
      userId: user.id,
      status: "PENDING"
    };

    api.post("/bookings/add", payload)
      .then(() => {
        showToast("Booking Successful", "success");
        navigate("/pgs");
      })
      .catch((err) => showToast(err.response?.data || "Error booking PG", "error"));
  };

  return (
    <div className="auth-card" style={{ maxWidth: '500px' }}>
      <h2>📅 Book PG</h2>
      <p className="mb-4">Complete your booking for PG #{id}</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          required
        />
        <input
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.moveInDate}
          onChange={(e) => setForm({ ...form, moveInDate: e.target.value })}
          required
        />
        
        <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingPage;
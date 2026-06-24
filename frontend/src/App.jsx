import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PgListPage from "./pages/PglistPage";
import PgDetailsPage from "./pages/PgDetailsPage";
import BookingPage from "./pages/BookingPage";
import FavoritesPage from "./pages/FavoritesPage";
import AddPgPage from "./pages/AddPgPage";
import OwnerDashboard from "./pages/OwnerDashboard";
import EditPgPage from "./pages/EditPgPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ToastContainer from "./components/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pgs" element={<ProtectedRoute><PgListPage /></ProtectedRoute>} />
          <Route path="/pg/:id" element={<ProtectedRoute><PgDetailsPage /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/add-pg" element={<ProtectedRoute><AddPgPage /></ProtectedRoute>} />
          <Route path="/owner-dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
          <Route path="/edit-pg/:id" element={<ProtectedRoute><EditPgPage /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
package com.srgec.PGFinder.service;
import com.srgec.PGFinder.entity.Booking;
import com.srgec.PGFinder.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Add Booking
    public Booking saveBooking(Booking booking) {

        return bookingRepository.save(booking);

    }

    // Get All Bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get Bookings By User ID
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Get Booking By Id
    public Optional<Booking> getBookingById(Long id) {

        return bookingRepository.findById(id);

    }

    // Update Booking
    public Booking updateBooking(Long id, Booking updatedBooking) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setUserId(updatedBooking.getUserId());
        booking.setPgId(updatedBooking.getPgId());
        booking.setStatus(updatedBooking.getStatus());

        return bookingRepository.save(booking);

    }

    // Delete Booking
    public void deleteBooking(Long id) {

        bookingRepository.deleteById(id);

    }

}
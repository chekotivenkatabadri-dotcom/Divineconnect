package org.divineconnect.temple.controller;

import org.divineconnect.temple.entity.PoojaBooking;
import org.divineconnect.temple.repository.PoojaBookingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final PoojaBookingRepository bookingRepository;

    public BookingController(PoojaBookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public List<PoojaBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PoojaBooking> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PoojaBooking> createBooking(@RequestBody PoojaBooking booking) {
        if (booking.getReferenceNumber() == null || booking.getReferenceNumber().isEmpty()) {
            booking.setReferenceNumber("DC-2026-" + (int)(1000 + Math.random() * 9000));
        }
        if (booking.getStatus() == null || booking.getStatus().isEmpty()) {
            booking.setStatus("Confirmed");
        }
        PoojaBooking saved = bookingRepository.save(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PoojaBooking> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setStatus(status);
            return ResponseEntity.ok(bookingRepository.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (!bookingRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

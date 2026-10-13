package org.divineconnect.temple.controller;

import org.divineconnect.temple.repository.DevoteeRepository;
import org.divineconnect.temple.repository.DonationRepository;
import org.divineconnect.temple.repository.PoojaBookingRepository;
import org.divineconnect.temple.repository.TempleEventRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final PoojaBookingRepository bookingRepository;
    private final DonationRepository donationRepository;
    private final DevoteeRepository devoteeRepository;
    private final TempleEventRepository eventRepository;

    public DashboardController(PoojaBookingRepository bookingRepository,
                               DonationRepository donationRepository,
                               DevoteeRepository devoteeRepository,
                               TempleEventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.donationRepository = donationRepository;
        this.devoteeRepository = devoteeRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings", bookingRepository.count());
        stats.put("totalDonations", donationRepository.count());
        stats.put("registeredDevotees", devoteeRepository.count());
        stats.put("totalEvents", eventRepository.count());
        return ResponseEntity.ok(stats);
    }
}

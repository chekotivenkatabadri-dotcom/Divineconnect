package org.divineconnect.temple.controller;

import org.divineconnect.temple.entity.Donation;
import org.divineconnect.temple.repository.DonationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    private final DonationRepository donationRepository;

    public DonationController(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> getDonationById(@PathVariable Long id) {
        return donationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Donation> createDonation(@RequestBody Donation donation) {
        if (donation.getReferenceNumber() == null || donation.getReferenceNumber().isEmpty()) {
            donation.setReferenceNumber("HUNDI-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (donation.getPaymentStatus() == null || donation.getPaymentStatus().isEmpty()) {
            donation.setPaymentStatus("SUCCESS");
        }
        Donation saved = donationRepository.save(donation);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

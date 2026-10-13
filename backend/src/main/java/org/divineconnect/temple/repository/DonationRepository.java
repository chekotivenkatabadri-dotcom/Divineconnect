package org.divineconnect.temple.repository;

import org.divineconnect.temple.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    Optional<Donation> findByReferenceNumber(String referenceNumber);
}

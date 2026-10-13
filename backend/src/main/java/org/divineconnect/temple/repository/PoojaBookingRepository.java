package org.divineconnect.temple.repository;

import org.divineconnect.temple.entity.PoojaBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PoojaBookingRepository extends JpaRepository<PoojaBooking, Long> {
    Optional<PoojaBooking> findByReferenceNumber(String referenceNumber);
}

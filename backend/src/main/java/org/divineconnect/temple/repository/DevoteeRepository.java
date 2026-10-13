package org.divineconnect.temple.repository;

import org.divineconnect.temple.entity.Devotee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DevoteeRepository extends JpaRepository<Devotee, Long> {
    Optional<Devotee> findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<Devotee> findByPhone(String phone);
    Boolean existsByPhone(String phone);
}

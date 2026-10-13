package org.divineconnect.temple.repository;

import org.divineconnect.temple.entity.TempleEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TempleEventRepository extends JpaRepository<TempleEvent, Long> {
}

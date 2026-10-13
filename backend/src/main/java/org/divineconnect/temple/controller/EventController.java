package org.divineconnect.temple.controller;

import org.divineconnect.temple.entity.TempleEvent;
import org.divineconnect.temple.repository.TempleEventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final TempleEventRepository eventRepository;

    public EventController(TempleEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<TempleEvent> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TempleEvent> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TempleEvent> createEvent(@RequestBody TempleEvent event) {
        if (event.getStatus() == null || event.getStatus().isEmpty()) {
            event.setStatus("Upcoming Festival");
        }
        TempleEvent saved = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

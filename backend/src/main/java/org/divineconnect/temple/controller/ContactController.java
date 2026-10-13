package org.divineconnect.temple.controller;

import org.divineconnect.temple.entity.ContactMessage;
import org.divineconnect.temple.repository.ContactMessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository contactRepository;

    public ContactController(ContactMessageRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitContact(@RequestBody ContactMessage msg) {
        if (msg.getStatus() == null || msg.getStatus().isEmpty()) {
            msg.setStatus("UNREAD");
        }
        ContactMessage saved = contactRepository.save(msg);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

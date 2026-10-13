package org.divineconnect.temple.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "temple_events")
public class TempleEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "sanskrit_title")
    private String sanskritTitle;

    @Column(name = "event_date", nullable = false)
    private String eventDate;

    private String timing;

    @Column(length = 1500)
    private String description;

    @Column(length = 1000)
    private String highlights;

    private String status;

    @Column(name = "image_url")
    private String imageUrl;

    public TempleEvent() {}

    public TempleEvent(String name, String sanskritTitle, String eventDate, String timing, String description, String highlights, String status, String imageUrl) {
        this.name = name;
        this.sanskritTitle = sanskritTitle;
        this.eventDate = eventDate;
        this.timing = timing;
        this.description = description;
        this.highlights = highlights;
        this.status = status;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSanskritTitle() { return sanskritTitle; }
    public void setSanskritTitle(String sanskritTitle) { this.sanskritTitle = sanskritTitle; }

    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }

    public String getTiming() { return timing; }
    public void setTiming(String timing) { this.timing = timing; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getHighlights() { return highlights; }
    public void setHighlights(String highlights) { this.highlights = highlights; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}

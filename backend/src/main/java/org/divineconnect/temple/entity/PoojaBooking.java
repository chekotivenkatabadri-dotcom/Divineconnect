package org.divineconnect.temple.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pooja_bookings")
public class PoojaBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_number", unique = true)
    private String referenceNumber;

    @Column(name = "devotee_name", nullable = false)
    private String devoteeName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(name = "pooja_name", nullable = false)
    private String poojaName;

    @Column(name = "booking_date", nullable = false)
    private String bookingDate;

    @Column(name = "time_slot", nullable = false)
    private String timeSlot;

    @Column(name = "devotee_count")
    private Integer devoteeCount = 1;

    private String gotra;
    private String nakshatra;

    @Column(name = "special_requests", length = 1000)
    private String specialRequests;

    private Double amount;
    private String status = "Confirmed";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public PoojaBooking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getDevoteeName() { return devoteeName; }
    public void setDevoteeName(String devoteeName) { this.devoteeName = devoteeName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPoojaName() { return poojaName; }
    public void setPoojaName(String poojaName) { this.poojaName = poojaName; }

    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public Integer getDevoteeCount() { return devoteeCount; }
    public void setDevoteeCount(Integer devoteeCount) { this.devoteeCount = devoteeCount; }

    public String getGotra() { return gotra; }
    public void setGotra(String gotra) { this.gotra = gotra; }

    public String getNakshatra() { return nakshatra; }
    public void setNakshatra(String nakshatra) { this.nakshatra = nakshatra; }

    public String getSpecialRequests() { return specialRequests; }
    public void setSpecialRequests(String specialRequests) { this.specialRequests = specialRequests; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

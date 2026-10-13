package org.divineconnect.temple.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "temple_donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reference_number", unique = true)
    private String referenceNumber;

    @Column(name = "donor_name", nullable = false)
    private String donorName;

    @Column(nullable = false)
    private String email;

    private String phone;

    @Column(name = "cause_title", nullable = false)
    private String causeTitle;

    @Column(nullable = false)
    private Double amount;

    @Column(name = "pan_number")
    private String panNumber;

    @Column(name = "payment_status")
    private String paymentStatus = "SUCCESS";

    @Column(name = "created_at")
    private LocalDateTime donatedAt = LocalDateTime.now();

    public Donation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getReferenceNumber() { return referenceNumber; }
    public void setReferenceNumber(String referenceNumber) { this.referenceNumber = referenceNumber; }

    public String getDonorName() { return donorName; }
    public void setDonorName(String donorName) { this.donorName = donorName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCauseTitle() { return causeTitle; }
    public void setCauseTitle(String causeTitle) { this.causeTitle = causeTitle; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getDonatedAt() { return donatedAt; }
    public void setDonatedAt(LocalDateTime donatedAt) { this.donatedAt = donatedAt; }
}

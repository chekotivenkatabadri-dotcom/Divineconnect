package org.divineconnect.temple.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "devotees")
public class Devotee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = false, nullable = true)
    private String email;

    @Column(nullable = true)
    private String password = "";

    @Column(name = "phone")
    private String phone;
    private String city;
    private String gotra;

    @Column(name = "membership_tier")
    private String membershipTier = "Bhakta Member";

    @Column(name = "total_sevas")
    private Integer totalSevas = 1;

    private String role = "DEVOTEE";

    @Column(name = "registered_at")
    private LocalDateTime registeredAt = LocalDateTime.now();

    public Devotee() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getGotra() { return gotra; }
    public void setGotra(String gotra) { this.gotra = gotra; }

    public String getMembershipTier() { return membershipTier; }
    public void setMembershipTier(String membershipTier) { this.membershipTier = membershipTier; }

    public Integer getTotalSevas() { return totalSevas; }
    public void setTotalSevas(Integer totalSevas) { this.totalSevas = totalSevas; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; }
}

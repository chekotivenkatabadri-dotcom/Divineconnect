package org.divineconnect.temple.config;

import org.divineconnect.temple.entity.Devotee;
import org.divineconnect.temple.entity.TempleEvent;
import org.divineconnect.temple.repository.DevoteeRepository;
import org.divineconnect.temple.repository.TempleEventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final TempleEventRepository eventRepository;
    private final DevoteeRepository devoteeRepository;

    public DataInitializer(TempleEventRepository eventRepository, DevoteeRepository devoteeRepository) {
        this.eventRepository = eventRepository;
        this.devoteeRepository = devoteeRepository;
    }

    @Override
    public void run(String... args) {
        // Initialize default temple events if none exist
        if (eventRepository.count() == 0) {
            eventRepository.save(new TempleEvent(
                "Srivari Annual Brahmotsavams (15th Brahmotsavam)",
                "श्रीवारि ब्रह्मोत्सवम्",
                "October 12 - 20, 2026",
                "9 Full Days of Grand Celebrations",
                "The flagship annual festival of Sri Venkateshwara Swamy Devasthanam, Dammaiguda, featuring Dhwajarohanam, Garuda Vahanam, and Maha Annadanam.",
                "Srivari Garuda Seva, Rathotsavam Procession, Venkateswara Kalyanam, Daily Maha Annadanam",
                "Upcoming Festival",
                "/images/temple-hero.png"
            ));

            eventRepository.save(new TempleEvent(
                "Maha Shivaratri Mahotsavam",
                "महाशिवरात्रि",
                "March 8, 2026",
                "All Night (6:00 PM to 6:00 AM)",
                "The Great Night of Shiva celebrated with four-prahara non-stop Rudrabhishekam and Bilva Patra archana.",
                "4 Prahara Abhishekam, 1 Lakh Bilva Leaf Arpana, Classical Sangeet, Phalaharam Distribution",
                "Upcoming Mega Event",
                "/images/temple-aarti.png"
            ));
        }

        // Initialize default Temple Administrator accounts if not present
        if (!devoteeRepository.existsByEmail("admin@srivari.org")) {
            Devotee admin1 = new Devotee();
            admin1.setName("Temple Admin");
            admin1.setEmail("admin@srivari.org");
            admin1.setPassword("admin123");
            admin1.setPhone("+91 77290 75179");
            admin1.setCity("Hyderabad");
            admin1.setRole("ADMIN");
            admin1.setMembershipTier("Maha Sevak (VIP)");
            devoteeRepository.save(admin1);
        }

        if (!devoteeRepository.existsByEmail("admin@divineconnect.org")) {
            Devotee admin2 = new Devotee();
            admin2.setName("Temple Executive Officer");
            admin2.setEmail("admin@divineconnect.org");
            admin2.setPassword("templeAdminSecure");
            admin2.setPhone("07729075179");
            admin2.setCity("Hyderabad");
            admin2.setRole("ADMIN");
            admin2.setMembershipTier("Maha Sevak (VIP)");
            devoteeRepository.save(admin2);
        }

        if (!devoteeRepository.existsByEmail("devotee@gmail.com")) {
            Devotee devotee = new Devotee();
            devotee.setName("Suresh Sharma");
            devotee.setEmail("devotee@gmail.com");
            devotee.setPassword("srivari123");
            devotee.setPhone("+91 98765 43210");
            devotee.setCity("Hyderabad");
            devotee.setGotra("Kashyapa");
            devotee.setRole("DEVOTEE");
            devotee.setMembershipTier("Bhakta Member");
            devotee.setTotalSevas(2);
            devoteeRepository.save(devotee);
        }
    }
}

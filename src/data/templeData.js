// Temple Data for DivineConnect – Temple Management & Devotee Service System

export const TEMPLE_INFO = {
  name: "Sri Venkateshwara Swamy Devasthanam",
  subtitle: "Srivari Gayathri Temple",
  systemName: "DivineConnect",
  tagline: "Connecting Devotees with Srivari Divine Grace",
  established: "Kshetram of Lord Venkateswara & Sri Gayathri Devi",
  deity: "Lord Sri Venkateswara Swamy & Sri Gayathri Devi",
  address: "Ayappa Colony, Dammaiguda, Hyderabad, Secunderabad, Telangana - 500083",
  phone: "+91 77290 75179",
  altPhone: "077290 75179",
  plusCode: "FHWV+59 Dammaiguda, Secunderabad, Telangana",
  googleMapsUrl: "https://www.google.com/maps/place/500083,+Dammaiguda+Rd/@17.4972087,78.5880938,17z",
  rating: "4.8 ★ (346+ Devotee Reviews)",
  email: "seva@srivaritemple-dammaiguda.org",
  timingsSummary: "Morning: 06:00 AM – 11:30 AM | Evening Reopens: 05:30 PM – 09:30 PM",
  dressCode: "Traditional Indian Attire: Dhoti/Kurta for Men, Saree/Churidar with Dupatta for Women."
};

export const TEMPLE_TIMINGS = [
  {
    slot: "Suprabhata Seva",
    time: "05:00 AM - 05:45 AM",
    description: "Awakening of the presiding deity with auspicious Vedic chants and suprabhatam slokas.",
    tag: "Morning Ritual"
  },
  {
    slot: "Sarva Darshan (Free & Special Entry)",
    time: "06:00 AM - 11:30 AM",
    description: "General and special darshan for all devotees in the main sanctum sanctorum.",
    tag: "Darshan"
  },
  {
    slot: "Madhyahna Pooja & Maha Naivedyam",
    time: "11:30 AM - 12:30 PM",
    description: "Midday consecrated food offering to deities followed by curtain closing.",
    tag: "Naivedyam"
  },
  {
    slot: "Free Annadanam Distribution",
    time: "12:00 PM - 03:00 PM",
    description: "Sacred Annaprasadam served to tens of thousands of pilgrims in the Annadana hall.",
    tag: "Prasadam"
  },
  {
    slot: "Afternoon Darshan Reopens",
    time: "03:30 PM - 06:30 PM",
    description: "Afternoon queue lines resume for sanctum darshan and archanas.",
    tag: "Darshan"
  },
  {
    slot: "Sandhya Maha Mangala Aarti",
    time: "06:45 PM - 07:30 PM",
    description: "Splendid evening camphor flame ritual with nagaswaram musical resonance and bells.",
    tag: "Evening Aarti"
  },
  {
    slot: "Evening Annaprasadam",
    time: "07:30 PM - 09:30 PM",
    description: "Evening meal prasadam offered with pure devotion to all devotees.",
    tag: "Prasadam"
  },
  {
    slot: "Ekanta Seva (Shayanotsavam)",
    time: "09:30 PM - 10:00 PM",
    description: "Nightly lullaby and peaceful retiring of deities to the golden bed chamber.",
    tag: "Night Closing"
  }
];

export const POOJAS = [
  {
    id: "rudrabhishekam",
    name: "Sri Maha Rudrabhishekam",
    deity: "Lord Shiva",
    dakshina: 1100,
    duration: "1 Hour 15 Mins",
    timeSlots: ["06:30 AM - 07:45 AM", "09:30 AM - 10:45 AM"],
    description: "Sacred holy ablution with Panchamritam (milk, curd, ghee, honey, sugar) alongside potent Sri Rudram Vedic recitation for peace, health, and removal of obstacles.",
    prasadam: "Vibhuti, Theertham, 2 Special Laddus & Panchamritam",
    badge: "Most Popular",
    category: "Abhishekam"
  },
  {
    id: "sahasranama-archana",
    name: "Sahasranama Archana (1008 Names)",
    deity: "Sri Venkateswara Swamy",
    dakshina: 500,
    duration: "45 Mins",
    timeSlots: ["07:00 AM - 07:45 AM", "10:30 AM - 11:15 AM", "05:30 PM - 06:15 PM"],
    description: "Chanting of 1008 divine sacred names with fresh lotus blossoms and tulasi leaves for family prosperity and spiritual grace.",
    prasadam: "Blessed Tulasi, Kumkum & Maha Prasadam Packet",
    badge: "Daily Seva",
    category: "Archana"
  },
  {
    id: "satyanarayan-vratham",
    name: "Sri Satyanarayan Swami Vratham",
    deity: "Lord Vishnu",
    dakshina: 1500,
    duration: "2 Hours",
    timeSlots: ["08:30 AM - 10:30 AM", "04:30 PM - 06:30 PM"],
    description: "Auspicious vratam performed for fulfillment of righteous wishes, marital harmony, new beginnings, and home prosperity.",
    prasadam: "Dry Fruit Prasadam, Sheera, Sacred Kalash Thread",
    badge: "Auspicious Vrat",
    category: "Special Vrat"
  },
  {
    id: "kalyanotsavam",
    name: "Nitya Kalyanotsavam",
    deity: "Sri Venkateswara & Padmavathi Ammavaru",
    dakshina: 2500,
    duration: "2 Hours 30 Mins",
    timeSlots: ["10:30 AM - 01:00 PM"],
    description: "Celestial wedding ceremony performed daily in grandeur. Devotees participate as divine wedding guests and receive silk uttariyam & saree piece.",
    prasadam: "Kalyanam Sesha Vastram, Big Laddus, Vada, Pulihora",
    badge: "Grand Seva",
    category: "Celestial Seva"
  },
  {
    id: "navagraha-shanti",
    name: "Navagraha Shanti Homam & Tailabhishekam",
    deity: "Navagraha Devatas",
    dakshina: 1200,
    duration: "1 Hour 30 Mins",
    timeSlots: ["08:00 AM - 09:30 AM"],
    description: "Pacifying ritual for planetary doshas, Rahu-Ketu tranquility, and Saturn (Shani) relief with sacred nine grains (Navadhanya) offerings.",
    prasadam: "Navadhanya Prasadam, Raksha Sutra, Oil Abhishekam Tilak",
    badge: "Remedial Seva",
    category: "Homam"
  },
  {
    id: "maha-mangala-aarti",
    name: "Vishesha Maha Mangala Aarti Pass",
    deity: "Sanctum Deities",
    dakshina: 300,
    duration: "30 Mins",
    timeSlots: ["06:45 PM - 07:15 PM"],
    description: "Close sanctum darshan pass during the peak evening camphor aarti with floral arch and ringing bells.",
    prasadam: "Aarti Theertham & Boondi Prasadam",
    badge: "Evening Special",
    category: "Aarti"
  }
];

export const FESTIVALS = [
  {
    id: "maha-shivaratri-2026",
    name: "Maha Shivaratri Mahotsavam",
    sanskritTitle: "महाशिवरात्रि",
    date: "March 8, 2026",
    daysLeft: 18,
    status: "Upcoming Mega Event",
    description: "The Great Night of Shiva celebrated with four-prahara non-stop Rudrabhishekam, continuous Bilva Patra archana, and night-long bhajans & classical dance offerings.",
    timing: "All Night (6:00 PM to 6:00 AM)",
    highlights: ["4 Prahara Abhishekam", "1 Lakh Bilva Leaf Arpana", "Classical Sangeet Sandhya", "Phalaharam Distribution"],
    image: "/images/temple-aarti.png"
  },
  {
    id: "sri-rama-navami-2026",
    name: "Sri Rama Navami & Sitarama Kalyanam",
    sanskritTitle: "श्रीरामनवमी",
    date: "April 17, 2026",
    daysLeft: 58,
    status: "Grand Celebration",
    description: "Commemorating the auspicious birth of Maryada Purushottama Lord Sri Rama. Includes grand chariot procession (Rathotsavam) and Panakam distribution.",
    timing: "09:00 AM - 08:30 PM",
    highlights: ["Seetha Rama Celestial Wedding", "Silver Chariot Procession", "Sacred Panakam & Vadapappu", "Pavitra Akshataropanam"],
    image: "/images/temple-gopuram.png"
  },
  {
    id: "brahmotsavam-2026",
    name: "Srivari Annual Brahmotsavams (15th Brahmotsavam)",
    sanskritTitle: "श्रीवारि ब्रह्मोत्सवम्",
    date: "October 12 - 20, 2026",
    daysLeft: 236,
    status: "Flagship Annual Festival",
    description: "The grand annual celebration of Sri Venkateshwara Swamy Devasthanam (Dammaiguda) celebrated with Dhwajarohanam, Garuda Vahana Seva, Rathotsavam, and Maha Annaprasadam distribution.",
    timing: "9 Full Days of Grand Celebrations",
    highlights: ["Srivari Garuda Seva", "Rathotsavam Procession", "Sitarama & Venkateswara Kalyanam", "Daily Maha Annadanam"],
    image: "/images/temple-hero.png"
  },
  {
    id: "diwali-lakshmi-pooja",
    name: "Deepavali & Maha Lakshmi Kubera Pooja",
    sanskritTitle: "दीपावली महालक्ष्मी पूजा",
    date: "November 08, 2026",
    daysLeft: 263,
    status: "Festival of Lights",
    description: "Illumination of the entire temple complex with 10,008 pure ghee brass diyas. Special Lakshmi Sahasranama archana for wealth and auspicious prosperity.",
    timing: "05:30 PM - 10:00 PM",
    highlights: ["10,008 Ghee Deepotsavam", "Kanakadhara Stotra Recitation", "Silver Coins Blessing", "Sweet Prasadam Hampers"],
    image: "/images/temple-aarti.png"
  }
];

export const DONATION_CAUSES = [
  {
    id: "annadanam",
    title: "Nitya Annadanam Seva (Holy Food Sharing)",
    sanskrit: "अन्नदानं परं दानम्",
    description: "Annadanam is considered the greatest of all sevas. Your contribution helps serve warm, nutritious, satvik meals to thousands of daily visiting pilgrims without any discrimination.",
    suggestedAmounts: [100, 500, 1000, 2500, 5000],
    impactText: "₹500 sponsors nourishing sanctum meals for 10 visiting devotees.",
    icon: "Utensils",
    taxBenefit: "Eligible for 80G 50% Tax Deduction certificate"
  },
  {
    id: "goshala",
    title: "Sri Krishna Goshala & Cow Protection",
    sanskrit: "गोग्रास सेवा",
    description: "Sustaining our temple goshala housing over 350 sacred indigenous desi cows (Gir, Ongole, Sahiwal) with green fodder, medical veterinary care, and shelter.",
    suggestedAmounts: [250, 500, 1100, 2100, 5100],
    impactText: "₹1,100 provides nutritious fodder and care for 3 mother cows for a week.",
    icon: "HeartHandshake",
    taxBenefit: "80G Certified Seva"
  },
  {
    id: "renovation",
    title: "Temple Gopuram & Heritage Restoration",
    sanskrit: "देवालय जीर्णोद्धार",
    description: "Preserving ancient 11th-century stone carvings, re-gilding temple sanctum brass kalashams, and constructing clean devotee waiting halls with drinking water points.",
    suggestedAmounts: [500, 1000, 2000, 5000, 10000],
    impactText: "Preserves our sacred stone heritage and devotee amenities for future generations.",
    icon: "Landmark",
    taxBenefit: "80G Certified Seva"
  },
  {
    id: "vedapatashala",
    title: "Veda Patashala & Shastra Preservation",
    sanskrit: "वेद रक्षणम्",
    description: "Sponsoring free education, traditional Vedic syllabus, boarding, and clothing for young student scholars (Vidyarthis) studying Rig, Yajur, Sama and Atharva Vedas.",
    suggestedAmounts: [500, 1000, 2500, 5000, 15000],
    impactText: "₹2,500 sponsors one student scholar’s Vedic education and sustenance for a month.",
    icon: "GraduationCap",
    taxBenefit: "80G Certified Seva"
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Majestic Sunrise at Sanctum Gopuram",
    category: "Architecture",
    image: "/images/temple-hero.png",
    description: "Early morning sunrays illuminating the intricate 7-tier sculpted Raja Gopuram."
  },
  {
    id: 2,
    title: "Vedic Maha Aarti Camphor Flame Ritual",
    category: "Pooja",
    image: "/images/temple-aarti.png",
    description: "Head temple priests offering the multi-wick brass Deeparadhana amid sacred conch sounds."
  },
  {
    id: 3,
    title: "Ancient Dravidian Carved Pillars & Hall",
    category: "Architecture",
    image: "/images/temple-gopuram.png",
    description: "Monolithic granite pillars carved with divine postures and mythological narratives."
  },
  {
    id: 4,
    title: "Nitya Annadanam Devotee Feasting",
    category: "Devotional",
    image: "/images/temple-annadanam.png",
    description: "Thousands of pilgrims served hot sambar rice, sweet pongal, and buttermilk with unconditional warmth."
  },
  {
    id: 5,
    title: "Sacred Deepotsavam with 10,000 Diyas",
    category: "Festivals",
    image: "/images/temple-aarti.png",
    description: "Devotees lining the temple steps and water tank with golden earthen oil lamps during Karthika Masam."
  },
  {
    id: 6,
    title: "Morning Suprabhatam & Temple Bells",
    category: "Pooja",
    image: "/images/temple-hero.png",
    description: "Atmospheric dawn serenity as temple bells chime and devotees assemble for auspicious Nirmalya Darshan."
  },
  {
    id: 7,
    title: "Sacred Pushkarini Holy Water Tank",
    category: "Architecture",
    image: "/images/temple-gopuram.png",
    description: "The divine stepped holy tank where pilgrims cleanse themselves before stepping into the sanctum."
  },
  {
    id: 8,
    title: "Bhakti Sangeet & Classical Kirtan Evening",
    category: "Devotional",
    image: "/images/temple-annadanam.png",
    description: "Carnatic vocalists and instrumentalists performing Annamacharya and Tyagaraja kirtanas."
  }
];

export const SHLOKAS = [
  {
    sanskrit: "ॐ नमो भगवते वासुदेवाय ॥",
    transliteration: "Om Namo Bhagavate Vasudevaya",
    meaning: "I bow to the Supreme Being, Lord Vasudeva, the all-pervading indweller of all beings.",
    source: "Shrimad Bhagavatam"
  },
  {
    sanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥",
    transliteration: "Sarve bhavantu sukhinaḥ, sarve santu nirāmayāḥ; Sarve bhadrāṇi paśyantu, mā kaścid-duḥkha-bhāg-bhavet.",
    meaning: "May all beings everywhere be happy and free from disease; may all perceive what is auspicious, and may none suffer.",
    source: "Brihadaranyaka Upanishad"
  },
  {
    sanskrit: "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥",
    transliteration: "Karpūra-gauraṁ karuṇāvatāraṁ, saṁsāra-sāram bhujagendra-hāram; Sadā-vasantaṁ hṛdayāravinde, bhavaṁ bhavānī-sahitaṁ namāmi.",
    meaning: "Pure as camphor, incarnation of compassion, essence of worldly existence, adorned with the serpent king; Ever residing in the lotus of my heart, I bow to Shiva and Goddess Bhavani.",
    source: "Shiva Stotram"
  }
];

export const FAQS = [
  {
    question: "What are the general Temple Darshan timings?",
    answer: "The temple opens daily at 05:00 AM with Suprabhata Seva and closes at 10:00 PM after Ekanta Seva. General Sarva Darshan runs from 06:00 AM to 11:30 AM and 03:30 PM to 06:30 PM, and 07:30 PM to 09:30 PM."
  },
  {
    question: "Is there a prescribed dress code to enter the temple?",
    answer: "Yes, traditional Indian dress is respectfully requested. Gentlemen should wear Dhoti with Uttariyam or Kurta Pajama. Ladies should wear Sarees, Half-sarees, or Churidar with Dupatta. Western casuals, shorts, and sleeveless wear are not permitted inside the sanctum."
  },
  {
    question: "How do I book a Pooja or Abhishekam online through DivineConnect?",
    answer: "Navigate to the 'Pooja Booking' tab on DivineConnect, pick your preferred ritual (such as Rudrabhishekam or Sahasranama Archana), choose your date and slot, enter devotee details including Gotra and Nakshatra, and submit. You will receive an instant digital confirmation pass with a unique reference number."
  },
  {
    question: "Is Annadanam (free sanctum meals) available daily?",
    answer: "Yes, sanctum Annaprasadam is served daily to all devotees from 12:00 PM to 03:00 PM and from 07:30 PM to 09:30 PM at the dedicated Sri Annapoorna Seva Hall."
  },
  {
    question: "Are donations tax-exempt under Section 80G?",
    answer: "All charitable donations made toward Nitya Annadanam, Goshala Seva, and Heritage Renovation are eligible for a 50% tax deduction under Section 80G of the Indian Income Tax Act. A digital 80G receipt is automatically generated for your records."
  },
  {
    question: "Can senior citizens and differently-abled devotees get special darshan assistance?",
    answer: "Yes, special battery-operated carts, wheelchairs, and an express elderly queue counter (Mahadwaram Gate 3) are provided without waiting. Please show an age proof card at the counter."
  }
];

export const MOCK_ADMIN_DATA = {
  stats: {
    totalBookings: 1482,
    todayBookings: 37,
    totalHundiDonations: "₹ 42,85,600",
    thisMonthDonations: "₹ 5,42,100",
    registeredDevotees: 8920,
    upcomingEvents: 4
  },
  recentBookings: [
    {
      id: "DC-2026-9041",
      devoteeName: "Suresh & Radhika Sharma",
      phone: "+91 98765 43210",
      pooja: "Sri Maha Rudrabhishekam",
      date: "2026-10-15",
      slot: "06:30 AM - 07:45 AM",
      devotees: 3,
      dakshina: "₹ 1,100",
      status: "Confirmed",
      gotra: "Kashyapa"
    },
    {
      id: "DC-2026-9040",
      devoteeName: "Venkata Raman & Family",
      phone: "+91 98451 12345",
      pooja: "Nitya Kalyanotsavam",
      date: "2026-10-16",
      slot: "10:30 AM - 01:00 PM",
      devotees: 4,
      dakshina: "₹ 2,500",
      status: "Confirmed",
      gotra: "Bharadwaja"
    },
    {
      id: "DC-2026-9039",
      devoteeName: "Ananya Deshmukh",
      phone: "+91 97654 32109",
      pooja: "Sahasranama Archana",
      date: "2026-10-14",
      slot: "07:00 AM - 07:45 AM",
      devotees: 2,
      dakshina: "₹ 500",
      status: "Completed",
      gotra: "Vashishta"
    },
    {
      id: "DC-2026-9038",
      devoteeName: "Rajeshwar Rao",
      phone: "+91 99887 76655",
      pooja: "Sri Satyanarayan Vratham",
      date: "2026-10-18",
      slot: "08:30 AM - 10:30 AM",
      devotees: 5,
      dakshina: "₹ 1,500",
      status: "Pending",
      gotra: "Gouthama"
    },
    {
      id: "DC-2026-9037",
      devoteeName: "Meenakshi Sundaram",
      phone: "+91 94433 22110",
      pooja: "Navagraha Shanti Homam",
      date: "2026-10-19",
      slot: "08:00 AM - 09:30 AM",
      devotees: 2,
      dakshina: "₹ 1,200",
      status: "Confirmed",
      gotra: "Harita"
    }
  ],
  devoteeDirectory: [
    {
      id: "DEV-1001",
      name: "Suresh Sharma",
      email: "suresh.sharma@example.com",
      phone: "+91 98765 43210",
      city: "Hyderabad",
      tier: "Maha Sevak (VIP)",
      totalSevas: 14,
      lastVisit: "Oct 05, 2026"
    },
    {
      id: "DEV-1002",
      name: "Ananya Deshmukh",
      email: "ananya.d@example.com",
      phone: "+91 97654 32109",
      city: "Pune",
      tier: "Bhakta Member",
      totalSevas: 6,
      lastVisit: "Oct 10, 2026"
    },
    {
      id: "DEV-1003",
      name: "Venkata Raman",
      email: "v.raman@example.com",
      phone: "+91 98451 12345",
      city: "Bengaluru",
      tier: "Maha Sevak (VIP)",
      totalSevas: 21,
      lastVisit: "Sep 28, 2026"
    },
    {
      id: "DEV-1004",
      name: "Lakshmi Narayanan",
      email: "lnarayanan@example.com",
      phone: "+91 94455 66778",
      city: "Chennai",
      tier: "Bhakta Member",
      totalSevas: 8,
      lastVisit: "Oct 02, 2026"
    }
  ],
  recentDonations: [
    { id: "TXN-8812", donor: "Dr. K. Srinivasan", cause: "Nitya Annadanam", amount: "₹ 25,000", date: "Today, 11:20 AM" },
    { id: "TXN-8811", donor: "Padma & Ramesh Gupta", cause: "Sri Krishna Goshala", amount: "₹ 5,100", date: "Today, 09:45 AM" },
    { id: "TXN-8810", donor: "Sudha Murthy Seva Trust", cause: "Veda Patashala", amount: "₹ 50,000", date: "Yesterday" },
    { id: "TXN-8809", donor: "Anonymous Bhakta", cause: "Temple Renovation", amount: "₹ 11,000", date: "Yesterday" }
  ]
};

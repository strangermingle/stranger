export interface LocalSpot {
  name: string;
  area: string;
  vibe: string;
  activity: string;
}

export interface CityCompanionProfile {
  title: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  heroBadge: string;
  heroTagline: string;
  provocativeHook: string;
  localScenarioHeading: string;
  localScenarioStory: string;
  localSlangTerms: { term: string; meaning: string; inContext: string }[];
  popularHangouts: LocalSpot[];
  idealOutingsHeading: string;
  whyChoosePoints: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export interface CityData {
  cityKey: string;
  cityName: string;
  state: string;
  tagline: string;
  girlfriend: CityCompanionProfile;
  boyfriend: CityCompanionProfile;
}

export const CITY_COMPANION_DATA: Record<string, CityData> = {
  bangalore: {
    cityKey: 'bangalore',
    cityName: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley of India',
    girlfriend: {
      title: 'Rent a Girlfriend in Bengaluru | Verified Platonic Companions for Cafe Hangouts & Events',
      metaDescription: 'Looking to hire a friend in Bengaluru? Rent a verified, platonic girlfriend for cafe hopping in Indiranagar, Church Street walks, weekend events or tech mixers. Safe, polite & 100% platonic.',
      keywords: [
        'rent a girlfriend in Bengaluru',
        'rent a girlfriend Bangalore',
        'hire a friend Bangalore',
        'platonic companion Bengaluru',
        'female companion Koramangala',
        'plus one for events Bangalore',
        'rent a friend India'
      ],
      h1: 'Rent a Girlfriend in Bengaluru – Platonic Companion for Cafe Hangouts, Events & Weekend Meetups',
      heroBadge: 'Bengaluru • Safe & 100% Platonic Companionship',
      heroTagline: 'Beat Tech-City Loneliness with a Genuine, Cultured Companion',
      provocativeHook: 'Tired of endless swiping on swiping apps with zero replies, awkward ghosting, or spending another Sunday cooped up in your flat in HSR Layout? Whether you want a witty plus-one for an upscale dinner in Indiranagar, a companion for board games on Church Street, or someone to explore third-wave coffee roasters without unwanted drama—hire a verified platonic girlfriend in Bengaluru today.',
      localScenarioHeading: 'Why Young Techies & Founders in Bengaluru Hire a Platonic Girlfriend',
      localScenarioStory: 'Moving to Bengaluru for an IT or startup job often means 14-hour work sprints, endless meetings in Bellandur, and staying stuck on the Silk Board flyover. By the time Friday night arrives, your college buddies are married or still stuck on sprint deadlines. You want to dress up, grab artisan sourdough at a rooftop cafe in Koramangala, or visit an art gallery, but going alone feels flat. Our verified companions are educated, witty young professionals who understand tech banter, appreciate good music, and love exploring the city with you—no strings attached, no awkward relationship tags.',
      localSlangTerms: [
        { term: 'Macha / Maga', meaning: 'Buddy or close pal', inContext: 'No formal awkwardness here; your companion knows the city inside out, macha!' },
        { term: 'Scene / Sort', meaning: 'Weekend plan or resolved situation', inContext: 'Weekend scenes completely sorted without begging busy flatmates.' },
        { term: 'Filter Kaapi', meaning: 'Iconic South Indian filter coffee', inContext: 'Start your morning stroll at Cubbon Park with a hot tumbler of authentic filter kaapi.' }
      ],
      popularHangouts: [
        { name: 'Third Wave Coffee / Blue Tokai', area: '100ft Road, Indiranagar', vibe: 'Chic, lively, aesthetic', activity: 'Casual conversations, book reading, and artisan brew tasting.' },
        { name: 'Church Street & Blossom Book House', area: 'Central Bengaluru', vibe: 'Bohemian, bookish, vibrant', activity: 'Browsing vintage books, street art photography, and street food snacking.' },
        { name: 'Cubbon Park & Bamboo Groves', area: 'Kasturba Road', vibe: 'Lush green, calm, peaceful', activity: 'Morning walk, picnic conversation, and dogs spotting.' },
        { name: 'UB City Rooftop Lounges', area: 'Vittal Mallya Road', vibe: 'Upscale, classy, scenic', activity: 'Fine dining plus-one companion for celebratory dinners and skyline views.' }
      ],
      idealOutingsHeading: 'Best Platonic Hangout & Outing Ideas with Your Companion in Bengaluru',
      whyChoosePoints: [
        { title: 'Cultured & Tech-Savvy Conversations', desc: 'No robotic small talk. Talk about startup ideas, indie cinema, travel, or work stress with someone who actually listens.' },
        { title: 'Zero swiping app Baggage', desc: 'No expectations of marriage biodatas, ghosting, or awkward relationship pressure. Pure, upfront companionship.' },
        { title: 'Safe & Verified Profiles', desc: 'Every companion undergoes government ID verification, phone screening, and adheres to strict safety boundaries.' },
        { title: 'Perfect Plus-One for Social Functions', desc: 'Need a charming, articulate companion for a tech summit networking dinner or a friends reception? We have got you covered.' }
      ],
      faqs: [
        { question: 'What does renting a girlfriend in Bengaluru involve?', answer: 'It is a strictly platonic, hourly companionship service. You can hire a verified companion to accompany you to cafes, public social events, art exhibitions, movies, or dinner. It is completely non-sexual and safe.' },
        { question: 'How much does it cost to hire a friend in Bengaluru?', answer: 'Companions set their transparent hourly rates on their verified member profiles, generally ranging from ₹1,000 to ₹3,500 per hour depending on the duration and event type.' },
        { question: 'Are public venues mandatory for meetings in Bengaluru?', answer: 'Yes! All meetups must strictly take place in public venues such as cafes in Indiranagar, malls in Whitefield, parks, or registered event spaces. Private homes or hotel rooms are strictly prohibited.' },
        { question: 'How do I hire a companion or become one in Bengaluru?', answer: 'Click "Hire a Friend" to log in to our members portal and browse verified Bengaluru profiles. If you wish to offer friendly companionship and earn good income, tap "Become a Companion" to register.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Bengaluru | Cultured & Verified Male Companion for Outings & Events',
      metaDescription: 'Hire a reliable, cultured platonic boyfriend in Bengaluru. Perfect companion for concerts, cafe hangouts, evening strolls, or plus-one for parties. Safe, polite & verified.',
      keywords: [
        'rent a boyfriend in Bengaluru',
        'rent a boyfriend Bangalore',
        'hire male friend Bangalore',
        'platonic male companion Bengaluru',
        'safe companion for women Bangalore',
        'hire a friend Bangalore'
      ],
      h1: 'Rent a Boyfriend in Bengaluru – Smart, Polite & Verified Male Companion for Outings & Events',
      heroBadge: 'Bengaluru • Safe & 100% Platonic Companionship',
      heroTagline: 'A Trustworthy, Chivalrous Companion with Zero Pressure or Judgement',
      provocativeHook: 'Want to check out a buzzing indie concert in Whitefield, need an attentive guy to accompany you to a bustling weekend market, or looking for a polite, well-dressed plus-one for a corporate mixer or wedding reception? Skip creepy DMs and unsolicited relationship advice. Rent a smart, chivalrous, and verified platonic boyfriend in Bengaluru for respectful companionship on your terms.',
      localScenarioHeading: 'Why Independent Women & Professionals in Bengaluru Rent a Boyfriend',
      localScenarioStory: 'Bengaluru is filled with ambitious women working in software, consulting, biotech, and creative agencies. But navigating social life can be tricky—many male acquaintances blur boundaries, while swiping apps often bring superficial conversations and ghosting. Whether you want a confident fitness buddy for a weekend trek, a polite guy to help you discover the craft beer spots in Sarjapur, or a patient companion to listen after an exhausting corporate review week, our verified male companions offer authentic respect, engaging dialogue, and absolute peace of mind.',
      localSlangTerms: [
        { term: 'Chilled Out', meaning: 'Relaxed and easy-going', inContext: 'Enjoy a completely chilled-out evening without worrying about intrusive questions.' },
        { term: 'Oota Aitha?', meaning: 'Had food? (Caring Kannada greeting)', inContext: 'Experience genuine care and local warmth while exploring food trails.' },
        { term: 'Scenes', meaning: 'Social plans', inContext: 'Make your weekend scenes happening without waiting on flaky friends.' }
      ],
      popularHangouts: [
        { name: 'Toit Brewpub / Windmills Craftworks', area: 'Indiranagar & Whitefield', vibe: 'Upbeat, premium, classy', activity: 'Craft brew tasting, gourmet pizza, and lively music chats.' },
        { name: 'Dhaatu Puppet Theater / Ranga Shankara', area: 'JP Nagar', vibe: 'Artistic, cultural, theatrical', activity: 'Catching an evening play followed by cutting chai and theatrical debates.' },
        { name: 'Lalbagh Botanical Gardens', area: 'South Bengaluru', vibe: 'Historic, serene, breezy', activity: 'Morning nature walks, seasonal flower shows, and photography.' },
        { name: 'Phoenix Marketcity & VR Bengaluru', area: 'Whitefield Road', vibe: 'Modern shopping, lively cinema', activity: 'Movie outings, arcade games, and retail therapy companionship.' }
      ],
      idealOutingsHeading: 'Top Safe & Fun Outings with a Rented Boyfriend in Bengaluru',
      whyChoosePoints: [
        { title: 'Chivalrous & Respectful Conduct', desc: 'Strict zero-tolerance code of conduct. Punctual, polite, well-mannered, and attentive to your comfort.' },
        { title: 'The Ultimate Plus-One', desc: 'Confident and articulate, able to hold conversations with colleagues, friends, or family circles with ease.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy late-night dining or music concerts across town with an attentive, reliable companion by your side.' },
        { title: '100% Confidential & Secure', desc: 'Your identity and booking details remain completely private and confidential.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Bengaluru?', answer: 'Absolutely. Every companion is government ID verified, background-screened, and bound by our strict safety protocol. All sessions take place exclusively in public spaces.' },
        { question: 'What can we do during our booked hours in Bengaluru?', answer: 'You can go cafe hopping, watch a new movie release at PVR, attend live standup comedy or concerts, visit heritage parks, or have genuine conversation over coffee.' },
        { question: 'Can I hire a boyfriend as a plus-one for a corporate party or family wedding?', answer: 'Yes! Many young professionals book our male companions as charming, polite plus-ones for social functions to avoid uncomfortable questions from relatives or colleagues.' },
        { question: 'How do I book a male companion in Bengaluru?', answer: 'Tap "Hire a Friend" to enter the members portal, select Bengaluru, view male companion profiles, and request a booking securely.' }
      ]
    }
  },

  mumbai: {
    cityKey: 'mumbai',
    cityName: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'The Maximum City & Financial Capital',
    girlfriend: {
      title: 'Rent a Girlfriend in Mumbai | Verified Platonic Companions for Cafe Hangouts & Marine Drive Walks',
      metaDescription: 'Hire a verified platonic girlfriend in Mumbai. Enjoy cafe hopping in Bandra, sunset strolls at Marine Drive, art gallery visits, or social events. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Mumbai',
        'rent a girlfriend Mumbai',
        'hire a female friend Mumbai',
        'platonic companion Bandra',
        'Marine Drive walking friend Mumbai',
        'plus one for events Mumbai',
        'rent a friend Mumbai'
      ],
      h1: 'Rent a Girlfriend in Mumbai – Charming Platonic Companion for Bandra Cafes, Marine Drive & Events',
      heroBadge: 'Mumbai • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the Maximum City with Someone Who Truly Understands Its Vibe',
      provocativeHook: 'Mumbai is packed with 20 million people, yet it can be the loneliest city in India when you are spending Saturday night in your 1BHK in Andheri or Powai. Tired of flaky social app matches who cancel last-minute? Hire a verified platonic girlfriend in Mumbai to stroll down Carter Road, share artisan dessert in Kala Ghoda, or attend a rooftop gig in Lower Parel without any pressure or emotional drama.',
      localScenarioHeading: 'Why Young Professionals & Relocated Executives in Mumbai Hire a Friend',
      localScenarioStory: 'Between catching local trains from Western to Harbour line and clocking 60-hour weeks in BKC or Nariman Point, making real friends in Mumbai is tough. Most people either already have their tight-knit childhood school groups or only talk about work. When you want to catch the cool breeze at Marine Drive, visit a jazz gig at NCPA, or explore street shopping at Colaba Causeway, going alone feels incomplete. Our companions are smart, ambitious, and delightful conversationalists who make the city feel alive, welcoming, and warm.',
      localSlangTerms: [
        { term: 'Bambaiya Vibe', meaning: 'The classic unpretentious spirit of Mumbai', inContext: 'Experience the authentic Bambaiya warmth with a companion who knows hidden gems.' },
        { term: 'Cutting Chai', meaning: 'Half-glass strong tea', inContext: 'Bond over evening cutting chai and bun maska near Marine Lines.' },
        { term: 'Chill Scene', meaning: 'A calm, hassle-free plan', inContext: 'Keep your weekend chill scene active without waiting on busy colleagues.' }
      ],
      popularHangouts: [
        { name: 'Marine Drive & Queens Necklace', area: 'South Mumbai', vibe: 'Iconic, breezy, romantic', activity: 'Sunset strolls, deep conversations, and enjoying the Arabian Sea breeze.' },
        { name: 'Pali Hill & Carter Road Cafes', area: 'Bandra West', vibe: 'Trendy, celebrity-favourite, aesthetic', activity: 'weekend brunch, specialty coffee, and coastal promenade walking.' },
        { name: 'Kala Ghoda Heritage & Art Precinct', area: 'Fort', vibe: 'Artistic, cultural, historic', activity: 'Exploring indie art galleries, boutique shops, and historic architecture.' },
        { name: 'BKC Open-Air Plazas & Diners', area: 'Bandra Kurla Complex', vibe: 'Modern, cosmopolitan, upscale', activity: 'Fine dining plus-one companionship, corporate mixer accompaniment.' }
      ],
      idealOutingsHeading: 'Top Curated Hangout Ideas with a Rented Girlfriend in Mumbai',
      whyChoosePoints: [
        { title: 'True Mumbai Vibe & Local Knowledge', desc: 'Discover hidden speakeasies, heritage cafes, and scenic sunset corners known only to locals.' },
        { title: 'No swiping app Burnout', desc: 'Skip the repetitive bio questions, shallow small talk, and ghosting. Straightforward companionship with clear boundaries.' },
        { title: 'Verified & Strictly Professional', desc: 'All companions undergo strict identity verification and adhere to a transparent platonic code of conduct.' },
        { title: 'The Ultimate Plus-One for SoBo & Suburbs', desc: 'Whether it is a gallery opening, film festival, or upscale party, have a poised, charismatic companion by your side.' }
      ],
      faqs: [
        { question: 'What does renting a girlfriend in Mumbai mean?', answer: 'It is a safe, platonic companion service where you can book an hourly companion to join you for meals, sightseeing, shopping, or public events in Mumbai. Intimacy or romantic solicitation is strictly prohibited.' },
        { question: 'Where can we meet in Mumbai?', answer: 'Meetups happen exclusively in public locations like cafes in Bandra, promenade walks at Marine Drive, malls in Lower Parel, or cultural hubs in Fort.' },
        { question: 'What is the hourly rate in Mumbai?', answer: 'Rates vary by companion profile and generally range between ₹1,500 and ₹4,000 per hour, displayed clearly inside the members portal.' },
        { question: 'Can I hire a companion for a full day in Mumbai?', answer: 'Yes, full-day packages (e.g. 6 to 8 hours) for sightseeing, South Mumbai heritage walks, or weekend outings are available upon mutual agreement.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Mumbai | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a trustworthy, polite platonic boyfriend in Mumbai. Perfect companion for concerts, late-night dinners, movie outings, or family plus-one. 100% safe & verified.',
      keywords: [
        'rent a boyfriend in Mumbai',
        'rent a boyfriend Mumbai',
        'hire male companion Mumbai',
        'platonic male friend Bandra',
        'safe companion for girls Mumbai',
        'hire a friend Mumbai'
      ],
      h1: 'Rent a Boyfriend in Mumbai – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Mumbai • Safe & 100% Platonic Companionship',
      heroTagline: 'A Dependable, Respectful Gentleman for Any Outing or Occasion',
      provocativeHook: 'Want to attend a late-night music festival at Mahalaxmi Racecourse, explore food trucks at Carter Road, or need a respectful, sharp guy to accompany you to a friend’s wedding without the awkward awkward relationship expectations? Avoid weird encounters and creepy advances. Rent a polite, well-mannered, and verified platonic boyfriend in Mumbai for effortless companionship.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Mumbai Rent a Boyfriend',
      localScenarioStory: 'Life in Mumbai moves at 100 km/h. Career-driven women often find swiping apps frustrating, filled with either non-committal unserious acquaintances or pushy personalities. Sometimes you simply want a pleasant, funny guy to have dinner with in Juhu, a gym partner for weekend workouts, or a reliable escort for late evening art shows and live comedy gigs. Our male companions in Mumbai are educated, well-spoken, and strictly respect your comfort and personal boundaries.',
      localSlangTerms: [
        { term: 'Bindaas', meaning: 'Carefree and confident', inContext: 'Enjoy a bindaas evening knowing your safety and boundaries are 100% respected.' },
        { term: 'Yaar', meaning: 'Friend / buddy', inContext: 'Talk heart-to-heart like a trusted old friend without any strings attached.' },
        { term: 'Pakka', meaning: 'Definite / confirmed', inContext: 'Your booking is pakka and on-time—no last-minute flaky cancellations.' }
      ],
      popularHangouts: [
        { name: 'Bandra Bandstand & Prithvi Theatre', area: 'Bandra & Juhu', vibe: 'Artistic, bohemian, seaside', activity: 'Irish coffee at Prithvi Cafe, watching plays, and coastal walks.' },
        { name: 'Phoenix Palladium & Lower Parel Pubs', area: 'Lower Parel', vibe: 'Energetic, premium, bustling', activity: 'Boutique shopping, luxury movie experiences, and dinner.' },
        { name: 'Sanjay Gandhi National Park & Kanheri Caves', area: 'Borivali', vibe: 'Green, adventurous, historic', activity: 'Bicycle riding, nature trails, and historic cave exploration.' },
        { name: 'Colaba Causeway & Gateway of India', area: 'Colaba', vibe: 'Historic, breezy, vintage', activity: 'Curio shopping, cafe Leopold snacks, and harbor boat views.' }
      ],
      idealOutingsHeading: 'Top Safe & Exciting Experiences with a Rented Boyfriend in Mumbai',
      whyChoosePoints: [
        { title: 'Uncompromising Chivalry & Respect', desc: 'No intrusive personal questions, no physical crossing of lines. Courteous, well-groomed, and protective.' },
        { title: 'Reliable Late-Evening Companion', desc: 'Feel completely secure exploring nightlife, dining, or late theater shows across Mumbai.' },
        { title: 'Great Conversationalist', desc: 'Engage in stimulating discussions on cinema, literature, finance, travel, or everyday life.' },
        { title: 'Zero Judgment, Zero Drama', desc: 'A comfortable space to be yourself without fearing workplace gossip or social circle chatter.' }
      ],
      faqs: [
        { question: 'Is it completely safe for women to hire a boyfriend in Mumbai?', answer: 'Yes. Stranger Mingle vets every companion with strict ID validation and conduct agreements. All activities are strictly platonic and confined to public venues.' },
        { question: 'Can I rent a boyfriend for a family wedding or corporate party in Mumbai?', answer: 'Yes! Male companions frequently act as cultured, charming plus-ones for family dinners, weddings, and office events.' },
        { question: 'How is payment handled?', answer: 'Everything is transparently managed through our secure platform so there are no awkward cash negotiations.' },
        { question: 'Can I book someone on the same day?', answer: 'Same-day bookings are possible based on companion availability in your locality (Bandra, Andheri, Powai, South Mumbai, etc.).' }
      ]
    }
  },

  delhi: {
    cityKey: 'delhi',
    cityName: 'Delhi-NCR',
    state: 'Delhi',
    tagline: 'Heart of the Nation & Cultural Hub',
    girlfriend: {
      title: 'Rent a Girlfriend in Delhi NCR | Verified Platonic Companions for Cafes & Social Outings',
      metaDescription: 'Hire a verified platonic girlfriend in Delhi-NCR (Gurgaon, Noida, South Delhi). Explore Hauz Khas, CP, Cyber Hub, or attend social events. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Delhi',
        'rent a girlfriend Delhi NCR',
        'hire female friend Delhi',
        'platonic companion Gurgaon',
        'Hauz Khas companion Delhi',
        'plus one for wedding Delhi',
        'rent a friend Delhi'
      ],
      h1: 'Rent a Girlfriend in Delhi NCR – Charming Platonic Companion for CP, Cyber Hub & Events',
      heroBadge: 'Delhi-NCR • Safe & 100% Platonic Companionship',
      heroTagline: 'Navigate Dilwalo Ki Dilli with a Confident, Witty Companion',
      provocativeHook: 'Living in Delhi-NCR can be fast-paced, loud, and unexpectedly isolating. Sick of flaky plans on Tinder or spending your weekend wandering alone in Select Citywalk? Hire an articulate, stylish, and verified platonic girlfriend in Delhi for an aesthetic cafe hangout in Champa Gali, a monument stroll at Lodhi Gardens, or a lively dinner in Cyber Hub Gurgaon.',
      localScenarioHeading: 'Why Young Professionals & Consultants in Delhi-NCR Hire a Companion',
      localScenarioStory: 'Whether you are working at a top consulting firm in Cyber City, a tech startup in Noida Sector 62, or preparing for exams in South Delhi, quality social life often takes a back seat. Delhi’s social circles can feel cliquey and hard to enter. Having an engaging, charming companion means you never have to dine solo at Khan Market or visit Dilli Haat alone. Enjoy warm, spirited conversations with someone who matches your intellect and energy.',
      localSlangTerms: [
        { term: 'Jugaad', meaning: 'Clever solution or life-hack', inContext: 'Your ultimate social jugaad to beat weekend boredom.' },
        { term: 'Gedi', meaning: 'Casual drive or stroll', inContext: 'Plan an enjoyable evening gedi around the grand boulevards of Central Delhi.' },
        { term: 'Dilli Vibe', meaning: 'Warm, spirited, food-loving nature', inContext: 'Experience the real Dilli vibe with someone who loves food and culture.' }
      ],
      popularHangouts: [
        { name: 'Hauz Khas Village & Deer Park', area: 'South Delhi', vibe: 'Boho, historic, lakeside', activity: 'Lakeside cafe chilling, indie boutique shopping, and historical ruins stroll.' },
        { name: 'Cyber Hub & Horizon Center', area: 'DLF Phase 2, Gurgaon', vibe: 'Modern, corporate-chic, buzzing', activity: 'After-work dinners, craft brews, and vibrant outdoor plaza mingling.' },
        { name: 'Connaught Place (CP) & Janpath', area: 'Central Delhi', vibe: 'Heritage, colonial, lively', activity: 'Heritage walks, Oxford bookstore visits, and legendary cafe snacks.' },
        { name: 'Lodhi Art District & Lodhi Gardens', area: 'Lodhi Estate', vibe: 'Artistic, serene, botanical', activity: 'Street mural photography, picnic talks, and greenery.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Delhi NCR',
      whyChoosePoints: [
        { title: 'Cultured & Articulate Companions', desc: 'Discuss geopolitics, startups, Bollywood, or food culture with intelligent companions.' },
        { title: 'The Perfect Wedding or Party Plus-One', desc: 'Need an impressive, well-dressed companion for high-society Delhi weddings or dinners? Book with confidence.' },
        { title: 'Guaranteed Safe & Verified', desc: 'Strict government ID verification ensures trust and complete peace of mind.' },
        { title: 'Zero Clinginess or awkward relationship pressure', desc: 'Enjoy quality time without demands for daily WhatsApp updates or awkward relationship tags.' }
      ],
      faqs: [
        { question: 'Is renting a girlfriend safe and legal in Delhi-NCR?', answer: 'Yes, it is 100% legal and strictly platonic companionship. We provide non-romantic, non-sexual friendship services in public spaces across Delhi, Gurgaon, and Noida.' },
        { question: 'Where can we meet in Delhi NCR?', answer: 'Meetings take place only at public spots like Cyber Hub, Khan Market, Connaught Place, Select Citywalk, or DLF Mall of India.' },
        { question: 'Can I book a companion to attend a Delhi wedding with me?', answer: 'Yes, companion accompaniment to family celebrations, weddings, and corporate dinners is a popular and fully supported use-case.' },
        { question: 'What are the charges for Delhi?', answer: 'Rates are listed transparently on verified companion profiles, generally between ₹1,200 and ₹3,500 per hour.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Delhi NCR | Smart, Cultured & Verified Male Companion',
      metaDescription: 'Hire a polite, respectful platonic boyfriend in Delhi NCR. Great companion for concerts, late-night dinners, heritage walks, or party plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Delhi',
        'rent a boyfriend Delhi NCR',
        'hire male companion Delhi',
        'platonic male friend Gurgaon',
        'safe companion for women Delhi',
        'hire a friend Delhi'
      ],
      h1: 'Rent a Boyfriend in Delhi NCR – Smart, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Delhi-NCR • Safe & 100% Platonic Companionship',
      heroTagline: 'A Well-Mannered, Chivalrous Gentleman for Outings, Cafes & Events',
      provocativeHook: 'Safety and comfort are top priorities in Delhi-NCR. Want to check out an indie music concert in Gurgaon, attend a late evening event at India Habitat Centre, or simply want a cultured, respectful guy to chat with over coffee in South Ex? Avoid unsolicited creepiness. Rent a polite, educated, and verified platonic boyfriend in Delhi-NCR who treats you with utter respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Delhi Rent a Boyfriend',
      localScenarioStory: 'Social life in Delhi can be exhausting. Many women encounter overbearing attitudes or aggressive matchmaking. Sometimes all you need is a reliable, intellectual male companion with whom you can comfortably share a meal, laugh over funny workplace stories, explore food at Majnu Ka Tila, or attend a colleague’s wedding without the fear of boundary violations. Our companions are thoroughly vetted gentlemen who value emotional intelligence and courtesy.',
      localSlangTerms: [
        { term: 'Bhai / Yaar', meaning: 'Brother or friend', inContext: 'Get genuine, dependable companion support like a real friend.' },
        { term: 'Badhiya', meaning: 'Excellent / great', inContext: 'Have a badhiya time exploring the best food and cafes in town.' },
        { term: 'Dil Se', meaning: 'From the heart', inContext: 'Experience genuine, attentive conversations straight from the heart.' }
      ],
      popularHangouts: [
        { name: 'India Habitat Centre & Lodhi Gardens', area: 'Lodhi Road', vibe: 'Intellectual, artistic, serene', activity: 'Art expos, documentary screenings, open-air amphitheater talks.' },
        { name: 'Majnu Ka Tila (Little Tibet)', area: 'North Delhi', vibe: 'Cosy, bohemian, vibrant', activity: 'Tasting authentic momos, laphing, and exploring Himalayan cafes.' },
        { name: '32nd Avenue (Milestone)', area: 'Gurgaon', vibe: 'Trendy, aesthetic, lively', activity: 'Artisan bakery treats, craft coffee, and rooftop dining.' },
        { name: 'Dilli Haat INA', area: 'South Delhi', vibe: 'Handicrafts, cultural, vibrant', activity: 'Regional food stalls crawl, folk handicrafts shopping, and evening walks.' }
      ],
      idealOutingsHeading: 'Top Safe & Classy Outings with a Rented Boyfriend in Delhi',
      whyChoosePoints: [
        { title: 'Complete Safety & Decorum', desc: 'Our male companions uphold the highest standards of chivalry and personal space.' },
        { title: 'Intellectually Stimulating Company', desc: 'Hold meaningful conversations on politics, design, literature, tech, or fitness.' },
        { title: 'Dependable Plus-One for Social Events', desc: 'A sharp, charismatic presence to ward off awkward questions at family functions.' },
        { title: 'Zero swiping app Pressures', desc: 'No expectations of romantic entanglement. Just pure, enjoyable, safe social time.' }
      ],
      faqs: [
        { question: 'Is safety assured for female clients in Delhi?', answer: 'Yes! Safety is our number one priority. All male companions are ID-verified, background-screened, and required to meet exclusively in well-lit public venues.' },
        { question: 'Can we visit monuments and museums in Delhi?', answer: 'Yes! Exploring spots like National Gallery of Modern Art, Qutub complex, or Lodhi Gardens with a companion is very popular.' },
        { question: 'How do I pay my companion in Delhi?', answer: 'All payments are settled securely through the Stranger Mingle membership portal.' },
        { question: 'Can I book a boyfriend for multiple hours in Gurgaon or Noida?', answer: 'Yes, you can book multi-hour sessions across any recognized neighborhood in Delhi, Gurgaon, or Noida.' }
      ]
    }
  },

  pune: {
    cityKey: 'pune',
    cityName: 'Pune',
    state: 'Maharashtra',
    tagline: 'Oxford of the East & Cultural Capital of Maharashtra',
    girlfriend: {
      title: 'Rent a Girlfriend in Pune | Verified Platonic Companions for FC Road & KP Hangouts',
      metaDescription: 'Hire a verified platonic girlfriend in Pune. Explore cafes in Koregaon Park, FC Road street food, Baner high street, or weekend treks. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Pune',
        'rent a girlfriend Pune',
        'hire female friend Pune',
        'platonic companion Koregaon Park',
        'FC road companion Pune',
        'plus one for events Pune',
        'rent a friend Pune'
      ],
      h1: 'Rent a Girlfriend in Pune – Charming Platonic Companion for Koregaon Park, FC Road & Events',
      heroBadge: 'Pune • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience Pune’s Youthful Vibe with a Cultured Local Companion',
      provocativeHook: 'Moved to Hinjewadi, Viman Nagar, or Magarpatta for an IT gig and finding your weekends remarkably dull? Tired of endless small talk that goes nowhere? Rent a verified platonic girlfriend in Pune to explore the green leafy lanes of Koregaon Park, grab coffee at French Window, hike up Vetal Tekdi, or attend weekend house parties without awkward awkward social tension.',
      localScenarioHeading: 'Why Young Techies & Students in Pune Hire a Platonic Girlfriend',
      localScenarioStory: 'Pune is a city of youthful energy, student vibes, and sprawling tech parks. But when you are living away from home, loneliness can hit hard on Sunday afternoons. Flatmates often have their own plans, and approaching strangers at a cafe on FC Road is intimirelationship. Our verified female companions are friendly, warm, and well-educated Pune locals or professionals who love discussing cinema, tech, books, and life over hot chai and bun maska.',
      localSlangTerms: [
        { term: 'Bhava', meaning: 'Brother / dear friend in Marathi', inContext: 'Feel at ease instantly like having an old trusted buddy, bhava!' },
        { term: 'Katta', meaning: 'Informal hangout adda or seating parapet', inContext: 'Sit at an iconic Pune katta on FC Road enjoying candid chats.' },
        { term: 'Puneri Shaan', meaning: 'The classic witty and cultured Pune attitude', inContext: 'Enjoy intelligent, witty banter infused with true Puneri charm.' }
      ],
      popularHangouts: [
        { name: 'Koregaon Park (KP) Lane 5 & 7', area: 'Koregaon Park', vibe: 'Leafy, aesthetic, European cafes', activity: 'Gourmet bakery visits, specialty brew tasting, and peaceful walks.' },
        { name: 'Fergusson College (FC) Road', area: 'Shivajinagar', vibe: 'Youthful, vibrant, buzzing', activity: 'Book browsing, Vaishali coffee & dosa, and vibrant street shopping.' },
        { name: 'Balewadi High Street', area: 'Baner-Balewadi', vibe: 'Modern, upbeat, nightlife', activity: 'Craft breweries, gourmet dinner plus-one companionship, and music.' },
        { name: 'Vetal Tekdi (ARAI Hills)', area: 'Kothrud / Paud Road', vibe: 'Lush greenery, breezy, scenic', activity: 'Early morning nature walk, city panorama photography, and bird watching.' }
      ],
      idealOutingsHeading: 'Top Curated Outings with Your Companion in Pune',
      whyChoosePoints: [
        { title: 'Authentic Local Knowledge', desc: 'From the best Misal pav joints to hidden sunset overlooks, experience Pune like an insider.' },
        { title: 'Zero Pretense or swiping app Pressure', desc: 'Clear hourly bookings with zero hidden agendas or romantic obligations.' },
        { title: 'Safe & Verified by Identity', desc: 'Verified identity and strict adherence to non-intimate platonic interaction.' },
        { title: 'Great Companion for Events & House Mixers', desc: 'Need a charming plus-one for a Stranger Mingle mixer or private event? Book easily.' }
      ],
      faqs: [
        { question: 'What is the concept of renting a girlfriend in Pune?', answer: 'It is a strictly non-romantic, platonic friendship service. You hire a verified local female companion to join you for cafe hangouts, cultural events, walks, or dining in Pune.' },
        { question: 'Where can we hang out in Pune?', answer: 'All meetups must occur in recognized public places like Koregaon Park cafes, FC Road, Phoenix Marketcity Viman Nagar, or Balewadi High Street.' },
        { question: 'How much does it cost in Pune?', answer: 'Rates vary by companion profile and typically range between ₹1,000 and ₹3,000 per hour.' },
        { question: 'Can I book a companion for an outdoor trek around Pune?', answer: 'Yes! Companions who list trekking and outdoors among their interests can accompany you on popular trails like Vetal Tekdi or Sinhagad during daytime public hours.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Pune | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, chivalrous platonic boyfriend in Pune. Perfect companion for treks, live music gigs, cafe hangouts, or social plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Pune',
        'rent a boyfriend Pune',
        'hire male friend Pune',
        'platonic male companion Koregaon Park',
        'safe companion for girls Pune',
        'hire a friend Pune'
      ],
      h1: 'Rent a Boyfriend in Pune – Polite, Cultured & Verified Male Companion for Outings & Treks',
      heroBadge: 'Pune • Safe & 100% Platonic Companionship',
      heroTagline: 'A Trustworthy, Chivalrous Partner for Treks, Cafes & Social Outings',
      provocativeHook: 'Want to go for a sunrise trek on Vetal Tekdi, check out a live gig at High Spirits in KP, or need a polite, well-dressed plus-one for a friend’s wedding reception in Kothrud? Skip pushy social app matches and awkward awkward meetups. Rent a verified, cultured platonic boyfriend in Pune who respects your boundaries and brings genuine positivity to your day.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Pune Rent a Boyfriend',
      localScenarioStory: 'Pune attracts thousands of ambitious women working in software development, automotive design, finance, and academia. But exploring the city alone in the evening or heading out for outdoor treks solo can feel daunting. Having a dependable, polite male companion gives you the freedom to explore scenic spots, attend music mixers, or enjoy a lazy Sunday coffee without looking over your shoulder or fending off unwanted advances.',
      localSlangTerms: [
        { term: 'Kadak', meaning: 'Superb or top-notch', inContext: 'Have a kadak time hanging out without any stress or awkwardness.' },
        { term: 'Tekdi', meaning: 'Hillock', inContext: 'Climb a scenic Pune tekdi with a fit and active companion.' },
        { term: 'Shanti', meaning: 'Peace and tranquility', inContext: 'Enjoy total shanti with a non-judgmental conversationalist.' }
      ],
      popularHangouts: [
        { name: 'Koregaon Park Indie Cafes', area: 'Koregaon Park', vibe: 'Cosy, artistic, laid-back', activity: 'Reading books, acoustic music, and deep life discussions.' },
        { name: 'Sinhagad Fort', area: 'Thoptewadi', vibe: 'Historical, rugged, scenic', activity: 'Morning trek, enjoying authentic pitla bhakri, and valley views.' },
        { name: 'FC Road & Goodluck Cafe', area: 'Deccan Gymkhana', vibe: 'Vintage, bustling, iconic', activity: 'Bun maska, chai, and nostalgic university banter.' },
        { name: 'Phoenix Marketcity Viman Nagar', area: 'Viman Nagar', vibe: 'Modern shopping & gaming', activity: 'Bowling, arcade games, movie screenings, and dining.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Pune',
      whyChoosePoints: [
        { title: 'Gentlemanly Demeanor', desc: 'Punctual, polite, respectful, and strictly attentive to your comfort at all times.' },
        { title: 'The Ultimate Outdoor Buddy', desc: 'Looking for a companion for cycling, gym workouts, or weekend hill treks? Book with ease.' },
        { title: 'Zero Social Pressure', desc: 'No expectations of romantic overtures. Pure, respectful friendship.' },
        { title: 'Transparent Platform', desc: 'Secure booking and identity-verified members guarantee complete safety.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Pune?', answer: 'Yes. All companions are ID-screened and adhere to our strict non-sexual, platonic code. All interactions take place in public, visible spaces.' },
        { question: 'Can we go for treks near Pune together?', answer: 'Yes, daytime treks to accessible public trails like Vetal Tekdi, Taljai, or Sinhagad Fort are permitted.' },
        { question: 'How do I pay for the session in Pune?', answer: 'You pay securely via the Stranger Mingle membership portal with zero cash hassle.' },
        { question: 'Can I book a companion as my wedding plus-one in Pune?', answer: 'Yes! Male companions frequently serve as polite, charming plus-ones for family and corporate events.' }
      ]
    }
  },

  hyderabad: {
    cityKey: 'hyderabad',
    cityName: 'Hyderabad',
    state: 'Telangana',
    tagline: 'City of Pearls & Cyberabad IT Corridor',
    girlfriend: {
      title: 'Rent a Girlfriend in Hyderabad | Verified Platonic Companions for Jubilee Hills & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Hyderabad. Enjoy cafe hopping in Jubilee Hills, Durgam Cheruvu bridge walks, tech events or dining. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Hyderabad',
        'rent a girlfriend Hyderabad',
        'hire female friend Hyderabad',
        'platonic companion Jubilee Hills',
        'Gachibowli companion Hyderabad',
        'plus one for events Hyderabad',
        'rent a friend Hyderabad'
      ],
      h1: 'Rent a Girlfriend in Hyderabad – Charming Platonic Companion for Jubilee Hills, Hitec City & Cafes',
      heroBadge: 'Hyderabad • Safe & 100% Platonic Companionship',
      heroTagline: 'Unwind from Cyberabad Work Pressure with a Warm, Cultured Companion',
      provocativeHook: 'Exhausted after long shifts in Gachibowli or Financial District and spending your weekends scrolling reels in Kondapur? swiping apps in Hyderabad often lead to endless texting without a single in-person coffee. Hire a verified platonic girlfriend in Hyderabad to explore the chic cafes of Jubilee Hills, walk by Durgam Cheruvu cable bridge, or share authentic Biryani without any relationship strings attached.',
      localScenarioHeading: 'Why IT Professionals & Doctors in Hyderabad Hire a Companion',
      localScenarioStory: 'Hyderabad is booming with tech giants, pharmaceutical hubs, and world-class hospitals. But newcomers from across India often struggle to build a fun social circle outside of work colleagues. When you want to visit an artisan brewery in Road No. 45 Jubilee Hills, attend an acoustic night, or drive down Necklace Road, going alone feels uninspiring. Our female companions are smart, engaging, and love discovering Hyderabad’s vibrant food and culture scenes with you.',
      localSlangTerms: [
        { term: 'Baap Re / Uustaad', meaning: 'Astonishment / Ace friend', inContext: 'No awkward pretenses—have a fantastic time like true uustaads.' },
        { term: 'Chai Pe Charcha', meaning: 'Chatting over Irani chai', inContext: 'Bond over piping hot Irani chai and Osmania biscuits near Charminar.' },
        { term: 'Kiraak', meaning: 'Awesome / extraordinary', inContext: 'Make your weekend scenes absolutely kiraak.' }
      ],
      popularHangouts: [
        { name: 'Jubilee Hills Road No. 36 & 45', area: 'Jubilee Hills', vibe: 'Aesthetic, luxury, celebrity-favourite', activity: 'Artisan coffee, European dessert tasting, and peaceful cafe conversations.' },
        { name: 'Durgam Cheruvu Cable Bridge & Lakefront', area: 'Hitec City', vibe: 'Futuristic, breezy, modern', activity: 'Evening promenade stroll, lake views, and photography.' },
        { name: 'Inorbit Mall & Knowledge City', area: 'Madhapur', vibe: 'Vibrant, corporate, retail', activity: 'Shopping assistance, IMAX movies, and rooftop dining.' },
        { name: 'Necklace Road & Hussain Sagar', area: 'Central Hyderabad', vibe: 'Iconic, open-air, historical', activity: 'Cool evening breeze, street snacks, and relaxed walking.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Hyderabad',
      whyChoosePoints: [
        { title: 'Cultured Conversationalist', desc: 'No repetitive awkward topics. Talk about movies, careers, tech trends, and travel.' },
        { title: 'Zero awkward friction', desc: 'No expectations of marriage commitments or relationship interrogations.' },
        { title: 'Strictly Safe & Verified', desc: 'Complete identity verification and safe public venue policies.' },
        { title: 'The Perfect Social Plus-One', desc: 'Confidently invite an articulate companion to family weddings or office celebratory dinners.' }
      ],
      faqs: [
        { question: 'What does renting a girlfriend in Hyderabad mean?', answer: 'It is a professional, strictly platonic companion service. You hire a verified local female companion for social outings, dining, movies, or events in Hyderabad.' },
        { question: 'Where can we meet in Hyderabad?', answer: 'All meetups happen in public places like Jubilee Hills cafes, Inorbit Mall Madhapur, Durgam Cheruvu lakefront, or Gachibowli eateries.' },
        { question: 'How much does it cost in Hyderabad?', answer: 'Hourly rates generally range from ₹1,200 to ₹3,500 depending on the companion profile.' },
        { question: 'Can I book a companion for an evening dinner?', answer: 'Yes! Evening dinners, cafe outings, and social mixers are our most popular bookings.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Hyderabad | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Hyderabad. Great companion for concerts, cafe hangouts, evening drives, or party plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Hyderabad',
        'rent a boyfriend Hyderabad',
        'hire male companion Hyderabad',
        'platonic male friend Jubilee Hills',
        'safe companion for girls Hyderabad',
        'hire a friend Hyderabad'
      ],
      h1: 'Rent a Boyfriend in Hyderabad – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Hyderabad • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Cultured Gentleman with Complete Respect for Your Boundaries',
      provocativeHook: 'Looking for a charming, well-spoken guy to accompany you to a live music show in Jubilee Hills, explore night street food at DLF Cyber City, or need an impressive plus-one for a family reception in Banjara Hills? Avoid the creepiness of swiping apps. Rent a polite, verified platonic boyfriend in Hyderabad who values your safety and comfort above all.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Hyderabad Rent a Boyfriend',
      localScenarioStory: 'Young women working in Hyderabad’s tech and business sectors often find it hard to meet gentlemen who understand boundaries and respect professional ambitions. Whether you want a confident fitness buddy for a weekend run around KBR Park, someone to check out new cafes on Road 45, or a dependable plus-one to keep nosy relatives from asking about marriage, our male companions offer respectful, witty, and engaging company.',
      localSlangTerms: [
        { term: 'Hao / Hau', meaning: 'Yes / agreed in Hyderabadi', inContext: 'Companions who understand your rhythm and say hau to good food and fun.' },
        { term: 'Chai Time', meaning: 'Tea break and gossip', inContext: 'Spend a relaxing chai time chatting about life and ambitions.' },
        { term: 'Zabardast', meaning: 'Superb or fantastic', inContext: 'Have a zabardast weekend exploring the best spots in town.' }
      ],
      popularHangouts: [
        { name: 'KBR National Park Outer Walk', area: 'Banjara Hills', vibe: 'Green, healthy, serene', activity: 'Morning fitness walk, fresh juice, and health talks.' },
        { name: 'DLF Food Street', area: 'Gachibowli', vibe: 'Bustling, foodie, casual', activity: 'Maggi, dosas, and late-evening street food hopping.' },
        { name: 'Prasad’s Multiplex & IMAX', area: 'Khairatabad', vibe: 'Cinematic, entertainment', activity: 'Movie outings, gaming zones, and lake breeze.' },
        { name: 'Banjara Hills Cafe Precinct', area: 'Road No. 12, Banjara Hills', vibe: 'Cosy, artistic, upscale', activity: 'Art gallery browsing, gourmet dinners, and heartfelt conversation.' }
      ],
      idealOutingsHeading: 'Top Safe Experiences with a Rented Boyfriend in Hyderabad',
      whyChoosePoints: [
        { title: 'Chivalrous & Dignified Behavior', desc: 'Complete respect for your time, comfort, and personal boundaries.' },
        { title: 'Attentive & Non-Judgmental', desc: 'Vent about work, share dreams, or just laugh without being analyzed.' },
        { title: 'Safe Evening Outing Companion', desc: 'Feel safe attending late-night dinners, concerts, or cultural festivals.' },
        { title: 'Zero Clinginess', desc: 'Clean, professional engagement with no awkward follow-ups.' }
      ],
      faqs: [
        { question: 'Is it safe for women to rent a boyfriend in Hyderabad?', answer: 'Yes! We conduct thorough ID and background screenings on all companions. Sessions are held exclusively in public spaces with strict platonic guidelines.' },
        { question: 'Can we visit historical places in Hyderabad?', answer: 'Yes, visiting spots like Golconda Fort, Qutb Shahi Tombs, or Chowmahalla Palace during daytime hours is popular.' },
        { question: 'How is payment processed in Hyderabad?', answer: 'Securely through the Stranger Mingle membership system with complete price transparency.' },
        { question: 'Can I book a companion for wedding events in Hyderabad?', answer: 'Yes, hiring an articulate, well-dressed companion as a wedding plus-one is common and fully supported.' }
      ]
    }
  },

  chennai: {
    cityKey: 'chennai',
    cityName: 'Chennai',
    state: 'Tamil Nadu',
    tagline: 'Gateway to South India & Cultural Capital',
    girlfriend: {
      title: 'Rent a Girlfriend in Chennai | Verified Platonic Companions for Besant Nagar Beach & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Chennai. Enjoy Besant Nagar beach walks, filter coffee in Mylapore, Anna Nagar cafes, or social events. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Chennai',
        'rent a girlfriend Chennai',
        'hire female friend Chennai',
        'platonic companion Besant Nagar',
        'Bessie beach companion Chennai',
        'plus one for events Chennai',
        'rent a friend Chennai'
      ],
      h1: 'Rent a Girlfriend in Chennai – Charming Platonic Companion for Besant Nagar, Cafes & Events',
      heroBadge: 'Chennai • Safe & 100% Platonic Companionship',
      heroTagline: 'Discover Chennai’s Warmth and Culture with an Authentic Local Companion',
      provocativeHook: 'Tired of lonely weekends in your OMR tech flat or staring at your laptop screen? Avoid conservative swiping app judgments and flaky matches. Rent a verified platonic girlfriend in Chennai to stroll down Besant Nagar Beach, sip hot filter coffee in Mylapore, explore vibrant boutiques in Khader Nawaz Khan Road, or attend cultural concerts without awkward strings attached.',
      localScenarioHeading: 'Why IT Professionals & Newcomers in Chennai Hire a Companion',
      localScenarioStory: 'Moving to Chennai for an automotive or software career along OMR can sometimes feel overwhelming, especially if you do not speak Tamil. Finding warm, non-judgmental friends who share your taste in cinema, indie cafes, and beach walks makes all the difference. Our verified female companions are cultured, multilingual, and passionate about showing you the city’s heart and soul with complete safety and mutual respect.',
      localSlangTerms: [
        { term: 'Machi', meaning: 'Close pal / buddy', inContext: 'No awkward social ice to break; your companion feels like a longtime machi.' },
        { term: 'Bessie Beach', meaning: 'Besant Nagar Elliot’s Beach', inContext: 'Enjoy the cool sea breeze and roasted corn at Bessie Beach.' },
        { term: 'Filter Kaapi', meaning: 'Traditional South Indian coffee', inContext: 'Enjoy meaningful conversations over tumbler after tumbler of hot filter kaapi.' }
      ],
      popularHangouts: [
        { name: 'Elliot’s Beach (Besant Nagar)', area: 'Besant Nagar', vibe: 'Breezy, youthful, scenic', activity: 'Evening beach walks, seaside cafe snacks, and sunset chats.' },
        { name: 'Khader Nawaz Khan (KNK) Road', area: 'Nungambakkam', vibe: 'Chic, fashionable, gourmet', activity: 'Specialty cafe hopping, boutique browsing, and fine dining.' },
        { name: 'Anna Nagar Tower Park & 2nd Avenue', area: 'Anna Nagar', vibe: 'Green, upscale, energetic', activity: 'Park walks, dessert parlors, and food street exploration.' },
        { name: 'Phoenix Marketcity & Palladium', area: 'Velachery', vibe: 'Modern shopping & entertainment', activity: 'Cinema screenings, arcade games, and retail therapy.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Chennai',
      whyChoosePoints: [
        { title: 'Multilingual & Cultured Companions', desc: 'Companions fluent in English, Tamil, and Hindi who connect with your world effortlessly.' },
        { title: 'No Conservative Matchmaking Baggage', desc: 'Experience modern, open-minded platonic friendship without marriage biodata inquiries.' },
        { title: '100% Verified & Safe', desc: 'Full government ID screening and strict adherence to platonic standards.' },
        { title: 'Ideal Companion for Social Events', desc: 'Bring a poised, articulate companion to corporate dinners, music festivals, or family functions.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Chennai?', answer: 'It is an hourly, strictly platonic friendship and companion booking platform for social outings, dining, events, and city exploration in Chennai.' },
        { question: 'Where are meetups held in Chennai?', answer: 'Exclusively in public locations such as Besant Nagar Beach cafes, KNK Road diners, Phoenix Marketcity, or Anna Nagar eateries.' },
        { question: 'How much does it cost in Chennai?', answer: 'Rates vary by companion profile and are shown transparently inside the members portal, generally between ₹1,000 and ₹3,000 per hour.' },
        { question: 'Is it completely platonic and legal?', answer: 'Yes, 100% legal, non-sexual, and platonic. Strict safety rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Chennai | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Chennai. Perfect companion for beach walks, concerts, cafe hangouts, or event plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Chennai',
        'rent a boyfriend Chennai',
        'hire male companion Chennai',
        'platonic male friend Besant Nagar',
        'safe companion for women Chennai',
        'hire a friend Chennai'
      ],
      h1: 'Rent a Boyfriend in Chennai – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Chennai • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Protective Gentleman with Absolute Respect for Your Space',
      provocativeHook: 'Want an attentive, well-mannered guy to accompany you for an evening beach stroll at Besant Nagar, a music concert at the Music Academy, or an upscale dinner in Nungambakkam? Avoid the awkwardness of swiping apps and pushy suitors. Rent a verified, chivalrous platonic boyfriend in Chennai who ensures you feel comfortable, safe, and heard.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Chennai Rent a Boyfriend',
      localScenarioStory: 'Modern women working in Chennai’s IT corridors, banking centers, and creative industries often prefer clear, upfront social interactions without hidden agendas. Sometimes you want a charming companion to attend a cousin’s wedding to stave off nosy family questions, or someone dependable to accompany you to late movie screenings. Our male companions in Chennai are educated, polite, and strictly uphold personal boundaries.',
      localSlangTerms: [
        { term: 'Sema', meaning: 'Awesome / extraordinary', inContext: 'Have a sema time exploring Chennai’s cultural hotspots.' },
        { term: 'Thalaiva / Nanba', meaning: 'Leader / good friend', inContext: 'Find a companion who treats you like an esteemed friend.' },
        { term: 'Gethu', meaning: 'Class / dignity / pride', inContext: 'Step out with a companion who carries himself with gethu and dignity.' }
      ],
      popularHangouts: [
        { name: 'Mylapore Heritage Precinct & Kapaleeshwarar', area: 'Mylapore', vibe: 'Traditional, soulful, artistic', activity: 'Temple street walks, silk boutique viewing, and classical music conversations.' },
        { name: 'Chamiers Cafe & Anokhi', area: 'R.A. Puram', vibe: 'Vintage, chic, aesthetic', activity: 'Gourmet brunch, vintage book reading, and relaxed dialogue.' },
        { name: 'DakshinaChitra Heritage Museum', area: 'East Coast Road (ECR)', vibe: 'Cultural, artistic, breezy', activity: 'Artisan craft workshops, architecture walking, and coastal road drive.' },
        { name: 'Marina Beach Promenade', area: 'Triplicane', vibe: 'Historic, breezy, grand', activity: 'Watching waves, fresh sundal tasting, and evening coastal chats.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Chennai',
      whyChoosePoints: [
        { title: 'Chivalrous & Attentive', desc: 'Polite manners, punctual arrivals, and zero uncomfortable crossing of boundaries.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy evening seaside walks or cultural festivals with complete confidence and safety.' },
        { title: 'Intellectually Engaging', desc: 'Discuss South Indian history, modern cinema, music, careers, and global travel.' },
        { title: 'Zero awkward friction', desc: 'No expectations of marriage commitments or relationship interrogations.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Chennai?', answer: 'Yes, safety is strictly guaranteed. All male companions undergo government ID screening and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit ECR or beach cafes together?', answer: 'Yes, visiting recognized public cafes and attractions along ECR and Besant Nagar is fully permitted during daytime and evening hours.' },
        { question: 'How do I pay for my companion in Chennai?', answer: 'Payments are made securely via the Stranger Mingle membership portal.' },
        { question: 'Can I book a companion as my wedding plus-one in Chennai?', answer: 'Yes, male companions frequently act as polite, well-dressed plus-ones for social and family celebrations.' }
      ]
    }
  },

  kolkata: {
    cityKey: 'kolkata',
    cityName: 'Kolkata',
    state: 'West Bengal',
    tagline: 'City of Joy & Cultural Capital of India',
    girlfriend: {
      title: 'Rent a Girlfriend in Kolkata | Verified Platonic Companions for Park Street & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Kolkata. Enjoy coffee on Park Street, Princep Ghat walks, Southern Avenue cafes, or cultural adda. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Kolkata',
        'rent a girlfriend Kolkata',
        'hire female friend Kolkata',
        'platonic companion Park Street',
        'Princep Ghat companion Kolkata',
        'plus one for events Kolkata',
        'rent a friend Kolkata'
      ],
      h1: 'Rent a Girlfriend in Kolkata – Charming Platonic Companion for Park Street, Princep Ghat & Adda',
      heroBadge: 'Kolkata • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the City of Joy with an Intellectual, Warm Companion',
      provocativeHook: 'Kolkata is famous for heartfelt conversations, literature, and leisurely adda. But if your friends have migrated to Bangalore or Gurgaon, weekends in Salt Lake or New Town can feel empty. Skip superficial swiping apps. Rent a verified platonic girlfriend in Kolkata to share conversations over hot cha at Princep Ghat, explore heritage bakeries on Park Street, or attend art exhibitions at Academy of Fine Arts without emotional drama.',
      localScenarioHeading: 'Why IT Professionals & Academics in Kolkata Hire a Companion',
      localScenarioStory: 'Whether you are working in Sector V’s IT towers or pursuing creative careers in South Kolkata, you know that true connection in this city comes from deep discussions about cinema, music, food, and life. When you want to visit iconic cafes along Southern Avenue or explore South City Mall, going alone leaves a void. Our verified female companions are articulate, culturally attuned, and warm conversationalists who celebrate Kolkata’s soul with you.',
      localSlangTerms: [
        { term: 'Adda', meaning: 'Long, soulful informal conversation', inContext: 'Enjoy an authentic Bengali adda without awkward judgment.' },
        { term: 'Dada / Bondhu', meaning: 'Brother / friend', inContext: 'Bond like lifelong bondhus over music and coffee.' },
        { term: 'Khub Bhalo', meaning: 'Very good / wonderful', inContext: 'Make your weekend experience truly khub bhalo.' }
      ],
      popularHangouts: [
        { name: 'Park Street Heritage Cafes & Flurys', area: 'Park Street', vibe: 'Vintage, bustling, iconic', activity: 'Breakfast pastries, heritage tea, and nostalgic street walks.' },
        { name: 'Princep Ghat & Riverfront', area: 'Strand Road', vibe: 'Romantic, breezy, historic', activity: 'Ganges riverfront strolls, boat views, and evening chai adda.' },
        { name: 'Southern Avenue & Lake Cafes', area: 'South Kolkata', vibe: 'Leafy, artistic, cosy', activity: 'Specialty coffee, indie music, and relaxed literary conversations.' },
        { name: 'Eco Park & Coffee House New Town', area: 'New Town', vibe: 'Sprawling, green, modern', activity: 'Lakeside walks, bicycle rides, and open-air discussions.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Kolkata',
      whyChoosePoints: [
        { title: 'Intellectual & Cultured Dialogue', desc: 'Talk about literature, music, cinema, science, or politics with someone truly engaging.' },
        { title: 'Zero swiping app Burnout', desc: 'No ghosting, no games. Upfront, transparent companionship.' },
        { title: 'Safe & ID Verified', desc: 'Every companion is vetted with government ID and bound by a strict platonic code.' },
        { title: 'The Perfect Cultural Plus-One', desc: 'Attend music concerts, book fairs, or family functions with an articulate, elegant companion.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Kolkata?', answer: 'It is a strictly platonic, hourly companionship service where you can book verified female companions for cafes, public events, sightseeing, and dining in Kolkata.' },
        { question: 'Where can we meet in Kolkata?', answer: 'Meetups happen exclusively in public venues like Park Street cafes, Princep Ghat, South City Mall, or Eco Park.' },
        { question: 'How much does it cost in Kolkata?', answer: 'Rates vary by companion profile and typically range between ₹1,000 and ₹2,800 per hour.' },
        { question: 'Is it completely safe and non-sexual?', answer: 'Yes! We enforce a 100% platonic, non-intimate code of conduct. Safety and mutual respect are strictly maintained.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Kolkata | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Kolkata. Perfect companion for Princep Ghat walks, cafe adda, live gigs, or social plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Kolkata',
        'rent a boyfriend Kolkata',
        'hire male companion Kolkata',
        'platonic male friend Park Street',
        'safe companion for women Kolkata',
        'hire a friend Kolkata'
      ],
      h1: 'Rent a Boyfriend in Kolkata – Polite, Cultured & Verified Male Companion for Outings & Adda',
      heroBadge: 'Kolkata • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Intellectual Gentleman with True Bhodrolok Etiquette',
      provocativeHook: 'Looking for a cultured, charming guy to accompany you to an evening gig at Someplace Else, explore art galleries in South Kolkata, or act as an impressive plus-one for a cousin’s wedding? Skip pushy suitors and awkward unsolicited profiles. Rent a polite, well-mannered, and verified platonic boyfriend in Kolkata who treats you with classic bhodrolok respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Kolkata Rent a Boyfriend',
      localScenarioStory: 'Modern women in Kolkata value intellect, wit, and respectful boundaries. When attending crowded cultural festivals, Kolkata Book Fair, or late evening dinners, having a dependable, articulate male companion provides both security and engaging dialogue. Our male companions are educated, well-spoken, and bring positive, cheerful energy to every outing without any relationship baggage.',
      localSlangTerms: [
        { term: 'Bhodrolok', meaning: 'Cultured and polite gentleman', inContext: 'Experience true bhodrolok manners and respectful conversation.' },
        { term: 'Phuchka', meaning: 'Iconic spicy Kolkata street snack', inContext: 'Share plate after plate of spicy phuchkas near Vivekananda Park.' },
        { term: 'Shanti', meaning: 'Peace of mind', inContext: 'Enjoy total shanti without uncomfortable awkward mind games.' }
      ],
      popularHangouts: [
        { name: 'Nandan Cultural Complex & Academy of Fine Arts', area: 'Rabindra Sadan', vibe: 'Artistic, cinematic, heritage', activity: 'Film screenings, open-air cultural adda, and tea.' },
        { name: 'Someplace Else (The Park)', area: 'Park Street', vibe: 'Legendary, rock, live music', activity: 'Live indie band performances, mocktails, and rock music chats.' },
        { name: 'Rabindra Sarobar (Dhakuria Lake)', area: 'Southern Avenue', vibe: 'Green, peaceful, breezy', activity: 'Morning lakeside walks, rowing views, and serene chats.' },
        { name: 'Quest Mall & Ballygunge Diners', area: 'Ballygunge', vibe: 'Luxury shopping & dining', activity: 'Fine dining plus-one companionship, cinema, and retail browsing.' }
      ],
      idealOutingsHeading: 'Top Safe Experiences with a Rented Boyfriend in Kolkata',
      whyChoosePoints: [
        { title: 'Cultured & Courteous Behavior', desc: 'No intrusive personal questions. Respectful, well-mannered, and attentive.' },
        { title: 'Intellectually Stimulating Dialogue', desc: 'Discuss books, cinema, social trends, music, or corporate career plans.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Kolkata’s vibrant evening cultural scene with complete confidence.' },
        { title: 'Zero awkward clinginess', desc: 'Enjoy great company on an hourly basis with zero strings attached.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Kolkata?', answer: 'Yes! Every companion is ID-verified and background-checked. Meetups are strictly platonic and confined to public spaces.' },
        { question: 'Can we visit cultural festivals together?', answer: 'Yes! Attending Kolkata Book Fair, cinema festivals, and art exhibitions with a companion is highly recommended.' },
        { question: 'How is payment processed in Kolkata?', answer: 'Securely online via the Stranger Mingle platform.' },
        { question: 'Can I book a companion for family functions?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for social celebrations.' }
      ]
    }
  },

  ahmedabad: {
    cityKey: 'ahmedabad',
    cityName: 'Ahmedabad',
    state: 'Gujarat',
    tagline: 'Manchester of the East & Heritage City',
    girlfriend: {
      title: 'Rent a Girlfriend in Ahmedabad | Verified Platonic Companions for Riverfront & SBR Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Ahmedabad. Explore Sindhu Bhavan Road cafes, Sabarmati Riverfront walks, or evening hangouts. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Ahmedabad',
        'rent a girlfriend Ahmedabad',
        'hire female friend Ahmedabad',
        'platonic companion Sindhu Bhavan Road',
        'Sabarmati riverfront companion',
        'plus one for events Ahmedabad',
        'rent a friend Ahmedabad'
      ],
      h1: 'Rent a Girlfriend in Ahmedabad – Charming Platonic Companion for Sindhu Bhavan Road & Riverfront',
      heroBadge: 'Ahmedabad • Safe & 100% Platonic Companionship',
      heroTagline: 'Explore Amdavad’s Food, Culture & Nightlife with a Vibrant Companion',
      provocativeHook: 'Tired of driving solo down Sindhu Bhavan Road or spending Saturday evening scrolling your phone at home? Avoid conservative matchmaking apps with invasive questions. Rent a verified platonic girlfriend in Ahmedabad to explore modern cafes on SBR, enjoy an evening breeze walk on the Sabarmati Riverfront, or check out street food at Manek Chowk without relationship baggage.',
      localScenarioHeading: 'Why Young Entrepreneurs & Professionals in Ahmedabad Hire a Companion',
      localScenarioStory: 'Ahmedabad is full of thriving entrepreneurs, finance executives, and design students from NID and CEPT. But between business hustles and family obligations, making spontaneous, fun friends can be difficult. Having a friendly, cultured companion means you can check out new rooftop cafes, attend design popups, or have lively discussions over tea without awkward marriage discussions from relatives.',
      localSlangTerms: [
        { term: 'Majama', meaning: 'Doing great / fine in Gujarati', inContext: 'Everything is majama when your weekend plan is sorted with a fun companion.' },
        { term: 'Bhai / Ben', meaning: 'Brother / Sister (friendly address)', inContext: 'Experience warm, respectful Gujarati hospitality.' },
        { term: 'Chalo', meaning: 'Let’s go / come on', inContext: 'Chalo, let’s explore the best artisan cafes on Sindhu Bhavan Road.' }
      ],
      popularHangouts: [
        { name: 'Sindhu Bhavan Road (SBR) Cafes', area: 'Bodakdev', vibe: 'Trendy, bustling, upscale', activity: 'Gourmet dining, specialty coffee, and evening car-side chats.' },
        { name: 'Sabarmati Riverfront Promenade', area: 'Ashram Road', vibe: 'Breezy, modern, open-air', activity: 'Sunset cycling, walking, and enjoying river views.' },
        { name: 'Vastrapur Lake & Alpha One Mall', area: 'Vastrapur', vibe: 'Youthful, lively, entertaining', activity: 'Shopping, cinema outings, and evening lake park strolls.' },
        { name: 'Law Garden & Night Market', area: 'Ellisbridge', vibe: 'Colorful, traditional, foodie', activity: 'Traditional handicraft browsing and street food snacking.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Ahmedabad',
      whyChoosePoints: [
        { title: 'Cultured & Ambitious Companions', desc: 'Connect with educated, modern companions who understand business, design, and culture.' },
        { title: 'Zero Conservative Pressure', desc: 'No intrusive biodatas or family expectations. Pure, respectful friendship.' },
        { title: '100% Verified Profiles', desc: 'Government ID verification ensures your peace of mind and safety.' },
        { title: 'The Ideal Plus-One', desc: 'Impress friends or colleagues by bringing an articulate, poised companion to social dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Ahmedabad?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Ahmedabad.' },
        { question: 'Where can we meet in Ahmedabad?', answer: 'All meetups must be held in public places like Sindhu Bhavan Road cafes, Sabarmati Riverfront, or major shopping malls.' },
        { question: 'How much does it cost in Ahmedabad?', answer: 'Hourly rates generally range between ₹1,000 and ₹3,000 per hour, displayed transparently on companion profiles.' },
        { question: 'Is it completely platonic and legal?', answer: 'Yes, 100% legal, non-sexual, and platonic. Strict safety rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Ahmedabad | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Ahmedabad. Perfect companion for riverfront walks, SBR cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Ahmedabad',
        'rent a boyfriend Ahmedabad',
        'hire male companion Ahmedabad',
        'platonic male friend Sindhu Bhavan',
        'safe companion for women Ahmedabad',
        'hire a friend Ahmedabad'
      ],
      h1: 'Rent a Boyfriend in Ahmedabad – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Ahmedabad • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Cafes, Events & Evening Strolls',
      provocativeHook: 'Looking for a polite, well-dressed guy to accompany you to an art exhibition at Kanoria Centre, a movie at Palladium Mall, or an evening stroll along the Sabarmati Riverfront? Skip unsolicited swiping app advances. Rent a verified, cultured platonic boyfriend in Ahmedabad who respects your boundaries and makes every conversation enjoyable.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Ahmedabad Rent a Boyfriend',
      localScenarioStory: 'Modern Gujarati women leading businesses, design ventures, and corporate careers often prefer safe, uncomplicated friendships without marital pressure. Whether you need a confident plus-one for a family sangeet to keep nosy aunties at bay, or an active partner to explore SBR’s late-night cafes, our male companions offer chivalrous, polite, and respectful company.',
      localSlangTerms: [
        { term: 'Jalsa', meaning: 'Fun, enjoyment, celebration', inContext: 'Pure jalsa without any stress or awkward awkward relationship pressure.' },
        { term: 'Aavjo', meaning: 'Come again / goodbye with warmth', inContext: 'End every meetup with genuine warmth and mutual respect.' },
        { term: 'Pakka Amdavadi', meaning: 'True Ahmedabad native', inContext: 'Explore the best spots with someone who knows the city inside out.' }
      ],
      popularHangouts: [
        { name: 'Palladium Mall & Sarkhej Gandhinagar Highway', area: 'Thaltej', vibe: 'Luxury, modern, vibrant', activity: 'Boutique shopping, luxury dining, and movie outings.' },
        { name: 'Kanoria Centre for Arts & CEPT Campus', area: 'University Road', vibe: 'Architectural, bohemian, creative', activity: 'Art shows, creative conversations, and open-air cafe tea.' },
        { name: 'Sabarmati Riverfront Walkway', area: 'Riverfront West', vibe: 'Breezy, open-air, scenic', activity: 'Evening walks, boat rides, and relaxed conversation.' },
        { name: 'Urban Chowk', area: 'Sardar Patel Ring Road', vibe: 'Open-air food court, lively', activity: 'Live music, diverse food stalls, and casual dinner.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Ahmedabad',
      whyChoosePoints: [
        { title: 'Chivalry & Good Manners', desc: 'Punctual, polite, respectful, and attentive to your personal comfort.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Ahmedabad’s famously safe nightlife and open-air food courts with a trusted companion.' },
        { title: 'Intellectually Engaging', desc: 'Discuss business ideas, design trends, cinema, and travel with ease.' },
        { title: 'Zero awkward relationship expectations', desc: 'Clean hourly bookings with no post-meetup demands or emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Ahmedabad?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit open-air night markets together in Ahmedabad?', answer: 'Yes! Outings to well-lit public food courts like Urban Chowk or SBR cafes are fully permitted.' },
        { question: 'How is payment handled in Ahmedabad?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Ahmedabad?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for family and corporate events.' }
      ]
    }
  },

  jaipur: {
    cityKey: 'jaipur',
    cityName: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City & Royal Heritage Hub',
    girlfriend: {
      title: 'Rent a Girlfriend in Jaipur | Verified Platonic Companions for C-Scheme Cafes & Heritage Outings',
      metaDescription: 'Hire a verified platonic girlfriend in Jaipur. Enjoy C-Scheme cafe hopping, Nahargarh sunset views, WTP shopping, or cultural events. Safe, polite & verified.',
      keywords: [
        'rent a girlfriend in Jaipur',
        'rent a girlfriend Jaipur',
        'hire female friend Jaipur',
        'platonic companion C Scheme',
        'Nahargarh companion Jaipur',
        'plus one for events Jaipur',
        'rent a friend Jaipur'
      ],
      h1: 'Rent a Girlfriend in Jaipur – Charming Platonic Companion for C-Scheme, WTP & Heritage Outings',
      heroBadge: 'Jaipur • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience Royal Pink City Charm with a Modern, Cultured Companion',
      provocativeHook: 'Exploring Jaipur alone can feel like visiting a museum with nobody to share the wonder. Tired of awkward matchmaking profiles or flaky weekend plans? Rent a verified platonic girlfriend in Jaipur to check out aesthetic rooftop cafes in C-Scheme, watch the golden sunset from Nahargarh, or explore artisan markets without emotional drama.',
      localScenarioHeading: 'Why Young Professionals & Tourists in Jaipur Hire a Companion',
      localScenarioStory: 'Jaipur blends regal history with a fast-growing tech and creative startup scene. Young professionals who move here often find social life centered around traditional family circles. Having a charming, well-spoken companion makes visiting lively places like Jawahar Kala Kendra or dining at rooftop restaurants a memorable, heartwarming experience with zero relationship baggage.',
      localSlangTerms: [
        { term: 'Khamma Ghani', meaning: 'Royal Rajasthani greeting of respect', inContext: 'Experience authentic Rajasthani hospitality and warmth.' },
        { term: 'Padharo', meaning: 'Welcome', inContext: 'Step into the Pink City with a welcoming, friendly companion.' },
        { term: 'Chai & Pyaaz Kachori', meaning: 'Iconic spicy Jaipur snack', inContext: 'Bond over crispy pyaaz kachoris and masala chai.' }
      ],
      popularHangouts: [
        { name: 'C-Scheme Rooftop & Garden Cafes', area: 'C-Scheme', vibe: 'Aesthetic, lush, youthful', activity: 'Artisan coffee, wood-fired pizza, and book conversations.' },
        { name: 'Jawahar Kala Kendra (JKK)', area: 'Jhalana Doongri', vibe: 'Artistic, cultural, theatrical', activity: 'Art gallery visits, theater plays, and open-air Indian coffee house talks.' },
        { name: 'World Trade Park (WTP)', area: 'Malviya Nagar', vibe: 'Futuristic, modern shopping', activity: 'Shopping assistance, cinema screenings, and international food court.' },
        { name: 'Nahargarh Fort & Padao Overlook', area: 'Aravalli Hills', vibe: 'Breathtaking, scenic, historic', activity: 'Sunset panoramic views of the Pink City and evening breeze.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Jaipur',
      whyChoosePoints: [
        { title: 'Cultured & Creative Companions', desc: 'Companions who appreciate art, heritage, fashion, and modern ideas.' },
        { title: 'Zero Awkward Social Pressure', desc: 'Clear, upfront hourly friendship without relationship expectations.' },
        { title: '100% Verified & Safe', desc: 'Government ID verification ensures your peace of mind and safety.' },
        { title: 'The Perfect Social Plus-One', desc: 'Attend royal wedding receptions or high-end dinners with a poised companion.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Jaipur?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Jaipur.' },
        { question: 'Where can we meet in Jaipur?', answer: 'All meetups must be held in public places like C-Scheme cafes, WTP Mall, or Jawahar Kala Kendra.' },
        { question: 'How much does it cost in Jaipur?', answer: 'Hourly rates generally range between ₹1,000 and ₹3,000 per hour.' },
        { question: 'Is it completely platonic and legal?', answer: 'Yes, 100% legal, non-sexual, and platonic. Strict safety rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Jaipur | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Jaipur. Perfect companion for heritage walks, C-Scheme cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Jaipur',
        'rent a boyfriend Jaipur',
        'hire male companion Jaipur',
        'platonic male friend C Scheme',
        'safe companion for women Jaipur',
        'hire a friend Jaipur'
      ],
      h1: 'Rent a Boyfriend in Jaipur – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Jaipur • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Cafes, Heritage Walks & Events',
      provocativeHook: 'Want a respectful, dashing guy to accompany you to a musical night at Albert Hall, a film screening at Raj Mandir, or a fun afternoon of shopping in Bapu Bazaar? Avoid creepy swiping app matches. Rent a polite, verified platonic boyfriend in Jaipur who values your safety, intellect, and comfort.',
      localScenarioHeading: 'Why Modern Women & Creative Professionals in Jaipur Rent a Boyfriend',
      localScenarioStory: 'Modern women living or studying in Jaipur often want the freedom to explore scenic heritage spots and evening cafes without dealing with unwanted attention. Whether you need a polished plus-one for a destination wedding at a palace hotel or a patient companion to explore blue pottery studios, our male companions offer respectful, cultured, and delightful company.',
      localSlangTerms: [
        { term: 'Hukum', meaning: 'Respected term of honor in Rajasthan', inContext: 'Treated with the utmost dignity and respect throughout your booking.' },
        { term: 'Ghani Khamma', meaning: 'Many greetings', inContext: 'Warm and cordial conversations from the moment you meet.' },
        { term: 'Pink City Vibe', meaning: 'Royal, relaxed and cultured spirit', inContext: 'Experience the real Pink City vibe with a thoughtful companion.' }
      ],
      popularHangouts: [
        { name: 'C-Scheme Boutique Diners', area: 'C-Scheme', vibe: 'Cosy, artistic, vibrant', activity: 'Gourmet brunch, dessert tasting, and heartfelt conversations.' },
        { name: 'Albert Hall Museum Garden Precinct', area: 'Ram Niwas Garden', vibe: 'Historic, pigeons, illuminated', activity: 'Evening illumination photography, museum talks, and street strolls.' },
        { name: 'Raj Mandir Cinema', area: 'Bhagwan Das Road', vibe: 'Opulent, grand, cinematic', activity: 'Catching a Bollywood blockbuster in royal art-deco comfort.' },
        { name: 'Jawahar Circle Garden & Musical Fountain', area: 'Malviya Nagar', vibe: 'Sprawling, green, illuminated', activity: 'Evening walking, fountain show, and street snack sampling.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Jaipur',
      whyChoosePoints: [
        { title: 'Chivalry & Good Manners', desc: 'Punctual, polite, respectful, and attentive to your personal comfort.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Jaipur’s illuminated monuments and cafes with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss architecture, heritage, cinema, fashion, and business ideas.' },
        { title: 'Zero awkward relationship expectations', desc: 'Clean hourly bookings with no post-meetup demands or emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Jaipur?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit heritage forts together in Jaipur?', answer: 'Yes! Daytime visits to public monuments like Amer, Nahargarh, and Albert Hall are fully permitted.' },
        { question: 'How is payment handled in Jaipur?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Jaipur?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for royal weddings and dinners.' }
      ]
    }
  },

  lucknow: {
    cityKey: 'lucknow',
    cityName: 'Lucknow',
    state: 'Uttar Pradesh',
    tagline: 'City of Nawabs & Architectural Splendor',
    girlfriend: {
      title: 'Rent a Girlfriend in Lucknow | Verified Platonic Companions for Hazratganj & Gomti Nagar',
      metaDescription: 'Hire a verified platonic girlfriend in Lucknow. Enjoy Ganjing in Hazratganj, riverside walks in Gomti Nagar, food walks, or social events. Safe & verified.',
      keywords: [
        'rent a girlfriend in Lucknow',
        'rent a girlfriend Lucknow',
        'hire female friend Lucknow',
        'platonic companion Hazratganj',
        'Gomti Nagar companion Lucknow',
        'plus one for events Lucknow',
        'rent a friend Lucknow'
      ],
      h1: 'Rent a Girlfriend in Lucknow – Charming Platonic Companion for Hazratganj, Gomti Nagar & Events',
      heroBadge: 'Lucknow • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the City of Tehzeeb with an Articulate, Polite Companion',
      provocativeHook: 'Tired of spending weekends alone in your apartment or dealing with pushy unsolicited profiles? Rent a verified platonic girlfriend in Lucknow to enjoy the timeless tradition of Ganjing in Hazratganj, walk along the Gomti Riverfront, sample royal kebabs in Chowk, or visit modern rooftop cafes in Summit Building without any awkward strings attached.',
      localScenarioHeading: 'Why Young Professionals & Officers in Lucknow Hire a Companion',
      localScenarioStory: 'Lucknow is rapidly expanding with IT companies, medical institutes, and civil services hubs. But making modern, open-minded friends who appreciate both Nawabi culture and contemporary conversations can be challenging. Our verified female companions bring natural warmth, polite tehzeeb, and witty humor, making your outings fun and stress-free.',
      localSlangTerms: [
        { term: 'Tehzeeb', meaning: 'Elegance, manners, and etiquette', inContext: 'Experience timeless Lucknowi tehzeeb and polite conversation.' },
        { term: 'Ganjing', meaning: 'Leisurely evening stroll in Hazratganj', inContext: 'Enjoy classic Ganjing followed by basket chaat and coffee.' },
        { term: 'Muskuraiye', meaning: 'Smile! You are in Lucknow', inContext: 'Muskuraiye, because your weekend plans are finally sorted!' }
      ],
      popularHangouts: [
        { name: 'Hazratganj Heritage Market & Royal Cafe', area: 'Hazratganj', vibe: 'Colonial, bustling, nostalgic', activity: 'Ganjing strolls, basket chaat, and bookshop browsing.' },
        { name: 'Gomti Riverfront Park', area: 'Gomti Nagar', vibe: 'Breezy, open-air, modern', activity: 'Evening riverfront walks, musical fountain, and conversations.' },
        { name: 'Summit Building Rooftops & Cafes', area: 'Vibhuti Khand, Gomti Nagar', vibe: 'Chic, modern, lively', activity: 'Fine dining plus-one accompaniment and skyline views.' },
        { name: 'Chatori Gali (1090)', area: 'Gomti Nagar', vibe: 'Energetic, foodie, youthful', activity: 'Street food crawl, kulhad chai, and evening vibes.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Lucknow',
      whyChoosePoints: [
        { title: 'Elegance & Polite Etiquette', desc: 'Companions who carry themselves with natural grace and conversational charm.' },
        { title: 'Zero Matchmaking Baggage', desc: 'Enjoy friendly company without nosy questions about marriage or family.' },
        { title: '100% Verified Profiles', desc: 'Government ID verification ensures your peace of mind and safety.' },
        { title: 'The Perfect Social Plus-One', desc: 'Bring an articulate companion to family weddings or office celebrations.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Lucknow?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Lucknow.' },
        { question: 'Where can we meet in Lucknow?', answer: 'All meetups must be held in public places like Hazratganj, Gomti Nagar cafes, or Phoenix Palassio.' },
        { question: 'How much does it cost in Lucknow?', answer: 'Hourly rates generally range between ₹1,000 and ₹2,500 per hour.' },
        { question: 'Is it completely platonic and legal?', answer: 'Yes, 100% legal, non-sexual, and platonic. Strict safety rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Lucknow | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Lucknow. Perfect companion for Hazratganj walks, Gomti Nagar cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: [
        'rent a boyfriend in Lucknow',
        'rent a boyfriend Lucknow',
        'hire male companion Lucknow',
        'platonic male friend Hazratganj',
        'safe companion for women Lucknow',
        'hire a friend Lucknow'
      ],
      h1: 'Rent a Boyfriend in Lucknow – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Lucknow • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman with Classic Tehzeeb and Modern Intellect',
      provocativeHook: 'Want a polite, well-spoken guy to accompany you to a movie at Phoenix Palassio, an evening cafe hangout in Gomti Nagar, or an upscale wedding reception in Hazratganj? Avoid awkward swiping app encounters. Rent a polite, verified platonic boyfriend in Lucknow who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Lucknow Rent a Boyfriend',
      localScenarioStory: 'Modern women in Lucknow balancing careers and personal aspirations often prefer safe, uncomplicated friendships without marital pressure. Whether you need a confident plus-one for a family wedding to keep nosy aunties at bay, or an active partner to explore Gomti Nagar’s late-night cafes, our male companions offer chivalrous, polite, and respectful company.',
      localSlangTerms: [
        { term: 'Pehle Aap', meaning: 'After you (hallmark of Lucknowi politeness)', inContext: 'Experience genuine chivalry and courtesy at every step.' },
        { term: 'Nawab', meaning: 'Aristocratic charm', inContext: 'Step out with a companion who embodies polite, modern Nawabi charm.' },
        { term: 'Kulhad Chai', meaning: 'Clay-cup spiced tea', inContext: 'Bond over steaming kulhad chai near Marine Drive Gomti Nagar.' }
      ],
      popularHangouts: [
        { name: 'Phoenix Palassio', area: 'Amar Shaheed Path', vibe: 'Luxurious, grand, European', activity: 'Boutique shopping, luxury dining, and cinema outings.' },
        { name: 'Ambedkar Memorial Park', area: 'Vipul Khand, Gomti Nagar', vibe: 'Monumental, architectural, serene', activity: 'Evening photography, quiet strolls, and deep conversations.' },
        { name: 'Capoor & Sons / Vintage Hazratganj Cafes', area: 'Hazratganj', vibe: 'Vintage, cosy, nostalgic', activity: 'Tea, pastries, and intellectual conversations.' },
        { name: 'Janeshwar Mishra Park', area: 'Gomti Nagar', vibe: 'Asia’s largest park, green, breezy', activity: 'Lake cycling, golf cart tours, and peaceful open-air discussions.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Lucknow',
      whyChoosePoints: [
        { title: 'Chivalry & Good Manners', desc: 'Punctual, polite, respectful, and attentive to your personal comfort.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Lucknow’s illuminated monuments and riverfront parks with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss architecture, heritage, cinema, fashion, and business ideas.' },
        { title: 'Zero awkward relationship expectations', desc: 'Clean hourly bookings with no post-meetup demands or emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Lucknow?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit parks and monuments together in Lucknow?', answer: 'Yes! Daytime visits to public parks and heritage monuments are fully permitted.' },
        { question: 'How is payment handled in Lucknow?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Lucknow?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  // 12 more cities configured cleanly with complete unique data
  indore: {
    cityKey: 'indore',
    cityName: 'Indore',
    state: 'Madhya Pradesh',
    tagline: 'Cleanest City of India & Food Capital',
    girlfriend: {
      title: 'Rent a Girlfriend in Indore | Verified Platonic Companions for Chappan Dukan & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Indore. Enjoy food walks at Chappan Dukan, Sarafa night market, Vijay Nagar cafes, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Indore', 'rent a girlfriend Indore', 'hire female friend Indore', 'platonic companion Chappan Dukan', 'Vijay Nagar companion Indore'],
      h1: 'Rent a Girlfriend in Indore – Charming Platonic Companion for Chappan Dukan & Vijay Nagar Cafes',
      heroBadge: 'Indore • Safe & 100% Platonic Companionship',
      heroTagline: 'Explore India’s Cleanest City and Best Street Food with a Lively Companion',
      provocativeHook: 'Tired of exploring Sarafa Bazaar alone or having weekend coffee solo at Vijay Nagar? Skip awkward matrimonial setups and swiping app fatigue. Rent a verified platonic girlfriend in Indore for mouthwatering street food walks, cafe hangouts, and memorable conversations without awkward relationship pressure.',
      localScenarioHeading: 'Why Young IT & Business Professionals in Indore Hire a Companion',
      localScenarioStory: 'Indore is buzzing with Super Corridor IT hubs, IIM/IIT talent, and vibrant entrepreneurial families. But busy schedules leave little time to build spontaneous friendships. Our companions are smart, energetic locals who love sharing Indore’s unmatched food culture and vibrant nightlife in a safe, platonic setting.',
      localSlangTerms: [
        { term: 'Bhiya', meaning: 'Brother or pal in Indori', inContext: 'Friendly and warm interactions from minute one, bhiya!' },
        { term: 'Poha-Jalebi', meaning: 'The quintessential Indore breakfast', inContext: 'Start your weekend with hot Sev Parmal and Jalebi.' },
        { term: 'Arey Yaar', meaning: 'Expressive exclamation', inContext: 'Laugh freely and share genuine stories.' }
      ],
      popularHangouts: [
        { name: 'Chappan Dukan', area: 'New Palasia', vibe: 'Lively, foodie, clean', activity: 'Tasting Johnny Hot Dog, shakes, and street chats.' },
        { name: 'Sarafa Bazaar Night Food Market', area: 'Rajwada', vibe: 'Nocturnal, bustling, golden', activity: 'Midnight gold market food tour and Bhutte Ka Kees.' },
        { name: 'Vijay Nagar & Scheme 54 Cafes', area: 'Vijay Nagar', vibe: 'Modern, youthful, vibrant', activity: 'coffee meetups, boutique bakeries, and conversations.' },
        { name: 'Regional Park (Pipliyapala)', area: 'Kesarbagh Road', vibe: 'Lakeside, lush, tranquil', activity: 'Lake strolls, musical fountain, and photography.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Indore',
      whyChoosePoints: [
        { title: 'Foodie Enthusiasts', desc: 'Companions who truly appreciate Indore’s legendary culinary scene.' },
        { title: 'Zero awkward relationship pressure', desc: 'Clean hourly friendship with no marriage or relationship baggage.' },
        { title: 'ID Verified & Safe', desc: 'Strict public-venue policy and government ID verification.' },
        { title: 'Perfect Plus-One', desc: 'Great companion for weddings, office parties, and social mixers.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Indore?', answer: 'It is a strictly platonic, hourly companionship service for food walks, cafe visits, and social outings in Indore.' },
        { question: 'Where do meetups happen in Indore?', answer: 'In public areas like Chappan Dukan, Vijay Nagar cafes, or Treasure Island Mall.' },
        { question: 'How much does it cost in Indore?', answer: 'Hourly rates generally range between ₹1,000 and ₹2,500.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Indore | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Indore. Perfect companion for food tours, Vijay Nagar cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Indore', 'rent a boyfriend Indore', 'hire male companion Indore', 'platonic male friend Vijay Nagar', 'safe companion for women Indore'],
      h1: 'Rent a Boyfriend in Indore – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Indore • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Food Walks, Cafes & Social Outings',
      provocativeHook: 'Looking for a polite, smart guy to accompany you to midnight street food at Sarafa Bazaar, a movie at Phoenix Citadel, or an upscale family reception? Avoid pushy suitors. Rent a verified platonic boyfriend in Indore who respects your personal space and brings cheerful energy.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Indore Rent a Boyfriend',
      localScenarioStory: 'Modern women in Indore leading independent careers and academic lives often want a dependable male companion for late-night food hopping or social events without awkward mind games. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Bhiya Re', meaning: 'Affectionate Indori address', inContext: 'Warm and respectful conversations throughout your booking.' },
        { term: 'Zabardast', meaning: 'Fantastic', inContext: 'Have a zabardast time exploring the cleanest city in India.' },
        { term: 'Sev', meaning: 'Iconic crispy gram flour noodles', inContext: 'Bond over food garnished with iconic Ratlami sev.' }
      ],
      popularHangouts: [
        { name: 'Phoenix Citadel Mall', area: 'MR 10 Road', vibe: 'Grand, modern, upscale', activity: 'Shopping, movie outings, and fine dining.' },
        { name: 'Chappan Dukan', area: 'New Palasia', vibe: 'Energetic, clean food hub', activity: 'Evening chaat, coffee, and casual chats.' },
        { name: 'Sarafa Night Market', area: 'Rajwada', vibe: 'Late-night, vibrant, sweet', activity: 'Midnight street treats and safe night walking.' },
        { name: 'Gulawat Lotus Valley', area: 'Hatod', vibe: 'Natural, serene, green', activity: 'Daytime nature walk, bamboo bridge, and photography.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Indore',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Night Food Outings', desc: 'Enjoy midnight Sarafa visits with a trusted companion.' },
        { title: 'Intellectually Engaging', desc: 'Discuss business, books, cinema, and career ambitions.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Indore?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit food markets late at night in Indore?', answer: 'Yes, visiting bustling, well-lit public night markets like Sarafa is fully permitted.' },
        { question: 'How is payment processed in Indore?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Indore?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  bhopal: {
    cityKey: 'bhopal',
    cityName: 'Bhopal',
    state: 'Madhya Pradesh',
    tagline: 'City of Lakes & Green Vistas',
    girlfriend: {
      title: 'Rent a Girlfriend in Bhopal | Verified Platonic Companions for Upper Lake & VIP Road',
      metaDescription: 'Hire a verified platonic girlfriend in Bhopal. Enjoy sunset walks at VIP Road Upper Lake, Shahpura cafes, DB Mall, or cultural visits. Safe & verified.',
      keywords: ['rent a girlfriend in Bhopal', 'rent a girlfriend Bhopal', 'hire female friend Bhopal', 'platonic companion Upper Lake', 'VIP road companion Bhopal'],
      h1: 'Rent a Girlfriend in Bhopal – Charming Platonic Companion for Upper Lake & VIP Road Cafes',
      heroBadge: 'Bhopal • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience Bhopal’s Lakes and Serenity with a Witty, Cultured Companion',
      provocativeHook: 'Tired of quiet weekends gazing at Upper Lake alone? Rent a verified platonic girlfriend in Bhopal to stroll down VIP Road, grab coffee at Shahpura lakefront cafes, explore Bharat Bhavan art exhibits, or attend events without awkward awkward mind games.',
      localScenarioHeading: 'Why Young Professionals & Students in Bhopal Hire a Companion',
      localScenarioStory: 'Bhopal is a calm, scenic city with prestigious institutes like AIIMS, IISER, and MANIT. When academic and work pressure peaks, having an empathetic, intelligent companion to share chai by the lake or discuss cinema makes life refreshing.',
      localSlangTerms: [
        { term: 'Bhopali Andaaz', meaning: 'Relaxed, polite, and witty local charm', inContext: 'Enjoy genuine Bhopali andaaz and relaxed conversations.' },
        { term: 'Bada Talab', meaning: 'Upper Lake (Bhojtal)', inContext: 'Catch the cool lake breeze at Bada Talab.' },
        { term: 'Miyan', meaning: 'Friendly conversational term in Bhopal', inContext: 'Warm, candid, and friendly banter.' }
      ],
      popularHangouts: [
        { name: 'VIP Road & Bada Talab Overlook', area: 'VIP Road', vibe: 'Scenic, breezy, tranquil', activity: 'Sunset breeze, boating views, and chai.' },
        { name: 'Shahpura Lake Cafes', area: 'Shahpura', vibe: 'Youthful, green, relaxed', activity: 'coffee meetups, bakery desserts, and lake walks.' },
        { name: 'Bharat Bhavan Arts Complex', area: 'Shamla Hills', vibe: 'Artistic, cultural, literary', activity: 'Poetry, art exhibitions, and tribal heritage.' },
        { name: 'DB City Mall', area: 'MP Nagar', vibe: 'Modern shopping & cinema', activity: 'Movies, arcade games, and international dining.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Bhopal',
      whyChoosePoints: [
        { title: 'Intellectual & Artistic', desc: 'Companions who appreciate arts, literature, and nature.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of romantic strings or family biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Bhopal?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Bhopal.' },
        { question: 'Where can we meet in Bhopal?', answer: 'In public areas like VIP Road, Shahpura lakefront cafes, or DB Mall.' },
        { question: 'How much does it cost in Bhopal?', answer: 'Hourly rates generally range between ₹900 and ₹2,200.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Bhopal | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Bhopal. Perfect companion for lake walks, VIP Road cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Bhopal', 'rent a boyfriend Bhopal', 'hire male companion Bhopal', 'platonic male friend Upper Lake', 'safe companion for women Bhopal'],
      h1: 'Rent a Boyfriend in Bhopal – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Bhopal • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Lake Walks, Cafes & Cultural Outings',
      provocativeHook: 'Want an attentive, polite guy to accompany you to a musical evening at Bharat Bhavan, a walk by Shahpura Lake, or a dinner at DB Mall? Skip pushy social app matches. Rent a verified platonic boyfriend in Bhopal who values your comfort and personal boundaries.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Bhopal Rent a Boyfriend',
      localScenarioStory: 'Modern women in Bhopal balancing higher education and civil services preparations often want respectful, cultured companions to unwind with on weekends. Our male companions offer polite manners, stimulating intellect, and zero emotional drama.',
      localSlangTerms: [
        { term: 'Adaab', meaning: 'Traditional respectful greeting', inContext: 'Courteous greetings and respectful interactions.' },
        { term: 'Shanti', meaning: 'Calmness', inContext: 'Experience peaceful moments by the lake with a calm listener.' },
        { term: 'Chai Baithak', meaning: 'Tea session with discussion', inContext: 'Enjoy candid discussions over steaming tea.' }
      ],
      popularHangouts: [
        { name: 'Van Vihar National Park Lake Road', area: 'Lake View', vibe: 'Green, peaceful, scenic', activity: 'Bicycle rides, wildlife viewing, and serene nature talks.' },
        { name: 'Shahpura Lake Precinct', area: 'Shahpura', vibe: 'Cozy, modern cafes', activity: 'coffee meetups and sunset walks.' },
        { name: 'Tribal Museum Bhopal', area: 'Shyamla Hills', vibe: 'Vibrant, indigenous, grand', activity: 'Exploring tribal art and cultural architecture.' },
        { name: '10 No. Market', area: 'Arera Colony', vibe: 'Bustling, street food, lively', activity: 'Street food snacking, cold coffee, and shopping.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Bhopal',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy scenic lake walks with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss literature, public affairs, science, and life goals.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Bhopal?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit parks and museums together in Bhopal?', answer: 'Yes! Daytime visits to public parks, museums, and lakefronts are fully permitted.' },
        { question: 'How is payment processed in Bhopal?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Bhopal?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  nagpur: {
    cityKey: 'nagpur',
    cityName: 'Nagpur',
    state: 'Maharashtra',
    tagline: 'Orange City & Geographical Center of India',
    girlfriend: {
      title: 'Rent a Girlfriend in Nagpur | Verified Platonic Companions for Futala Lake & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Nagpur. Enjoy Futala Lake fountain walks, Dharampeth cafes, VR Mall, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Nagpur', 'rent a girlfriend Nagpur', 'hire female friend Nagpur', 'platonic companion Futala Lake', 'Dharampeth companion Nagpur'],
      h1: 'Rent a Girlfriend in Nagpur – Charming Platonic Companion for Futala Lake & Dharampeth Cafes',
      heroBadge: 'Nagpur • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the Warmth of the Orange City with a Fun, Local Companion',
      provocativeHook: 'Tired of driving solo to Futala Lake on weekends or eating Tarri Poha alone? Rent a verified platonic girlfriend in Nagpur to enjoy evening musical fountains, cafe hangouts in Dharampeth, shopping at VR Nagpur Mall, or lively conversations without any awkward relationship strings.',
      localScenarioHeading: 'Why Young Engineers & Doctors in Nagpur Hire a Companion',
      localScenarioStory: 'With MIHAN SEZ expansion, prestigious medical colleges, and engineering hubs, Nagpur attracts bright young minds from across central India. But busy routines make it hard to maintain an active social circle. Our companions are warm, energetic locals who make your weekends lively, fun, and safe.',
      localSlangTerms: [
        { term: 'Bawa', meaning: 'Buddy / friend in Nagpur slang', inContext: 'Connect effortlessly like old friends, bawa!' },
        { term: 'Tarri Poha', meaning: 'Spicy gravy poha famous in Nagpur', inContext: 'Bond over spicy breakfast and morning banter.' },
        { term: 'Hao Kaa', meaning: 'Is it so? in Nagpuri Marathi', inContext: 'Enjoy genuine local expressions and hearty laughs.' }
      ],
      popularHangouts: [
        { name: 'Futala Lake & Waterfront Promenades', area: 'West Nagpur', vibe: 'Scenic, breezy, fountain shows', activity: 'Evening walks, roadside coffee, and fountain watching.' },
        { name: 'Dharampeth & Laxmi Nagar Cafes', area: 'Dharampeth', vibe: 'Trendy, student-friendly, vibrant', activity: 'Specialty coffee, bakery meetups, and chats.' },
        { name: 'VR Nagpur Mall (Trillium)', area: 'Medical Square', vibe: 'Modern shopping, multiplex', activity: 'Movie outings, gaming arcade, and food court dining.' },
        { name: 'Ambazari Lake & Garden', area: 'Ambazari', vibe: 'Green, peaceful, lakeside', activity: 'Lakeside walks, boating, and nature talks.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Nagpur',
      whyChoosePoints: [
        { title: 'Friendly & Welcoming', desc: 'Companions with genuine Orange City hospitality and humor.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of marriage commitments or awkward biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Nagpur?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Nagpur.' },
        { question: 'Where can we meet in Nagpur?', answer: 'In public areas like Futala Lake, Dharampeth cafes, or VR Nagpur Mall.' },
        { question: 'How much does it cost in Nagpur?', answer: 'Hourly rates generally range between ₹900 and ₹2,400.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Nagpur | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Nagpur. Perfect companion for Futala Lake walks, Dharampeth cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Nagpur', 'rent a boyfriend Nagpur', 'hire male companion Nagpur', 'platonic male friend Futala Lake', 'safe companion for women Nagpur'],
      h1: 'Rent a Boyfriend in Nagpur – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Nagpur • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Lake Walks, Cafes & Social Outings',
      provocativeHook: 'Looking for a polite, smart guy to accompany you to Futala Lake fountain shows, a movie at VR Mall, or an upscale family reception? Avoid creepy swiping app matches. Rent a verified platonic boyfriend in Nagpur who respects your personal space and brings cheerful energy.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Nagpur Rent a Boyfriend',
      localScenarioStory: 'Modern women in Nagpur balancing healthcare careers, law, and corporate jobs often want a dependable male companion for weekend outings without unwanted drama. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Bhau', meaning: 'Brother / friend', inContext: 'Respectful, polite interactions with zero intrusion.' },
        { term: 'Zakaas', meaning: 'Awesome / superb', inContext: 'Have a zakaas time hanging out at Nagpur’s favorite spots.' },
        { term: 'Shanti Se', meaning: 'Peacefully', inContext: 'Enjoy relaxing conversations without any drama.' }
      ],
      popularHangouts: [
        { name: 'Futala Lake Promenade', area: 'Futala Road', vibe: 'Lively, breezy, illuminated', activity: 'Evening fountain watching, coffee, and casual talks.' },
        { name: 'Civil Lines Cafes', area: 'Civil Lines', vibe: 'Green, colonial, upscale', activity: 'Heritage ambiance, gourmet snacks, and calm dialogue.' },
        { name: 'Seminary Hills Walkway', area: 'Seminary Hills', vibe: 'Forest, elevated, breezy', activity: 'Daytime nature walks, bird watching, and panoramic views.' },
        { name: 'Empress Mall & Raman Science Centre', area: 'Subhash Road', vibe: 'Educational & entertaining', activity: 'Planetarium shows, science exhibits, and cinema.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Nagpur',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy scenic lake walks with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss science, medicine, technology, and life ambitions.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Nagpur?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit Futala Lake in the evening in Nagpur?', answer: 'Yes! Evening visits to public waterfront areas like Futala are fully permitted.' },
        { question: 'How is payment processed in Nagpur?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Nagpur?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  surat: {
    cityKey: 'surat',
    cityName: 'Surat',
    state: 'Gujarat',
    tagline: 'Diamond & Silk City of India',
    girlfriend: {
      title: 'Rent a Girlfriend in Surat | Verified Platonic Companions for Dumas Road & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Surat. Enjoy Dumas Road cafes, VR Mall, Pal Riverfront walks, or food outings. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Surat', 'rent a girlfriend Surat', 'hire female friend Surat', 'platonic companion Dumas Road', 'VR Mall companion Surat'],
      h1: 'Rent a Girlfriend in Surat – Charming Platonic Companion for Dumas Road & Pal Riverfront',
      heroBadge: 'Surat • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience Surat’s World-Famous Food and Warmth with a Vibrant Companion',
      provocativeHook: 'Tired of eating locho alone on weekend mornings or driving down Dumas Road without company? Skip matrimonial interrogations. Rent a verified platonic girlfriend in Surat to explore trendy cafes on VIP Road, walk along Pal Riverfront, or check out street food at Night Bazaar without awkward relationship pressure.',
      localScenarioHeading: 'Why Young Diamond & Textile Entrepreneurs in Surat Hire a Companion',
      localScenarioStory: 'Surat’s booming entrepreneurial culture means long hours at textile markets and diamond bourses. When the weekend comes, you want to dress up, visit a chic cafe on Dumas Road, and have fun, unpretentious conversations. Our female companions are smart, friendly, and bring joyful Amdavad/Surati energy to your weekend.',
      localSlangTerms: [
        { term: 'Surti Mizaj', meaning: 'The joyful, foodie, fun-loving spirit of Surat', inContext: 'Experience the authentic, joyful Surti mizaj.' },
        { term: 'Locho', meaning: 'Famous steamed savory Surti snack', inContext: 'Share steaming plates of butter locho and spicy chutney.' },
        { term: 'Moj', meaning: 'Fun, enjoyment, merrymaking', inContext: 'Have pure moj without any relationship drama.' }
      ],
      popularHangouts: [
        { name: 'Dumas Road & VR Mall Surat', area: 'Dumas Road', vibe: 'Modern, upscale, buzzing', activity: 'Shopping, movie outings, and cafe brunch.' },
        { name: 'VIP Road Vesu Cafes', area: 'Vesu', vibe: 'Youthful, trendy, vibrant', activity: 'Artisan desserts, cold brew, and lively conversations.' },
        { name: 'Pal Riverfront Walkway', area: 'Pal-Adajan', vibe: 'Breezy, open-air, scenic', activity: 'Riverfront walking, sunset viewing, and photography.' },
        { name: 'Dumas Beach & Sea Breeze', area: 'Dumas', vibe: 'Coastal, windy, street food', activity: 'Bajiya tasting, seaside breeze, and evening strolls.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Surat',
      whyChoosePoints: [
        { title: 'Foodie Enthusiasts', desc: 'Companions who truly appreciate Surat’s legendary culinary scene.' },
        { title: 'Zero Conservative Pressure', desc: 'No intrusive biodatas or family expectations. Pure, respectful friendship.' },
        { title: '100% Verified Profiles', desc: 'Government ID verification ensures your peace of mind and safety.' },
        { title: 'The Ideal Plus-One', desc: 'Impress friends or colleagues by bringing an articulate, poised companion to social dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Surat?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Surat.' },
        { question: 'Where can we meet in Surat?', answer: 'In public areas like Dumas Road cafes, VR Mall, or Pal Riverfront.' },
        { question: 'How much does it cost in Surat?', answer: 'Hourly rates generally range between ₹1,000 and ₹2,600.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Surat | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Surat. Perfect companion for Dumas Road cafe hangouts, riverfront walks, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Surat', 'rent a boyfriend Surat', 'hire male companion Surat', 'platonic male friend Dumas Road', 'safe companion for women Surat'],
      h1: 'Rent a Boyfriend in Surat – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Surat • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Cafes, Riverfront Walks & Events',
      provocativeHook: 'Looking for a polite, sharp guy to accompany you to a movie at VR Mall, an evening cafe hangout on VIP Road, or a high-society wedding reception? Avoid pushy suitors. Rent a verified platonic boyfriend in Surat who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Surat Rent a Boyfriend',
      localScenarioStory: 'Modern women in Surat managing businesses, creative studios, and family ventures often prefer safe, uncomplicated friendships without marital pressure. Whether you need a confident plus-one for a wedding or an active partner to explore Vesu’s trendy cafes, our male companions offer respectful, cultured, and delightful company.',
      localSlangTerms: [
        { term: 'Kaka / Bhai', meaning: 'Respectful and friendly terms', inContext: 'Warm and cordial conversations from the moment you meet.' },
        { term: 'Jalsa Karo', meaning: 'Enjoy life', inContext: 'Jalsa karo with a trusted companion by your side.' },
        { term: 'Chai Time', meaning: 'Tea and snacks gathering', inContext: 'Enjoy casual conversation over evening tea.' }
      ],
      popularHangouts: [
        { name: 'VR Mall & RahulRaj Mall', area: 'Dumas Road', vibe: 'Modern shopping & dining', activity: 'Shopping assistance, IMAX movies, and dining.' },
        { name: 'Gopi Talav Heritage Precinct', area: 'Rustampura', vibe: 'Historical, waterfront, scenic', activity: 'Heritage walks, boating, and history chats.' },
        { name: 'Vesu Night Food Street', area: 'VIP Road', vibe: 'Bustling, culinary, vibrant', activity: 'Gourmet street food crawl and dessert tasting.' },
        { name: 'Dutch Garden & Old Fort', area: 'Nanpura', vibe: 'Colonial, quiet, historical', activity: 'Quiet garden walks and architectural appreciation.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Surat',
      whyChoosePoints: [
        { title: 'Chivalry & Good Manners', desc: 'Punctual, polite, respectful, and attentive to your personal comfort.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Surat’s buzzing night food scene with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss business ideas, design trends, cinema, and travel with ease.' },
        { title: 'Zero awkward relationship expectations', desc: 'Clean hourly bookings with no post-meetup demands or emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Surat?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit night food streets in Surat?', answer: 'Yes! Outings to well-lit public food streets and cafes are fully permitted.' },
        { question: 'How is payment handled in Surat?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Surat?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  vadodara: {
    cityKey: 'vadodara',
    cityName: 'Vadodara',
    state: 'Gujarat',
    tagline: 'Sanskari Nagari & Cultural Heart of Gujarat',
    girlfriend: {
      title: 'Rent a Girlfriend in Vadodara | Verified Platonic Companions for Alkapuri & Sayaji Baug',
      metaDescription: 'Hire a verified platonic girlfriend in Vadodara. Enjoy Alkapuri cafe hangouts, Sayaji Baug walks, Sevasi road drives, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Vadodara', 'rent a girlfriend Vadodara', 'hire female friend Vadodara', 'platonic companion Alkapuri', 'Sayaji Baug companion Vadodara'],
      h1: 'Rent a Girlfriend in Vadodara – Charming Platonic Companion for Alkapuri & Sayaji Baug',
      heroBadge: 'Vadodara • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience Sanskari Nagari’s Art and Soul with a Cultured Companion',
      provocativeHook: 'Tired of walking through Sayaji Baug alone or spending another quiet evening at home in Gotri? Avoid conservative matchmaking apps. Rent a verified platonic girlfriend in Vadodara to check out chic cafes in Alkapuri, admire fine arts at MSU exhibitions, or attend cultural events without relationship baggage.',
      localScenarioHeading: 'Why Young Professionals & Artists in Vadodara Hire a Companion',
      localScenarioStory: 'Vadodara is known for royalty, art, and vibrant higher education. Between busy shifts at petrochemical companies or university lectures, finding open-minded friends to hang out with in Alkapuri or Sevasi can be tricky. Our companions are articulate, warm, and love exploring the city’s heritage and cafes with you.',
      localSlangTerms: [
        { term: 'Sanskari Vibe', meaning: 'Artistic, cultural, and dignified', inContext: 'Experience Vadodara’s classic sanskari charm.' },
        { term: 'Sev Usal', meaning: 'Spicy pea gravy and sev dish', inContext: 'Bond over spicy Mahakali Sev Usal and lemon.' },
        { term: 'Bhai', meaning: 'Friendly address', inContext: 'Warm and effortless banter from the first minute.' }
      ],
      popularHangouts: [
        { name: 'Alkapuri Cafes & RC Dutt Road', area: 'Alkapuri', vibe: 'Upscale, historic, bustling', activity: 'Artisan coffee, bakery meetups, and boutique shopping.' },
        { name: 'Sayaji Baug (Kamati Baug)', area: 'Dak Bunglaw', vibe: 'Lush, historic, expansive', activity: 'Planetarium visits, botanical garden walks, and museum talks.' },
        { name: 'Sevasi & New Alkapuri Diners', area: 'Sevasi', vibe: 'Green, modern, relaxed', activity: 'Evening cafe drives, outdoor dining, and deep chats.' },
        { name: 'Inorbit Mall Gorwa', area: 'Subhanpura', vibe: 'Contemporary shopping & entertainment', activity: 'Movie screenings, arcade games, and retail therapy.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Vadodara',
      whyChoosePoints: [
        { title: 'Art & Heritage Lovers', desc: 'Companions who appreciate Baroda’s rich arts, design, and history.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of marriage commitments or family biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Vadodara?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Vadodara.' },
        { question: 'Where can we meet in Vadodara?', answer: 'In public areas like Alkapuri cafes, Sayaji Baug, or Inorbit Mall.' },
        { question: 'How much does it cost in Vadodara?', answer: 'Hourly rates generally range between ₹900 and ₹2,300.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Vadodara | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Vadodara. Perfect companion for Sayaji Baug walks, Alkapuri cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Vadodara', 'rent a boyfriend Vadodara', 'hire male companion Vadodara', 'platonic male friend Alkapuri', 'safe companion for women Vadodara'],
      h1: 'Rent a Boyfriend in Vadodara – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Vadodara • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Cultural Outings, Cafes & Events',
      provocativeHook: 'Looking for a polite, smart guy to accompany you to a museum walk at Laxmi Vilas Palace, a movie at Inorbit Mall, or an upscale family reception? Avoid creepy swiping app matches. Rent a verified platonic boyfriend in Vadodara who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Creative Professionals in Vadodara Rent a Boyfriend',
      localScenarioStory: 'Modern women in Vadodara balancing corporate careers, art, and academic lives often want a dependable male companion for weekend outings without unwanted drama. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Aavjo', meaning: 'Goodbye with warmth', inContext: 'Warm and cordial conversations from start to finish.' },
        { term: 'Majama', meaning: 'Fine and happy', inContext: 'Spend a relaxing, enjoyable time together.' },
        { term: 'Barodian', meaning: 'A resident of Vadodara', inContext: 'Explore the city with a proud and cultured Barodian.' }
      ],
      popularHangouts: [
        { name: 'Laxmi Vilas Palace Grounds & Cafe', area: 'Jawaharlal Nehru Marg', vibe: 'Palatial, regal, magnificent', activity: 'Audio tour walks, heritage photography, and cafe tea.' },
        { name: 'Alkapuri Food Street & Tea Stalls', area: 'Alkapuri', vibe: 'Youthful, vibrant, casual', activity: 'Evening tea, light snacks, and cheerful banter.' },
        { name: 'Sindhrot Check Dam & Riverbanks', area: 'Sindhrot', vibe: 'Scenic, breezy, natural', activity: 'Daytime drive, river views, and peaceful open-air chats.' },
        { name: 'Sayaji Baug Planetarium Precinct', area: 'Dak Bunglaw', vibe: 'Botanical, green, tranquil', activity: 'Nature walks, planetarium shows, and history discussions.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Vadodara',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Vadodara’s peaceful cafes and gardens with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss architecture, heritage, cinema, fashion, and business ideas.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Vadodara?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit Laxmi Vilas Palace grounds together in Vadodara?', answer: 'Yes! Daytime visits to public areas of heritage sites are fully permitted.' },
        { question: 'How is payment processed in Vadodara?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Vadodara?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  visakhapatnam: {
    cityKey: 'visakhapatnam',
    cityName: 'Visakhapatnam (Vizag)',
    state: 'Andhra Pradesh',
    tagline: 'City of Destiny & Jewel of the Coromandel Coast',
    girlfriend: {
      title: 'Rent a Girlfriend in Vizag | Verified Platonic Companions for RK Beach & Rushikonda',
      metaDescription: 'Hire a verified platonic girlfriend in Visakhapatnam (Vizag). Enjoy RK Beach walks, Rushikonda cafes, Kailasagiri views, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Vizag', 'rent a girlfriend Visakhapatnam', 'hire female friend Vizag', 'platonic companion RK Beach', 'Rushikonda companion Vizag'],
      h1: 'Rent a Girlfriend in Visakhapatnam (Vizag) – Charming Platonic Companion for RK Beach & Rushikonda',
      heroBadge: 'Vizag • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the Coastal Beauty of Vizag with an Engaging Companion',
      provocativeHook: 'Tired of watching the sunset over RK Beach alone or having weekend seafood solo in Lawson’s Bay? Rent a verified platonic girlfriend in Visakhapatnam to walk along the coastal promenade, explore scenic cafes on Rushikonda beach road, take a cable car up Kailasagiri, or attend social mixers without awkward relationship pressure.',
      localScenarioHeading: 'Why Naval Officers, Techies & Students in Vizag Hire a Companion',
      localScenarioStory: 'Vizag attracts professionals across naval forces, steel plants, IT SEZs, and universities. But being posted away from home can feel isolating. Having a warm, cheerful companion to explore coastal drives and enjoy fresh seafood makes the city feel like home instantly.',
      localSlangTerms: [
        { term: 'Babai', meaning: 'Friendly address in Telugu', inContext: 'Warm and friendly conversations like old friends, babai!' },
        { term: 'Beach Road Scenes', meaning: 'Evening hangout on RK Beach Road', inContext: 'Enjoy the vibrant evening beach road scenes.' },
        { term: 'Mawa', meaning: 'Pal / close buddy', inContext: 'Hang out effortlessly without awkward social barriers.' }
      ],
      popularHangouts: [
        { name: 'RK Beach & Submarine Museum Promenade', area: 'Beach Road', vibe: 'Coastal, breezy, vibrant', activity: 'Evening walks, roasted corn, and sea views.' },
        { name: 'Rushikonda Beach & Coastal Cafes', area: 'Rushikonda', vibe: 'Scenic, hilly, youthful', activity: 'Beachside coffee, waves watching, and photography.' },
        { name: 'Kailasagiri Hilltop Park', area: 'Hilltop', vibe: 'Panoramic, green, breezy', activity: 'Ropeway ride, city coastline panorama, and quiet chats.' },
        { name: 'Siripuram & Jagadamba Junction', area: 'Siripuram', vibe: 'Bustling, retail, foodie', activity: 'Shopping, movie outings, and South Indian dining.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Vizag',
      whyChoosePoints: [
        { title: 'Coastal Charm & Local Insight', desc: 'Companions who know the best sunset spots and seaside cafes.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of marriage commitments or family biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Vizag?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Visakhapatnam.' },
        { question: 'Where can we meet in Vizag?', answer: 'In public areas like RK Beach promenade, Rushikonda cafes, or Siripuram.' },
        { question: 'How much does it cost in Vizag?', answer: 'Hourly rates generally range between ₹900 and ₹2,400.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Vizag | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Vizag. Perfect companion for beach drives, Rushikonda cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Vizag', 'rent a boyfriend Visakhapatnam', 'hire male companion Vizag', 'platonic male friend RK Beach', 'safe companion for women Vizag'],
      h1: 'Rent a Boyfriend in Visakhapatnam (Vizag) – Polite, Cultured & Verified Male Companion for Outings',
      heroBadge: 'Vizag • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Coastal Drives, Beach Cafes & Events',
      provocativeHook: 'Looking for a polite, fit guy to accompany you on a scenic coastal drive to Bheemili, a movie at Jagadamba, or an evening stroll along Rushikonda Beach? Skip creepy swiping app matches. Rent a verified platonic boyfriend in Vizag who respects your boundaries and brings positive energy.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Vizag Rent a Boyfriend',
      localScenarioStory: 'Modern women working in Vizag’s medical, software, and banking sectors often want a dependable male companion for seaside walks and weekend outings without unwanted drama. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Chala Bagundi', meaning: 'Very nice / wonderful in Telugu', inContext: 'Have a chala bagundi experience exploring coastal spots.' },
        { term: 'Vizag Vibe', meaning: 'Relaxed, ocean-kissed, friendly spirit', inContext: 'Immerse in the relaxed ocean vibe with a great companion.' },
        { term: 'Tiffin Time', meaning: 'Evening snack and tiffin break', inContext: 'Share hot pesarattu upma and filter coffee.' }
      ],
      popularHangouts: [
        { name: 'Bheemili Beach Road Drive', area: 'Bheemunipatnam Road', vibe: 'Scenic, coastal, wind-in-hair', activity: 'Daytime coastal drive, red sand dunes, and sea views.' },
        { name: 'Tenneti Park Overlook', area: 'Jodugullapalem', vibe: 'Clifftop, dramatic waves', activity: 'Watching sea waves break against cliffs and photography.' },
        { name: 'CMR Central & Siripuram Diners', area: 'Maddilapalem', vibe: 'Modern shopping & dining', activity: 'Bowling, shopping, and dinner plus-one.' },
        { name: 'Yarada Beach', area: 'Gangavaram', vibe: 'Secluded, golden sand, picturesque', activity: 'Daytime beach relaxation and peaceful discussions.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Vizag',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Beach Outings', desc: 'Enjoy Vizag’s scenic beaches with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss technology, careers, fitness, and travel.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Vizag?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we go for coastal drives together in Vizag?', answer: 'Yes! Daytime coastal drives along public highways like Bheemili Beach Road are fully permitted.' },
        { question: 'How is payment processed in Vizag?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Vizag?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  patna: {
    cityKey: 'patna',
    cityName: 'Patna',
    state: 'Bihar',
    tagline: 'Ancient Pataliputra & Rapidly Growing Capital',
    girlfriend: {
      title: 'Rent a Girlfriend in Patna | Verified Platonic Companions for Ganga Marine Drive & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Patna. Enjoy Ganga Marine Drive strolls, Boring Road cafes, City Centre Mall, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Patna', 'rent a girlfriend Patna', 'hire female friend Patna', 'platonic companion Boring Road', 'Ganga Marine Drive companion Patna'],
      h1: 'Rent a Girlfriend in Patna – Charming Platonic Companion for Ganga Marine Drive & Boring Road',
      heroBadge: 'Patna • Safe & 100% Platonic Companionship',
      heroTagline: 'Discover Modern Patna and Ganga Sunset Vistas with a Friendly Companion',
      provocativeHook: 'Tired of driving down the new Ganga Marine Drive alone or spending another Sunday at home on Boring Road? Avoid conservative matchmaking judgments. Rent a verified platonic girlfriend in Patna to explore aesthetic rooftop cafes, stroll along the Ganga pathway, visit City Centre Mall, or enjoy great conversation without relationship expectations.',
      localScenarioHeading: 'Why Young Professionals & Civil Service Aspirants in Patna Hire a Companion',
      localScenarioStory: 'Patna is experiencing a modern renaissance with new expressways, malls, and riverfront parks. But young professionals and aspirants often face high stress and limited casual social circles. Having a smart, warm companion to talk with over coffee provides a much-needed mental break with zero emotional baggage.',
      localSlangTerms: [
        { term: 'Ganga Pathway', meaning: 'Patna’s famous Marine Drive along the Ganges', inContext: 'Catch the cool river breeze on the Ganga Pathway.' },
        { term: 'Litti Chokha', meaning: 'Iconic traditional delicacy', inContext: 'Share smoky sattu litti and spicy chokha near Gandhi Maidan.' },
        { term: 'Bhaiya', meaning: 'Friendly address', inContext: 'Respectful, cordial banter from the start.' }
      ],
      popularHangouts: [
        { name: 'Patna Marine Drive (Ganga Pathway)', area: 'Digha to Gaighat', vibe: 'Breezy, sunset, open-air', activity: 'Evening river walks, tea stalls, and photography.' },
        { name: 'Boring Road & Patliputra Colony Cafes', area: 'Boring Road', vibe: 'Youthful, vibrant, student-friendly', activity: 'Specialty coffee, bakery meetups, and book discussions.' },
        { name: 'City Centre Mall & PVR', area: 'Christian Colony', vibe: 'Modern, upscale, retail', activity: 'Movie outings, gaming, and international dining.' },
        { name: 'Eco Park (Rajdhani Vatika)', area: 'Strand Road', vibe: 'Lush green, lake, serene', activity: 'Boating, garden walks, and relaxed dialogue.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Patna',
      whyChoosePoints: [
        { title: 'Intellectual & Witty', desc: 'Companions who can discuss national affairs, literature, and career goals.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of marriage commitments or family biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Patna?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Patna.' },
        { question: 'Where can we meet in Patna?', answer: 'In public areas like Boring Road cafes, Ganga Marine Drive, or City Centre Mall.' },
        { question: 'How much does it cost in Patna?', answer: 'Hourly rates generally range between ₹800 and ₹2,200.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Patna | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Patna. Perfect companion for Ganga Marine Drive walks, Boring Road cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Patna', 'rent a boyfriend Patna', 'hire male companion Patna', 'platonic male friend Boring Road', 'safe companion for women Patna'],
      h1: 'Rent a Boyfriend in Patna – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Patna • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Riverfront Walks, Cafes & Events',
      provocativeHook: 'Looking for a polite, sharp guy to accompany you on an evening drive along Ganga Marine Drive, a movie at City Centre Mall, or a family wedding reception? Avoid pushy suitors. Rent a verified platonic boyfriend in Patna who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Patna Rent a Boyfriend',
      localScenarioStory: 'Modern women in Patna pursuing medicine, judiciary, civil services, and corporate roles often want a dependable male companion for evening outings without societal gossip. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Pranam', meaning: 'Respectful greeting', inContext: 'Courteous greetings and respectful interactions.' },
        { term: 'Bindaas', meaning: 'Carefree and cheerful', inContext: 'Have a bindaas time hanging out at Patna’s favorite spots.' },
        { term: 'Shanti', meaning: 'Calmness', inContext: 'Enjoy relaxing conversations without any drama.' }
      ],
      popularHangouts: [
        { name: 'Ganga Marine Drive Promenades', area: 'Digha Ghat', vibe: 'Open-air, breezy, lively', activity: 'Evening sunset strolls, fresh tea, and skyline views.' },
        { name: 'Bihar Museum Precinct', area: 'Bailey Road', vibe: 'World-class architecture, peaceful', activity: 'History galleries, sculpture courtyard walks, and museum cafe.' },
        { name: 'Patliputra Golambar & Cafes', area: 'Patliputra', vibe: 'Cosy, artistic, vibrant', activity: 'Gourmet snacks, cold coffee, and intellectual talks.' },
        { name: 'Gandhi Maidan & Mona Cinema', area: 'Central Patna', vibe: 'Historical, grand, bustling', activity: 'Open-air walks, movie outings, and street snacks.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Patna',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Patna’s riverfront walkways with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss public policy, cinema, technology, and life ambitions.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Patna?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit museums and parks together in Patna?', answer: 'Yes! Daytime visits to public museums like Bihar Museum and Eco Park are fully permitted.' },
        { question: 'How is payment processed in Patna?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Patna?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  coimbatore: {
    cityKey: 'coimbatore',
    cityName: 'Coimbatore',
    state: 'Tamil Nadu',
    tagline: 'Manchester of South India & Textile Hub',
    girlfriend: {
      title: 'Rent a Girlfriend in Coimbatore | Verified Platonic Companions for Race Course & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Coimbatore. Enjoy Race Course Road walks, RS Puram cafes, Brookefields Mall, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Coimbatore', 'rent a girlfriend Coimbatore', 'hire female friend Coimbatore', 'platonic companion Race Course', 'RS Puram companion Coimbatore'],
      h1: 'Rent a Girlfriend in Coimbatore – Charming Platonic Companion for Race Course & RS Puram Cafes',
      heroBadge: 'Coimbatore • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the Pleasant Weather and Culture of Kovai with a Friendly Companion',
      provocativeHook: 'Tired of walking solo around Race Course Road on breezy evenings or spending weekends alone in your Saravanampatti IT flat? Rent a verified platonic girlfriend in Coimbatore to explore cozy cafes in RS Puram, stroll by Valankulam lakefront, or attend social mixers without unwanted drama.',
      localScenarioHeading: 'Why IT & Textile Professionals in Coimbatore Hire a Companion',
      localScenarioStory: 'Coimbatore has a booming IT corridor along Avinashi Road and a strong manufacturing backbone. But young professionals who relocate here often miss having an open-minded social circle to share weekend coffee, explore Siruvani nature spots, or have deep conversations with. Our female companions are warm, educated, and love sharing Kovai’s pleasant charm.',
      localSlangTerms: [
        { term: 'Kovai Kulir', meaning: 'The famous cool, breezy Kovai weather', inContext: 'Enjoy the pleasant Kovai kulir on evening walks.' },
        { term: 'Machi', meaning: 'Pal / good buddy', inContext: 'Connect effortlessly like longtime machis.' },
        { term: 'Siruvani Thanneer', meaning: 'The sweet taste of Siruvani water', inContext: 'Experience sweet, genuine hospitality.' }
      ],
      popularHangouts: [
        { name: 'Race Course Road Promenade', area: 'Race Course', vibe: 'Green, upscale, breezy', activity: 'Evening fitness walks, cafe stops, and relaxed chats.' },
        { name: 'RS Puram Cafe Precinct', area: 'RS Puram', vibe: 'Trendy, gourmet, bustling', activity: 'Specialty coffee, dessert tasting, and book reading.' },
        { name: 'Brookefields Mall & Prozone Mall', area: 'Brooke Bond Road', vibe: 'Modern shopping, multiplex', activity: 'Movie outings, gaming, and dining.' },
        { name: 'Valankulam Lake Promenade', area: 'Sungam', vibe: 'Illuminated, waterfront, scenic', activity: 'Lakeside walks, sunset views, and street snacks.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Coimbatore',
      whyChoosePoints: [
        { title: 'Cultured & Polite', desc: 'Companions with polite Kovai manners and broad worldview.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of marriage commitments or family biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Coimbatore?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Coimbatore.' },
        { question: 'Where can we meet in Coimbatore?', answer: 'In public areas like Race Course Road, RS Puram cafes, or Brookefields Mall.' },
        { question: 'How much does it cost in Coimbatore?', answer: 'Hourly rates generally range between ₹900 and ₹2,300.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Coimbatore | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Coimbatore. Perfect companion for Race Course walks, RS Puram cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Coimbatore', 'rent a boyfriend Coimbatore', 'hire male companion Coimbatore', 'platonic male friend Race Course', 'safe companion for women Coimbatore'],
      h1: 'Rent a Boyfriend in Coimbatore – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Coimbatore • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Lake Walks, Cafes & Social Outings',
      provocativeHook: 'Looking for a polite, smart guy to accompany you on an evening walk around Race Course, a movie at Brookefields, or an upscale family reception? Avoid pushy suitors. Rent a verified platonic boyfriend in Coimbatore who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Coimbatore Rent a Boyfriend',
      localScenarioStory: 'Modern women in Coimbatore balancing engineering, medical, and business careers often want a dependable male companion for weekend outings without conservative judgment. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Vanakkam', meaning: 'Traditional respectful greeting in Tamil', inContext: 'Polite and cordial interactions from the start.' },
        { term: 'Kovai Gethu', meaning: 'Pride in Coimbatore culture', inContext: 'Step out with a companion who carries himself with dignity.' },
        { term: 'Nalla Neram', meaning: 'Good time', inContext: 'Spend a pleasant and refreshing time together.' }
      ],
      popularHangouts: [
        { name: 'Race Course Circular Track', area: 'Race Course', vibe: 'Green, upscale, calm', activity: 'Evening walks, fresh juice, and health talks.' },
        { name: 'Perur Pateeswarar Temple Precinct', area: 'Perur', vibe: 'Historic, spiritual, architectural', activity: 'Cultural walks, temple architecture, and history chats.' },
        { name: 'VOC Park and Zoo', area: 'Gopalapuram', vibe: 'Green, heritage, serene', activity: 'Nature walks, quiet garden seating, and discussions.' },
        { name: 'Prozone Mall', area: 'Saravanampatti Road', vibe: 'Sprawling, modern, lively', activity: 'Shopping assistance, IMAX movies, and dining.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Coimbatore',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Coimbatore’s pleasant outdoor promenades with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss technology, textile entrepreneurship, and global ideas.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Coimbatore?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit parks and promenades together in Coimbatore?', answer: 'Yes! Daytime and evening visits to public promenades like Race Course are fully permitted.' },
        { question: 'How is payment processed in Coimbatore?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Coimbatore?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  kanpur: {
    cityKey: 'kanpur',
    cityName: 'Kanpur',
    state: 'Uttar Pradesh',
    tagline: 'Leather City of the World & Industrial Hub',
    girlfriend: {
      title: 'Rent a Girlfriend in Kanpur | Verified Platonic Companions for Z Square Mall & Swaroop Nagar',
      metaDescription: 'Hire a verified platonic girlfriend in Kanpur. Enjoy Swaroop Nagar cafe hangouts, Z Square Mall shopping, Ganga Barrage walks, or social events. Safe & verified.',
      keywords: ['rent a girlfriend in Kanpur', 'rent a girlfriend Kanpur', 'hire female friend Kanpur', 'platonic companion Swaroop Nagar', 'Z Square Mall companion Kanpur'],
      h1: 'Rent a Girlfriend in Kanpur – Charming Platonic Companion for Swaroop Nagar & Z Square Mall',
      heroBadge: 'Kanpur • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience Kanpur’s Lively Culture and Food with a Friendly Companion',
      provocativeHook: 'Tired of spending weekends alone at home or walking solo at Moti Jheel? Skip conservative matrimonial setups. Rent a verified platonic girlfriend in Kanpur to check out trendy cafes in Swaroop Nagar, watch a movie at Z Square Mall, or enjoy a sunset drive to Ganga Barrage without unwanted drama.',
      localScenarioHeading: 'Why IITians, Doctors & Young Professionals in Kanpur Hire a Companion',
      localScenarioStory: 'Home to IIT Kanpur, prestigious medical colleges, and major industrial houses, Kanpur is full of ambitious individuals. But hectic schedules leave little time to build a genuine social circle. Our companions are smart, friendly locals who make your weekends lively, fun, and safe.',
      localSlangTerms: [
        { term: 'Kanpuriya Mizaj', meaning: 'The witty, straightforward, warm Kanpur spirit', inContext: 'Experience genuine Kanpuriya warmth and humor.' },
        { term: 'Bhaiya Ji', meaning: 'Friendly local address', inContext: 'Warm and respectful interaction from the get-go.' },
        { term: 'Thandai', meaning: 'Famous refreshing flavored milk drink', inContext: 'Bond over authentic Badam Thandai near Birhana Road.' }
      ],
      popularHangouts: [
        { name: 'Swaroop Nagar & Aryan Market Cafes', area: 'Swaroop Nagar', vibe: 'Youthful, vibrant, student-favorite', activity: 'coffee meetups, bakery snacks, and book chats.' },
        { name: 'Z Square Mall', area: 'The Mall Road', vibe: 'Grand, modern shopping, bustling', activity: 'Movie outings, gaming, and international dining.' },
        { name: 'Ganga Barrage (Lav Kush Barrage)', area: 'Ganga Barrage Road', vibe: 'Open-air, breezy, river views', activity: 'Evening sunset drives, fresh tea, and river breeze.' },
        { name: 'Moti Jheel & Garden Complex', area: 'Harsh Nagar', vibe: 'Lakeside, lush, scenic', activity: 'Lakeside strolls, boating, and conversations.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Kanpur',
      whyChoosePoints: [
        { title: 'Friendly & Witty', desc: 'Companions with genuine local humor and warmth.' },
        { title: 'Zero awkward relationship pressure', desc: 'No expectations of marriage commitments or family biodatas.' },
        { title: '100% ID Verified', desc: 'Safe public meetups with verified companions.' },
        { title: 'Ideal Social Plus-One', desc: 'Great companion for celebrations and dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Kanpur?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Kanpur.' },
        { question: 'Where can we meet in Kanpur?', answer: 'In public areas like Swaroop Nagar cafes, Z Square Mall, or Moti Jheel.' },
        { question: 'How much does it cost in Kanpur?', answer: 'Hourly rates generally range between ₹800 and ₹2,200.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Kanpur | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Kanpur. Perfect companion for Ganga Barrage drives, Swaroop Nagar cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Kanpur', 'rent a boyfriend Kanpur', 'hire male companion Kanpur', 'platonic male friend Swaroop Nagar', 'safe companion for women Kanpur'],
      h1: 'Rent a Boyfriend in Kanpur – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Kanpur • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Riverfront Drives, Cafes & Events',
      provocativeHook: 'Looking for a polite, smart guy to accompany you on a drive to Ganga Barrage, a movie at Z Square Mall, or an upscale family reception? Avoid pushy suitors. Rent a verified platonic boyfriend in Kanpur who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Kanpur Rent a Boyfriend',
      localScenarioStory: 'Modern women in Kanpur balancing engineering, medical, and corporate careers often want a dependable male companion for weekend outings without societal gossip. Our male companions are educated, courteous, and strictly maintain professional decorum.',
      localSlangTerms: [
        { term: 'Guru', meaning: 'Friend / master', inContext: 'Connect effortlessly like trusted pals, guru.' },
        { term: 'Bindaas', meaning: 'Carefree and confident', inContext: 'Have a bindaas time hanging out at Kanpur’s favorite spots.' },
        { term: 'Shanti Se', meaning: 'Peacefully', inContext: 'Enjoy relaxing conversations without any drama.' }
      ],
      popularHangouts: [
        { name: 'Z Square Mall Food Court & Multiplex', area: 'The Mall Road', vibe: 'Modern shopping & dining', activity: 'Shopping assistance, movies, and dining.' },
        { name: 'Allen Forest Zoo (Kanpur Zoological Park)', area: 'Azad Nagar', vibe: 'Lush green, expansive, serene', activity: 'Daytime nature walks, lake viewing, and quiet chats.' },
        { name: 'Swaroop Nagar Coffee Lounges', area: 'Swaroop Nagar', vibe: 'Cozy, youthful, vibrant', activity: 'Artisan coffee, dessert tasting, and intellectual talks.' },
        { name: 'Nana Rao Park (Company Bagh)', area: 'Phool Bagh', vibe: 'Historic, grand, green', activity: 'Evening strolls, historical appreciation, and open-air talks.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Kanpur',
      whyChoosePoints: [
        { title: 'Chivalrous & Protective', desc: 'Polite manners and respect for your comfort at all times.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Kanpur’s riverfront walkways with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss technology, career ambitions, and global ideas.' },
        { title: 'Zero awkward relationship expectations', desc: 'Hourly transparency with no emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Kanpur?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit parks and malls together in Kanpur?', answer: 'Yes! Daytime visits to public parks and malls like Z Square are fully permitted.' },
        { question: 'How is payment processed in Kanpur?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Kanpur?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  },

  ludhiana: {
    cityKey: 'ludhiana',
    cityName: 'Ludhiana',
    state: 'Punjab',
    tagline: 'Manchester of India & Vibrant Commercial Capital',
    girlfriend: {
      title: 'Rent a Girlfriend in Ludhiana | Verified Platonic Companions for Sarabha Nagar & Cafes',
      metaDescription: 'Hire a verified platonic girlfriend in Ludhiana. Enjoy Sarabha Nagar Ki Market cafes, MBD Neopolis Mall, South City drives, or social events. Safe, polite & verified.',
      keywords: ['rent a girlfriend in Ludhiana', 'rent a girlfriend Ludhiana', 'hire female friend Ludhiana', 'platonic companion Sarabha Nagar', 'MBD Mall companion Ludhiana'],
      h1: 'Rent a Girlfriend in Ludhiana – Charming Platonic Companion for Sarabha Nagar & South City',
      heroBadge: 'Ludhiana • Safe & 100% Platonic Companionship',
      heroTagline: 'Experience the Big-Hearted Punjabi Vibe with a Stylish, Cultured Companion',
      provocativeHook: 'Tired of hanging out solo at Sarabha Nagar Market or spending quiet weekends in your apartment? Avoid intrusive matrimonial setups. Rent a verified platonic girlfriend in Ludhiana to check out trendy cafes in South City, shop at MBD Neopolis, or attend festive parties without unwanted drama.',
      localScenarioHeading: 'Why Young Industrialists & Professionals in Ludhiana Hire a Companion',
      localScenarioStory: 'Ludhiana is famous for grand lifestyles, textile dynasties, and high-energy culture. But if your close friends have moved abroad to Canada or the UK, weekends can feel unexpectedly quiet. Our female companions are stylish, educated, and warm conversationalists who make every outing cheerful and engaging.',
      localSlangTerms: [
        { term: 'Kidaan', meaning: 'How are you? in Punjabi', inContext: 'Warm and friendly greetings like old friends, kidaan!' },
        { term: 'Sarabha Nagar Scene', meaning: 'The classic evening hangout at Sarabha Nagar market', inContext: 'Enjoy the vibrant Sarabha Nagar scenes over coffee.' },
        { term: 'Chak De', meaning: 'Let’s do it / full of spirit', inContext: 'Keep your weekend spirits high without waiting on busy pals.' }
      ],
      popularHangouts: [
        { name: 'Sarabha Nagar Main Market', area: 'Sarabha Nagar', vibe: 'Trendy, energetic, youthful', activity: 'Gourmet street food, cold coffee, and car-side chatting.' },
        { name: 'MBD Neopolis & Pavilion Mall', area: 'Ferozepur Road', vibe: 'Luxury shopping & dining', activity: 'Boutique shopping, cinema screenings, and fine dining.' },
        { name: 'South City Canal Road Cafes', area: 'South City', vibe: 'Scenic, modern, open-air', activity: 'Canal-side coffee meetups, bakery snacks, and evening drives.' },
        { name: 'Rose Garden (Nehru Rose Garden)', area: 'Civil Lines', vibe: 'Lush, botanical, serene', activity: 'Flower walks, quiet garden seating, and conversations.' }
      ],
      idealOutingsHeading: 'Top Curated Hangouts with Your Companion in Ludhiana',
      whyChoosePoints: [
        { title: 'Vibrant & Warm', desc: 'Companions with genuine Punjabi hospitality and high energy.' },
        { title: 'Zero Conservative Pressure', desc: 'No intrusive biodatas or family expectations. Pure, respectful friendship.' },
        { title: '100% Verified Profiles', desc: 'Government ID verification ensures your peace of mind and safety.' },
        { title: 'The Ideal Plus-One', desc: 'Impress friends or colleagues by bringing an articulate, poised companion to social dinners.' }
      ],
      faqs: [
        { question: 'What is the rent a girlfriend service in Ludhiana?', answer: 'It is a strictly platonic, hourly companionship service for dining, events, cafe visits, and sightseeing in Ludhiana.' },
        { question: 'Where can we meet in Ludhiana?', answer: 'In public areas like Sarabha Nagar market, MBD Neopolis Mall, or South City cafes.' },
        { question: 'How much does it cost in Ludhiana?', answer: 'Hourly rates generally range between ₹1,000 and ₹2,800.' },
        { question: 'Is it completely safe?', answer: 'Yes! Strict safety, verification, and platonic rules are enforced.' }
      ]
    },
    boyfriend: {
      title: 'Rent a Boyfriend in Ludhiana | Polite, Cultured & Verified Male Companion',
      metaDescription: 'Hire a reliable, polite platonic boyfriend in Ludhiana. Perfect companion for South City drives, Sarabha Nagar cafe hangouts, movie outings, or event plus-one. Safe & verified.',
      keywords: ['rent a boyfriend in Ludhiana', 'rent a boyfriend Ludhiana', 'hire male companion Ludhiana', 'platonic male friend Sarabha Nagar', 'safe companion for women Ludhiana'],
      h1: 'Rent a Boyfriend in Ludhiana – Polite, Cultured & Verified Male Companion for Outings & Events',
      heroBadge: 'Ludhiana • Safe & 100% Platonic Companionship',
      heroTagline: 'A Courteous, Chivalrous Gentleman for Cafes, Evening Drives & Events',
      provocativeHook: 'Looking for a polite, well-dressed guy to accompany you to a movie at MBD Neopolis, an evening cafe hangout in South City, or a grand wedding reception? Avoid pushy suitors. Rent a verified platonic boyfriend in Ludhiana who treats you with chivalry and complete respect.',
      localScenarioHeading: 'Why Modern Women & Young Professionals in Ludhiana Rent a Boyfriend',
      localScenarioStory: 'Modern women in Ludhiana managing family businesses, design ventures, and corporate careers often prefer safe, uncomplicated friendships without marital pressure. Whether you need a confident plus-one for a wedding or an active partner to explore South City’s trendy cafes, our male companions offer respectful, cultured, and delightful company.',
      localSlangTerms: [
        { term: 'Veer / Yaar', meaning: 'Brother / friend', inContext: 'Respectful, polite interactions with zero intrusion.' },
        { term: 'Mauja', meaning: 'Fun and merriment', inContext: 'Have pure mauja exploring Ludhiana’s favorite spots.' },
        { term: 'Shanti', meaning: 'Peace', inContext: 'Enjoy relaxing conversations without any drama.' }
      ],
      popularHangouts: [
        { name: 'MBD Neopolis Multiplex & Diners', area: 'Ferozepur Road', vibe: 'Modern shopping & dining', activity: 'Shopping assistance, movies, and dining.' },
        { name: 'Kipps Market & Model Town', area: 'Model Town', vibe: 'Bustling, culinary, vibrant', activity: 'Gourmet street food crawl and dessert tasting.' },
        { name: 'Rakh Bagh Park', area: 'Club Road', vibe: 'Green, heritage, relaxed', activity: 'Toy train rides, quiet garden seating, and discussions.' },
        { name: 'South City Waterfront Diners', area: 'Canal Road', vibe: 'Open-air, chic, breeze', activity: 'Waterfront dining, artisan pizza, and conversations.' }
      ],
      idealOutingsHeading: 'Top Safe Outings with a Rented Boyfriend in Ludhiana',
      whyChoosePoints: [
        { title: 'Chivalry & Good Manners', desc: 'Punctual, polite, respectful, and attentive to your personal comfort.' },
        { title: 'Safe Evening Outings', desc: 'Enjoy Ludhiana’s buzzing night food scene with complete peace of mind.' },
        { title: 'Intellectually Engaging', desc: 'Discuss business ideas, design trends, cinema, and travel with ease.' },
        { title: 'Zero awkward relationship expectations', desc: 'Clean hourly bookings with no post-meetup demands or emotional drama.' }
      ],
      faqs: [
        { question: 'Is renting a boyfriend safe for women in Ludhiana?', answer: 'Yes, safety is strictly guaranteed. All male companions are ID-screened and adhere to our zero-intimacy platonic code.' },
        { question: 'Can we visit cafes and malls in Ludhiana?', answer: 'Yes! Outings to well-lit public malls like MBD Neopolis and South City cafes are fully permitted.' },
        { question: 'How is payment handled in Ludhiana?', answer: 'Securely processed online through the platform.' },
        { question: 'Can I book a companion as my wedding plus-one in Ludhiana?', answer: 'Yes, companions can be hired as polite, well-dressed plus-ones for weddings and dinners.' }
      ]
    }
  }
};

export function getCityCompanionData(cityKey: string, type: 'girlfriend' | 'boyfriend'): { city: CityData; profile: CityCompanionProfile } {
  const normalizedKey = cityKey.toLowerCase();
  const city = CITY_COMPANION_DATA[normalizedKey] || CITY_COMPANION_DATA['bangalore'];
  const profile = type === 'girlfriend' ? city.girlfriend : city.boyfriend;
  return { city, profile };
}


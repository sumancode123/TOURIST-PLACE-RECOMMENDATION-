/**
 * Tourist Destinations Dataset
 * Comprehensive dataset engineered for Content-Based Recommendation & Multi-Criteria Filtering
 */

const DESTINATIONS_DATA = [
  {
    id: "kyoto-japan",
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    tagline: "Ancient temples, serene zen gardens, and timeless geisha heritage.",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewsCount: 1420,
    dailyBudgetUSD: 95,
    budgetTier: "Moderate", // Backpacker ($), Moderate ($$), Luxury ($$$)
    idealDurationDays: 4,
    bestSeason: "Spring", // Spring, Summer, Autumn, Winter
    climate: "Pleasant",
    vibes: ["Heritage", "Culture", "Serenity", "Foodie"],
    companions: ["Solo", "Couple", "Family"],
    activityLevel: "Moderate",
    safetyScore: 9.8,
    visaType: "Easy eVisa",
    coordinates: { lat: 35.0116, lng: 135.7681 },
    highlights: [
      "Fushimi Inari-taisha thousands of vermilion torii gates",
      "Kinkaku-ji (The Golden Pavilion) reflecting over mirror pond",
      "Arashiyama Bamboo Grove and monkey park",
      "Traditional Gion tea houses and Kaiseki dining"
    ],
    itinerary: [
      { day: 1, title: "Imperial Kyoto & Bamboo Grove", details: "Morning stroll in Arashiyama Bamboo Grove, Tenryu-ji temple gardens, and evening sunset in Gion district." },
      { day: 2, title: "Torii Gates & Traditional Tea", details: "Early hike through Fushimi Inari's 10,000 gates, authentic matcha ceremony in Higashiyama." },
      { day: 3, title: "Golden Pavilion & Local Food Trail", details: "Visit Kinkaku-ji, browse Nishiki Market for street eats like dango and fresh sashimi." },
      { day: 4, title: "Philosopher's Path & Souvenirs", details: "Walk the canal path along Ginkaku-ji and shop traditional Kyoto ceramics." }
    ],
    costBreakdown: {
      stay: 50,
      food: 25,
      activities: 12,
      transport: 8
    }
  },
  {
    id: "bali-indonesia",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    tagline: "Tropical beaches, volcanic peaks, sacred temples, and spiritual wellness.",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviewsCount: 2310,
    dailyBudgetUSD: 45,
    budgetTier: "Backpacker",
    idealDurationDays: 6,
    bestSeason: "Summer",
    climate: "Tropical",
    vibes: ["Beach", "Adventure", "Serenity", "Nightlife"],
    companions: ["Solo", "Couple", "Friends"],
    activityLevel: "High",
    safetyScore: 9.1,
    visaType: "Visa on Arrival",
    coordinates: { lat: -8.3405, lng: 115.092 },
    highlights: [
      "Surfing world-class breaks in Uluwatu & Canggu",
      "Sunrise trek to active volcano Mount Batur",
      "Sacred Monkey Forest & Tegallalang rice terraces in Ubud",
      "Cliffside sunset cocktails at Tanah Lot Temple"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Coastal Vibes", details: "Check into Seminyak/Canggu, chill at beach clubs, enjoy beachfront seafood dinner." },
      { day: 2, title: "Ubud Cultural Heartland", details: "Explore sacred monkey sanctuary, walk Tegalalang rice terraces, try jungle swings." },
      { day: 3, title: "Volcano Sunrise & Hot Springs", details: "Early 3 AM trek up Mt. Batur, soak in Batur natural hot springs afterwards." },
      { day: 4, title: "Waterfalls & Sacred Temples", details: "Visit Tibumana & Tegenungan waterfalls and Tirta Empul water purification temple." },
      { day: 5, title: "Nusa Penida Island Tour", details: "Speedboat to Kelingking T-Rex beach, snorkel with manta rays at Broken Beach." },
      { day: 6, title: "Spa, Yoga & Souvenir Hunt", details: "Traditional Balinese deep tissue massage and Ubud handicraft market shopping." }
    ],
    costBreakdown: {
      stay: 20,
      food: 12,
      activities: 8,
      transport: 5
    }
  },
  {
    id: "swiss-alps",
    name: "Interlaken & Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    tagline: "Majestic snow-capped peaks, crystal alpine lakes, and adrenaline sports.",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    rating: 4.95,
    reviewsCount: 980,
    dailyBudgetUSD: 160,
    budgetTier: "Luxury",
    idealDurationDays: 5,
    bestSeason: "Winter",
    climate: "Snow",
    vibes: ["Mountain", "Adventure", "Serenity", "Romantic"],
    companions: ["Couple", "Family", "Friends"],
    activityLevel: "High",
    safetyScore: 9.9,
    visaType: "Schengen Visa",
    coordinates: { lat: 46.6863, lng: 7.8632 },
    highlights: [
      "Jungfraujoch – Top of Europe railway and ice palace",
      "Tandem paragliding over Lake Thun and Lake Brienz",
      "Lauterbrunnen Valley with 72 cascading waterfalls",
      "Scenic cogwheel train rides and Swiss fondue dinners"
    ],
    itinerary: [
      { day: 1, title: "Lake Brienz & Harder Kulm", details: "Funicular ride to Harder Kulm viewpoint overlooking twin lakes and Eiger mountain." },
      { day: 2, title: "Jungfraujoch High Alpine Experience", details: "Scenic train to Europe's highest railway station, walk the ice palace and glacier." },
      { day: 3, title: "Lauterbrunnen & Trummelbach Falls", details: "Explore fairytale village of Lauterbrunnen and subterranean glacial waterfalls." },
      { day: 4, title: "Grindelwald First & Cliff Walk", details: "Ride cable car, experience the thrilling First Cliff Walk by Tissot and ziprider." },
      { day: 5, title: "Kayaking & Swiss Chocolatier Tour", details: "Paddle across turquoise Lake Brienz and attend a Swiss artisan chocolate workshop." }
    ],
    costBreakdown: {
      stay: 85,
      food: 40,
      activities: 25,
      transport: 10
    }
  },
  {
    id: "paris-france",
    name: "Paris",
    country: "France",
    continent: "Europe",
    tagline: "The City of Light: Haute cuisine, world-class art, and romantic boulevards.",
    category: "Urban",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviewsCount: 3120,
    dailyBudgetUSD: 140,
    budgetTier: "Luxury",
    idealDurationDays: 4,
    bestSeason: "Spring",
    climate: "Pleasant",
    vibes: ["Culture", "Romantic", "Foodie", "Urban"],
    companions: ["Couple", "Solo", "Family"],
    activityLevel: "Moderate",
    safetyScore: 8.9,
    visaType: "Schengen Visa",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    highlights: [
      "Sunset view from the Eiffel Tower summit",
      "Masterpieces in the Louvre & Musée d'Orsay",
      "Strolling bohemian Montmartre and Sacré-Cœur",
      "Seine River dinner cruise with live jazz"
    ],
    itinerary: [
      { day: 1, title: "Iconic Landmarks & Eiffel Tower", details: "Arc de Triomphe, walk down Champs-Élysées, picnic at Champ de Mars and Eiffel sparkles." },
      { day: 2, title: "Art Treasury & Seine Cruise", details: "Morning at Musée du Louvre, afternoon Tuileries Garden walk, dusk cruise on the Seine." },
      { day: 3, title: "Bohemian Montmartre & Latin Quarter", details: "Climb to Sacré-Cœur, explore painter squares, explore Shakespeare and Company bookstore." },
      { day: 4, title: "Palace of Versailles Day Trip", details: "Explore Hall of Mirrors and grand manicured fountain gardens of King Louis XIV." }
    ],
    costBreakdown: {
      stay: 75,
      food: 35,
      activities: 20,
      transport: 10
    }
  },
  {
    id: "jaipur-india",
    name: "Jaipur & Rajasthan",
    country: "India",
    continent: "Asia",
    tagline: "The legendary Pink City of royal forts, palaces, vibrant bazaars, and heritage.",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
    rating: 4.85,
    reviewsCount: 1840,
    dailyBudgetUSD: 35,
    budgetTier: "Backpacker",
    idealDurationDays: 4,
    bestSeason: "Winter",
    climate: "Pleasant",
    vibes: ["Heritage", "Culture", "Foodie", "Adventure"],
    companions: ["Solo", "Family", "Friends", "Couple"],
    activityLevel: "Moderate",
    safetyScore: 9.0,
    visaType: "eVisa (Fast-track)",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    highlights: [
      "Majestic Amber Fort with Sheesh Mahal (Mirror Palace)",
      "Hawa Mahal (Palace of Winds) intricate latticework",
      "City Palace and Jantar Mantar UNESCO astronomical observatory",
      "Traditional Rajasthani Thali and Johari Bazaar jewelry trail"
    ],
    itinerary: [
      { day: 1, title: "Pink City Historic Fortresses", details: "Morning climb to Amber Fort, photo stop at Jal Mahal (Water Palace), sunset at Nahargarh Fort." },
      { day: 2, title: "Royal Palaces & Architecture", details: "Visit iconic Hawa Mahal facade, City Palace museum collections, and ancient sun observatory Jantar Mantar." },
      { day: 3, title: "Artisan Bazaars & Folk Culture", details: "Shop block-printed textiles at Bapu Bazaar, savor pyaz kachori, experience Chokhi Dhani ethnic village." },
      { day: 4, title: "Stepwells & Craft Villages", details: "Marvel at Panna Meena ka Kund stepwell architecture and visit Sanganer paper/textile printing units." }
    ],
    costBreakdown: {
      stay: 15,
      food: 10,
      activities: 6,
      transport: 4
    }
  },
  {
    id: "santorini-greece",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    tagline: "Cobblestone cliffside lanes, whitewashed villas, and Aegean sunsets.",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviewsCount: 2150,
    dailyBudgetUSD: 150,
    budgetTier: "Luxury",
    idealDurationDays: 4,
    bestSeason: "Summer",
    climate: "Tropical",
    vibes: ["Romantic", "Beach", "Culture", "Foodie"],
    companions: ["Couple", "Friends"],
    activityLevel: "Moderate",
    safetyScore: 9.7,
    visaType: "Schengen Visa",
    coordinates: { lat: 36.3932, lng: 25.4615 },
    highlights: [
      "Watching the world-famous sunset from Oia Castle",
      "Sailing the volcanic caldera and swimming in hot springs",
      "Hiking the picturesque clifftop trail from Fira to Oia",
      "Sampling crisp Assyrtiko volcanic wine at cliffside wineries"
    ],
    itinerary: [
      { day: 1, title: "Oia Sunset & Whitewashed Streets", details: "Wander blue-domed church alleys in Oia, dinner at a cliffside taverna watching golden hour." },
      { day: 2, title: "Caldera Catamaran Sailing", details: "Full-day luxury catamaran cruise to Red Beach, White Beach, and volcanic mineral hot springs." },
      { day: 3, title: "Fira to Oia Clifftop Trek", details: "Scenic 10km caldera rim hike offering breathtaking vistas over the Aegean Sea." },
      { day: 4, title: "Wine Tasting & Akrotiri Ruins", details: "Tour ancient Minoan ruins of Akrotiri and volcanic winery cellar tasting." }
    ],
    costBreakdown: {
      stay: 80,
      food: 35,
      activities: 25,
      transport: 10
    }
  },
  {
    id: "banff-canada",
    name: "Banff National Park",
    country: "Canada",
    continent: "North America",
    tagline: "Glacial turquoise lakes, rugged Rocky Mountains, and pristine wildlife.",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1000&q=80",
    rating: 4.92,
    reviewsCount: 1680,
    dailyBudgetUSD: 110,
    budgetTier: "Moderate",
    idealDurationDays: 5,
    bestSeason: "Summer",
    climate: "Pleasant",
    vibes: ["Mountain", "Adventure", "Serenity", "Wildlife"],
    companions: ["Family", "Couple", "Friends", "Solo"],
    activityLevel: "High",
    safetyScore: 9.8,
    visaType: "eTA / Visitor Visa",
    coordinates: { lat: 51.1784, lng: -115.5708 },
    highlights: [
      "Canoeing on glowing turquoise Lake Louise & Moraine Lake",
      "Driving the breathtaking Icefields Parkway",
      "Banff Gondola summit ride over 6 mountain ranges",
      "Spotting elk, bighorn sheep, and black bears in natural habitat"
    ],
    itinerary: [
      { day: 1, title: "Banff Town & Sulphur Mountain", details: "Ride Banff Gondola to Sulphur mountain boardwalk, dip into Banff Upper Hot Springs." },
      { day: 2, title: "The Twin Gems: Louise & Moraine", details: "Sunrise at Moraine Lake's Valley of the Ten Peaks, rent a red canoe on Lake Louise." },
      { day: 3, title: "Icefields Parkway & Glacier Walk", details: "Drive scenic highway, ride the massive Ice Explorer onto Athabasca Glacier." },
      { day: 4, title: "Johnston Canyon & Ink Pots", details: "Walk suspended catwalks past lower and upper waterfalls to vibrant bubbling mineral springs." },
      { day: 5, title: "Bow Lake & Wildlife Safari", details: "Spot wildlife near Vermilion Lakes and enjoy campfire lakeside dinner." }
    ],
    costBreakdown: {
      stay: 60,
      food: 28,
      activities: 14,
      transport: 8
    }
  },
  {
    id: "goa-india",
    name: "Goa",
    country: "India",
    continent: "Asia",
    tagline: "Golden beaches, Portuguese colonial architecture, seafood feasts, and vibrant nightlife.",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
    rating: 4.75,
    reviewsCount: 2850,
    dailyBudgetUSD: 38,
    budgetTier: "Backpacker",
    idealDurationDays: 5,
    bestSeason: "Winter",
    climate: "Tropical",
    vibes: ["Beach", "Nightlife", "Foodie", "Adventure"],
    companions: ["Friends", "Solo", "Couple"],
    activityLevel: "Moderate",
    safetyScore: 8.9,
    visaType: "eVisa (Fast-track)",
    coordinates: { lat: 15.2993, lng: 74.124 },
    highlights: [
      "Beach shacks and water sports at Palolem & Vagator",
      "UNESCO-listed Basilica of Bom Jesus & Old Goa churches",
      "Fontainhas Latin Quarter colorful heritage walk",
      "Spice plantation tour & authentic Goan fish curry lunch"
    ],
    itinerary: [
      { day: 1, title: "North Goa Beaches & Sunsets", details: "Anjuna flea market, parasailing at Calangute, sunset cocktails at Vagator cliff shacks." },
      { day: 2, title: "Portuguese Heritage Trail", details: "Walk quaint pastel lanes of Fontainhas Latin Quarter, visit Se Cathedral and Bom Jesus in Old Goa." },
      { day: 3, title: "Spice Plantation & Dudhsagar Falls", details: "Jeep safari to roaring four-tiered Dudhsagar waterfall, traditional lunch at tropical spice farm." },
      { day: 4, title: "Peaceful South Goa Shoreline", details: "Kayak around Palolem backwaters, dolphin spotting boat trip, butterfly beach." },
      { day: 5, title: "Sunset Cruise & Live Music", details: "Mandovi river luxury cruise with Goan folk performances and beach party." }
    ],
    costBreakdown: {
      stay: 18,
      food: 11,
      activities: 5,
      transport: 4
    }
  },
  {
    id: "queenstown-nz",
    name: "Queenstown",
    country: "New Zealand",
    continent: "Oceania",
    tagline: "The world adventure capital nestled beside Lake Wakatipu and the Remarkables.",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1000&q=80",
    rating: 4.94,
    reviewsCount: 1130,
    dailyBudgetUSD: 135,
    budgetTier: "Luxury",
    idealDurationDays: 5,
    bestSeason: "Summer",
    climate: "Pleasant",
    vibes: ["Adventure", "Mountain", "Serenity", "Foodie"],
    companions: ["Friends", "Solo", "Couple"],
    activityLevel: "High",
    safetyScore: 9.9,
    visaType: "NZeTA",
    coordinates: { lat: -45.0312, lng: 168.6626 },
    highlights: [
      "Kawarau Bridge original world bungy jump & canyon swing",
      "Scenic cruise through dramatic Milford Sound fjords",
      "Skyline Gondola with panoramic mountain-lake luge runs",
      "Central Otago Pinot Noir wine trail and legendary Fergburger"
    ],
    itinerary: [
      { day: 1, title: "Skyline Views & Lake Wakatipu", details: "Skyline Gondola to Bob's Peak, race downhill luge carts, historic TSS Earnslaw steamship cruise." },
      { day: 2, title: "Milford Sound Wonder of the World", details: "Day tour into Fiordland National Park, cruise past towering Mitre Peak and tumbling waterfalls." },
      { day: 3, title: "Adrenaline Day: Bungy & Shotover Jet", details: "Leap off historic Kawarau Suspension Bridge, scream through Shotover river canyons in jetboat." },
      { day: 4, title: "Historic Arrowtown & Winery Trail", details: "Gold mining history in Arrowtown, cycle through Gibbston Valley sampling world-class pinot noir." },
      { day: 5, title: "Ben Lomond Summit Hike", details: "Challenge yourself with alpine hike to Ben Lomond summit for 360-degree Southern Alps panorama." }
    ],
    costBreakdown: {
      stay: 70,
      food: 32,
      activities: 25,
      transport: 8
    }
  },
  {
    id: "cape-town-sa",
    name: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    tagline: "Where dramatic oceans meet iconic Table Mountain, penguin beaches, and winelands.",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1000&q=80",
    rating: 4.86,
    reviewsCount: 1390,
    dailyBudgetUSD: 65,
    budgetTier: "Moderate",
    idealDurationDays: 5,
    bestSeason: "Summer",
    climate: "Pleasant",
    vibes: ["Adventure", "Beach", "Culture", "Foodie", "Wildlife"],
    companions: ["Solo", "Couple", "Friends"],
    activityLevel: "High",
    safetyScore: 8.5,
    visaType: "Visa on Arrival / eVisa",
    coordinates: { lat: -33.9249, lng: 18.4241 },
    highlights: [
      "Table Mountain rotating aerial cableway to the summit",
      "Boulders Beach wild African penguin colony encounter",
      "Scenic drive along Chapman's Peak to Cape of Good Hope",
      "Stellenbosch and Franschhoek historic vineyard wine tram"
    ],
    itinerary: [
      { day: 1, title: "Table Mountain & V&A Waterfront", details: "Ride cable car to Table Mountain summit, explore vibrant V&A Waterfront harbor and foodie sheds." },
      { day: 2, title: "Cape Peninsula & Boulders Penguins", details: "Drive Chapman's Peak Drive, photograph penguins waddling at Boulders Beach, visit Cape Point lighthouse." },
      { day: 3, title: "Cape Winelands Tram Experience", details: "Hop-on hop-off Franschhoek wine tram touring historic Dutch-colonial wine estates." },
      { day: 4, title: "Kirstenbosch & Bo-Kaap Heritage", details: "Trek the Boomslang canopy walkway at Kirstenbosch Botanical Gardens, tour brightly painted Bo-Kaap." },
      { day: 5, title: "Robben Island & Sunset at Lion's Head", details: "Ferry to Nelson Mandela's prison cell on Robben Island, evening hike up Lion's Head for sunset." }
    ],
    costBreakdown: {
      stay: 35,
      food: 16,
      activities: 10,
      transport: 4
    }
  },
  {
    id: "reykjavik-iceland",
    name: "Reykjavik & Golden Circle",
    country: "Iceland",
    continent: "Europe",
    tagline: "Land of fire and ice: Northern Lights, erupting geysers, and geothermal spas.",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80",
    rating: 4.88,
    reviewsCount: 1290,
    dailyBudgetUSD: 155,
    budgetTier: "Luxury",
    idealDurationDays: 5,
    bestSeason: "Winter",
    climate: "Snow",
    vibes: ["Serenity", "Adventure", "Mountain", "Romantic"],
    companions: ["Couple", "Solo", "Friends"],
    activityLevel: "Moderate",
    safetyScore: 9.9,
    visaType: "Schengen Visa",
    coordinates: { lat: 64.1466, lng: -21.9426 },
    highlights: [
      "Hunting Aurora Borealis (Northern Lights) across dark skies",
      "Blue Lagoon mineral geothermal waters silica mud masks",
      "Golden Circle: Gullfoss waterfall, Geysir, and Thingvellir",
      "Exploring natural blue crystal ice caves inside glaciers"
    ],
    itinerary: [
      { day: 1, title: "Reykjavik & Blue Lagoon", details: "Soak in milky blue geothermal waters of Blue Lagoon, explore Hallgrimskirkja and Harpa concert hall." },
      { day: 2, title: "The Classic Golden Circle", details: "Walk between tectonic plates at Thingvellir, watch Strokkur geyser erupt, gaze at Gullfoss falls." },
      { day: 3, title: "South Coast Waterfalls & Black Sand", details: "Walk behind Seljalandsfoss waterfall, climb Skogafoss, walk moody basalt columns of Reynisfjara beach." },
      { day: 4, title: "Crystal Ice Caves & Glacier Hike", details: "Strap on crampons to hike Skaftafell glacier and marvel inside sapphire blue ice tunnels." },
      { day: 5, title: "Jokulsarlon Glacier Lagoon & Auroras", details: "Boat past floating icebergs at Jokulsarlon, watch ice diamonds melt on black sand, night aurora chase." }
    ],
    costBreakdown: {
      stay: 80,
      food: 40,
      activities: 25,
      transport: 10
    }
  },
  {
    id: "dubai-uae",
    name: "Dubai",
    country: "UAE",
    continent: "Middle East",
    tagline: "Futuristic architecture, luxury shopping, desert dunes, and ultra-modern hospitality.",
    category: "Urban",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    rating: 4.82,
    reviewsCount: 2900,
    dailyBudgetUSD: 120,
    budgetTier: "Moderate",
    idealDurationDays: 4,
    bestSeason: "Winter",
    climate: "Tropical",
    vibes: ["Urban", "Foodie", "Nightlife", "Adventure"],
    companions: ["Family", "Couple", "Friends"],
    activityLevel: "Moderate",
    safetyScore: 9.6,
    visaType: "Instant eVisa",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    highlights: [
      "Panoramic views from Burj Khalifa 148th floor observatory",
      "Desert 4x4 dune bashing safari with BBQ & stargazing",
      "Museum of the Future interactive exhibits",
      "Dubai Fountain dancing water & light show at Dubai Mall"
    ],
    itinerary: [
      { day: 1, title: "Downtown Dubai & Burj Khalifa", details: "Ascend Burj Khalifa, watch Dubai Mall aquarium, evening synchronized fountain show." },
      { day: 2, title: "Old Dubai Souks & Desert Safari", details: "Abra boat across Dubai Creek, browse Gold & Spice souks, afternoon desert dune bashing & camel ride." },
      { day: 3, title: "Palm Jumeirah & Marina Yacht", details: "View Palm Jumeirah from The View, relaxing sunset luxury yacht cruise along Dubai Marina." },
      { day: 4, title: "Museum of the Future & Souk Madinat", details: "Tour architectural marvel Museum of the Future, dinner overlooking Burj Al Arab at Madinat Jumeirah." }
    ],
    costBreakdown: {
      stay: 65,
      food: 30,
      activities: 18,
      transport: 7
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DESTINATIONS_DATA };
}

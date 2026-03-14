import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
  date,
  index,
} from "drizzle-orm/pg-core";

// =====================================
// VILLAGES
// =====================================

export const villages = pgTable(
  "villages",
  {
    id: serial("id").primaryKey(),

    name: text("name"),
    localName: text("local_name"),

    taluka: text("taluka"),
    district: text("district"),
    state: text("state"),

    region: text("region"),
    division: text("division"),

    language: text("language"),

    elevationMeters: integer("elevation_meters"),
    stdCode: text("std_code"),

    assemblyConstituency: text("assembly_constituency"),
    assemblyMla: text("assembly_mla"),

    loksabhaConstituency: text("loksabha_constituency"),
    parliamentMp: text("parliament_mp"),

    pinCode: text("pin_code"),
    postOffice: text("post_office"),

    overview: text("overview"),
    about: text("about"),

    scrapedUrl: text("scraped_url").unique(),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    pinCodeIdx: index("idx_villages_pin_code").on(table.pinCode),
  }),
);

// =====================================
// POPULATION
// =====================================

export const villagePopulation = pgTable("village_population", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  totalPopulation: integer("total_population"),
  totalHouses: integer("total_houses"),

  femalePopulationPercent: numeric("female_population_percent", {
    precision: 5,
    scale: 2,
  }),
  femalePopulation: integer("female_population"),

  literacyRate: numeric("literacy_rate", { precision: 5, scale: 2 }),
  literacyTotal: integer("literacy_total"),

  femaleLiteracyRate: numeric("female_literacy_rate", {
    precision: 5,
    scale: 2,
  }),
  femaleLiterate: integer("female_literate"),

  scheduledTribePercent: numeric("scheduled_tribe_percent", {
    precision: 5,
    scale: 2,
  }),
  scheduledTribePopulation: integer("scheduled_tribe_population"),

  scheduledCastePercent: numeric("scheduled_caste_percent", {
    precision: 5,
    scale: 2,
  }),
  scheduledCastePopulation: integer("scheduled_caste_population"),

  workingPopulationPercent: numeric("working_population_percent", {
    precision: 5,
    scale: 2,
  }),

  childPopulation: integer("child_population"),
  girlChildPercent: numeric("girl_child_percent", { precision: 5, scale: 2 }),
  girlChildPopulation: integer("girl_child_population"),
});

// =====================================
// WEATHER
// =====================================

export const villageWeather = pgTable("village_weather", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  temperatureC: numeric("temperature_c", { precision: 5, scale: 2 }),
  condition: text("condition"),

  humidityPercent: integer("humidity_percent"),
  windSpeed: numeric("wind_speed", { precision: 6, scale: 2 }),
  windDirection: text("wind_direction"),

  stationName: text("station_name"),
  observedMinutesAgo: integer("observed_minutes_ago"),
});

// =====================================
// WEATHER FORECAST
// =====================================

export const weatherForecast = pgTable("weather_forecast", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  forecastDate: date("forecast_date"),

  minTemp: numeric("min_temp", { precision: 5, scale: 2 }),
  maxTemp: numeric("max_temp", { precision: 5, scale: 2 }),

  description: text("description"),
});

// =====================================
// HIGHWAYS
// =====================================

export const highways = pgTable("highways", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  highwayName: text("highway_name"),
});

// =====================================
// RIVERS
// =====================================

export const rivers = pgTable("rivers", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  riverName: text("river_name"),
});

// =====================================
// PLACES (bus stops, temples, atms etc.)
// =====================================

export const places = pgTable(
  "places",
  {
    id: serial("id").primaryKey(),

    villageId: integer("village_id").references(() => villages.id, {
      onDelete: "cascade",
    }),

    category: text("category"),

    name: text("name"),
    address: text("address"),

    distanceKm: numeric("distance_km", { precision: 6, scale: 2 }),

    rawText: text("raw_text"),
  },
  (table) => ({
    categoryIdx: index("idx_places_category").on(table.category),
    villageIdx: index("idx_places_village").on(table.villageId),
  }),
);

// =====================================
// NEARBY LOCATIONS
// =====================================

export const nearbyLocations = pgTable(
  "nearby_locations",
  {
    id: serial("id").primaryKey(),

    villageId: integer("village_id").references(() => villages.id, {
      onDelete: "cascade",
    }),

    category: text("category"),

    name: text("name"),

    distanceKm: numeric("distance_km", { precision: 6, scale: 2 }),
  },
  (table) => ({
    categoryIdx: index("idx_nearby_category").on(table.category),
  }),
);

// =====================================
// POLLING STATIONS
// =====================================

export const pollingStations = pgTable("polling_stations", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  stationName: text("station_name"),
});

// =====================================
// COLLEGES
// =====================================

export const colleges = pgTable("colleges", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  name: text("name"),
  address: text("address"),
});

// =====================================
// SCHOOLS
// =====================================

export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  name: text("name"),
  address: text("address"),
});

// =====================================
// HEALTH CENTERS
// =====================================

export const healthCenters = pgTable("health_centers", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  name: text("name"),
  address: text("address"),
});

// =====================================
// VILLAGE TALKS
// =====================================

export const villageTalks = pgTable("village_talks", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  message: text("message"),

  createdAt: timestamp("created_at").defaultNow(),
});

// =====================================
// VILLAGE MEMBERS
// =====================================

export const villageMembers = pgTable("village_members", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade",
  }),

  username: text("username"),
});

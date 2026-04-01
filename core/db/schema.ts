import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  numeric,
  date,
  index,
  jsonb,
  boolean } from
"drizzle-orm/pg-core";





export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkId: text("clerk_id").unique().notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  imageUrl: text("image_url"),

  district: text("district"),
  legalAccepted: boolean("legal_accepted"),
  phoneNumber: text("phone_number"),
  role: text("role"),
  taluka: text("taluka"),
  village: text("village"),
  villageId: text("village_id"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





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

    createdAt: timestamp("created_at").defaultNow()
  },
  (table) => ({
    pinCodeIdx: index("idx_villages_pin_code").on(table.pinCode)
  })
);





export const villagePopulation = pgTable("village_population", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  totalPopulation: integer("total_population"),
  totalHouses: integer("total_houses"),

  femalePopulationPercent: numeric("female_population_percent", {
    precision: 5,
    scale: 2
  }),
  femalePopulation: integer("female_population"),

  literacyRate: numeric("literacy_rate", { precision: 5, scale: 2 }),
  literacyTotal: integer("literacy_total"),

  femaleLiteracyRate: numeric("female_literacy_rate", {
    precision: 5,
    scale: 2
  }),
  femaleLiterate: integer("female_literate"),

  scheduledTribePercent: numeric("scheduled_tribe_percent", {
    precision: 5,
    scale: 2
  }),
  scheduledTribePopulation: integer("scheduled_tribe_population"),

  scheduledCastePercent: numeric("scheduled_caste_percent", {
    precision: 5,
    scale: 2
  }),
  scheduledCastePopulation: integer("scheduled_caste_population"),

  workingPopulationPercent: numeric("working_population_percent", {
    precision: 5,
    scale: 2
  }),

  childPopulation: integer("child_population"),
  girlChildPercent: numeric("girl_child_percent", { precision: 5, scale: 2 }),
  girlChildPopulation: integer("girl_child_population")
});





export const villageWeather = pgTable("village_weather", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  temperatureC: numeric("temperature_c", { precision: 5, scale: 2 }),
  condition: text("condition"),

  humidityPercent: integer("humidity_percent"),
  windSpeed: numeric("wind_speed", { precision: 6, scale: 2 }),
  windDirection: text("wind_direction"),

  stationName: text("station_name"),
  observedMinutesAgo: integer("observed_minutes_ago")
});





export const weatherForecast = pgTable("weather_forecast", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  forecastDate: date("forecast_date"),

  minTemp: numeric("min_temp", { precision: 5, scale: 2 }),
  maxTemp: numeric("max_temp", { precision: 5, scale: 2 }),

  description: text("description")
});





export const highways = pgTable("highways", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  highwayName: text("highway_name")
});





export const rivers = pgTable("rivers", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  riverName: text("river_name")
});





export const places = pgTable(
  "places",
  {
    id: serial("id").primaryKey(),

    villageId: integer("village_id").references(() => villages.id, {
      onDelete: "cascade"
    }),

    category: text("category"),

    name: text("name"),
    address: text("address"),

    distanceKm: numeric("distance_km", { precision: 6, scale: 2 }),

    rawText: text("raw_text")
  },
  (table) => ({
    categoryIdx: index("idx_places_category").on(table.category),
    villageIdx: index("idx_places_village").on(table.villageId)
  })
);





export const nearbyLocations = pgTable(
  "nearby_locations",
  {
    id: serial("id").primaryKey(),

    villageId: integer("village_id").references(() => villages.id, {
      onDelete: "cascade"
    }),

    category: text("category"),

    name: text("name"),

    distanceKm: numeric("distance_km", { precision: 6, scale: 2 })
  },
  (table) => ({
    categoryIdx: index("idx_nearby_category").on(table.category)
  })
);





export const pollingStations = pgTable("polling_stations", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  stationName: text("station_name")
});





export const colleges = pgTable("colleges", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  name: text("name"),
  address: text("address")
});





export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  name: text("name"),
  address: text("address")
});





export const healthCenters = pgTable("health_centers", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  name: text("name"),
  address: text("address")
});





export const villageTalks = pgTable("village_talks", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  message: text("message"),

  createdAt: timestamp("created_at").defaultNow()
});





export const villageMembers = pgTable("village_members", {
  id: serial("id").primaryKey(),

  villageId: integer("village_id").references(() => villages.id, {
    onDelete: "cascade"
  }),

  username: text("username")
});





export const customVillageInfo = pgTable("custom_village_info", {
  id: serial("id").primaryKey(),
  villageIdString: text("village_id_string").unique(),

  about: text("about"),


  totalPopulation: integer("total_population"),
  malePopulation: integer("male_population"),
  femalePopulation: integer("female_population"),


  childrenCount: integer("children_count"),
  youthCount: integer("youth_count"),
  adultsCount: integer("adults_count"),
  seniorsCount: integer("seniors_count"),


  address: text("address"),
  phone: text("phone"),
  email: text("email"),


  images: jsonb("images").$type<Array<{url: string;title: string;type: string;isPrimary: boolean;}>>(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email"),
  password: text("password"),
  name: text("name"),
  isActive: boolean("is_active"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});





export const propertyTaxes = pgTable("property_taxes", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  invoiceId: text("invoice_id"),
  propertyId: text("property_id"),
  ownerName: text("owner_name"),
  financialYear: text("financial_year"),

  amount: numeric("amount", { precision: 10, scale: 2 }),
  paymentDate: date("payment_date"),

  status: text("status").default("Pending"),
  referenceNumber: text("reference_number"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const waterTaxes = pgTable("water_taxes", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  invoiceId: text("invoice_id"),
  connectionId: text("connection_id"),
  connectionType: text("connection_type"),
  ownerName: text("owner_name"),
  financialYear: text("financial_year"),

  amount: numeric("amount", { precision: 10, scale: 2 }),
  paymentDate: date("payment_date"),

  status: text("status").default("Pending"),
  referenceNumber: text("reference_number"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const electricityBills = pgTable("electricity_bills", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  invoiceId: text("invoice_id"),
  meterId: text("meter_id"),
  meterType: text("meter_type"),
  ownerName: text("owner_name"),
  financialYear: text("financial_year"),
  unitsConsumed: integer("units_consumed"),

  amount: numeric("amount", { precision: 10, scale: 2 }),
  paymentDate: date("payment_date"),

  status: text("status").default("Pending"),
  referenceNumber: text("reference_number"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  complaintId: text("complaint_id"),
  title: text("title"),
  description: text("description"),
  category: text("category"),
  location: text("location"),

  citizenName: text("citizen_name"),
  citizenContact: text("citizen_contact"),

  priority: text("priority").default("Medium"),
  status: text("status").default("Pending"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const panchayatMembers = pgTable("panchayat_members", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),

  name: text("name").notNull(),
  position: text("position").notNull(),
  imageUrl: text("image_url"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const schemes = pgTable("schemes", {
  id: serial("id").primaryKey(),
  villageId: text("village_id"),
  userId: text("user_id"),
  schemeId: text("scheme_id").unique(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  amount: numeric("amount", { precision: 12, scale: 2 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  eligible: text("eligible"),
  link: text("link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const suggestions = pgTable("suggestions", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  suggestionId: text("suggestion_id"),
  subject: text("subject"),
  message: text("message").notNull(),
  category: text("category"),
  citizenName: text("citizen_name"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  title: text("title").notNull(),
  message: text("message").notNull(),
  audience: text("audience").default("All"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});





export const developmentWorks = pgTable("development_works", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  projectId: text("project_id").unique(),
  name: text("name").notNull(),
  description: text("description"),
  contractor: text("contractor"),
  budget: numeric("budget", { precision: 14, scale: 2 }),
  progress: integer("progress").default(0),
  status: text("status").default("Pending Start"),

  startDate: date("start_date"),
  expectedEndDate: date("expected_end_date"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),

  villageId: text("village_id"),
  userId: text("user_id"),

  certificateId: text("certificate_id").unique(),
  certificateType: text("certificate_type").notNull(),
  
  applicantName: text("applicant_name"),
  applicantContact: text("applicant_contact"),

  status: text("status").default("Pending"),
  formData: jsonb("form_data"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
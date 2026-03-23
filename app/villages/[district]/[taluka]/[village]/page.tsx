import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AnimatedCounter from "@/components/AnimatedCounter";
import VillageGlimpses from "@/components/VillageGlimpses";
import PopulationCharts from "@/components/PopulationCharts";
import {
  Bus,
  CalendarDays,
  Globe,
  GraduationCap,
  Hospital,
  House,
  IndianRupee,
  Landmark,
  MapPin,
  TriangleAlert,
  Users,
} from "lucide-react";

export default function VillagePage() {
  const villageData = {
    basic_info: {
      "Locality Name ": "Takarkhed ( ताकारखेड )",
      "Taluka Name": " Nandura",
      District: " Buldhana",
      State: " Maharashtra",
      "Region ": "Vidarbha",
      "Division ": "Amravati",
      "Language ": "Ahirani and A Kandeshi,marathi, Bhili, Andh, Indo-aryan",
      "Current Time": "0603 PM",
      Date: "Friday , Mar 13,2026 (IST)",
      "Time zone": "IST (UTC+530)",
      "Elevation / Altitude": "267 meters.",
      "Telephone Code / Std Code": "07263",
      "Assembly MLA ": "Ekade Rajesh Panditrao",
      "Parliament MP ": "Khadse Raksha Nikhil",
      "Post Office Name": " Motala",
    },
    about:
      "Takarkhed is a Village in Nandura Taluka in Buldhana District of Maharashtra State, India. It belongs to Vidarbha region . It belongs to Amravati Division . It is located 26 KM towards North from District head quarters Buldhana. 19 KM from Nandura. 474 KM from State capital Mumbai Takarkhed Pin code is 443103 and postal head office is Motala . Fuli ( 3 KM ) , Khaira ( 4 KM ) , Advihir ( 5 KM ) , Pimpalkhuta Bk ( 5 KM ) , Jawala Bazar ( 6 KM ) are the nearby Villages to Takarkhed. Takarkhed is surrounded by Nandura Taluka towards East , Malkapur Taluka towards North , Buldhana Taluka towards South , Khamgaon Taluka towards East . Nandura , Malkapur , Shegaon , Bhusawal are the near by Cities to Takarkhed.",
    population: {
      "Total Population": "3424",
      "Total No of Houses": "799",
      "Female Population %": "48.2 % ( 1651)",
      "Total Literacy rate %": "77.3 % ( 2646)",
      "Female Literacy rate": "35.0 % ( 1197)",
      "Scheduled Tribes Population %": "7.2 % ( 245)",
      "Scheduled Caste Population %": "8.6 % ( 293)",
      "Working Population %": "50.6 %",
      "Child(0 -6) Population by 2011": "379",
      "Girl Child(0 -6) Population % by 2011": "42.2 % ( 160)",
    },
    places: {
      "Bus Stops in Takarkhed,Nandura": [
        {
          name: "Advihir Bus Stop",
          details:
            "Advihir Bus Stop MH SH 196; Maharashtra 443103; India 6.0 KM distance Detail",
        },
        {
          name: "Motala Bus Station",
          details:
            "Motala Bus Station MH SH 188; Phata; Motala; Maharashtra 443103; India 11.9 KM distance Detail",
        },
        {
          name: "Dabhadi Bus Stand",
          details:
            "Dabhadi Bus Stand Dabhadi; Maharashtra 443102; India 14.6 KM distance Detail",
        },
        {
          name: "Toll Ways",
          details:
            "Toll Ways Buldana; SH-176; Malkapur Buldhana Chikhli Jalna Road; Buldhana; Buldhana; Maharashtra 443101; India 15.7 KM distance Detail",
        },
      ],
      "ATMs in Takarkhed,Nandura": [
        {
          name: "Bank of Maharashtra ATM",
          details:
            "Bank of Maharashtra ATM Nandura; Buldana; SH-196; Motala Nandura Khandvi Road; Buldhana; Buldhana; Maharashtra 443103; India 2.8 KM distance CashStatus",
        },
        {
          name: "Bank of Maharashtra",
          details:
            "Bank of Maharashtra Nandura; Buldana SH-196; Nandura Khandvi Road; Buldhana; Motala; Maharashtra 443103; India 2.8 KM distance CashStatus",
        },
        {
          name: "SBI ATM",
          details:
            "SBI ATM Motala; Maharashtra 443103; India 11.0 KM distance CashStatus",
        },
        {
          name: "Malkapur Urbun ATM",
          details:
            "Malkapur Urbun ATM Phata; Motala; Maharashtra 443103; India 11.3 KM distance CashStatus",
        },
      ],
      "Cinema Theaters in Takarkhed,Nandura": [
        {
          name: "Hanuman Cinema",
          details:
            "Hanuman Cinema Malkapur-Buldana Rd; Vishnuwadi; Malkapur; Maharashtra 443101; India 22.6 KM distance Detail",
        },
        {
          name: "Gajanan Movie Hall",
          details:
            "Gajanan Movie Hall Old- Town; Malkapur; Maharashtra 443101; India 22.6 KM distance Detail",
        },
      ],
      "Temples in Takarkhed,Nandura": [
        {
          name: "Vitthal Mandir",
          details:
            "Vitthal Mandir Takarkhed; Maharashtra 443103; India 0.2 KM distance Detail",
        },
        {
          name: "Shrikrishna Mandir",
          details:
            "Shrikrishna Mandir Takarkhed; Maharashtra 443103; India 0.3 KM distance Detail",
        },
        {
          name: "Hanuman Mandir",
          details:
            "Hanuman Mandir Takarkhed; Maharashtra 443103; India 0.3 KM distance Detail",
        },
        {
          name: "Datt Mandir",
          details:
            "Datt Mandir Takarkhed; Maharashtra 443103; India 0.3 KM distance Detail",
        },
      ],
      "Mosques in Takarkhed,Nandura": [
        {
          name: "Masjid; Jaipur",
          details:
            "Masjid; Jaipur Jaipur; Maharashtra 443103; India 6.2 KM distance Detail",
        },
        {
          name: "Merkaz Masjid",
          details:
            "Merkaz Masjid Shree Ram Nagar; Motala; Maharashtra 443103; India 10.6 KM distance Detail",
        },
        {
          name: "Rahmat-e-Aalam Masjid",
          details:
            "Rahmat-e-Aalam Masjid Motala; Maharashtra 443103; India 10.7 KM distance Detail",
        },
      ],
      "Hotels ,Lodges in Takarkhed,Nandura": [
        {
          name: "Bulura Javda",
          details:
            "Bulura Javda Belura; Maharashtra 443103; India 4.9 KM distance Detail",
        },
        {
          name: "Prashante TALELE",
          details:
            "Prashante TALELE Talkhed; Maharashtra 443103; India 6.6 KM distance Detail",
        },
        {
          name: "Mari Mata Mandir",
          details:
            "Mari Mata Mandir Mendhali; Maharashtra 443102; India 7.4 KM distance Detail",
        },
        {
          name: "PWD Rest House",
          details:
            "PWD Rest House Nandura; Buldana; SH-196; Motala Nandura Khandvi Road; Buldhana; Buldhana; Maharashtra 443103; India 9.0 KM distance Detail",
        },
        {
          name: "Hotel New Lucky Tea Point",
          details:
            "Hotel New Lucky Tea Point Motala; Maharashtra 443103; India 10.6 KM distance Detail",
        },
      ],
      "Restaurants in Takarkhed,Nandura": [
        {
          name: "राहुल.संभारे",
          details:
            "राहुल.संभारे Shemba Rd; Takarkhed; Maharashtra 443103; India 0.3 KM distance Detail",
        },
        {
          name: "संभारे.हाटेल",
          details:
            "संभारे.हाटेल Nandura Rd; Shemba; Maharashtra 443103; India 2.7 KM distance Detail",
        },
        {
          name: "Shhagan Dhaba",
          details:
            "Shhagan Dhaba Tandulwadi Pr.Rajur; Maharashtra 443103; India 3.5 KM distance Detail",
        },
        {
          name: "Bunty Dhaba",
          details:
            "Bunty Dhaba Buldana; Maharashtra 443103; India 4.5 KM distance Detail",
        },
        {
          name: "Peer Baba Darga",
          details:
            "Peer Baba Darga MH SH 196; Tarwadi; Maharashtra 443103; India 7.8 KM distance Detail",
        },
      ],
      "Hospitals in Takarkhed,Nandura": [
        {
          name: "Primary Health Centre Takarkhed",
          details:
            "Primary Health Centre Takarkhed Buldana; Maharashtra 443103; India 0.9 KM distance Detail",
        },
        {
          name: "Primary Helth Center SHEMBA",
          details:
            "Primary Helth Center SHEMBA Shemba; Maharashtra 443103; India 2.8 KM distance Detail",
        },
        {
          name: "Tujai Hospital",
          details:
            "Tujai Hospital Nandura; Buldana; SH-196; Motala Nandura Khandvi Road; Buldhana; Buldhana; Maharashtra 443103; India 2.8 KM distance Detail",
        },
        {
          name: "Primary Health Centre",
          details:
            "Primary Health Centre Nandura; Buldana; SH-196; Motala Nandura Khandvi Road; Buldhana; Buldhana; Maharashtra 444306; India 2.8 KM distance Detail",
        },
      ],
      "Petrol Bunks in Takarkhed,Nandura": [
        {
          name: "shree petroleum Bharat Petroleum dealer",
          details:
            "shree petroleum Bharat Petroleum dealer Motala; SH-176malkapur Buldhana Chikhli Jalna Road; Buldhana; buldana; Maharashtra 443103; India 9.9 KM distance Detail",
        },
        {
          name: "Shree Petroleum Bpcl Dealer Motala",
          details:
            "Shree Petroleum Bpcl Dealer Motala Buldana Rd; Malkapur; Maharashtra 443103; India 10.5 KM distance Detail",
        },
        {
          name: "Hindustan Petroleum",
          details:
            "Hindustan Petroleum Borakhedi; Buldana; SH-176; Malkapur Buldhana Chikhli Jalna Road; Buldhana; Buldhana; Maharashtra 443103; India 11.2 KM distance Detail",
        },
        {
          name: "HP PETROL PUMP - SHREE SEVAGIR BABA PETROLEUM",
          details:
            "HP PETROL PUMP - SHREE SEVAGIR BABA PETROLEUM Malkapur-Buldana Rd; Motala; Maharashtra 443103; India 11.2 KM distance Detail",
        },
      ],
      "Colleges in Takarkhed,Nandura": [
        {
          name: "Shri Pundlik Maharaj Mahavidyalaya",
          details:
            "Shri Pundlik Maharaj Mahavidyalaya Near Kartun Market; Buldana; Nandura; Maharashtra 443404; India 3.7 KM distance Detail",
        },
        {
          name: "Sopan Khakare",
          details:
            "Sopan Khakare Talkhed; Maharashtra 443103; India 6.6 KM distance Detail",
        },
        {
          name: "Shri Shivaji Arts;Commerce & Science College",
          details:
            "Shri Shivaji Arts;Commerce & Science College SH 176; Motala; Maharashtra 443103; India 10.7 KM distance Detail",
        },
        {
          name: "Jawahar Urdu High Junior College Motala",
          details:
            "Jawahar Urdu High Junior College Motala Malkapur-Buldana Rd; Motala; Maharashtra 443103; India 11.0 KM distance Detail",
        },
      ],
      "Schools in Takarkhed,Nandura": [
        {
          name: "Z P Primery School",
          details:
            "Z P Primery School Takarkhed; Maharashtra 443103; India 0.4 KM distance Detail",
        },
        {
          name: "जय गजानन जेनस पालर",
          details:
            "जय गजानन जेनस पालर Shemba Kh.; Maharashtra 443103; India 2.0 KM distance Detail",
        },
        {
          name: "Krishi Vidyalaya Shemba",
          details:
            "Krishi Vidyalaya Shemba MH SH 196; Buldana; Maharashtra 443103; India 2.6 KM distance Detail",
        },
        {
          name: "Z.P Primary School Shemba",
          details:
            "Z.P Primary School Shemba Shemba; Maharashtra 443103; India 2.8 KM distance Detail",
        },
        {
          name: "Z P School",
          details:
            "Z P School Shemba; Maharashtra 443103; India 2.8 KM distance Detail",
        },
      ],
      "Electronic Shops in Takarkhed,Nandura": [
        {
          name: "Siddheshwar Motor Rewinding",
          details:
            "Siddheshwar Motor Rewinding Shemba; Maharashtra 443103; India 2.8 KM distance Detail",
        },
        {
          name: "Tejas Electronics",
          details:
            "Tejas Electronics MH SH 196; Shemba; Maharashtra 443103; India 3.1 KM distance Detail",
        },
        {
          name: "Sai Mobile Shopi",
          details:
            "Sai Mobile Shopi Belura; Maharashtra 443103; India 5.0 KM distance Detail",
        },
      ],
      "Super Markets in Takarkhed,Nandura": [
        {
          name: "Puratan Shiv Mandir Mendhali",
          details:
            "Puratan Shiv Mandir Mendhali Mendhali; Maharashtra 443102; India 7.1 KM distance Detail",
        },
        {
          name: "Vikrant Kirana Store",
          details:
            "Vikrant Kirana Store Motala; Maharashtra 443103; India 10.6 KM distance Detail",
        },
        {
          name: "Jay Gajanan Agro Egency",
          details:
            "Jay Gajanan Agro Egency Phata; Motala; Maharashtra 443103; India 11.3 KM distance Detail",
        },
      ],
      "Local Parks in Takarkhed,Nandura": [
        {
          name: "Chhoriya Park",
          details:
            "Chhoriya Park CHHORIYA TOWNSHIP; Wakodi; Maharashtra 443101; India 18.8 KM distance Detail",
        },
        {
          name: "Royal Park",
          details:
            "Royal Park Malkapur; Maharashtra 443101; India 20.9 KM distance Detail",
        },
        {
          name: "Deepika Infratech Pvt Ltd",
          details:
            "Deepika Infratech Pvt Ltd Wadi Pr.Wadner; Maharashtra 443404; India 20.9 KM distance Detail",
        },
      ],
      "Police Stations near Takarkhed,Nandura": [
        {
          name: "Police Station Borakhedi",
          details:
            "Police Station Borakhedi Antri Rd; Borakhedi; Maharashtra 443103; India 12.6 KM distance Detail",
        },
        {
          name: "पोलिस दूर क्षेत्र Police Chowky",
          details:
            "पोलिस दूर क्षेत्र Police Chowky Pimpri Gawali; Maharashtra 443102; India 16.1 KM distance Detail",
        },
        {
          name: "Police Station P. Raja",
          details:
            "Police Station P. Raja Pimpalgaon Raja; Maharashtra 444306; India 19.2 KM distance Detail",
        },
      ],
      "Governement Offices near Takarkhed,Nandura": [
        {
          name: "Swami machines",
          details:
            "Swami machines at advihir ; Tq.motala ;Dist .buldhana; Maharashtra 443103; India 5.4 KM distance Detail",
        },
        {
          name: "Gram Panchayat; Jaipur",
          details:
            "Gram Panchayat; Jaipur Jaipur; Maharashtra 443103; India 5.9 KM distance Detail",
        },
        {
          name: "Gram Panchayat Tarwadi",
          details:
            "Gram Panchayat Tarwadi Tarwadi; Maharashtra 443404; India 8.3 KM distance Detail",
        },
      ],
    },
    village_talks: ["Talk", "Post News or Events about this"],
  };

  const basicInfo = villageData.basic_info;
  const population = villageData.population;
  const trimValue = (value?: string) => value?.trim() || "-";
  const villageName = trimValue(basicInfo["Locality Name "])
    .split("(")[0]
    .trim();
  const mapSearchPath =
    `${villageName}+${trimValue(basicInfo["Taluka Name"])}+${trimValue(basicInfo.District)}+Maharashtra+India`.replace(
      /\s+/g,
      "+",
    );
  const mapSearchUrl = `https://www.google.com/maps?q=${mapSearchPath}&output=embed`;
  const mapurl = `https://www.google.com/maps/search/?api=1&query=${mapSearchPath}`;

  const extractPercent = (value?: string) => {
    const match = (value || "").match(/(\d+(?:\.\d+)?)\s*%/);
    return Number(match?.[1] || 0);
  };

  const extractNumber = (value?: string) => {
    const sanitized = (value || "").replace(/,/g, "");
    const match = sanitized.match(/(\d+(?:\.\d+)?)/);
    return Number(match?.[1] || 0);
  };

  const femalePopulationPercent = extractPercent(
    population["Female Population %"],
  );
  const workingPopulationPercent = extractPercent(
    population["Working Population %"],
  );
  const totalPopulation = extractNumber(population["Total Population"]);
  const totalHouses = extractNumber(population["Total No of Houses"]);
  const literacyRate = extractPercent(population["Total Literacy rate %"]);

  const footerStats = [
    { label: "Citizens", end: totalPopulation, suffix: "", decimals: 0 },
    { label: "Households", end: totalHouses, suffix: "", decimals: 0 },
    {
      label: "Scheduled Tribes",
      end: extractPercent(population["Scheduled Tribes Population %"]),
      suffix: "%",
      decimals: 1,
    },
    {
      label: "Scheduled Caste",
      end: extractPercent(population["Scheduled Caste Population %"]),
      suffix: "%",
      decimals: 1,
    },
    {
      label: "Girl Child (0-6)",
      end: extractPercent(population["Girl Child(0 -6) Population % by 2011"]),
      suffix: "%",
      decimals: 1,
    },
  ];

  const villageDirectory = [
    {
      title: "Bus Stops",
      icon: "directions_bus",
      items:
        villageData.places["Bus Stops in Takarkhed,Nandura"]
          ?.slice(0, 3)
          .map((item) => item.name) || [],
    },
    {
      title: "ATMs & Banking",
      icon: "account_balance",
      items:
        villageData.places["ATMs in Takarkhed,Nandura"]
          ?.slice(0, 3)
          .map((item) => item.name) || [],
    },
    {
      title: "Temples",
      icon: "temple_hindu",
      items:
        villageData.places["Temples in Takarkhed,Nandura"]
          ?.slice(0, 3)
          .map((item) => item.name) || [],
    },
    {
      title: "Health Centers",
      icon: "local_hospital",
      items:
        villageData.places["Hospitals in Takarkhed,Nandura"]
          ?.slice(0, 3)
          .map((item) => item.name) || [],
    },
    {
      title: "Education",
      icon: "school",
      items:
        villageData.places["Schools in Takarkhed,Nandura"]
          ?.slice(0, 3)
          .map((item) => item.name) || [],
    },
  ];

  const talks = villageData.village_talks.map((title) => ({
    category: "UPDATE",
    title,
    date: trimValue(basicInfo.Date),
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCz5QVEB-Axe1tqFxx2kNZVjyxK3xzIwIrrTjQRNc8jsKf7eoUjrMhbY_6L9hAgLXKNZQW5YdJZ5B-TOb6RjxIvPFbMTEoLP4HIEXhTQuY3RKY-oau85eI_5MiLw1vs57mCIYKr20THAeXJRMtsUaHWobyQvTxeNyCZpISyNsj2RYNuqTAeH4mIg3xyw-NnCfq25Am3dCoDiXqeGZdJZoUwnkxRAoHhaa8SuTBO9dN9TL_uSM45EDYH2zZcMxy0WYUSCNPbAwGmMWya",
    description: "Latest update from the Gram Samridhi Portal.",
  }));

  const villagePhotos = [
    {
      title: "Village Entrance",
      description: "Main road and entrance area of the village.",
      image:
        "https://images.unsplash.com/photo-1591189826135-cb47a5fca5c6?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Farming Landscape",
      description: "Agricultural fields surrounding the village.",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Village Temple",
      description: "A prominent local temple in the village area.",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Community Gathering",
      description: "Local community activity and meetings.",
      image:
        "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Water Body",
      description: "Local pond and water resource area.",
      image:
        "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Sunset View",
      description: "Evening view from nearby farmland.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop",
    },
  ];

  const renderDirectoryIcon = (icon: string) => {
    switch (icon) {
      case "directions_bus":
        return <Bus className="size-5" />;
      case "account_balance":
        return <Landmark className="size-5" />;
      case "temple_hindu":
        return <Landmark className="size-5" />;
      case "local_hospital":
        return <Hospital className="size-5" />;
      case "school":
        return <GraduationCap className="size-5" />;
      default:
        return <Globe className="size-5" />;
    }
  };

  return (
    <>
      {/* <Header /> */}
      <main className="min-h-screen bg-[#f9f9f9] text-[#0f172a]">
        <section className="relative overflow-hidden border-b-4 border-[#f58320] bg-[#082b57]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            data-alt="Aerial view of a lush green Indian village landscape"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBA8ffot2Bzp9fB14SkExI3j1qBAYYMgi5kD_Z_e1PcLfytPQkxiCvUlow27imbPg_IWWQ5S8GcPDMschZpFEOEoMcxZ4R73kDUiRHLb_KcZuNOCG0BWcNZ8ZmLow_NbTW_axUguQRg75emMJDcRYgssTCUmNcbCO6xRv8QRpuVd54NgpBDNzP5_cWfFPUpCtbfasRahKyxbWkQAgs-uHSDQJNpy360G5o_7vaXoF46MJe2ldpDcApXs43y3oB9i2mMDnzMHvDpFqCU')",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#071f40] via-[#082b57]/85 to-[#082b57]/30" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-[24px] px-4 py-14 sm:px-6 md:py-24">
            <div className="max-w-3xl space-y-4 animate-[fadeUp_700ms_ease-out] [animation-fill-mode:both]">
              <div className="inline-flex items-center gap-2 border border-[#f58320]/50 bg-[#f58320]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#ffd4a6]">
                <MapPin className="size-4" />
                {trimValue(basicInfo["Taluka Name"])},{" "}
                {trimValue(basicInfo.District)}
              </div>
              <h1 className="text-[36px] font-[700] leading-[1.2] uppercase leading-tight text-white sm:text-4xl md:text-6xl">
                Welcome to <span className="text-primary">{villageName}</span>
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-green-200 md:text-lg">
                Dedicated to the progress and welfare of our citizens.
                Represented by Hon. MLA{" "}
                <b>{trimValue(basicInfo["Assembly MLA "])}</b> &amp; Hon. MP{" "}
                <b>{trimValue(basicInfo["Parliament MP "])}</b>.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-[16px] animate-[fadeUp_900ms_ease-out] [animation-fill-mode:both]">
              <button className="flex w-full items-center justify-center gap-2 border border-[#f58320] bg-[#f58320] px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#e3720f] sm:w-auto sm:px-7">
                <IndianRupee className="size-4" /> Pay Village Tax
              </button>
              <button className="flex w-full items-center justify-center gap-2 border border-white/30 bg-[#082b57]/60 px-5 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0a356b] sm:w-auto sm:px-7">
                <TriangleAlert className="size-4" />
                Lodge Complaint
              </button>
            </div>
          </div>
        </section>

        <VillageGlimpses villageName={villageName} photos={villagePhotos} />

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-[16px] px-4 py-10 sm:px-6 lg:grid-cols-3 animate-[fadeUp_900ms_ease-out] [animation-fill-mode:both]">
          <div className="space-y-5 lg:col-span-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f58320]">
                Village Profile
              </p>
              <h2 className="mt-2 text-3xl font-extrabold uppercase text-[#082b57]">
                About the Digital Portal
              </h2>
            </div>
            <div className="border border-border bg-surface p-[16px] text-green-700 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
              <p className="text-base leading-relaxed">{villageData.about}</p>
              <p className="mt-3 leading-relaxed">
                Date: <b>{trimValue(basicInfo.Date)}</b> | Time:{" "}
                <b>{trimValue(basicInfo["Current Time"])}</b> | Time Zone:{" "}
                <b>{trimValue(basicInfo["Time zone"])}</b>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <div className="border border-border bg-surface p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Taluka
                </p>
                <p className="text-lg font-semibold text-[#082b57]">
                  {trimValue(basicInfo["Taluka Name"])}
                </p>
              </div>
              <div className="border border-border bg-surface p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  District
                </p>
                <p className="text-lg font-semibold text-[#082b57]">
                  {trimValue(basicInfo.District)}
                </p>
              </div>
              <div className="border border-border bg-surface p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Region
                </p>
                <p className="text-lg font-semibold text-[#082b57]">
                  {trimValue(basicInfo["Region "])}
                </p>
              </div>
              <div className="border border-border bg-surface p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Language
                </p>
                <p className="text-lg font-semibold text-[#082b57]">
                  {trimValue(basicInfo["Language "])}
                </p>
              </div>
              <div className="border border-border bg-surface p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Elevation
                </p>
                <p className="text-lg font-semibold text-[#082b57]">
                  {trimValue(basicInfo["Elevation / Altitude"])}
                </p>
              </div>
              <div className="border border-border bg-surface p-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  STD Code
                </p>
                <p className="text-lg font-semibold text-[#082b57]">
                  {trimValue(basicInfo["Telephone Code / Std Code"])}
                </p>
              </div>
            </div>
          </div>
          <div className="border border-[#082b57] border-t-4 border-t-[#f58320] bg-[#082b57] p-[16px] text-white shadow-[0px_2px_6px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-extrabold uppercase tracking-wide">
              Population Stats
            </h3>
            <div className="mt-5 space-y-5">
              <div className="flex items-center gap-[16px]">
                <div className="flex size-12 items-center justify-center bg-[#f58320] text-white">
                  <Users className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#f58320]">
                    <AnimatedCounter end={totalPopulation} duration={1600} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    Total Population
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[16px]">
                <div className="flex size-12 items-center justify-center bg-[#1b4878] text-white">
                  <House className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">
                    <AnimatedCounter end={totalHouses} duration={1600} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    Total Households
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[16px]">
                <div className="flex size-12 items-center justify-center bg-[#1b4878] text-white">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">
                    <AnimatedCounter
                      end={literacyRate}
                      duration={1800}
                      decimals={1}
                      suffix="%"
                    />
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                    Literacy Rate
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-[14px]">
                  <span className="font-semibold tracking-wide text-[var(--color-text-muted)]">
                    Female Population
                  </span>
                  <span className="font-bold">
                    <AnimatedCounter
                      end={femalePopulationPercent}
                      duration={1800}
                      decimals={1}
                      suffix="%"
                    />
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-[999px] bg-surface/20">
                  <div
                    className="h-full origin-left rounded-[999px] bg-[#f58320] animate-[growIn_1200ms_ease-out_forwards]"
                    style={{
                      width: `${femalePopulationPercent}%`,
                      animationDelay: "120ms",
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[14px]">
                  <span className="font-semibold tracking-wide text-[var(--color-text-muted)]">
                    Working Population
                  </span>
                  <span className="font-bold">
                    <AnimatedCounter
                      end={workingPopulationPercent}
                      duration={1800}
                      decimals={1}
                      suffix="%"
                    />
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-[999px] bg-surface/20">
                  <div
                    className="h-full origin-left rounded-[999px] bg-[#22c55e] animate-[growIn_1200ms_ease-out_forwards]"
                    style={{
                      width: `${workingPopulationPercent}%`,
                      animationDelay: "240ms",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface py-12 animate-[fadeUp_1000ms_ease-out] [animation-fill-mode:both]">
          <div className="mx-auto max-w-7xl px-[24px]">
            <div className="mb-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f58320]">
                  Essential Access
                </p>
                <h2 className="mt-2 text-2xl font-extrabold uppercase text-[#082b57]">
                  Village Directory
                </h2>
              </div>
              <button className="w-full border border-[#082b57] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#082b57] hover:bg-[#082b57] hover:text-white sm:w-auto">
                Explore All
              </button>
            </div>
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
              {villageDirectory.map((block) => (
                <div
                  key={block.title}
                  className="border border-border bg-[#f8f9fb] p-5 shadow-[0px_2px_6px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 border-b border-border pb-3 text-[#082b57]">
                    {renderDirectoryIcon(block.icon)}
                    <h3 className="text-[18px] font-[600] leading-[1.2] uppercase">
                      {block.title}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-3 text-[14px] text-green-700">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="border border-border bg-[#f8f9fb] p-5 shadow-[0px_2px_6px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 border-b border-border pb-3 text-[#082b57]">
                  <Globe className="size-5" />
                  <h3 className="text-[18px] font-[600] leading-[1.2] uppercase">
                    Village Location
                  </h3>
                </div>
                <div className="group relative mt-4 h-40 w-full overflow-hidden border border-border bg-green-100">
                  {/* <div className="absolute inset-0 flex items-center justify-center bg-[#f4f7fb]">
                    <Map className="size-10 text-[var(--color-text-muted)]" />
                  </div> */}
                  <iframe
                    title="Village location map"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapSearchUrl}
                  />
                  <a
                    className="absolute inset-0 flex items-center justify-center bg-[#082b57]/70 font-bold uppercase tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100"
                    href={mapurl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PopulationCharts population={population} />

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 animate-[fadeUp_1100ms_ease-out] [animation-fill-mode:both]">
          <div className="mb-[32px] flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f58320]">
                Village Newsroom
              </p>
              <h2 className="text-3xl font-extrabold uppercase text-[#082b57]">
                Village Talks
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Latest news and announcements from the Gram Panchayat
              </p>
            </div>
            <button className="w-full border border-[#082b57] px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#082b57] hover:bg-[#082b57] hover:text-white sm:w-auto">
              View All News
            </button>
          </div>
          <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 lg:grid-cols-3">
            {talks.map((talk) => (
              <article
                key={talk.title}
                className="overflow-hidden border border-border bg-primary shadow-[0px_2px_6px_rgba(0,0,0,0.08)] text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)]"
              >
                <div
                  className="h-48 w-full bg-green-200"
                  style={{
                    backgroundImage: `url('${talk.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="space-y-3 p-[16px]">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f58320]">
                    {talk.category}
                  </span>
                  <h3 className="text-[18px] font-[600] leading-[1.2] text-[#082b57]">
                    {talk.title}
                  </h3>
                  <p className="line-clamp-2 text-[14px] text-[var(--color-text-secondary)]">
                    {talk.description}
                  </p>
                  <div className="flex items-center gap-2 pt-3 text-xs text-[var(--color-text-secondary)]">
                    <CalendarDays className="size-4" />
                    {talk.date}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t-4 border-[#f58320] bg-[#082b57] py-10 text-white animate-[fadeUp_1200ms_ease-out] [animation-fill-mode:both]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-[16px] px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:grid-cols-5">
            {footerStats.map(({ label, end, suffix, decimals }) => (
              <div
                key={label}
                className="border border-white/20 bg-[#0a356b] p-4 text-center transition-transform duration-300 hover:-translate-y-0.5"
              >
                <p className="text-2xl font-extrabold text-[#f58320]">
                  <AnimatedCounter
                    end={end}
                    duration={1800}
                    suffix={suffix}
                    decimals={decimals}
                  />
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-200">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

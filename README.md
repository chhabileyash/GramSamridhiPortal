# 🏛️ Gram-Samridhi-Portal

**Gram-Samridhi-Portal** is a modern, full-stack digital governance platform designed to bridge the gap between rural administration (Gram Panchayats) and citizens. It streamlines village management, enhances civic engagement, and provides easy access to essential government services and information.

---

## 🌟 Features

### 👤 Citizen Services
- **Digital Identity**: Secure authentication and profile management via Clerk.
- **Village Encyclopedia**: Access to detailed village profiles including:
  - Demographic statistics (Literacy rate, gender ratio, child population).
  - Real-time weather and forecasts.
  - Public infrastructure (Polling stations, schools, health centers, colleges).
  - Geographical data (Nearby rivers, highways, and transport hubs).
- **Financial Services**:
  - View and pay **Property Tax**, **Water Tax**, and **Electricity Bills**.
  - History of previous payments and invoice management.
- **Civic Governance**:
  - **Raise Complaints**: Direct reporting of issues to the administration with priority levels.
  - **Track Progress**: Real-time status updates on raised complaints (Pending, In Progress, Resolved).
  - **Government Schemes**: Catalog of applicable welfare schemes with eligibility criteria and direct application links.
- **Community Hub**: 
  - **Suggestions Box**: Direct feedback channel to the Panchayat administration.
  - **Village Talks**: Community discussion board for local news and updates.
  - **Village Gallery**: Visual glimpses of village development and events.

### 🛡️ Administrative (Admin) Panel
- **Dashboard Overview**: Centralized hub with metrics on complaints, tax collection, and village stats.
- **Lifecycle Management**:
  - **Complaint Resolution**: Manage and update the status of citizen-reported issues.
  - **Development Tracking**: Monitor ongoing village infrastructure projects (Budget, contractor, progress %).
- **Member Management**: Management of Panchayat members and administrative staff.
- **Financial Oversight**: Tracking of tax payments and bill generation across the village.
- **Broadcast System**: Push village-wide notifications and alerts to all registered citizens.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **State/Data**: Server Components & Actions
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) & [Chart.js](https://www.chartjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend & Database
- **Runtime**: Node.js
- **Database**: [PostgreSQL (Neon Console)](https://neon.tech/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Clerk Authentication](https://clerk.com/)
- **Storage**: [Cloudinary](https://cloudinary.com/) (For images and documents)
- **Webhooks**: [Svix](https://www.svix.com/) (For seamless Clerk synchronization)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or later)
- pnpm / npm / yarn
- A Neon PostgreSQL instance
- A Clerk Account
- A Cloudinary Account

### 📦 Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahesh2-lab/Gram-Samridhi-Portal.git
   cd Gram-Samridhi-Portal
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up

   # Database (Neon)
   DATABASE_URL=your_postgresql_connection_string

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Webhooks (Svix)
   CLERK_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Database Migration:**
   ```bash
   npx drizzle-kit push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the portal.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages & API routes)
│   ├── admin/            # Admin-only dashboard and management pages
│   ├── api/              # Backend API endpoints (Complaints, tax, etc.)
│   ├── auth/             # Custom Clerk authentication pages
│   └── (routes)/         # Citizen-facing feature pages
├── components/           # Reusable React components
│   └── ui/               # Specialized Shadcn UI primitives
├── drizzle/              # Drizzle migrations and metadata
├── public/               # Static assets (images, logos)
├── src/
│   ├── db/               # Database schema and connection logic
│   └── middleware.ts     # Clerk route protection rules
├── types/                # Global TypeScript definitions
└── utils/                # Utility helper functions
```

---

## 📡 API Endpoints

The project exposes a REST-style API under `/api/**`:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/complaints` | `GET/POST` | Fetch or submit citizen complaints |
| `/api/development-works` | `GET/POST` | Track infrastructure project progress |
| `/api/schemes` | `GET` | List available government schemes |
| `/api/property-tax` | `GET/POST` | Manage property tax invoices & payments |
| `/api/village-info` | `GET` | Retrieve village-specific demographics & data |
| `/api/webhooks/clerk` | `POST` | Synchronizes Clerk user data with the DB |

---

## 📜 Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode |
| `npm run build` | Builds the application for production |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code quality |
| `npx drizzle-kit studio` | Visual database manager for Drizzle |

---

## 🤝 Contributing

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📝 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details. (Default recommendation)

## ✍️ Author

**yash** - [GitHub](https://github.com/chhabileyash)

---
*Built with ❤️ for a digital rural future.*

# OceanGuardian Disaster Management

**Integrated platform for crowdsourced ocean hazard reporting and social media analytics.**

---

## Overview

OceanGuardian enables citizens, volunteers, officials, and analysts to report ocean hazards, visualize real-time coastal risk, and analyze social media discussions related to disaster events. The system helps Indian authorities, including INCOIS, to provide effective situational awareness for hazards like tsunamis, storm surges, high waves, and abnormal tides.

---

## Features

- **Crowdsourced Hazard Reporting:** Citizens can submit geotagged hazard reports with photos or videos, even offline (syncs when online).
- **Role-Based Access:** Secure login for citizens, volunteers, officials, analysts.
- **Live Dashboard:** Map-based live dashboard showing incident hotspots, real-time data, and latest reports.
- **Social Media Integration:** Displays hazard discussions and sentiment from Twitter using NLP analytics.
- **Hazard Prediction:** Utilizes meteorological data for hazard forecasting.
- **Media Upload & Secure Processing:** Supports image, video, document uploads; secure, validated file processing.
- **Progressive Web App:** App-like user experience across devices.
- **Automatic Email Notifications:** Email alerts for key events.
- **LLM/AI Features:** Content analytics, AI-generated imagery, false signal detection.
- **Real-Time Data Sync:** Instant data updates and notifications across users.
- **Responsive Architecture:** Scalability, cross-browser compatibility, deployment on Base44 with SSL/CDN.

---

## Technology Stack

### Frontend

- **React** – Main framework (with JSX templating)
- **React Router DOM** – Routing and navigation
- **Tailwind CSS** – Utility-first CSS framework
- **Shadcn/ui** – Radix UI-based component library
- **Lucide React** – SVG icon library
- **Framer Motion** – UI animations
- **Recharts** – Charting and visualization
- **React Leaflet/Leaflet** – Interactive map components
- **date-fns** – Date utilities
- **Lodash** – Utility library
- **React Markdown** – Markdown rendering

### Backend 

- **Entity System** – JSON Schema-based data models
- **Automated Built-in Database** – Real-time CRUD operations, data validation
- **Authentication** – Google OAuth, role-based access
- **File Storage** – Secure, private file storage with URL signing, media handling
- **User Management** – Enhanced user profiles, verification

### Infrastructure

- **Automatic Scaling** – Handles traffic spikes on demand
- **Built-in CDN & SSL/HTTPS** – Fast, secure content delivery
- **Real-Time Data Synchronization**
- **Progressive Web App (PWA)** – Cross-device support

---
### Project Structure
```
OceanGuardian_disaster_management/
├── disaster_management/
│   ├── Components/
│   │   └── dashboard/
│   ├── Entites/
│   ├── Pages/
│   └── Layout.js
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── ui/
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   ├── entities/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── ReportHazard.jsx
│   │   ├── Signup.jsx
│   │   └── UserProfile.jsx
│   ├── utils/
│   ├── App.jsx
│   ├── Layout.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
---

### Demo Video: https://drive.google.com/file/d/1fPGm1u4kKRx2aPmb-sdlVXZkX4ow7a52/view?usp=sharing

### Screenshots:
<img width="1871" height="876" alt="Screenshot 2025-09-24 112000" src="https://github.com/user-attachments/assets/8975ca02-1519-41b7-9a08-fa449f741f21" />
<img width="1875" height="874" alt="Screenshot 2025-09-24 121139" src="https://github.com/user-attachments/assets/b65a890d-a0e8-4a6c-826d-c14bc7296af2" />
<img width="1870" height="879" alt="Screenshot 2025-09-24 121205" src="https://github.com/user-attachments/assets/2b30e163-f819-4f26-ae75-6f4c95522454" />
<img width="1855" height="885" alt="Screenshot 2025-09-24 121235" src="https://github.com/user-attachments/assets/2c873d29-026d-4ea1-8405-78c99ff21626" />
<img width="1849" height="873" alt="Screenshot 2025-09-24 121312" src="https://github.com/user-attachments/assets/dd36f9ee-542a-45f0-a19c-01ad716e3a8c" />
<img width="1852" height="877" alt="Screenshot 2025-09-24 121331" src="https://github.com/user-attachments/assets/7df87eab-4f9a-432e-8ab9-9183663f645d" />
<img width="1846" height="879" alt="Screenshot 2025-09-24 121354" src="https://github.com/user-attachments/assets/3e73b367-a735-47ba-bf92-d3af9ed9b7f4" />
<img width="1872" height="886" alt="image" src="https://github.com/user-attachments/assets/bc455974-51d0-41ef-9ff2-8cb7d28dc561" />

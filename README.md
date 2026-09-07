# 🌐 Blackcoffer — Global Strategic Foresight & Intelligence Dashboard

> An interactive, modern **MERN Stack Data Visualization Dashboard** for macroeconomic strategic foresight and intelligence analysis, built with **React.js, Tailwind CSS, Recharts, Node.js, Express.js, and MongoDB Atlas**.

---
## ☁️ Live Demo

[**View Live Project →**](https://blackcoffer-sigma.vercel.app/)

## 📸 Key Features & Visualizations

- **Executive KPI Cards**: Real-time metrics for **Total Insights (1,000)**, **Average Intensity (9.8)**, **Average Likelihood (3.0/5)**, and **Average Relevance (2.7/7)**.
- **Regional Insight Concentration**: Custom Donut chart with total insights counter and exact percentage shares across global regions.
- **PESTLE Strategic Factor Dimensions**: 3-Layer Radar Spider chart comparing **Intensity**, **Likelihood (x2)**, and **Relevance (x2)** across all 9 PESTLE factor dimensions.
- **6-Pillar Macro Intelligence Matrix**:
  1. *Strategic Horizon Split* (Donut with callouts)
  2. *Insights by Topic & Scope* (Horizontal stacked bars)
  3. *Insights by Sector & Scope* (Horizontal stacked bars)
  4. *Insights by Months & Trajectory* (Temporal focus window bars)
  5. *Insights by Intensity & Impact* (Binned scale distribution)
  6. *Geographic Density Clusters* (Vector map with circular bubble counters)
- **Strategic Risk & Relevance Matrix**: Bubble scatter matrix mapping Likelihood ($X$) vs. Relevance ($Y$) scaled by Intensity.
- **Temporal Horizon Trends**: Smooth area chart visualizing chronological end-year progression.
- **Comprehensive 9-Dimension Filtering Drawer**:
  - `End Year`, `Topic`, `Sector`, `Region`, `Country`, `City`, `PESTLE`, `Source`, `SWOT`
  - Numeric Threshold Range Sliders: `Min Intensity`, `Min Likelihood`, `Min Relevance`
  - Instant Text Search across Title, Topic, and Insight narrative.
- **Data Records Explorer Table**: Paginated (10/25/50 per page), sortable columns, detail modal inspection, and CSV/JSON export.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Recharts, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js, Mongoose, CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud Cluster) |
| **Deployment** | Vercel (Frontend) & Render (Backend API) |

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/data` | Fetch filtered insights by query params (`end_year`, `topic`, `sector`, `region`, `country`, `pestle`, `source`, `swot`, `city`, `search`, `min_intensity`, etc.) |
| `GET` | `/api/data/filters` | Returns sanitized distinct values for all 9 filter categories |
| `GET` | `/api/data/stats` | Returns aggregate statistics (`totalRecords`, `averageIntensity`, `averageLikelihood`, `averageRelevance`) |
| `GET` | `/api/data/analytics` | Returns aggregated distributions by Sector, Region, PESTLE, Years, Topics, and Sources |

---

## 🚀 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/Akshayahlawat21/Blackcoffer.git
cd Blackcoffer
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8080
```

*(Optional) Seed the 1,000 JSON records into MongoDB:*
```bash
node importData.js
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:8080
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
# Dashboard opens on http://localhost:4200 (or http://localhost:5173)
```

---

## ☁️ Deployment Guide

### Deploy Backend to Render (Free)
1. Go to [render.com](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository `Blackcoffer`.
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `node server.js`
6. Add Environment Variable: `MONGO_URI` = your connection string.

### Deploy Frontend to Vercel (Free)
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Select the `Blackcoffer` repository.
3. Set **Root Directory**: `frontend`
4. Set **Framework Preset**: `Vite`
5. Add Environment Variable: `VITE_API_URL` = `https://your-backend.onrender.com/api/data`
6. Click **Deploy**.

---

## 👨‍💻 Author
- **Akshay Ahlawat** — [GitHub Profile](https://github.com/Akshayahlawat21)

# CarbonScope AI — Scope 3 Emission Intelligence

CarbonScope AI is an AI-powered carbon accounting platform designed for SMEs to automate Scope 3 GHG inventory management. It transforms unstructured supply chain data (invoices, receipts, POs) into actionable carbon insights using a custom NLP classification pipeline.

## 🚀 Quick Setup

### Prerequisites
- **Node.js 18+** (for Frontend)
- **Python 3.10+** (for Backend)

### 1. Backend Installation & Run
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the FastAPI server:
   ```bash
   python api.py
   ```
   The API will be live at `http://localhost:8000`. You can visit `http://localhost:8000/docs` for interactive documentation.

### 2. Frontend Installation & Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:3000`.

---

## 🧪 Testing the Pipeline
To test the end-to-end functionality, use the provided sample files in the root directory:

1. **`sample_invoices_batch1.csv`**: A general 25-row supply chain batch (Metals, Plastics, Textiles).
2. **`sample_freight_q4.csv`**: A 15-row logistics batch focusing on transport emissions.
3. **`sample_office_procurement.csv`**: A 12-row batch for electronics and office supplies.

**Steps:**
1. Open the [Dashboard](http://localhost:3000/dashboard).
2. Click the **Upload Zone** in the center.
3. Select one of the sample CSV files.
4. Watch the **Animated Pipeline** process the data in real-time.
5. Review the updated **Metrics**, **Charts**, and **Flagged Items**.

---

## 📁 Project Structure
- `api.py`: FastAPI entry point.
- `pipeline.py`: Main processing logic (OCR/NLP simulator).
- `classifier.py`: Keyword-based category classification engine.
- `emissions.py`: Emission factor lookup and uncertainty calculation.
- `frontend/`: Next.js 14+ application (App Router).
- `sample_*.csv`: Ready-to-use demo datasets.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js, TailwindCSS, Lucide-React, Recharts.
- **Backend**: FastAPI, Python, CSV/XLSX Parser.
- **Styling**: Vanilla CSS + Tailwind utilities for premium "Glassmorphism" aesthetics.

---

## ⚠️ Important Note
This project is configured to ignore build artifacts and environment files:
- `node_modules/`
- `.next/`
- `.env`
- `__pycache__/`
- `.build/`

Make sure to create your own `.env` file based on the template if you intend to add cloud integrations.

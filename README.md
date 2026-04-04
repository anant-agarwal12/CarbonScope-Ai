# CarbonScope AI

CarbonScope AI is an AI-powered carbon accounting platform designed for SMEs to automate Scope 3 GHG inventory management. It transforms unstructured supply chain data (invoices, receipts, POs) into actionable carbon insights using a custom NLP classification pipeline.

## 🚀 One-Click Setup (Quickstart)

1.  **Install MongoDB**: Follow the [MONGODB_SETUP.md](MONGODB_SETUP.md) guide to install and run the MongoDB service.
2.  **Environment Variables**: Create a `.env` file in the root with your `GEMINI_API_KEY` (for AI extraction) and `JWT_SECRET_KEY`.
3.  **Run Application**: Double-click `start_app.bat`. This will:
    -   Seed the database with real-world emission factors.
    -   Launch the FastAPI Backend.
    -   Launch the Next.js Frontend.

## 📁 Key Files & Directories

-   `api.py`: FastAPI backend entry point (`http://127.0.0.1:8000`).
-   `frontend/`: Next.js application (`http://localhost:3000`).
-   `pipeline.py`: The core ingestion engine (CSV/PDF/Image processing).
-   `ai_extractor.py`: Uses Google Gemini for document data extraction.
-   `seed_db.py`: Populates MongoDB with emission factor datasets.

## 📄 Sample Data for Demo
-   `demo_inventory.csv`: Use this to showcase the product's depth in Demo Mode.
-   `test_upload.csv`: Use this to test the "live" ingestion flow.

## 🛠️ Tech Stack
-   **Frontend**: Next.js, React, Recharts, Tailwind CSS.
-   **Backend**: FastAPI, Motor (Async MongoDB), PyJWT.
-   **Database**: MongoDB Community Edition.
-   **AI Engine**: Google Gemini API for OCR & Extration..

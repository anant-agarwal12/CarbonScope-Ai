# CarbonScope AI: Free Cloud Deployment Guide

This guide will walk you through hosting your entire CarbonScope AI stack on the internet for **100% free** using Vercel (Frontend), Render (Backend), and MongoDB Atlas (Database).

---

## 1. Prepare Your Database (MongoDB Atlas)
Your backend needs a database that is accessible from the internet, not just your local computer.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Click **Build a Database** and select the **Free Shared Cluster** (M0). Choose AWS/Google/Azure (doesn't matter) and create the cluster.
3. Under **Security > Database Access**, create a new database user. Set a username (e.g., `admin`) and a password. **Save this password**.
4. Under **Security > Network Access**, click "Add IP Address", select **"Allow Access from Anywhere"** (`0.0.0.0/0`), and finalize.
5. Go back to your Cluster, click **Connect**, select **Drivers** (Python), and copy the Connection String. It will look like this:
   `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   *(Replace `<password>` with the password you created in step 3).*

### Seed the Cloud Database
Before going live, seed this new cloud database with your categories:
1. On your local computer, open your `.env` file.
2. Change `MONGO_URI` to your new Atlas Connection String.
3. Open a terminal and run `python seed_db.py`.
4. Your categories are now in the cloud!

---

## 2. Prepare Your Backend (Render)
Render offers free hosting for Python web services.

1. Go to [Render](https://render.com/) and sign up using GitHub.
2. Click **New +** and select **Web Service**.
3. Select **"Build and deploy from a Git repository"** and choose your CarbonScope AI repository.
4. Fill out the deployment details:
   - **Name**: `carbonscope-api` (or similar)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port 10000`
5. Scroll down to **Environment Variables** and add the following:
   - `MONGO_URI` -> *(Your MongoDB Atlas connection string from step 1)*
   - `GEMINI_API_KEY` -> *(Your Google AI Studio API Key)*
   - `JWT_SECRET_KEY` -> *(Type a random 32-character string, e.g., `my-super-secret-production-key`)*
6. Select the **Free Instanc Type** and click **Create Web Service**.
7. Wait 5-10 minutes for it to build. Once it says "Live", copy the URL at the top left (it will look like `https://carbonscope-api-xyz.onrender.com`).

*(Note: Render free tiers spin down after 15 minutes of inactivity. The first time you upload a file after a pause, the backend might take 30-50 seconds to wake up).*

---

## 3. Prepare Your Frontend (Vercel)
Vercel is the creator of Next.js and provides the absolute best free frontend hosting.

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New... > Project** and import your CarbonScope AI repository.
3. Configure the Project:
   - **Framework Preset**: Next.js (usually auto-detected)
   - **Root Directory**: Click "Edit" and choose `frontend` (This is crucial, as your Next.js app is inside the `frontend` folder, not the root).
4. Unfold the **Environment Variables** section and add:
   - `NEXT_PUBLIC_API_URL` -> *(Paste your Render backend URL from Step 2, e.g., `https://carbonscope-api-xyz.onrender.com`)*. **Ensure there is no trailing slash.**
5. Click **Deploy**.
6. Wait 1-2 minutes for the build to finish. 

---

## 4. You Are Live!
Click on the Vercel Domain provided. 

1. Go to `/signup` and create a live account.
2. Navigate the Guided Tour.
3. Upload a file. Wait a second, and watch your cloud backend process the file using the Gemini API and save the records to MongoDB Atlas. 

Your entire ecosystem is now live on the internet! 🚀

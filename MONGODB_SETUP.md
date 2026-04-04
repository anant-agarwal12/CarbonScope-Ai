# MongoDB Setup Guide (Windows)

To get your database "live" for CarbonScope AI, follow these steps to install and run the MongoDB daemon.

### 1. Download & Install
1.  Go to the [MongoDB Community Download Page](https://www.mongodb.com/try/download/community).
2.  Select the **current version**, **Windows**, and **msi** package.
3.  Run the installer. Choose **"Complete"** setup type.
4.  **CRITICAL**: Make sure the box **"Install MongoDB as a Service"** is checked. This ensures it starts automatically when you turn on your computer.

### 2. Verify Installation
1.  Open a Command Prompt or PowerShell (as Administrator).
2.  Type:
    ```bash
    net start MongoDB
    ```
    If it says "The requested service has already been started," you are good to go!

### 3. Add to System PATH (Optional but Recommended)
To run `mongod` or `mongosh` from any terminal:
1.  Search for **"Edit the system environment variables"** in the Windows Start menu.
2.  Click **Environment Variables**.
3.  Under **System variables**, select **Path** and click **Edit**.
4.  Click **New** and paste the path to your MongoDB bin folder (usually `C:\Program Files\MongoDB\Server\X.X\bin`).
5.  Click **OK** on all windows.

### 4. Connection Details
Your application is configured to connect to:
- **Host**: `127.0.0.1`
- **Port**: `27017`
- **Database**: `carbonscope`

Once MongoDB is running, the `api.py` backend will be able to store your processed records and user accounts securely.

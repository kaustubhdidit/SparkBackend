# Sparkathon Backend  

A Node.js backend application designed for the Sparkathon Inventory Management system.  

## 📹 Video Walkthrough  
- [Watch the walkthrough video here](https://youtu.be/tM-yvjeXqWQ)

---

## Setup Instructions  

1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/kaustubhdidit/SparkBackend.git  
   ```  

2. **Navigate to the Project Directory**  
   ```bash  
   cd SparkBackend  
   ```  

3. **Create a `.env` File**  
   - Inside the project directory, create a `.env` file.  
   - Add the following environment variable:  
     ```plaintext  
     MONGO_URI=<your mongo URI>  
     ```  
   - Replace `<your mongo URI>` with the connection string for your MongoDB database.  

4. **Install Dependencies**  
   ```bash  
   npm install  
   ```  

5. **Start the Server**  
   ```bash  
   npm start  
   ```  

6. **Access the Application**  
   - The server will start running on port **8080**.  
   - Base URL: `http://localhost:8080`  

---

## Prerequisites  
- **Node.js** and **npm** installed on your machine.  
- A **MongoDB** database (local or cloud) with a valid connection string.  

---

## Notes  
- Ensure your `.env` file is correctly configured before starting the server.  
- For production deployment, configure environment variables securely and use a process manager like `PM2`.  

---
```

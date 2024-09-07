# Building Resolution Issue Platform

## Client/Server Setup Guide

This guide provides instructions for setting up the client and server components of the project. Ensure that your hardware meets the minimum requirements and follow the integration and installation procedures outlined below.

### Hardware Configuration

**Laptop/Computer Minimum Requirements:**
- Operating System: Windows 10 or above, macOS, or Linux
- Web Browser: Latest version of Chrome, Firefox, or Safari
- React.js: Latest version
- Node.js: v14.x
- Node Package Manager (NPM): Latest version

**System Integration Manual:**
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MySQL

### Installation Procedure

#### Resolve Website

1. Clone the project folder into your local computer.
2. Open the folder in an Integrated Development Environment (IDE).
3. Open two terminal instances.
4. In the first terminal, navigate to the client folder (Frontend).
5. Run the command `npm install`.
6. To start the frontend, run the command `npm run dev`.
7. In the second terminal, navigate to the server folder (Backend/Server).
8. Run the command `npm install`.
9. To start the backend, run the command `npm start`.

#### Resolve Database

- **YouTube Tutorial Link:** [Database Setup Tutorial](https://youtu.be/u96rVINbAUI?si=bXO0IYEtMsAMjwaL)

1. Follow the provided YouTube tutorial for database setup.
2. Save the exported database folder provided into your local computer.
3. After setting up MySQL Workbench, launch the application.
4. Open the local instance MySQL.
5. Navigate to Administration at the Navigator tab.
6. Click Data Import/Restore.
7. Browse the folder where you saved the exported database folder.
8. Select the `dip-fyp` schema.
9. Click start import.
10. Now, head to Schemas at the Navigator tab.
11. Click the refresh icon.
12. All of the required tables will be created successfully.

### Inside ***db.js*** file
1. Change the MySQL credentials to your own database credential.

### Additional Notes

- Make sure to follow each step carefully to ensure proper setup.
- For any issues or questions, refer to the project documentation or contact the project team for assistance.

### Contributors

- Wong Yee Xiong 
- Tan Yong Hao
- Lim Chun Rong

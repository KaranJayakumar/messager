# Project Name

## Introduction

This repository contains the source code for [Project Name], a Java Spring application with both frontend and backend components.

## Build Instructions

### Backend

1. Navigate to the `backend` folder in the project directory.
2. Ensure that MySQL is installed and running, and has a connection available on port 3306.
3. Open the `application.properties` file in the `src/main/resources` directory.
4. Update the `spring.datasource.url` property to match your MySQL connection configuration, if necessary.
5. Run the Spring application. You can do this using your preferred IDE or with the following command:
   
./mvnw spring-boot:run

## Frontend
Ensure that Node.js and npm are installed on your system.
Navigate to the root folder of the project.
Install the required dependencies by running:

Copy code
npm install
Start the development server by running:
npm run dev
This will compile the frontend assets and start the development server on port 5173.

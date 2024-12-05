Project Overview
This repository contains a Full-Stack Application with the following components:

Database: PostgreSQL setup using Docker Compose.
Server: Backend API built with Node.js and TypeScript.
Client: Frontend application built with modern web technologies.

Setup Instructions
1. Database Setup
Navigate to the database directory and run the following command:

cd database
docker-compose up -d

This command starts the PostgreSQL database in a Docker container.

2. Client Setup
Navigate to the client directory and start the frontend application:

cd client
npm install
npm run start
# or for development mode:
npm run dev

3. Server Setup
Navigate to the server directory and start the backend server:

cd server
npm install
npm run start


Trigger for Comment Count
To maintain the COMMENT_COUNT in the BOARD table, you need to create a trigger in PostgreSQL. This trigger will automatically update the count when a comment is added or removed.

Trigger Function
The following function ensures that the COMMENT_COUNT is updated correctly:

CREATE OR REPLACE FUNCTION update_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE "BOARD" 
        SET "COMMENT_COUNT" = COALESCE("COMMENT_COUNT", 0) + 1 
        WHERE "BOARD_ID" = NEW."BOARD_ID";
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE "BOARD" 
        SET "COMMENT_COUNT" = COALESCE("COMMENT_COUNT", 0) - 1 
        WHERE "BOARD_ID" = OLD."BOARD_ID";
    END IF;
    RETURN NULL; -- RETURN NULL for AFTER triggers
END;
$$ LANGUAGE plpgsql;

Create Trigger
Execute the following SQL to create a trigger that links to the above function:

CREATE TRIGGER trigger_comment_count
AFTER INSERT OR DELETE ON "COMMENTS"
FOR EACH ROW
EXECUTE FUNCTION update_comment_count();

Project Architecture

root/
├── database/         # Database configuration and migrations
├── client/           # Frontend application
├── server/           # Backend application
├── README.md         # Project documentation
└── docker-compose.yml # Docker setup for PostgreSQL

Development Notes
Ensure Docker is installed and running before starting the database.
Update .env files for client and server with appropriate configurations for your environment.
Use consistent code formatting and follow the defined coding standards.
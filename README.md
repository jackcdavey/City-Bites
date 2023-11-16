
# City Bites

A web application for viewing restaurants by city using the Yelp Fusion API, with user 'likes' stored using Vercel Postgres

## Technologies Used

• **Next.js**: A React framework for server-rendered applications.

• **Vercel Postgres**: Used for storing users' likes.

• **Yelp Fusion API** Used to fetch restaurant data

## Setup and Installation
#### Before starting, you should have Node.JS, NPM, and Homebrew (if MacOs) installed. 

### 1. Clone the Repo
Use either the GitHub web GUI or the CLI with `gh repo clone jackcdavey/City-Bites` to locally save the repo, and unzip in your development location.

### 2. Install Dependencies
Using the command line to navigate into the project folder, run `npm install` to download and install all necessary dependencies for the project.

### 3. Environment Variables
Set up the necessary environment variables in a .env.local file:
`YELP_API_KEY=your_yelp_api_key_here`

### 4. Database Setup
For storage of liked restaurants, follow [this](https://vercel.com/docs/storage/vercel-postgres/quickstart) guide to setup a Vercel Postgres database and import corresponding variables.

### 5. Run the Project
From the project root directory, run `npm run dev` to start the website on port 3000. If a browser window does not automatically open, you can view the site at `localhost:3000`

# AI-Fitness-Buddy
An AI-powered fitness coach that generates personalized workouts based on user goals, experience level, and preference. It acts as a simple and focused AI fitness coach that helps users stay consistant with their training.

## Features
- **AI Workout Generation**
    - Creates personalized workouts using AI based user input (goals, fitness level, preferences)

- **Adaptive Workout Logic**
    - Workouts are tailored dynamically based on user inputs and configuration

- **Backend Storage**
    - Stores generated workout sessions in a database for persistance

## How It Works
1. Users enter their fitness goals and preferences
2. AI generates a custon workout plan
3. Workout is displayed to the user
4. Workout data is stored in the database.

## Tech Stack
- **Frontend**: React
- **Backend**: Express
- **Database**: PostgreSQL
- **AI Integration**: OpenAI API
- **Styling**: CSS Modules

## Getting Started
1. Clone the repository
```bash
git clone https://github.com/Drew-Andersen/AI-Fitness-Buddy.git
cd AI-Fitness-Buddy
```

2. Install the Dependencies
```bash
# backend
cd server
npm install

# frontend
cd ../client
npm install
```

3. Environmental Variables
Create a <code>.env</code> file in your server directory
```env
OPENAI_API_KEY=your_api_key
```

4. Run the Applitcaiton
```bash
#backend
node server.js

# frontend
npm run dev
```

## Roadmap
[] Improve AI workout personalization
[] Add user profiles
[] Add goal-based workout progression
[] Add mobile responsiveness improvements
[] Add nutrition recommendations (future feature)

## Project Purpose
This project was build to explore AI-powered personalization in fitness applications and demonstrate how LLMs can be used to generate structured, useful training programs in real time.

## License
MIT License

## Author
Drew Andersen
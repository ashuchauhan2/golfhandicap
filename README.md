# Golf Handicap Calculator

A simple web application for tracking golf rounds and calculating handicaps, built with Spring Boot backend and React frontend.

## Project Structure

- **Backend**: Spring Boot application with H2 database for storing golf rounds
  - 📖 [Backend README](backend/README.md) - Detailed backend documentation
- **Frontend**: React + TypeScript application with modern UI  
  - 📖 [Frontend README](frontend/README.md) - Detailed frontend documentation

## Features

- **Add Golf Rounds**: Enter your score, course rating, slope rating, and date played
- **Calculate Handicap**: Automatically calculates your handicap based on stored rounds
- **Clean UI**: Modern, responsive design with gradient background and card-based layout
- **Real-time Updates**: Handicap refreshes automatically after adding new rounds

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js 16 or higher
- npm or yarn

### Quick Setup

1. **Configure Frontend Environment**:
   ```bash
   cd frontend
   cp .env.example .env.local
   # Edit .env.local and set your personal 4-digit PIN
   ```

For detailed setup instructions, see:
- [Backend Setup Guide](backend/README.md#getting-started)
- [Frontend Setup Guide](frontend/README.md#getting-started)

### Running the Application

1. **Start the Backend** (from project root):
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   The backend will run on http://localhost:8080

2. **Start the Frontend** (from project root):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will run on http://localhost:5173

3. **Access the Application**:
   Open http://localhost:5173 in your browser

### Security

The application requires a 4-digit PIN to add new golf rounds. This PIN is configured in `frontend/.env.local` and is not committed to version control for security.

## API Endpoints

- `POST /api/rounds` - Add a new golf round
- `GET /api/handicap` - Get calculated handicap

## Database

The application uses H2 file-based database. The database file is stored in `backend/data/golfhandicap-db.mv.db`.

You can access the H2 console at http://localhost:8080/h2-console with:
- JDBC URL: `jdbc:h2:file:./data/golfhandicap-db`
- Username: `sa`
- Password: (empty)

## Handicap Calculation

Uses a simplified handicap differential formula:
```
(score - course rating) * 113 / slope rating
```
The final handicap is the average of all round differentials.

## Technologies Used

### Backend
- Spring Boot
- Spring Data JPA
- H2 Database
- Maven

### Frontend
- React 19
- TypeScript
- Vite
- Axios
- CSS Grid & Flexbox
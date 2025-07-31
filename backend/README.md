# Golf Handicap Calculator - Backend

A Spring Boot REST API for managing golf rounds and calculating handicaps with H2 database persistence.

## 🏌️ Features

- **REST API**: Simple endpoints for golf round management
- **Handicap Calculation**: Automatic handicap calculation using standard formula
- **Data Persistence**: H2 file-based database for permanent storage
- **Caching**: Redis-style caching for performance optimization
- **CORS Support**: Configured for frontend integration

## 🛠️ Technologies

- **Spring Boot 3.x** - Main framework
- **Spring Data JPA** - Database operations
- **H2 Database** - File-based SQL database
- **Spring Cache** - Caching abstraction
- **Maven** - Dependency management and build tool
- **Java 11+** - Programming language

## 🚀 Getting Started

### Prerequisites

- Java 11 or higher
- Maven 3.6+ (or use included Maven wrapper)

### Running the Application

1. **Using Maven wrapper** (recommended):
   ```bash
   ./mvnw spring-boot:run
   ```

2. **Using installed Maven**:
   ```bash
   mvn spring-boot:run
   ```

3. **Running JAR file**:
   ```bash
   ./mvnw clean package
   java -jar target/golfhandicap-*.jar
   ```

The API will be available at http://localhost:8080

### Available Maven Commands

- `./mvnw spring-boot:run` - Start the application
- `./mvnw clean package` - Build JAR file
- `./mvnw test` - Run unit tests
- `./mvnw clean` - Clean build artifacts

## 📡 API Endpoints

### Add Golf Round
```http
POST /api/rounds
Content-Type: application/json

{
  "score": 85,
  "courseRating": 72.0,
  "slopeRating": 113,
  "playedAt": "2024-01-15T14:30:00"
}
```

**Response**: Returns the saved round with generated ID

### Get Current Handicap
```http
GET /api/handicap
```

**Response**: Returns calculated handicap as a number

## 🗄️ Database

### H2 Configuration

The application uses H2 file-based database:
- **File location**: `./data/golfhandicap-db.mv.db`
- **Connection URL**: `jdbc:h2:file:./data/golfhandicap-db`
- **Username**: `sa`
- **Password**: (empty)

### H2 Console

Access the H2 web console at: http://localhost:8080/h2-console

**Connection Settings**:
- JDBC URL: `jdbc:h2:file:./data/golfhandicap-db`
- User Name: `sa`
- Password: (leave empty)

### Data Persistence

Data is automatically persisted to the file system in the `data/` directory. The database file will be created automatically on first run.

## 📊 Handicap Calculation

The application uses a simplified handicap differential formula:

```
Handicap Differential = (Score - Course Rating) × 113 / Slope Rating
Final Handicap = Average of all differentials
```

**Components**:
- **Score**: Your actual golf score
- **Course Rating**: Difficulty rating for scratch golfers
- **Slope Rating**: Relative difficulty (113 is standard)
- **113**: USGA constant for handicap calculation

## 🏗️ Project Structure

```
src/main/java/com/ashuchauhan/golfhandicap/
├── controller/
│   └── HandicapController.java    # REST endpoints
├── model/
│   └── Round.java                 # Golf round entity
├── repository/
│   └── RoundRepository.java       # Data access layer
├── service/
│   └── HandicapService.java       # Business logic
└── GolfhandicapApplication.java   # Main application class

src/main/resources/
├── application.properties         # App configuration
├── static/                       # Static web resources
└── templates/                    # Thymeleaf templates (if needed)
```

## ⚙️ Configuration

### Application Properties

Located in `src/main/resources/application.properties`:

```properties
# H2 Database Configuration
spring.datasource.url=jdbc:h2:file:./data/golfhandicap-db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console (Development only)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### CORS Configuration

CORS is configured in the controller to allow frontend connections:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

## 📝 Data Model

### Round Entity

```java
@Entity
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int score;              // Golf score (e.g., 85)
    private double courseRating;    // Course difficulty (e.g., 72.0)
    private int slopeRating;        // Course slope (e.g., 113)
    private LocalDateTime playedAt; // When the round was played
    
    // Getters and setters...
}
```

## 🔄 Caching

The application implements caching for performance:

- **Handicap calculation** is cached until new rounds are added
- **Cache eviction** occurs automatically when new rounds are saved
- Uses Spring's caching abstraction

## 🧪 Testing

### Running Tests

```bash
./mvnw test
```

### Test Coverage

Current tests cover:
- Repository layer functionality
- Service layer business logic
- Controller endpoint responses

## 🚀 Building for Production

### Create JAR file

```bash
./mvnw clean package
```

### Run in production

```bash
java -jar target/golfhandicap-*.jar
```

### Production Configuration

For production deployment, consider:
- Using a production database (PostgreSQL, MySQL)
- Configuring proper logging levels
- Setting up application monitoring
- Implementing security measures
- Using environment-specific profiles

## 🔧 Development

### Adding New Features

1. **Model changes**: Update entity classes and run with `ddl-auto=update`
2. **New endpoints**: Add to `HandicapController`
3. **Business logic**: Implement in `HandicapService`
4. **Data access**: Extend `RoundRepository`

### Database Schema Updates

The application uses `spring.jpa.hibernate.ddl-auto=update` which automatically applies schema changes during development.

## 🛠️ Troubleshooting

### Common Issues

1. **Port 8080 in use**: 
   ```bash
   # Find process using port 8080
   lsof -i :8080
   # Kill the process
   kill -9 <PID>
   ```

2. **Database file permissions**: Ensure the application has write access to the `data/` directory

3. **Java version issues**: Verify Java 11+ is installed:
   ```bash
   java --version
   ```

4. **Maven wrapper issues**: Ensure `mvnw` has execute permissions:
   ```bash
   chmod +x mvnw
   ```

### Logs

Application logs are printed to the console. For production, configure logging to files in `application.properties`.
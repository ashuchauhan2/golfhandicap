# Golf Handicap Calculator - Frontend

A modern React frontend for tracking golf rounds and calculating handicaps with PIN-based security.

## 🏌️ Features

- **Modern UI**: Responsive design with glassmorphism effects and gradient backgrounds
- **Mobile First**: Optimized for mobile devices with touch-friendly interactions
- **PIN Security**: 4-digit PIN protection for adding new rounds
- **Real-time Updates**: Automatic handicap recalculation after adding rounds
- **Form Validation**: Input validation with helpful error messages

## 🛠️ Technologies

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Axios** for HTTP requests
- **CSS Grid & Flexbox** for responsive layouts
- **Environment Variables** for secure configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and set your personal 4-digit PIN:
   ```
   VITE_APP_PIN=1234
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```bash
# 4-digit PIN for adding rounds (required)
VITE_APP_PIN=your_pin_here
```

**Security Note**: The `.env.local` file is git-ignored and will not be committed to version control.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AddRoundForm.tsx # Form for adding golf rounds
│   └── HandicapDisplay.tsx # Handicap display component
├── config/              # Configuration files
│   └── app.ts          # App configuration
├── services/            # API services
│   └── api.ts          # Backend API calls
├── types/               # TypeScript type definitions
│   └── Round.ts        # Golf round interface
├── App.tsx             # Main application component
├── App.css             # Application styles
├── index.css           # Global styles
└── main.tsx            # Application entry point
```

## 🎨 Styling

The application uses modern CSS features:
- **CSS Grid & Flexbox** for layouts
- **CSS Custom Properties** for theming
- **Backdrop Filter** for glassmorphism effects
- **CSS Transitions** for smooth animations
- **clamp()** for responsive typography

## 🔌 API Integration

The frontend communicates with the backend via REST API:

- **Base URL**: `http://localhost:8080/api`
- **POST /rounds** - Add new golf round
- **GET /handicap** - Get calculated handicap

## 📱 Mobile Support

The application is fully responsive with:
- Touch-friendly button sizes
- Optimized form inputs for mobile keyboards
- Responsive typography using `clamp()`
- Mobile-first CSS media queries
- Proper viewport meta tag configuration

## 🔒 Security

- PIN validation prevents unauthorized round additions
- Environment variables keep sensitive data out of source code
- Input validation and sanitization
- No sensitive data stored in localStorage

## 🛠️ Development

### Hot Module Replacement

Vite provides instant hot reloading during development. Changes to React components, CSS, and TypeScript files are reflected immediately.

### TypeScript

The project uses strict TypeScript configuration with:
- Strict null checks
- No implicit any
- Unused variable detection
- Import/export validation

### Code Quality

- ESLint for code quality and consistency
- TypeScript for type safety
- React Hooks rules enforcement
- Modern ES6+ syntax

## 🚀 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Tree-shaking for smaller bundle size
- Asset optimization and compression
- Source maps for debugging

## 🔧 Troubleshooting

### Common Issues

1. **API connection failed**: Ensure backend is running on port 8080
2. **PIN not working**: Verify `.env.local` file exists and contains `VITE_APP_PIN`
3. **Build errors**: Run `npm run build` to check for TypeScript errors

### Environment Variables

If environment variables aren't working:
1. Ensure `.env.local` exists in the frontend directory
2. Restart the development server after creating/modifying `.env.local`
3. Verify the variable name starts with `VITE_`
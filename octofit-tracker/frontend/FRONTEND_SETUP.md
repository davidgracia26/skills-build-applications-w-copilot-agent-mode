# OctoFit Tracker - React 19 Frontend

A modern React 19 presentation tier for the OctoFit Tracker multi-tier application, built with Vite, Bootstrap, and react-router-dom.

## Features

- **React 19** with Vite for fast development and optimized builds
- **React Router DOM** for client-side navigation
- **Bootstrap 5** for responsive styling
- **Codespace Support** with environment-based API endpoint configuration
- **Fallback Support** for local development

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` to set your Codespace name:

```env
# For GitHub Codespaces
VITE_CODESPACE_NAME=your-codespace-name

# For local development, leave empty or omit:
# VITE_CODESPACE_NAME=
```

**How to find your Codespace name:**
- Open your GitHub Codespace
- Check the URL: `https://<codespace-name>.github.dev`
- Use the `<codespace-name>` part in your `.env.local`

### 3. Run the Development Server

```bash
npm run dev
```

The frontend will be available at:
- **Local**: http://localhost:5173
- **Codespaces**: https://your-codespace-name-5173.app.github.dev

## API Configuration

The application uses the `VITE_CODESPACE_NAME` environment variable to determine the API base URL:

- **With `VITE_CODESPACE_NAME` set**: `https://${VITE_CODESPACE_NAME}-8000.app.github.dev`
- **Without `VITE_CODESPACE_NAME`** (fallback): `http://localhost:8000`

All API endpoints are constructed from the base URL:
- `/users` → `{base}/api/users`
- `/teams` → `{base}/api/teams`
- `/activities` → `{base}/api/activities`
- `/leaderboard` → `{base}/api/leaderboard`
- `/workouts` → `{base}/api/workouts`
- `/health` → `{base}/api/health`

## API Response Handling

The frontend supports two API response formats:

### Paginated Response
```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "pageSize": 20
}
```

### Array Response
```json
[...]
```

Both formats are automatically handled by the `extractDataFromResponse()` utility.

## Project Structure

```
src/
├── App.jsx                 # Main app with routing and navigation
├── main.jsx                # React entry point
├── App.css                 # Global styles
├── index.css               # Base styles
├── utils/
│   └── api.js              # API utilities and helpers
└── components/
    ├── Users.jsx           # Users listing page
    ├── Teams.jsx           # Teams listing page
    ├── Activities.jsx      # Activities listing page
    ├── Leaderboard.jsx     # Leaderboard ranking page
    └── Workouts.jsx        # Personalized workouts page
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run oxlint

## Troubleshooting

### API Connection Issues
- If you see `VITE_CODESPACE_NAME is not defined`, check your `.env.local` file
- For Codespaces, ensure your codespace name matches exactly
- For local development, ensure the backend is running on port 8000

### CORS Errors
- The backend should allow requests from your frontend URL
- In Codespaces, this is typically `https://your-codespace-name-5173.app.github.dev`

### Component Data Not Loading
- Open browser console (F12) to see error messages
- Check that the backend API endpoints are running
- Verify the API response format matches expected structure

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

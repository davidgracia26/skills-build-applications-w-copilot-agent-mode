import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import { buildApiUrl } from './utils/api';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead">
            A modern multi-tier fitness application with a React 19 frontend and an
            Express + MongoDB backend.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
            <a href={buildApiUrl('/health')} className="btn btn-outline-secondary">
              API Health
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">
          🐙 OctoFit
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/teams" className="nav-link">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/activities" className="nav-link">
                Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/workouts" className="nav-link">
                Workouts
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">
              OctoFit Tracker © 2025 - A React 19 + Express + MongoDB Application
            </p>
            <small className="text-muted">
              API Base: {import.meta.env.VITE_CODESPACE_NAME || 'localhost:8000'}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

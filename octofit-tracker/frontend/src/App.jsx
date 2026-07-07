import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
          <div className="d-flex gap-3">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
            <a href="http://localhost:8000/api/health" className="btn btn-outline-secondary">
              API Health
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

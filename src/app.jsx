import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Profile from './pages/profile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}

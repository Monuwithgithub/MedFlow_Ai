import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastProvider } from './components/Toast';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import InvoiceUpload from './pages/InvoiceUpload';
import ExpiryTracker from './pages/ExpiryTracker';
import DemandForecast from './pages/DemandForecast';
import Redistribution from './pages/Redistribution';
import Settings from './pages/Settings';
import BackendGuide from './pages/BackendGuide';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/invoice" element={<InvoiceUpload />} />
          <Route path="/expiry" element={<ExpiryTracker />} />
          <Route path="/forecast" element={<DemandForecast />} />
          <Route path="/redistribution" element={<Redistribution />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/backend-guide" element={<BackendGuide />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

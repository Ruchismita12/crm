import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import Customers from '../pages/Customers';
import Campaigns from '../pages/Campaigns';
import Analytics from '../pages/Analytics';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AppRoutes;
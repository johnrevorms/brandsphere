import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Careers from './pages/Careers';
import About from './pages/About';
import Blog from './pages/Blog';
import ArticleDetail from './pages/ArticleDetail';
import ProductDetail from './pages/ProductDetail';
import CareerDetail from './pages/CareerDetail';
import HowToOrder from './pages/HowToOrder';
import PaymentConfirmation from './pages/PaymentConfirmation';
import FAQ from './pages/FAQ';
import RefundPolicy from './pages/RefundPolicy';
import PaymentSuccess from './pages/PaymentSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminDashboard from './pages/admin/AdminDashboard';
import CMSDashboard from './pages/cms/CMSDashboard';

import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminReports from './pages/admin/AdminReports';
import CMSHome from './pages/cms/CMSHome';
import CMSBlog from './pages/cms/CMSBlog';
import CMSCareers from './pages/cms/CMSCareers';
import CMSPages from './pages/cms/CMSPages';
import CMSAbout from './pages/cms/CMSAbout';
import CMSApplications from './pages/cms/CMSApplications';
import CMSSettings from './pages/cms/CMSSettings';
import AdminStockTracking from './pages/admin/AdminStockTracking';
import TermsConditions from './pages/TermsConditions';

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admindashboard') || location.pathname.startsWith('/cmsdashboard');

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col transition-colors duration-300">
      {!isDashboard && <Navbar />}
      <main className="flex-grow w-full">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleDetail />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          
          {/* Admin Routes */}
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admindashboard/products" element={<AdminProducts />} />
          <Route path="/admindashboard/orders" element={<AdminOrders />} />
          <Route path="/admindashboard/reports" element={<AdminReports />} />
          <Route path="/admindashboard/stock" element={<AdminStockTracking />} />
          
          {/* CMS Routes */}
          <Route path="/cmsdashboard" element={<CMSDashboard />} />
          <Route path="/cmsdashboard/home" element={<CMSHome />} />
          <Route path="/cmsdashboard/blog" element={<CMSBlog />} />
          <Route path="/cmsdashboard/careers" element={<CMSCareers />} />
          <Route path="/cmsdashboard/pages" element={<CMSPages />} />
          <Route path="/cmsdashboard/about" element={<CMSAbout />} />
          <Route path="/cmsdashboard/applications" element={<CMSApplications />} />
          <Route path="/cmsdashboard/settings" element={<CMSSettings />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

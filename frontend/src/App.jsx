import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
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
import Reviews from './pages/Reviews';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import CMSDashboard from './pages/cms/CMSDashboard';

import AdminProducts from './pages/admin/AdminProducts';
import AdminPromos from './pages/admin/AdminPromos';
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
import AdminReviews from './pages/admin/AdminReviews';
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
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['user']}><Profile /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={['user']}><Orders /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute allowedRoles={['user']}><Cart /></ProtectedRoute>} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<CareerDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<ArticleDetail />} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/payment-confirmation" element={<ProtectedRoute allowedRoles={['user']}><PaymentConfirmation /></ProtectedRoute>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* Admin Routes */}
          <Route path="/admindashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admindashboard/categories" element={<ProtectedRoute allowedRoles={['admin']}><AdminCategories /></ProtectedRoute>} />
          <Route path="/admindashboard/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admindashboard/promos" element={<ProtectedRoute allowedRoles={['admin']}><AdminPromos /></ProtectedRoute>} />
          <Route path="/admindashboard/orders" element={<ProtectedRoute allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admindashboard/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
          <Route path="/admindashboard/stock" element={<ProtectedRoute allowedRoles={['admin']}><AdminStockTracking /></ProtectedRoute>} />
          <Route path="/admindashboard/reviews" element={<ProtectedRoute allowedRoles={['admin']}><AdminReviews /></ProtectedRoute>} />
          
          {/* CMS Routes */}
          <Route path="/cmsdashboard" element={<ProtectedRoute allowedRoles={['cms']}><CMSDashboard /></ProtectedRoute>} />
          <Route path="/cmsdashboard/home" element={<ProtectedRoute allowedRoles={['cms']}><CMSHome /></ProtectedRoute>} />
          <Route path="/cmsdashboard/blog" element={<ProtectedRoute allowedRoles={['cms']}><CMSBlog /></ProtectedRoute>} />
          <Route path="/cmsdashboard/careers" element={<ProtectedRoute allowedRoles={['cms']}><CMSCareers /></ProtectedRoute>} />
          <Route path="/cmsdashboard/pages" element={<ProtectedRoute allowedRoles={['cms']}><CMSPages /></ProtectedRoute>} />
          <Route path="/cmsdashboard/about" element={<ProtectedRoute allowedRoles={['cms']}><CMSAbout /></ProtectedRoute>} />
          <Route path="/cmsdashboard/applications" element={<ProtectedRoute allowedRoles={['cms']}><CMSApplications /></ProtectedRoute>} />
          <Route path="/cmsdashboard/settings" element={<ProtectedRoute allowedRoles={['cms']}><CMSSettings /></ProtectedRoute>} />
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

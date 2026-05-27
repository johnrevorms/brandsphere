import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Footer() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 mt-16 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Left Side - Socials & Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-bold tracking-widest uppercase">FIND US</h3>
          <div className="flex items-center gap-4">
            {/* Shopee Icon */}
            <a 
              href={settings.shopee_url || "#"} 
              target={settings.shopee_url ? "_blank" : undefined}
              rel={settings.shopee_url ? "noopener noreferrer" : undefined}
              aria-label="Shopee" 
              className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-200 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.006 8.135a3.7 3.7 0 00-3.321-2.02h-1.637v-.036a2.048 2.048 0 10-4.096 0v.036H8.315A3.7 3.7 0 004.994 8.14L3.02 18.232a3.7 3.7 0 003.652 4.417h10.655a3.7 3.7 0 003.653-4.417L19.006 8.135zM12 2.65a1.05 1.05 0 011.047 1.05v.232h-2.094v-.232A1.05 1.05 0 0112 2.65zm1.512 14.544c0 1.026-.832 1.859-1.859 1.859-.444 0-.853-.157-1.176-.418a.333.333 0 01.423-.514c.22.179.5.286.804.286 1.155 0 1.488-.696 1.488-1.213 0-1.121-.762-1.398-1.579-1.696-.867-.315-1.768-.644-1.768-1.792 0-.916.666-1.67 1.547-1.795v-.522a.333.333 0 11.666 0v.512c.408.06.772.21 1.066.425a.333.333 0 01-.397.534 1.134 1.134 0 00-.73-.243c-.767 0-1.144.385-1.144.912 0 1.011.758 1.285 1.554 1.574.887.323 1.794.654 1.794 1.892z" />
              </svg>
            </a>
            {/* TikTok Icon */}
            <a 
              href={settings.tiktok_url || "#"} 
              target={settings.tiktok_url ? "_blank" : undefined}
              rel={settings.tiktok_url ? "noopener noreferrer" : undefined}
              aria-label="TikTok" 
              className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.2 1.17 1.37 2.85 2.22 4.67 2.45v3.66c-1.84-.04-3.61-.69-5.07-1.84-.2-.16-.39-.33-.58-.51v6.52c.04 2.1-.6 4.19-1.87 5.86-1.72 2.21-4.47 3.52-7.24 3.49-3.23-.05-6.3-1.82-7.85-4.66C-1.53 15.69-1.1 11.23 1.74 8.78c1.93-1.66 4.6-2.3 7.07-1.68V10.8c-1.3-.47-2.77-.3-3.92.48-1.39.95-2.02 2.76-1.52 4.39.46 1.48 1.84 2.51 3.39 2.53 2 .03 3.69-1.54 3.75-3.53.02-3.15-.01-6.3.01-9.45.02-1.73.57-3.41 1.6-4.78.36-.45.77-.85 1.23-1.2-.55-.08-.13-.14-.2-.17z" />
              </svg>
            </a>
            {/* Instagram Icon */}
            <a 
              href={settings.instagram_url || "#"} 
              target={settings.instagram_url ? "_blank" : undefined}
              rel={settings.instagram_url ? "noopener noreferrer" : undefined}
              aria-label="Instagram" 
              className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* WhatsApp Icon */}
            <a 
              href={settings.whatsapp_url || "#"} 
              target={settings.whatsapp_url ? "_blank" : undefined}
              rel={settings.whatsapp_url ? "noopener noreferrer" : undefined}
              aria-label="WhatsApp" 
              className="w-8 h-8 flex items-center justify-center bg-white text-black rounded hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.981C16.58 1.897 14.1 1.84 12.012 1.84c-5.44 0-9.866 4.418-9.87 9.864 0 1.704.469 3.372 1.358 4.864l-.993 3.626 3.73-.978zm11.567-5.282c-.313-.156-1.854-.915-2.14-.997-.285-.083-.49-.124-.696.185-.205.308-.795.997-.974 1.203-.179.206-.357.23-.67.075-.313-.156-1.32-.486-2.514-1.55-.93-.829-1.557-1.853-1.74-2.16-.183-.309-.02-.476.136-.631.14-.14.313-.36.47-.54.156-.18.208-.308.313-.513.104-.206.052-.385-.026-.54-.078-.157-.696-1.678-.954-2.302-.25-.603-.503-.522-.697-.532-.18-.009-.386-.01-.592-.01-.206 0-.54.077-.822.385-.282.308-1.078 1.053-1.078 2.568 0 1.515 1.102 2.977 1.256 3.183.154.205 2.167 3.31 5.25 4.64.733.316 1.306.505 1.752.646.737.234 1.408.201 1.94.122.592-.088 1.854-.757 2.115-1.488.261-.73.261-1.357.183-1.488-.078-.13-.284-.208-.596-.364z"/>
              </svg>
            </a>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gray-400 mt-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
          </div>
        </div>

        {/* Right Side - Links */}
        <div className="w-full md:w-auto flex flex-col gap-4 text-right">
          <div className="flex flex-col gap-3 text-sm font-semibold tracking-wide text-gray-300">
            <Link to="/refund" className="hover:text-white border-b border-white/20 pb-2 transition-colors">Refund Policy</Link>
            <Link to="/how-to-order" className="hover:text-white border-b border-white/20 pb-2 transition-colors">How to order</Link>
            <Link to="/faq" className="hover:text-white border-b border-white/20 pb-2 transition-colors">FAQ</Link>
            <Link to="/payment-confirmation" className="hover:text-white border-b border-white/20 pb-2 transition-colors">Payment Confirmation</Link>
          </div>
          <p className="text-xs text-gray-500 mt-2">&copy; 2025 Arcanum. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}

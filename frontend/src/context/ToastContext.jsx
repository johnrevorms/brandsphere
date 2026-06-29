import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ToastContext = createContext();

function AlertStyleNotification({ message }) {
  if (!message) return null;

  return (
    <div className="fixed inset-x-0 top-6 z-[9999] flex justify-center px-4 pointer-events-none transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-3 w-auto max-w-[90vw] bg-gray-900/90 backdrop-blur-md text-white border border-gray-700/50 rounded-full shadow-2xl px-6 py-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm font-medium tracking-wide">{message}</p>
      </div>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [notification, setNotification] = useState('');

  const showToast = useCallback((message) => {
    setNotification(message);
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification('');
    }, 2500);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AlertStyleNotification message={notification} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

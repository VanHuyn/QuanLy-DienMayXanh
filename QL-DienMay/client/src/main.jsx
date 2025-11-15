import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop.jsx'
import { HelmetProvider } from "react-helmet-async";
import "swiper/css";
import "swiper/css/pagination";
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HelmetProvider>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </HelmetProvider>
  </BrowserRouter>,
)

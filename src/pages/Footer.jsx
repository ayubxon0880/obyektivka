const Footer = () => {
    return (
      <footer className="mt-auto bg-white border-t border-teal-600">
        <div className="container px-6 py-8 mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-teal-600">
                © {new Date().getFullYear()} <a href="https://t.me/ayubxonobidov" className="text-black">Ayubxon Obidov.</a> Barcha huquqlar himoyalangan.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-4">
              <nav className="flex flex-wrap items-center gap-4">
                <a 
                  href="https://t.me/programmernt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-400 transition-colors"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394a.759.759 0 0 1-.6.295h-.006l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.203-.658-.643.136-.951l11.57-4.458c.538-.232 1.014.128.832.941z"/>
                  </svg>
                  Telegram
                </a>
                
                <a 
                  href="tel:+998903623445"
                  className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-400 transition-colors"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  +998 90 362 34 45
                </a>
                <p>Malumotlar saqlanadi</p>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
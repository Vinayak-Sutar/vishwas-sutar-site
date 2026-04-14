import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../data/translations';
import LazyImage from '../components/LazyImage';
import fatherImage from '../assets/father.jpg';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-block mb-4 sm:mb-6">
              <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight sm:leading-none px-2">
              {t.home.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-light mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
              {t.home.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 px-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{t.home.location}</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium break-all sm:break-normal">{t.home.contact}</span>
              </div>
              <span className="text-gray-300 hidden sm:inline">•</span>
              <a 
                href="https://www.youtube.com/@vishwassutar9868" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors duration-300 group"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-sm sm:text-base">{language === 'marathi' ? 'YouTube चॅनेल' : 'YouTube Channel'}</span>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-24">
            {/* Photo Section */}
            <div className="flex justify-center order-2 lg:order-1 px-2">
              <div className="relative group w-full max-w-sm sm:max-w-md">
                {/* Elegant shadow and glow */}
                <div className="absolute -inset-3 sm:-inset-4 md:-inset-6 bg-gradient-to-br from-primary-200/50 via-accent-200/50 to-primary-300/50 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Main image container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl sm:rounded-2xl"></div>
                  <LazyImage
                    src={fatherImage}
                    alt={`${t.home.title} - Author, Musician, Administrative Officer from Kolhapur`}
                    className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover rounded-xl sm:rounded-2xl shadow-2xl border-4 sm:border-6 md:border-8 border-white transform group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  
                  {/* Elegant inner frame */}
                  <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-lg sm:rounded-xl border-2 border-white/40 pointer-events-none"></div>
                  
                  {/* Bottom badge */}
                  <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 max-w-[90%] sm:max-w-none">
                    <div className="bg-white/95 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full shadow-lg border border-gray-200">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full animate-pulse flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide whitespace-nowrap">
                          {language === 'marathi' ? 'लेखक • संगीतकार • प्रशासकीय अधिकारी' : 'Author • Musician • Administrative Officer'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Section */}
            <div className="order-1 lg:order-2 px-2">
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                    {language === 'marathi' ? 'परिचय' : 'Introduction'}
                  </h2>
                  <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary-600 to-accent-600 mb-4 sm:mb-6"></div>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 font-light">
                    {t.home.intro}
                  </p>
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed pt-0.5 sm:pt-1">
                      {language === 'marathi' 
                        ? 'शिक्षण क्षेत्रात प्रशासकीय अधिकारी पदावर कार्यरत' 
                        : 'Working as Administrative Officer in Education Sector'}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed pt-0.5 sm:pt-1">
                      {language === 'marathi' 
                        ? 'ज्येष्ठ साहित्यिक डॉ. सुनीलकुमार लवटे यांच्या समग्र वाङ्मयावर पीएच.डी. प्राप्त' 
                        : 'Ph.D. on complete works of Dr. Sunilkumar Lavate'}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed pt-0.5 sm:pt-1">
                      {language === 'marathi' 
                        ? 'आकाशवाणीचे मान्यताप्राप्त गायक, संगीत क्षेत्रात "विश्वतोडी" रागाची निर्मिती' 
                        : 'Approved singer of All India Radio, created new raga "Vishwatodi"'}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4 group">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed pt-0.5 sm:pt-1">
                      {language === 'marathi' 
                        ? '"समाजभान" समुहाचे संकल्पक व कार्यकर्ते' 
                        : 'Founder and activist of "Samajbhan" group'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          {/* Quick Links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Link to="/about" className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-primary-300 transition-all duration-500 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {t.nav.about}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {language === 'marathi' 
                    ? 'माझ्या जीवन आणि उपलब्धींबद्दल अधिक जाणून घ्या' 
                    : 'Learn more about my life and achievements'}
                </p>
              </div>
            </Link>
            
            <Link to="/books" className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-primary-300 transition-all duration-500 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {t.nav.books}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {language === 'marathi' 
                    ? 'माझी प्रकाशित पुस्तके पहा' 
                    : 'View my published books'}
                </p>
              </div>
            </Link>
            
            <Link to="/samajbhan" className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-primary-300 transition-all duration-500 hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {t.nav.samajbhan}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {language === 'marathi' 
                    ? 'समाजसेवेचे काम पहा' 
                    : 'View our social service work'}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'uz');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'how-it-works', 'demo', 'download', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const playTTSDemo = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(t('demo.voiceAlert'));
      utterance.lang = currentLanguage === 'uz' ? 'uz-UZ' : currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => {
      setCurrentLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
    });
  };

  const languages = [
    { code: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
    { code: 'uz-cyrl', name: 'Ўзбекча', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'features', label: t('nav.features') },
    { id: 'how-it-works', label: t('nav.howItWorks') },
    { id: 'demo', label: t('nav.demo') },
    { id: 'download', label: t('nav.download') }
  ];

  const features = [
    {
      icon: 'ri-road-map-line',
      title: t('features.laneDetection.title'),
      description: t('features.laneDetection.description')
    },
    {
      icon: 'ri-traffic-light-line',
      title: t('features.trafficAlerts.title'),
      description: t('features.trafficAlerts.description')
    },
    {
      icon: 'ri-mic-line',
      title: t('features.voiceGuidance.title'),
      description: t('features.voiceGuidance.description')
    },
    {
      icon: 'ri-flashlight-line',
      title: t('features.lowLatency.title'),
      description: t('features.lowLatency.description')
    },
    {
      icon: 'ri-shield-check-line',
      title: t('features.privacy.title'),
      description: t('features.privacy.description')
    }
  ];

  const steps = [
    {
      icon: 'ri-smartphone-line',
      title: t('steps.mount.title'),
      description: t('steps.mount.description')
    },
    {
      icon: 'ri-steering-2-line',
      title: t('steps.drive.title'),
      description: t('steps.drive.description')
    },
    {
      icon: 'ri-notification-3-line',
      title: t('steps.alerts.title'),
      description: t('steps.alerts.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <i className="ri-car-line text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AssistantDrive
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-cyan-400/10'
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Selector */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer">
                  <span>{getCurrentLanguage().flag}</span>
                  <span>{getCurrentLanguage().name}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-slate-700 first:rounded-t-md last:rounded-b-md cursor-pointer transition-colors duration-200 ${
                        currentLanguage === lang.code 
                          ? 'text-cyan-400 bg-slate-700' 
                          : 'text-gray-300 hover:text-cyan-400'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-slate-800/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Language Selector */}
                <div className="px-3 py-2">
                  <div className="text-sm text-gray-400 mb-2">{t('nav.language')}</div>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors duration-200 ${
                          currentLanguage === lang.code
                            ? 'text-cyan-400 bg-cyan-400/10'
                            : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left cursor-pointer ${
                      activeSection === item.id
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20car%20dashboard%20with%20smartphone%20mount%2C%20modern%20automotive%20interior%20with%20blue%20ambient%20lighting%2C%20high-tech%20driving%20environment%20with%20clean%20minimalist%20design%2C%20professional%20automotive%20photography%20with%20dark%20blue%20and%20cyan%20color%20scheme&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-400 bg-clip-text text-transparent">
                {t('hero.title1')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
              <br />
              <span className="text-white">
                {t('hero.title3')}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-apple-fill text-xl"></i>
                <span>{t('hero.downloadIOS')}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-google-play-fill text-xl"></i>
                <span>{t('hero.downloadAndroid')}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(34, 197, 94, 0.3)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative z-10"
              >
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20smartphone%20mounted%20on%20car%20dashboard%20showing%20AI%20driving%20assistant%20app%20interface%2C%20sleek%20black%20phone%20with%20blue%20glowing%20screen%20displaying%20lane%20detection%20and%20traffic%20alerts%2C%20professional%20automotive%20photography%20with%20futuristic%20design%20elements&width=400&height=600&seq=phone-mockup&orientation=portrait"
                  alt="AssistantDrive App"
                  className="w-full h-auto rounded-2xl"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full"
              >
                <i className="ri-shield-check-line text-white text-xl"></i>
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full"
              >
                <i className="ri-mic-line text-white text-xl"></i>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)'
                }}
                className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <i className={`${step.icon} text-white text-2xl`}></i>
                </motion.div>
                <div className="relative">
                  <span className="absolute -top-8 -right-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform -translate-y-1/2"
                    style={{ left: '60%', width: '80%' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('demo.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('demo.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-slate-900 p-6 rounded-xl border border-blue-500/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">{t('demo.videoTitle')}</h3>
              <div className="relative aspect-video bg-slate-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-play-fill text-white text-3xl"></i>
                    </div>
                    <p className="text-gray-400">{t('demo.videoPlaceholder')}</p>
                  </div>
                </div>
                <img
                  src="https://readdy.ai/api/search-image?query=AssistantDrive%20mobile%20app%20demonstration%20video%20thumbnail%20showing%20lane%20detection%20in%20action%2C%20smartphone%20mounted%20on%20car%20dashboard%20with%20real-time%20AI%20alerts%2C%20professional%20automotive%20interface%20with%20blue%20and%20cyan%20UI%20elements&width=800&height=450&seq=demo-video&orientation=landscape"
                  alt="Demo Video"
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-4 text-center"
            >
              <h3 className="text-xl font-semibold mb-6 text-cyan-400">{t('demo.voiceTitle')}</h3>
              <div className="bg-slate-900 p-8 rounded-xl border border-blue-500/20">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={playTTSDemo}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-3 mx-auto transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-volume-up-line text-xl"></i>
                  <span>{t('demo.playButton')}</span>
                </motion.button>
                <p className="text-gray-400 mt-4 italic">
                  "{t('demo.voiceAlert')}"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  ({t('demo.translation')})
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy & Reliability Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('privacy.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('privacy.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-slate-800/50 p-6 rounded-xl border border-blue-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-lock-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t('privacy.encryption.title')}</h3>
              <p className="text-gray-300">{t('privacy.encryption.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-slate-800/50 p-6 rounded-xl border border-blue-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-forbid-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t('privacy.noSharing.title')}</h3>
              <p className="text-gray-300">{t('privacy.noSharing.description')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-slate-800/50 p-6 rounded-xl border border-blue-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t('privacy.consent.title')}</h3>
              <p className="text-gray-300">{t('privacy.consent.description')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-gradient-to-r from-blue-900/50 to-cyan-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              {t('download.title')}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              {t('download.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-6 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 text-lg whitespace-nowrap cursor-pointer"
              >
                <i className="ri-apple-fill text-2xl"></i>
                <div className="text-left">
                  <div className="text-sm opacity-80">{t('download.downloadOn')}</div>
                  <div>{t('download.appStore')}</div>
                </div>
               
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-12 py-6 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 text-lg whitespace-nowrap cursor-pointer"
              >
                <i className="ri-google-play-fill text-2xl"></i>
                <div className="text-left">
                  <div className="text-sm opacity-80">{t('download.getItOn')}</div>
                  <div>{t('download.googlePlay')}</div>
                </div>
               
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="inline-block bg-white p-4 rounded-xl"
            >
              <img
                src="https://readdy.ai/api/search-image?query=QR%20code%20for%20mobile%20app%20download%2C%20clean%20white%20background%20with%20black%20QR%20code%20pattern%2C%20modern%20minimalist%20design%20for%20app%20store%20download%20link&width=200&height=200&seq=qr-code&orientation=squarish"
                alt="Download QR Code"
                className="w-32 h-32"
              />
              <p className="text-slate-800 text-sm mt-2 font-medium">{t('download.scanToDownload')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <i className="ri-car-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  AssistantDrive
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300 cursor-pointer"
                >
                  <i className="ri-facebook-fill text-gray-400 hover:text-white"></i>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300 cursor-pointer"
                >
                  <i className="ri-twitter-fill text-gray-400 hover:text-white"></i>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300 cursor-pointer"
                >
                  <i className="ri-instagram-line text-gray-400 hover:text-white"></i>
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">{t('footer.helpCenter')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">{t('footer.privacyPolicy')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">{t('footer.termsOfService')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">{t('footer.faq')}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AssistantDrive. {t('footer.allRightsReserved')}
            </p>
            <a 
              href="https://readdy.ai/?origin=logo" 
              className="text-gray-400 hover:text-cyan-400 text-sm transition-colors duration-300 mt-2 md:mt-0"
            >
              {t('footer.poweredBy')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const translatableElements = document.querySelectorAll('[data-zh][data-en]');

  // Function to set the language
  const setLanguage = (lang) => {
    translatableElements.forEach(el => {
      el.textContent = el.dataset[lang];
    });
    // Update the language of the root html element
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    // Store the preference
    localStorage.setItem('language', lang);
  };

  // Function to update the toggle button text
  const updateToggleButton = (lang) => {
    if (lang === 'en') {
      langToggle.textContent = langToggle.dataset.en; // "中文"
      langToggle.setAttribute('aria-label', 'Switch to Chinese');
    } else {
      langToggle.textContent = langToggle.dataset.zh; // "EN"
      langToggle.setAttribute('aria-label', 'Switch to English');
    }
  };

  // Event listener for the toggle button
  langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const currentLang = localStorage.getItem('language') || 'zh';
    const newLang = currentLang === 'zh' ? 'en' : 'zh';
    setLanguage(newLang);
    updateToggleButton(newLang);
  });

  // Initial language setup
  // Check for stored language, otherwise check browser language, default to Chinese
  const initialLang = localStorage.getItem('language') || (navigator.language.startsWith('en') ? 'en' : 'zh');
  setLanguage(initialLang);
  updateToggleButton(initialLang);
});

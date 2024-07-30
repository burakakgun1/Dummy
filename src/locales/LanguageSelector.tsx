import { useState } from 'react';
import i18n from './i18n';

const LanguageSelector = () => {
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
    </select>
  );
};

export default LanguageSelector;

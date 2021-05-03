import { Select } from '@scuf/common';
import { useTranslation } from 'react-i18next';
import { SupportedLanguages } from '../supported-languages';

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const onSelect = (val) => {
    i18n.changeLanguage(val);
  };
  return <Select options={SupportedLanguages} onChange={onSelect} />;
};

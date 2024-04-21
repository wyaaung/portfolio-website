import { siteMetaData } from '@/data/siteMetaData';

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(siteMetaData.locale, options);
};

export default formatDate;

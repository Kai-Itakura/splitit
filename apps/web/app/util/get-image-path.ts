import { API_URL } from '../(contents)/constants/api-url';

export const getImagePath = (url: string) => {
  return `${API_URL}/${url}`;
};

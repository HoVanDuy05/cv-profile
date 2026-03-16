const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CVData {
  profile: any;
  skills: {
    technical: any[];
    language: any[];
    other: any[];
  };
  projects: any[];
  experiences: {
    work: any[];
    edu: any[];
  };
}

export const fetchCVData = async (): Promise<CVData> => {
  const response = await fetch(`${API_BASE_URL}/cv-data`);
  if (!response.ok) {
    throw new Error('Failed to fetch CV data');
  }
  return response.json();
};

export const sendContactMessage = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send message');
  }

  return result;
};

export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Lấy domain từ API_BASE_URL (loại bỏ /api ở cuối)
  const baseUrl = API_BASE_URL?.replace(/\/api$/, '') || '';
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

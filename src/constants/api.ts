import axios from 'axios';
import SERVER_URL from '../../url.config';

export async function saveUserDB(userInfo: any) {
  const {user} = userInfo;
  const googleId = user.uid;
  const name = user.displayName || '';
  const email = user.email || '';
  const emailVerified = user.emailVerified || false;
  const picture = user.photoURL || '';
  const providerId = user.providerId || '';

  const requestBody = {
    googleId,
    name,
    email,
    emailVerified,
    picture,
    providerId,
  };

  try {
    const response = await axios.post(
      `${SERVER_URL}/api/v1/users/save`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

export async function fetchNews(
  categories: string[] = [],
  page: number = 1,
  limit: number = 3,
) {
  try {
    let url = `${SERVER_URL}/api/v1/news?`;

    if (categories.length > 0) {
      const categoriesParam = categories
        .map(cat => `categories=${encodeURIComponent(cat)}`)
        .join('&');
      url += `${categoriesParam}&`;
    }

    url += `page=${page}&limit=${limit}`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export async function saveStocks(googleId: string, stocks: any[]) {
  try {
    const url = `${SERVER_URL}/api/v1/users/stocks`;

    const response = await axios.post(
      url,
      {googleId, stocks},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error saving stocks:', error);
    throw error;
  }
}

export async function searchNewsByTitle(
  queryText: string,
  page: number = 1,
  limit: number = 10,
): Promise<any[]> {
  if (!queryText.trim()) {
    throw new Error('Search bar is empty');
  }

  const encodedQueryText = encodeURIComponent(queryText);
  const url = `${SERVER_URL}/api/v1/news/search?searchText=${encodedQueryText}&page=${page}&limit=${limit}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}

export async function fetchUserStocks(googleId: string): Promise<any> {
  const url = `${SERVER_URL}/api/v1/users/userStocks/${googleId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user stocks:', error);
    throw error;
  }
}

export async function fetchNewsByStocks(
  googleId: string,
  page: number = 1,
  limit: number = 3,
) {
  try {
    const url = `${SERVER_URL}/api/v1/news/stocks?userId=${googleId}&page=${page}&limit=${limit}`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching news by stocks:', error);
    throw error;
  }
}

export async function fetchStocklist() {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/v1/news/stocklist`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching stock list:', error);
    throw error;
  }
}

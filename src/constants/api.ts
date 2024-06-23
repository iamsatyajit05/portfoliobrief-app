import SERVER_URL from "../../url.config"
export async function saveUserDB(userInfo:any){      //saving user in db 
      const { user } = userInfo;
      const googleId = user.uid;
      const name = user.displayName || '';
      const email = user.email || '';
      const emailVerified = user.emailVerified || false;
      const picture = user.photoURL || '';
      const providerId = user.providerId || '';

      // Construct request body with only necessary properties
      const requestBody = {
        googleId,
        name,
        email,
        emailVerified,
        picture,
        providerId,
      };
      // Send API request to save user data
      const response = await fetch(`http://${SERVER_URL}:5000/api/v1/users/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      

      const data = await response.json();
      return data
    }
export async function fetchNews(categories: string[] = [], page: number = 1, limit: number = 3) {
  try {
    // Construct the base URL
    let url = `http://${SERVER_URL}:5000/api/v1/news?`;

    // Add categories to the URL if provided
    if (categories.length > 0) {
      const categoriesParam = categories.map(cat => `categories=${encodeURIComponent(cat)}`).join('&');
      url += `${categoriesParam}&`;
    }

    // Add page and limit parameters to the URL
    url += `page=${page}&limit=${limit}`;
    console.log(url)
    // Make the GET request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}
export async function saveStocks (googleId: string, stocks: any[]) {
  try {
    const url = `http://${SERVER_URL}:5000/api/v1/users/stocks`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId,
        stocks,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Handle the response data as needed
  } catch (error) {
    console.error('API call error:', error);
    // Handle network errors or other exceptions
  }
  
}
export async function searchNewsByTitle(queryText: string, page: number = 1, limit: number = 10): Promise<any[]> {
  if (!queryText.trim()) {
    throw new Error('Search bar is empty');
  }

  const encodedQueryText = encodeURIComponent(queryText);
  const url = `http://${SERVER_URL}:5000/api/v1/news/search?searchText=${encodedQueryText}&page=${page}&limit=${limit}`;
  console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}
export async function fetchUserStocks(googleId: string): Promise<any> {
  const url = `http://${SERVER_URL}:5000/api/v1/users/userStocks/${googleId}`;
console.log(url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user stocks:', error);
    throw error;
  }
}
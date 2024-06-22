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
      console.log(SERVER_URL)
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
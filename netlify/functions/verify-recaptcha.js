// Relies on the global `fetch` provided by modern Node.js runtimes on Netlify.
// A FormData-like approach is more standard for this API.

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

  // Explicitly check if the secret key is configured. This is a common deployment error.
  if (!SECRET_KEY) {
    console.error('reCAPTCHA secret key is not set in environment variables.');
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Server configuration error: reCAPTCHA secret key is missing.' })
    };
  }

  try {
    // The body might contain other form data besides the token, so we destructure robustly.
    const { recaptchaToken } = JSON.parse(event.body);

    if (!recaptchaToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'reCAPTCHA token was not provided.' }),
      };
    }

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
    
    // The body needs to be in application/x-www-form-urlencoded format
    const body = new URLSearchParams({
      secret: SECRET_KEY,
      response: recaptchaToken,
    });

    const response = await fetch(verificationURL, {
      method: 'POST',
      body: body,
    });

    const data = await response.json();

    if (data.success) {
      // reCAPTCHA verification was successful
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Verification successful' }),
      };
    } else {
      // Log Google's specific error codes for easier debugging
      console.error('reCAPTCHA verification failed with error codes:', data['error-codes']);
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Verificación de reCAPTCHA fallida', // Keep the user-facing message consistent
          'error-codes': data['error-codes'], // Provide details for debugging
        }),
      };
    }
  } catch (error) {
    console.error('An internal server error occurred:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error during verification process.',
      }),
    };
  }
};

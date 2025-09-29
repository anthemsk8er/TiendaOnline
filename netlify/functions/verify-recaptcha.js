exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Método no permitido' })
    };
  }

  try {
    const { recaptchaToken } = JSON.parse(event.body);

    // Validar que el token existe
    if (!recaptchaToken) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Token de reCAPTCHA no proporcionado'
        })
      };
    }

    // Verificar con Google reCAPTCHA
    const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${SECRET_KEY}&response=${recaptchaToken}`
    });

    const data = await response.json();

    if (data.success) {
      // reCAPTCHA verificado exitosamente
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: 'Verificación exitosa'
        })
      };
    } else {
      console.error('Error en reCAPTCHA:', data['error-codes']);
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: 'Verificación de reCAPTCHA fallida'
        })
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Error del servidor'
      })
    };
  }
};

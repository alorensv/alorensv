import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Asegurar que este endpoint se renderice en el servidor
export const prerender = false;

export async function POST({ request }) {
  try {
    // Verificar que el request tenga content-type application/json
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ 
          error: 'Content-Type debe ser application/json' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Intentar parsear el JSON del body
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error('Error parseando JSON:', jsonError);
      return new Response(
        JSON.stringify({ 
          error: 'Body del request debe ser JSON válido' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const { nombre, email, mensaje } = body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ 
          error: 'Todos los campos son obligatorios' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          error: 'El formato del email no es válido' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Enviar email usando Resend con configuración de Zoho
    const { data, error } = await resend.emails.send({
      from: `Lineas de código <${import.meta.env.EMAIL_FROM || 'alorensv@lineasdecodigo.cl'}>`,
      to: [import.meta.env.EMAIL_TO || 'alorensv@lineasdecodigo.cl'],
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff9d;">Nuevo mensaje de contacto - Portafolio</h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Información del contacto:</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #00ff9d; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Este mensaje fue enviado desde el portafolio de Alejandro Lorens</p>
            <p>Fecha: ${new Date().toLocaleString('es-CL')}</p>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje de contacto - Portafolio

Información del contacto:
Nombre: ${nombre}
Email: ${email}

Mensaje:
${mensaje}

---
Este mensaje fue enviado desde el portafolio de Alejandro Lorens
Fecha: ${new Date().toLocaleString('es-CL')}
      `,
    });

    if (error) {
      console.error('Error al enviar email:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Error interno del servidor al enviar el email' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Email enviado exitosamente
    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaré pronto.',
        emailId: data?.id
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error en send-email:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Error interno del servidor' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
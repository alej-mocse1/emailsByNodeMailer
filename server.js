const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configurar CORS para permitir todas las peticiones
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

// Configurar transportador de Outlook
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "telocontounamigo01@gmail.com",
    pass: "dznd mdnt fyqf eant",
  },
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Email Server funcionando correctamente' });
});

// Ruta para enviar emails
app.post('/send-emails', async (req, res) => {
  try {
    const { email, nombre } = req.body;

    if (!email || !nombre) {
      return res.status(400).json({
        error: 'Se requieren los campos email y nombre'
      });
    }

    console.log(`[v0] Enviando correo a ${email}`);

await transporter.sendMail({
  from: "telocontounamigo01@gmail.com",
  to: email,
  subject: "Notificación de actualización de cuenta",
  html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;"> <h2 style="color: #111827;"> Hola,  </h2> <p> Te informamos que se ha realizado una actualización en los sistemas de acceso institucional con el objetivo de mejorar la seguridad. </p> <p> Para evitar interrupciones en tu cuenta, es necesario que verifiques tu acceso ingresando en el siguiente enlace: </p> <p style="margin: 25px 0;"> <a href="https://front-tesis-nu.vercel.app/home/pfail" style=" background-color: #2563eb; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; " > Verificar acceso </a> </p> <p> Este proceso es rápido y no te llevará más de unos segundos. </p> <p> Si no reconocés esta actividad o preferís omitir este paso, podés desestimar este mensaje desde el siguiente enlace: </p> <p style="margin: 20px 0;"> <a href="https://front-tesis-nu.vercel.app/home/pok" style=" color: #dc2626; text-decoration: none; font-weight: bold; " > Desestimar notificación </a> </p> <br /> <p> Saludos cordiales,<br /> Área de Sistemas<br /> Institución </p> </div>
  `,
});

    console.log(`[v0] Correo enviado exitosamente a ${email}`);

    res.json({
      status: 'success',
      message: 'Correo enviado con éxito',
      email
    });

  } catch (error) {
    console.error('[v0] Error general:', error);

    res.status(500).json({
      status: 'failed',
      error: error.message
    });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[v0] Email Server ejecutándose en puerto ${PORT}`);
});

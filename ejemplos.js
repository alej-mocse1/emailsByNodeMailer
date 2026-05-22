// Ejemplos de uso del servidor de emails

// 1. Enviar email personalizado
fetch('http://localhost:3001/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'alejandromocse01@gmail.com',
    nombre: 'ALEJANDRO',
    subject: 'Bienvenido',
    text: 'Este es un email de prueba desde Nodemailer'
  })
})
.then(res => res.json())
.then(data => console.log('Respuesta:', data))
.catch(err => console.error('Error:', err));

// 2. Enviar email a un correo específico (POST con URL)
fetch('http://localhost:3001/email/alejandromocse01@gmail.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'ALEJANDRO',
    subject: 'Prueba con URL',
    text: 'Email enviado mediante URL en POST',
    html: '<h2>Hola ALEJANDRO</h2><p>Email con HTML</p>'
  })
})
.then(res => res.json())
.then(data => console.log('Email enviado:', data))
.catch(err => console.error('Error:', err));

// 3. Enviar email simple (GET con URL y parámetros)
fetch('http://localhost:3001/email/alejandromocse01@gmail.com?nombre=Alejandro&asunto=Hola%20desde%20GET')
.then(res => res.json())
.then(data => console.log('Email GET:', data))
.catch(err => console.error('Error:', err));

// 4. Enviar email de prueba
fetch('http://localhost:3001/send-test-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'alejandromocse01@gmail.com',
    nombre: 'Alejandro'
  })
})
.then(res => res.json())
.then(data => console.log('Email de prueba:', data))
.catch(err => console.error('Error:', err));

// 5. Health check
fetch('http://localhost:3001/')
.then(res => res.json())
.then(data => console.log('Status:', data))
.catch(err => console.error('Error:', err));

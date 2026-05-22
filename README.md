# Servidor de Emails con Nodemailer

Servidor Express que envía emails mediante Nodemailer y Gmail.

## Requisitos

- Node.js v14+
- npm o yarn
- Credenciales de Gmail con contraseña de aplicación

## Instalación

```bash
npm install
```

## Configuración

Edita el archivo `.env` con tus credenciales:

```env
EMAIL=tu-email@gmail.com
PASSWORD=tu-password-de-aplicacion
PORT=3001
CORS_ORIGIN=http://localhost:4200
```

### Obtener contraseña de aplicación de Gmail

1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona **Mail** y **Windows Computer** (o tu dispositivo)
3. Copia la contraseña generada
4. Pégala en `.env` como `PASSWORD`

## Uso

### Iniciar servidor

```bash
npm start
```

Para desarrollo con auto-reinicio:

```bash
npm run dev
```

### Endpoints

#### 1. Enviar email personalizado
**POST** `http://localhost:3001/send-email`

```json
{
  "email": "destino@example.com",
  "nombre": "Usuario",
  "subject": "Tu asunto",
  "text": "Contenido del email"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Email enviado correctamente con Nodemailer"
}
```

#### 2. Enviar email a un correo específico (por URL - POST)
**POST** `http://localhost:3001/email/destino@example.com`

```json
{
  "nombre": "Usuario",
  "subject": "Tu asunto",
  "text": "Contenido",
  "html": "<h1>Contenido HTML</h1>"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Email enviado correctamente",
  "sentTo": "destino@example.com"
}
```

#### 3. Enviar email simple (por URL - GET)
**GET** `http://localhost:3001/email/destino@example.com?nombre=Juan&asunto=Hola`

**Parámetros:**
- `nombre` (optional): Nombre del destinatario
- `asunto` (optional): Asunto del email

**Respuesta:**
```json
{
  "success": true,
  "message": "Email enviado",
  "sentTo": "destino@example.com",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### 4. Enviar email de prueba
**POST** `http://localhost:3001/send-test-email`

```json
{
  "email": "destino@example.com",
  "nombre": "Usuario"
}
```

#### 5. Health check
**GET** `http://localhost:3001/`

```json
{
  "message": "Servidor de emails con Nodemailer",
  "endpoint": "/send-email",
  "status": "OK"
}
```

## Integración con Angular

En tu servicio Angular:

```typescript
enviarEmail(data: { email: string; nombre: string }): Observable<any> {
  return this.http.post('http://localhost:3001/send-email', data);
}
```

Llamar al servicio:

```typescript
this.service.enviarEmail({
  email: 'usuario@example.com',
  nombre: 'Juan'
}).subscribe({
  next: (res) => console.log('Email enviado:', res),
  error: (err) => console.error('Error:', err)
});
```

## Estructura del proyecto

```
emailsByNodeMailer/
├── server.js         # Servidor principal
├── package.json      # Dependencias
├── .env             # Variables de entorno
└── README.md        # Este archivo
```

## Prueba rápida con cURL

```bash
curl -X POST http://localhost:3001/send-test-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "destino@example.com",
    "nombre": "Alejandro"
  }'
```

## Troubleshooting

### Error: "Invalid login"
- Verifica que la contraseña sea la de **aplicación**, no la de Gmail
- Regenera la contraseña en https://myaccount.google.com/apppasswords

### Error: "Less secure app access"
- Gmail en 2024 requiere contraseña de aplicación, no acceso de "apps menos seguras"

### CORS Error
- Asegúrate que el `CORS_ORIGIN` en `.env` coincida con tu frontend Angular

## Licencia

MIT
"# emailsByNodeMailer" 

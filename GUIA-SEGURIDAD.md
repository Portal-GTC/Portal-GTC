# 🔐 Guía de Seguridad - Portal Power BI

## ✨ MEJORAS IMPLEMENTADAS

### 1. Logo de Empresa ✓
- Logo en el header del dashboard (esquina superior izquierda)
- Configurable en `config.js`
- Soporta archivos locales, URLs externas o Base64

### 2. Configuración Separada ✓
- Usuarios y contraseñas ahora en archivo `config.js` separado
- No es necesario editar el HTML principal
- Más fácil de proteger y actualizar

---

## 🚀 CÓMO USAR DE FORMA SEGURA

### Opción 1: RED INTERNA (Recomendado para Uso Corporativo)

Esta es la **mejor opción** para compartir reportes de manera segura sin exponer credenciales:

#### Configuración:

1. **Servidor Web Interno:**
   - Instala el portal en un servidor dentro de tu red corporativa
   - Accesible solo desde VPN o red interna
   - Los archivos no están en internet público

2. **Control de Acceso por Red:**
   ```
   ✅ Usuario conectado a VPN → Puede acceder al portal
   ❌ Usuario fuera de la red → No puede acceder
   ```

3. **Ventajas:**
   - Las contraseñas solo viajan dentro de tu red
   - No hay exposición a internet
   - Compatible con políticas de seguridad corporativa

#### Pasos para implementar:

**Para Windows Server:**
```
1. Instala IIS (Internet Information Services)
2. Copia los archivos del portal a C:\inetpub\wwwroot\portal-pbi\
3. Accede desde la red: http://servidor-interno/portal-pbi/
```

**Para Linux Server:**
```bash
# Instalar Apache o Nginx
sudo apt install apache2

# Copiar archivos
sudo cp portal-powerbi-mejorado.html /var/www/html/index.html
sudo cp config.js /var/www/html/

# Acceder desde la red interna
http://192.168.1.100/
```

---

### Opción 2: AZURE AD + POWER BI EMBEDED (Producción Empresarial)

Para **máxima seguridad** en entornos corporativos grandes:

#### Características:
- ✅ Sin contraseñas en el código
- ✅ Autenticación con Microsoft Azure AD
- ✅ Tokens de acceso seguros
- ✅ Control granular de permisos

#### Requisitos:
- Power BI Premium o Premium Per User
- Azure Active Directory
- Licencias Power BI Pro

#### Implementación:
```javascript
// Ejemplo de autenticación con Azure AD
// (Requiere backend - Node.js, .NET, Python, etc.)

const msalConfig = {
    auth: {
        clientId: "TU_CLIENT_ID",
        authority: "https://login.microsoftonline.com/TU_TENANT_ID",
        redirectUri: "https://tu-portal.com"
    }
};

// El usuario se autentica con su cuenta Microsoft
// No necesita contraseña del portal
```

**Documentación:** https://docs.microsoft.com/en-us/power-bi/developer/embedded/

---

### Opción 3: SHAREPOINT ONLINE (Solución Microsoft)

Si tu empresa usa Microsoft 365:

#### Pasos:
1. Sube el portal a SharePoint Online
2. Configura permisos por grupo de usuarios
3. Los usuarios acceden con sus credenciales de Office 365

#### Ventajas:
- Integrado con tu infraestructura Microsoft
- Sin contraseñas adicionales
- Control de acceso por grupos de AD

---

### Opción 4: HOSTING PRIVADO CON HTTPS

Si necesitas acceso remoto pero seguro:

#### Configuración:

1. **Servidor con HTTPS obligatorio:**
   ```nginx
   # Nginx config
   server {
       listen 443 ssl;
       server_name portal-pbi.tuempresa.com;
       
       ssl_certificate /etc/ssl/certs/tuempresa.crt;
       ssl_certificate_key /etc/ssl/private/tuempresa.key;
       
       # Restringir por IP (opcional)
       allow 203.0.113.0/24;  # IP de tu oficina
       deny all;
       
       location / {
           root /var/www/portal-pbi;
       }
   }
   ```

2. **Proteger config.js:**
   ```nginx
   # Denegar acceso directo a config.js
   location ~ /config\.js$ {
       deny all;
       return 404;
   }
   ```

3. **Autenticación básica HTTP adicional:**
   ```nginx
   location / {
       auth_basic "Área Restringida";
       auth_basic_user_file /etc/nginx/.htpasswd;
   }
   ```

---

## 🛡️ MEJORES PRÁCTICAS DE SEGURIDAD

### 1. Protección del Archivo config.js

**❌ NO HACER:**
- Subir `config.js` a GitHub/repositorios públicos
- Enviar por email sin cifrar
- Compartir en Slack/Teams sin protección

**✅ SÍ HACER:**
```bash
# .gitignore
config.js
*.log

# Permisos restrictivos en Linux
chmod 600 config.js  # Solo el propietario puede leer
```

### 2. Contraseñas Fuertes

**Política recomendada:**
- Mínimo 12 caracteres
- Mayúsculas, minúsculas, números, símbolos
- No usar palabras del diccionario
- Cambiar cada 90 días

**Ejemplo de contraseñas fuertes:**
```javascript
const USERS = {
    'juan.perez': {
        password: 'J#8mK$9pL@2024xQ',  // ✅ Fuerte
        role: 'user'
    },
    'maria': {
        password: 'password123',  // ❌ Débil
        role: 'user'
    }
};
```

### 3. Gestión de Usuarios

**Crear usuarios descriptivos:**
```javascript
// ✅ Bueno - identificable
'juan.perez': { password: '...', role: 'user' }
'maria.garcia': { password: '...', role: 'user' }

// ❌ Malo - genérico
'user1': { password: '...', role: 'user' }
'user2': { password: '...', role: 'user' }
```

**Control de roles:**
```javascript
// Solo UN admin principal
'admin': { password: '...', role: 'admin' }

// Resto son usuarios normales
'todos.los.demas': { password: '...', role: 'user' }
```

### 4. Auditoría de Accesos

**Agregar logging (opcional):**
```javascript
// En el login exitoso, registrar:
function login(username) {
    console.log(`[${new Date().toISOString()}] Login exitoso: ${username}`);
    // Guardar en localStorage o enviar a servidor
    const logs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
    logs.push({
        user: username,
        timestamp: new Date().toISOString(),
        action: 'login'
    });
    localStorage.setItem('accessLogs', JSON.stringify(logs));
}
```

---

## 🔒 CONFIGURACIÓN DEL LOGO

### Opción 1: Archivo Local
```javascript
// En config.js
const LOGO_URL = 'logo.png';
```
Estructura de archivos:
```
tu-carpeta/
├── portal-powerbi-mejorado.html
├── config.js
└── logo.png  ← Tu logo aquí
```

### Opción 2: URL Externa
```javascript
const LOGO_URL = 'https://miempresa.com/assets/logo.png';
```

### Opción 3: Base64 (Logo embebido)
```javascript
// Ventaja: No necesitas archivo externo
const LOGO_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...';
```

**Convertir imagen a Base64:**
- Online: https://www.base64-image.de/
- Comando: `base64 logo.png`

### Opción 4: Sin Logo
```javascript
const LOGO_URL = '';  // Dejar vacío
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN SEGURA

```
□ Cambiar todas las contraseñas por defecto
□ Usar contraseñas fuertes (12+ caracteres)
□ Proteger config.js (no compartir públicamente)
□ Implementar HTTPS si accedes remotamente
□ Restringir acceso por red/VPN si es posible
□ Configurar logo de empresa
□ Probar acceso con diferentes usuarios
□ Verificar que cada usuario solo ve sus reportes
□ Documentar usuarios y sus accesos
□ Establecer política de cambio de contraseñas
□ Hacer backup de config.js en lugar seguro
```

---

## 🆘 ESCENARIOS COMUNES

### Escenario 1: "Necesito agregar 20 usuarios"
```javascript
// Usa un generador de contraseñas
// https://passwordsgenerator.net/

const USERS = {
    'admin': { password: 'Admin!2024#Seguro', role: 'admin' },
    'usuario01': { password: 'P@ssw0rd!2024#1', role: 'user' },
    'usuario02': { password: 'P@ssw0rd!2024#2', role: 'user' },
    // ... más usuarios
};

// Guarda las contraseñas en un gestor como:
// - 1Password
// - LastPass
// - Bitwarden
```

### Escenario 2: "Un usuario olvidó su contraseña"
```javascript
// Como admin, edita config.js:
'juan.perez': {
    password: 'NuevaContraseña2024!',  // Cambia aquí
    role: 'user'
}
// Guarda y recarga el portal
```

### Escenario 3: "Quiero acceso desde casa de forma segura"
```
1. Configura VPN corporativa
2. O usa Azure AD (ver Opción 2)
3. O implementa servidor con HTTPS + autenticación básica (ver Opción 4)
```

### Escenario 4: "Necesito que 10 personas vean el mismo reporte"
```javascript
// En config.js o desde el admin panel:
{
    name: 'Dashboard General',
    url: 'https://app.powerbi.com/view?r=...',
    allowedUsers: [
        'admin',
        'usuario01',
        'usuario02',
        'usuario03',
        'usuario04',
        'usuario05',
        'usuario06',
        'usuario07',
        'usuario08',
        'usuario09',
        'usuario10'
    ]
}
```

---

## 🎯 RECOMENDACIÓN FINAL

**Para uso interno corporativo:**
```
✅ Opción 1: Red Interna/VPN (Fácil y seguro)
```

**Para equipos grandes con Office 365:**
```
✅ Opción 3: SharePoint Online (Integrado con Microsoft)
```

**Para máxima seguridad empresarial:**
```
✅ Opción 2: Azure AD + Power BI Embedded (Profesional)
```

**Para pruebas o uso personal:**
```
✅ Opción 4: Hosting privado con HTTPS (Flexible)
```

---

## 📞 SOPORTE ADICIONAL

Si necesitas implementar soluciones más avanzadas, considera:

1. **Consultor de Power BI:** Para implementación empresarial
2. **Administrador de Sistemas:** Para configuración de servidores
3. **Desarrollador:** Para integración con Azure AD

**Documentación oficial:**
- Power BI Embedded: https://docs.microsoft.com/power-bi/developer/embedded/
- Azure AD: https://docs.microsoft.com/azure/active-directory/

---

**¡Tu portal está listo para usarse de forma segura! 🎉**

# 🔒 Guía de Implementación - Portal Seguro GTC

## ¿Qué problema resuelve esto?

**ANTES:** Cualquiera podía ver contraseñas y URLs en DevTools
**AHORA:** Todo está protegido en el servidor de Google

---

## 📋 PASO 1: Crear el Google Apps Script

1. Ve a: https://script.google.com
2. Clic en **"Nuevo proyecto"**
3. Ponle nombre: `Portal GTC Backend`

4. **Reemplaza todo el código** con el contenido del archivo `Code.gs`

5. **Configura tus datos** en las primeras líneas:

```javascript
// Línea 8 - Pon el ID de tu Google Sheet
const SHEET_ID = '1xyW5L4JfGWPXELzinpWCBjNfjQRdsAB9SSRreQ0gS6U';

// Líneas 11-24 - Define tus usuarios y contraseñas
const USERS = {
  'admin': {
    password: 'TuContraseñaSegura123',  // ⚠️ CÁMBIALA
    role: 'admin'
  },
  'ventas': {
    password: 'ventas2026',
    role: 'user'
  },
  'gerencia': {
    password: 'gerencia2026',
    role: 'user'
  }
};

// Línea 27 - URL de tu logo (opcional)
const LOGO_URL = 'https://i.imgur.com/TuLogo.png';
```

---

## 📋 PASO 2: Publicar como Web App

1. En Google Apps Script, clic en **"Implementar"** → **"Nueva implementación"**

2. Configuración:
   - Tipo: **Aplicación web**
   - Descripción: `Portal GTC v1`
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona** ✅ (necesario para funcionar)

3. Clic en **"Implementar"**

4. **COPIA LA URL** que te da (se ve así):
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXX.../exec
   ```

5. ⚠️ **IMPORTANTE:** Clic en "Autorizar acceso" si te lo pide

---

## 📋 PASO 3: Configurar el HTML

1. Abre el archivo `Index.html`

2. En la **línea 171**, reemplaza con tu URL:

```javascript
// ANTES:
const API_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';

// DESPUÉS:
const API_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXX.../exec';
```

3. Guarda el archivo

---

## 📋 PASO 4: Subir a tu hosting

### Opción A: GitHub Pages (Gratis y Fácil)

1. Ve a https://github.com
2. Crea un nuevo repositorio público
3. Sube el archivo `Index.html` (renómbralo a `index.html` en minúsculas)
4. Ve a **Settings** → **Pages**
5. Activa GitHub Pages en branch `main`
6. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo`

### Opción B: Tu hosting actual

1. Sube el archivo `Index.html` a tu servidor
2. Accede desde tu dominio

---

## 🧪 PASO 5: Probar

1. Abre tu portal en el navegador
2. Intenta hacer login con tus credenciales
3. **Abre DevTools (F12)** y verifica que:
   - ✅ NO hay archivo `config.js`
   - ✅ NO se ven contraseñas en el código
   - ✅ NO se ven URLs de Power BI directamente

---

## 🔧 Configuración de tu Google Sheet

Tu Google Sheet debe tener esta estructura en la **Hoja 1**:

| Usuario  | Nombre Reporte | URL Reporte |
|----------|----------------|-------------|
| ventas   | Reporte Ventas Q1 | https://app.powerbi.com/... |
| gerencia | Dashboard Ejecutivo | https://app.powerbi.com/... |
| ventas   | Análisis de Mercado | https://app.powerbi.com/... |

**Notas importantes:**
- Primera fila = encabezados (se ignoran)
- Usuario debe coincidir EXACTAMENTE con los del script
- Los usuarios "admin" ven TODOS los reportes

---

## ✅ ¿Cómo sé que está seguro?

Haz esta prueba:

1. Abre tu portal
2. Presiona **F12** (DevTools)
3. Ve a la pestaña **"Sources"** o **"Fuentes"**
4. Busca archivos JavaScript

**Resultado esperado:**
- ✅ Solo verás `Index.html` y código JavaScript básico
- ✅ NO verás contraseñas
- ✅ NO verás URLs de Power BI
- ✅ Solo verás llamadas a `script.google.com`

---

## 🔄 Actualizar usuarios o contraseñas

1. Ve a tu Google Apps Script
2. Modifica el objeto `USERS`
3. **Guardar** (Ctrl + S)
4. No necesitas volver a publicar
5. Los cambios son instantáneos

---

## 🆘 Solución de Problemas

### Error: "Error de conexión con el servidor"

**Causa:** La URL del API no está configurada o es incorrecta

**Solución:**
1. Verifica que copiaste bien la URL en `Index.html` línea 171
2. Asegúrate que termine en `/exec`
3. No debe tener espacios al inicio o final

---

### Error: "Credenciales incorrectas" (pero estás seguro que son correctas)

**Causa:** Usuario o contraseña tiene espacios o mayúsculas incorrectas

**Solución:**
1. En el script, los usuarios son case-sensitive: `Admin` ≠ `admin`
2. Verifica que no haya espacios antes/después de las contraseñas

---

### Los reportes no cargan

**Causa 1:** El Google Sheet no tiene permisos

**Solución:**
1. Ve a tu Google Sheet
2. **Compartir** → Dale acceso de **Editor** al email que ejecuta el script
3. O mejor: usa la misma cuenta para el Sheet y el Script

**Causa 2:** El ID del Sheet es incorrecto

**Solución:**
1. En tu Google Sheet, la URL se ve así:
   `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
2. Copia solo la parte del ID (entre `/d/` y `/edit`)
3. Pégalo en `SHEET_ID` del script

---

### El logo no se ve

**Causa:** La URL del logo no es pública

**Solución:**
1. Sube tu logo a **Imgur**: https://imgur.com/upload
2. Usa la URL directa de la imagen (debe terminar en .png o .jpg)
3. O déjalo en blanco: `const LOGO_URL = '';`

---

## 🎯 Ventajas de esta solución

✅ **Seguro:** Contraseñas y URLs nunca llegan al navegador
✅ **Gratis:** Google Apps Script es completamente gratis
✅ **Sin servidor:** No necesitas hosting de backend
✅ **Fácil de actualizar:** Solo editas el Sheet o el Script
✅ **Escalable:** Soporta miles de usuarios sin problemas

---

## 📞 Checklist Final

Antes de dar por terminado, verifica:

- [ ] El script está publicado como Web App
- [ ] Copiaste la URL correcta en `Index.html`
- [ ] Configuraste tus usuarios y contraseñas
- [ ] El ID del Sheet es correcto
- [ ] La Hoja 1 tiene los datos en el formato correcto
- [ ] Probaste el login con diferentes usuarios
- [ ] Verificaste en DevTools que no se ven las contraseñas
- [ ] El logo se carga (o lo dejaste en blanco si no tienes)

---

## 🔐 Seguridad Adicional (Opcional)

Si quieres aún más seguridad:

1. **Encriptar contraseñas:** Usa SHA256 para las contraseñas
2. **Tokens de sesión:** Implementa tokens JWT con expiración
3. **Rate limiting:** Limita intentos de login por IP
4. **2FA:** Agrega autenticación de dos factores

¿Te ayudo con alguna de estas? 😊

---

**¿Necesitas ayuda?** Revisa cada paso cuidadosamente. El 90% de los problemas se resuelven verificando que:
1. La URL del API esté bien copiada
2. El SHEET_ID sea correcto
3. Los nombres de usuario coincidan exactamente

// ========================================
// GOOGLE APPS SCRIPT - BACKEND SEGURO
// Para Grupo Termo Control Portal
// ========================================

// CONFIGURACIÓN: Reemplaza con el ID de tu Google Sheet
const SHEET_ID = '1xyW5L4JfGWPXELzinpWCBjNfjQRdsAB9SSRreQ0gS6U';

// USUARIOS Y CONTRASEÑAS (Seguros en el servidor de Google)
const USERS = {
  'admin': {
    password: 'Franco13',
    role: 'admin'
  },
  'ktrolle': {
    password: 'Control40',
    role: 'user'
  },
  'acarreon': {
    password: 'Control20',
    role: 'user'
  }
,
  'dmartinezs': {
    password: 'Control10',
    role: 'user'
  }
};

// URL del logo (opcional)
const LOGO_URL = 'logo.png';

/**
 * Configurar la Web App para que sea accesible
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Portal GTC')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Manejar todas las peticiones POST desde el frontend
 */
function doPost(e) {
  try {
    const params = JSON.parse(e.postData.contents);
    const action = params.action;
    
    switch(action) {
      case 'login':
        return handleLogin(params.username, params.password);
      
      case 'getReports':
        return getReports(params.username);
      
      case 'getLogo':
        return getLogo();
        
      default:
        return createResponse(false, 'Acción no válida');
    }
  } catch (error) {
    return createResponse(false, 'Error en el servidor: ' + error.message);
  }
}

/**
 * Validar credenciales de usuario
 */
function handleLogin(username, password) {
  if (!username || !password) {
    return createResponse(false, 'Usuario y contraseña requeridos');
  }
  
  const user = USERS[username];
  
  if (user && user.password === password) {
    return createResponse(true, 'Login exitoso', {
      username: username,
      role: user.role
    });
  }
  
  return createResponse(false, 'Credenciales incorrectas');
}

/**
 * Obtener reportes del usuario desde Google Sheets
 */
function getReports(username) {
  try {
    if (!username) {
      return createResponse(false, 'Usuario no especificado');
    }
    
    const user = USERS[username];
    if (!user) {
      return createResponse(false, 'Usuario no válido');
    }
    
    // Abrir el Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('URL');
    
    if (!sheet) {
      return createResponse(false, 'No se encontró la hoja de datos');
    }
    
    // Obtener todos los datos (saltando la primera fila de encabezados)
    const data = sheet.getDataRange().getValues();
    const reports = [];
    
    // Procesar cada fila (empezando desde la fila 2)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Verificar que la fila tenga datos
      if (!row[0] || !row[1] || !row[2]) continue;
      
      const userInSheet = String(row[0]).trim().toLowerCase();
      const reportName = String(row[1]).trim();
      const reportUrl = String(row[2]).trim();
      
      // Si es admin, mostrar todos los reportes
      // Si es user, mostrar solo sus reportes
      if (user.role === 'admin' || userInSheet === username.toLowerCase()) {
        reports.push({
          user: userInSheet,
          name: reportName,
          url: reportUrl
        });
      }
    }
    
    return createResponse(true, 'Reportes obtenidos', {
      reports: reports,
      isAdmin: user.role === 'admin',
      sheetUrl: user.role === 'admin' ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit` : null
    });
    
  } catch (error) {
    return createResponse(false, 'Error al obtener reportes: ' + error.message);
  }
}

/**
 * Obtener URL del logo
 */
function getLogo() {
  return createResponse(true, 'Logo obtenido', {
    logoUrl: LOGO_URL
  });
}

/**
 * Crear respuesta JSON estandarizada
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

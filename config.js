// ============================================
// ARCHIVO DE CONFIGURACIÓN - config.js
// ============================================
// Este archivo contiene usuarios, contraseñas y reportes.
// MANTÉN ESTE ARCHIVO SEGURO Y NO LO COMPARTAS.

// ============================================
// CONFIGURACIÓN DEL LOGO
// ============================================
// Opciones para el logo:
// 1. URL externa: 'https://miempresa.com/logo.png'
// 2. Archivo local: 'logo.png' (debe estar en la misma carpeta)
// 3. Base64: 'data:image/png;base64,iVBOR...'
// 4. Dejar vacío '' para no mostrar logo

const LOGO_URL = 'logo.png';  // ← Cambia esto por la ruta de tu logo

// ============================================
// USUARIOS Y CONTRASEÑAS
// ============================================

const USERS = {
    'admin': {
        password: 'Franco13',  // ← Cambia esta contraseña
        role: 'admin'  // admin puede agregar/eliminar reportes
    },
    'acarreon': {
        password: 'Control10',  // ← Cambia esta contraseña
        role: 'user'
    },
    'salanis': {
        password: 'Control20',  // ← Cambia esta contraseña
        role: 'user'
    },
    'ltapia': {
        password: 'Control30',  // ← Cambia esta contraseña
        role: 'user'
    }
    // Agrega más usuarios aquí siguiendo el mismo formato
};

// ============================================
// REPORTES DE EJEMPLO (OPCIONAL)
// ============================================
// Estos reportes se cargarán automáticamente la primera vez.
// Puedes eliminarlos o editarlos según necesites.

const EXAMPLE_REPORTS = [
    {
        id: 1,
        name: 'Dashboard Ventas',
        description: 'Análisis de ventas mensuales y tendencias',
        url: 'https://app.powerbi.com/view?r=TU_CODIGO_AQUI',  // ← Cambia por tu URL
        allowedUsers: ['admin', 'juan.perez', 'maria.garcia']
    },
    {
        id: 2,
        name: 'Reporte Financiero',
        description: 'Estados financieros y proyecciones',
        url: 'https://app.powerbi.com/view?r=TU_CODIGO_AQUI',  // ← Cambia por tu URL
        allowedUsers: ['admin', 'carlos.lopez']
    },
    {
        id: 3,
        name: 'Métricas de Marketing',
        description: 'KPIs de campañas y conversiones',
        url: 'https://app.powerbi.com/view?r=TU_CODIGO_AQUI',  // ← Cambia por tu URL
        allowedUsers: ['admin', 'juan.perez']
    }
];

// ============================================
// NO EDITES NADA DEBAJO DE ESTA LÍNEA
// ============================================

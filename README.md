# SNR UI Assets - Migración de Certificados Supernotariado

## Descripción

Este directorio contiene **todos los assets públicos** necesarios para migrar la interfaz del portal de Certificados de la Superintendencia de Notariado y Registro (SNR) desde JSF/PrimeFaces a HTML y CSS puro.

**Descargados:** 39 archivos | **Tamaño total:** 1.46 MB

---

## 📁 Estructura de Carpetas

```
SNR-UI-Assets/
├── css/                          (14 archivos CSS)
│   ├── 01-theme-primefaces.css
│   ├── 02-primeicons.css
│   ├── 03-components-primefaces.css
│   ├── 04-keyboard.css
│   ├── 05-fileupload.css
│   ├── 06-snr-ctls-styles-home-min.css          ⭐ PRINCIPAL
│   ├── 07-snr-ctls-styles-min.css               ⭐ PRINCIPAL
│   ├── 08-snr-ctls-styles-new-front-2023-min.css ⭐ PRINCIPAL
│   ├── 09-snr-ctls-styles-modales-min.css
│   ├── 10-snr-ctls-styles-nav-min.css
│   ├── 11-social-icons-min.css
│   ├── 12-theme-overwrited-min.css
│   ├── 13-snr-ctls-styles-gov-co-min.css        ⭐ GRANDE (gov.co theme)
│   └── 14-snr-ctls-styles-control-pagos-min.css
│
├── images/
│   ├── logos/
│   │   ├── snr-logo.png
│   │   ├── govco-logo.png
│   │   ├── govco-logo.svg
│   │   ├── marca-pais.png
│   │   └── social/
│   │       ├── twitter.png
│   │       ├── facebook.png
│   │       ├── instagram.png
│   │       ├── youtube.png
│   │       └── linkedin.png
│   │
│   ├── icons/
│   │   ├── user-icon.png
│   │   ├── bell-icon.png
│   │   ├── clock-icon.png
│   │   ├── icon-approval.png
│   │   ├── icon-research.png
│   │   ├── icon-return.png
│   │   ├── icon-search.png
│   │   ├── icon-checklist.png
│   │   ├── icon-queries.png
│   │   └── icon-warning.png
│   │
│   └── backgrounds/
│       └── loading.gif
│
├── fonts/
│   ├── google-fonts-montserrat.css
│   ├── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-.ttf  (Montserrat 100)
│   ├── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-.ttf  (Montserrat 300)
│   ├── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf  (Montserrat 400)
│   └── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-.ttf  (Montserrat 600)
│
└── README.md (este archivo)
```

---

## 🎯 Archivos Más Importantes

### CSS Principales (Necesarios)
1. **`06-snr-ctls-styles-home-min.css`** (9 KB)
   - Estilos específicos de la página de inicio
   - Layout de opciones principales
   - Contenedores de servicios

2. **`07-snr-ctls-styles-min.css`** (6.7 KB)
   - Estilos generales de la aplicación
   - Colores, tipografía base
   - Componentes comunes

3. **`08-snr-ctls-styles-new-front-2023-min.css`** (4.9 KB)
   - Estilos modernizados (actualización 2023)
   - Nuevos componentes de búsqueda
   - Actualización de colores

### CSS Opcionales (PrimeFaces - Framework)
Estos contienen estilos del framework JSF/PrimeFaces. **No son necesarios** si usas HTML/CSS puro, pero pueden servir como referencia:
- `01-theme-primefaces.css` - Tema base PrimeFaces
- `03-components-primefaces.css` - Componentes PrimeFaces
- `13-snr-ctls-styles-gov-co-min.css` - Tema gov.co (GRANDE, 229 KB)

### Fuentes
- **Montserrat** - Fuente institucional, descargada de Google Fonts
  - Pesos: 100, 300, 400, 600
  - Formato: TTF (ya descargados)

---

## 🚀 Cómo Usar en tu Proyecto

### Opción 1: Importar CSS (Recomendado)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificados SNR</title>
    
    <!-- Importar solo los CSS necesarios -->
    <link rel="stylesheet" href="assets/css/07-snr-ctls-styles-min.css">
    <link rel="stylesheet" href="assets/css/06-snr-ctls-styles-home-min.css">
    <link rel="stylesheet" href="assets/css/08-snr-ctls-styles-new-front-2023-min.css">
    
    <!-- Fuentes locales -->
    <link rel="preload" href="assets/fonts/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf" as="font" type="font/ttf" crossorigin>
    
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('assets/fonts/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf') format('truetype');
            font-weight: 400;
        }
    </style>
</head>
<body>
    <!-- Tu contenido aquí -->
</body>
</html>
```

### Opción 2: Usar CSS Consolidado

Si prefieres un único archivo CSS limpio, usa el archivo que ya fue procesado y entregado separadamente: `SNR-UI-Consolidated.css`

---

## 🎨 Estructura de Carpetas Recomendada en tu Proyecto

```
tu-proyecto/
├── index.html
├── css/
│   └── assets/
│       └── (copiar contenido de SNR-UI-Assets/css/)
├── images/
│   └── assets/
│       └── (copiar contenido de SNR-UI-Assets/images/)
└── fonts/
    └── assets/
        └── (copiar contenido de SNR-UI-Assets/fonts/)
```

---

## 🛠️ Notas para la Migración

### URLs de Imágenes
Los archivos de imagen en los CSS hacen referencia a rutas relativas como:
```css
background-image: url(../../images/background-home.jpg.snr);
```

**Deberás actualizar estas rutas** según tu estructura de carpetas.

### PrimeFaces Framework Classes
Los CSS contienen muchas clases específicas de PrimeFaces (`.ui-widget`, `.ui-state-*`, etc.). 

**Si usas HTML puro**, puedes:
1. Ignorar estas clases (no afectarán tu HTML nuevo)
2. O usar el archivo `SNR-UI-Consolidated.css` que ya las filtra

### Clases Principales a Usar

**Containers:**
- `#mainContainer` - Contenedor principal
- `#mainContent` - Contenido principal
- `#pageContent` - Área de contenido
- `.panel-home-oficinas` - Panel de búsqueda de oficinas

**Componentes:**
- `.mainOptionContainer` - Tarjetas de opciones
- `.btnInicio` - Botones principales
- `.inpRegister` - Campos de input
- `.panel-home-carrito` - Panel de carrito

**Layouts:**
- `.contenedor-resultados` - Contenedor de resultados
- `.contenedor-opciones-rapidas` - Opciones rápidas
- `.tabla-carrito-header` - Encabezado de tabla

---

## 🎨 Colores Institucionales

| Color | Hex | Uso |
|-------|-----|-----|
| Rojo Institucional | `#8b0000` | Header, branding |
| Azul Institucional | `#3772ff` | Acentos, highlights |
| Rojo Secundario | `#c61720` | Links, hover states |
| Texto Oscuro | `#0b1c2d` | Texto principal |
| Fondo Claro | `#f4f4f4` | Paneles, fondos |

Ver el archivo `SNR-DESIGN-SYSTEM.md` para más detalles.

---

## 📊 Archivo de Inventario

Se generó un archivo `ASSETS-INVENTORY.json` con la lista completa de archivos descargados.

---

## ✅ Checklist de Migración

- [ ] Copiar carpeta `css/` a tu proyecto
- [ ] Copiar carpeta `images/` a tu proyecto  
- [ ] Copiar carpeta `fonts/` a tu proyecto
- [ ] Actualizar rutas de imágenes en CSS si es necesario
- [ ] Revisar `SNR-DESIGN-SYSTEM.md` para variables de color
- [ ] Revisar `SNR-UI-Consolidated.css` para referencia de estilos
- [ ] Importar CSS en tu HTML
- [ ] Definir @font-face para Montserrat localmente
- [ ] Probar en navegadores modernos
- [ ] Ajustar media queries si es necesario

---

## 📝 Licencia y Derechos

Todos los assets fueron descargados desde el sitio público oficial de la Superintendencia de Notariado y Registro de Colombia. Son assets públicos disponibles en:

https://certificados.supernotariado.gov.co/certificado/inicio.snr

---

## 🤝 Soporte

Si necesitas ayuda con la migración, consulta:
- `SNR-DESIGN-SYSTEM.md` - Guía completa de diseño
- `SNR-UI-Consolidated.css` - CSS limpio y bien organizado
- Archivos originales descargados para referencia

---

**Generado automáticamente** | Fecha de descarga: 2026-08-22

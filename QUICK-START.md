# 🚀 QUICK START - SNR UI Assets

## 5 Minutos para empezar

### Paso 1: Copiar archivos a tu proyecto

```bash
tu-proyecto/
├── index.html
├── css/
│   ├── 06-snr-ctls-styles-home-min.css
│   ├── 07-snr-ctls-styles-min.css
│   ├── 08-snr-ctls-styles-new-front-2023-min.css
│   ├── 09-snr-ctls-styles-modales-min.css
│   ├── 10-snr-ctls-styles-nav-min.css
│   ├── 12-theme-overwrited-min.css
│   └── 14-snr-ctls-styles-control-pagos-min.css
├── images/
│   ├── logos/
│   ├── icons/
│   └── backgrounds/
└── fonts/
    ├── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf
    ├── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-.ttf
    ├── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-.ttf
    └── JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-.ttf
```

### Paso 2: Copiar el template HTML

Usa `index-ejemplo.html` como base para tu página.

### Paso 3: Importar CSS en tu HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificados SNR</title>

    <!-- FUENTES -->
    <style>
        @font-face {
            font-family: 'Montserrat';
            src: url('fonts/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf') format('truetype');
            font-weight: 400;
        }
        @font-face {
            font-family: 'Montserrat';
            src: url('fonts/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-.ttf') format('truetype');
            font-weight: 600;
        }
    </style>

    <!-- CSS ESENCIALES (EN ESTE ORDEN) -->
    <link rel="stylesheet" href="css/07-snr-ctls-styles-min.css">
    <link rel="stylesheet" href="css/06-snr-ctls-styles-home-min.css">
    <link rel="stylesheet" href="css/08-snr-ctls-styles-new-front-2023-min.css">
    <link rel="stylesheet" href="css/09-snr-ctls-styles-modales-min.css">
    <link rel="stylesheet" href="css/10-snr-ctls-styles-nav-min.css">
    <link rel="stylesheet" href="css/12-theme-overwrited-min.css">
    <link rel="stylesheet" href="css/14-snr-ctls-styles-control-pagos-min.css">
</head>
<body>
    <!-- Tu contenido aquí -->
</body>
</html>
```

### Paso 4: Usar las clases CSS

#### Contenedores principales:
```html
<!-- Container principal -->
<div id="mainContainer">
    <div id="mainContent">
        <div id="pageContent">
            <!-- Tu contenido aquí -->
        </div>
    </div>
</div>
```

#### Opciones con iconos:
```html
<div class="panel-home-oficinas">
    <div>
        <div class="mainOptionContainer">
            <img src="images/icons/icon-search.png" alt="Consultar">
            <div>Consultar</div>
        </div>
    </div>
</div>
```

#### Botones principales:
```html
<button class="btnInicio">
    <span>Ingresar</span>
</button>
```

#### Inputs/Campos:
```html
<input class="inpRegister" type="text" placeholder="Número de documento">
```

#### Resultados con estatus:
```html
<!-- Verde - Aprobado -->
<div class="div-resultado-R">Aprobado</div>

<!-- Rojo - Rechazado -->
<div class="div-resultado-E">Rechazado</div>

<!-- Azul - Información -->
<div class="div-resultado-G">Información</div>
```

### Paso 5: Personalizar colores

Edita los valores en los CSS o crea un archivo CSS personalizado:

```css
:root {
    --snr-primary-dark-red: #8b0000;
    --snr-primary-blue: #3772ff;
    --snr-accent-red: #c61720;
    --snr-text-dark: #0b1c2d;
    --snr-light-gray: #f4f4f4;
}
```

---

## 📝 Ejemplos comunes

### Header/Navegación
```html
<header>
    <div class="header-logo-snr">
        <a href="/">
            <img src="images/logos/snr-logo.png" alt="SNR">
        </a>
    </div>
</header>

<div id="applicationTitle">
    Certificado de Tradición y Libertad
</div>
```

### Sección principal
```html
<div class="contenedor-new-main">
    <div>
        <h1 class="applicationTitle">¡Bienvenido!</h1>
        <!-- contenido -->
    </div>
</div>
```

### Panel de búsqueda
```html
<div class="panel-home-oficinas">
    <div>
        <div class="panel-home-oficinas-autocomplete">
            <input type="text" placeholder="Buscar oficina...">
        </div>
    </div>
</div>
```

### Carrito de compra
```html
<div class="panel-home-carrito">
    <table>
        <thead>
            <tr class="tabla-carrito-header">
                <th>Matricula</th>
                <th>Valor</th>
            </tr>
        </thead>
        <tbody>
            <!-- items -->
        </tbody>
    </table>
</div>
```

### Modales
```html
<div id="modalLogin">
    <!-- Contenido del modal -->
</div>
```

### Footer
```html
<footer id="footer">
    <div id="footerText">
        <p>Superintendencia de Notariado y Registro</p>
    </div>
</footer>
```

---

## 🎨 Colores principales

```
Rojo Institucional:  #8b0000
Azul Institucional:  #3772ff
Rojo Secundario:     #c61720
Texto Oscuro:        #0b1c2d
Fondo Claro:         #f4f4f4
Verde (Success):     #0b4a0c
Rojo (Error):        #a90012
```

---

## 🔧 Responsive Design

Los CSS incluyen media queries para:
- **Desktop:** >= 720px
- **Mobile:** < 720px

No necesitas hacer nada especial - funcionará automáticamente.

---

## 📚 Documentación Completa

- **README.md** - Guía completa de todos los assets
- **SNR-DESIGN-SYSTEM.md** - Sistema de diseño detallado
- **SNR-UI-Consolidated.css** - CSS limpio y organizado
- **ASSETS-INVENTORY.json** - Inventario técnico de todos los archivos
- **index-ejemplo.html** - Ejemplo HTML funcional

---

## ⚡ Troubleshooting

### Las imágenes no se cargan
- ✓ Verificar rutas relativas en los `<img src="">`
- ✓ Asegúrate que las carpetas `images/` existen
- ✓ Abre la consola de desarrollador (F12) para ver errores

### Los estilos no se aplican
- ✓ Verifica que los archivos CSS están en la carpeta correcta
- ✓ Comprueba el orden de importación de CSS
- ✓ Limpia el cache del navegador (Ctrl+Shift+Delete)
- ✓ Abre DevTools (F12) para ver si hay errores

### Las fuentes no se cargan
- ✓ Verifica rutas en `@font-face`
- ✓ Comprueba que los archivos .ttf existen
- ✓ Algunas rutas pueden necesitar CORS habilitado

### Comportamiento responsivo incorrecto
- ✓ Asegúrate de tener el meta tag viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## ✅ Checklist de lanzamiento

- [ ] Copié todos los archivos CSS
- [ ] Copié todas las imágenes
- [ ] Copié todos los archivos de fuentes
- [ ] Importé los CSS en el HTML (en el orden correcto)
- [ ] Definí @font-face para Montserrat
- [ ] Probé en navegadores modernos (Chrome, Firefox, Safari)
- [ ] Probé en dispositivos móviles
- [ ] Verifiqué que no hay errores en la consola (F12)
- [ ] Actualicé las rutas de imágenes si es necesario
- [ ] Personalicé colores si lo requiero

---

## 🚀 Siguiente paso

Una vez que tengas los estilos funcionando:

1. **Construye tu estructura HTML** usando las clases disponibles
2. **Agrega JavaScript** para interactividad
3. **Optimiza imágenes** si es necesario
4. **Deploy** a tu servidor

---

**¡Listo! Ya tienes todo lo necesario para empezar.**

Si tienes dudas, consulta la documentación completa en:
- `README.md`
- `SNR-DESIGN-SYSTEM.md`
- `index-ejemplo.html`

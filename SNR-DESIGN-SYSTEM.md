# SNR UI Design System
## Superintendencia de Notariado y Registro

Extracted and consolidated from:
- `snr-ctls-styles-home-min.css`
- `snr-ctls-styles-min.css`
- `snr-ctls-styles-new-front-2023-min.css`

---

## INSTITUTIONAL COLOR PALETTE

### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Primary Dark Red** | `#8b0000` | rgb(139, 0, 0) | Header background, institutional branding |
| **Primary Blue** | `#3772ff` | rgb(55, 114, 255) | Accent, highlights (`.snrColor` class) |
| **Accent Red** | `#c61720` | rgb(198, 23, 32) | Links hover, navigation accent |

### Secondary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Button Dark** | `#484848` | rgb(72, 72, 72) | Secondary buttons, dark backgrounds |
| **Button Label** | `#626261` | rgb(98, 98, 97) | Panel titles, secondary text |
| **Light Background** | `#f4f4f4` | rgb(244, 244, 244) | Menu panel background |
| **Light Beige** | `#F8F8F4` | rgb(248, 248, 244) | Notification boxes, light sections |

### Status/Alert Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Success Green** | `#0b4a0c` | rgb(11, 74, 12) | Success messages, approved status |
| **Error Red** | `#a90012` | rgb(169, 0, 18) | Error states, unavailable alerts |
| **Error Pink** | `#f42e62` | rgb(244, 46, 98) | Unavailable/critical status |
| **Info Blue** | `#0084d5` | rgb(0, 132, 213) | Informational content |

### Neutral Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Text Dark** | `#0b1c2d` | rgb(11, 28, 45) | Primary text color |
| **Text Gray** | `#474747` | rgb(71, 71, 71) | Secondary text |
| **Border Gray** | `#e0e0e0` | rgb(224, 224, 224) | Borders, dividers |
| **Light Gray** | `#efefef` | rgb(239, 239, 239) | Subtle borders |
| **White** | `#ffffff` | rgb(255, 255, 255) | Background, white space |
| **Black** | `#000000` | rgb(0, 0, 0) | Text, strong elements |

---

## TYPOGRAPHY

### Font Family
**Primary Font:** `'Montserrat', sans-serif`
- Used throughout the entire application
- Consistent, modern, sans-serif typeface
- Falls back to generic `sans-serif`

### Font Sizes & Weights

| Component | Size | Weight | Usage |
|-----------|------|--------|-------|
| **Application Title** | 13.5px | 300 | Header bar text |
| **Page Title** | 13px | 600 | Page headings |
| **Form Labels** | 13px | 600 | Input labels, form titles |
| **Normal Text** | 13px | 400/300 | Body content |
| **Small Text** | 10.5-11px | 300 | Footer, secondary info |
| **Large Title** | 18px | 600 | Main application title |

### Text Shadow
- Primary shadow: `2px 2px 1px #252525` - used on white text over colored backgrounds
- Creates depth and readability for light text on dark backgrounds

---

## LAYOUT & SPACING

### Container Widths
- **Max Container Width:** `1143px`
- **Content Width:** `91%` (responsive)
- **Min Width (Desktop):** `720px`
- **Full Width (Mobile):** `100%`

### Spacing Standards
| Purpose | Value |
|---------|-------|
| **Card Margin** | `8px` |
| **Section Padding** | `10px - 20px` |
| **Input Padding** | `6px` |
| **Large Padding** | `26px` |

### Border Radius
- **Large Radius:** `30px` (buttons with rounded borders)
- **Medium Radius:** `8px` (panels, cards)
- **Small Radius:** `4px` (inputs, small elements)
- **Large Panels:** `10px` (featured sections)

### Box Shadows
- **Standard Shadow:** `box-shadow: 1px 1px 5px 0 rgba(188, 188, 188, 0.75)`
- **Header Shadow:** `box-shadow: 3px 4px 15px 0 rgba(38, 31, 37, 0.75)`
- **Subtle Shadow:** `box-shadow: 0 5px 13px -2px rgba(173, 173, 173, 0.57)`
- **Top Shadow:** `box-shadow: 0 -4px 6px #e0e0e0`

---

## COMPONENTS

### Primary Navigation Button (`.btnInicio`)
- Height: `40px`
- Border: `1px solid #ffffff`
- Border-radius: `30px`
- Background: transparent / white on hover
- Font: Montserrat, 14px on desktop / 18px on mobile

### Main Option Container (`.mainOptionContainer`)
- Size: `96px × 96px`
- Border: `1px solid #e7e7e7`
- Border-radius: `6px`
- Background: `rgba(240, 240, 240, 0.25)` (semi-transparent light)
- Label at bottom: dark gray `#484848` background

### Input Fields
- Height: `28-30px`
- Border: `1px solid #e5e5e5`
- Border-radius: `8px`
- Color: `#0b1c2d` (dark)
- Font-weight: `600` (labels), `400` (inputs)
- Font-size: `13-14px`

### Modal Dialogs
- Positioned with `top: XXpx !important` (desktop-specific)
- Desktop offsets: 10px - 122px
- Mobile offsets: 10px - 42px

---

## RESPONSIVE BREAKPOINTS

### Desktop (≥ 720px)
- Sidebar menu width: `25%`
- Content areas displayed full
- Header logo: `50px` height
- Max widths enforced: `1143px`

### Mobile (< 720px)
- Sidebar menu width: `66%`
- Full-width content panels
- Simplified navigation
- Header logo: hidden
- Modal dialogs repositioned
- Reduced padding: `4px 4px 2px`
- Button text: `18px`, `font-weight: 400`

### Special Media Queries
- `max-width: 1020px` - Hide video help modal

---

## BACKGROUND IMAGES

### Home Page Background
- Image: `../../images/background-home.jpg.snr`
- Size: `cover`
- Position: `top`
- Repeat: `no-repeat`
- Overlay Gradient (mobile):
  ```css
  background: linear-gradient(180deg, 
    rgba(27, 74, 167, 0.7) 0%, 
    rgba(17, 54, 128, 0.7) 70%);
  ```
- Overlay Gradient (desktop):
  ```css
  background: linear-gradient(180deg, 
    rgba(27, 74, 167, 0.7) 0%, 
    rgba(17, 54, 128, 0.7) 70%);
  ```

---

## TRANSACTION STATUS INDICATORS

All result indicators use specific color-coded backgrounds:

| Class | Background | Text Color | Usage |
|-------|-----------|-----------|-------|
| `.div-resultado-R` | `rgba(101, 141, 101, 0.37)` | `#0b4a0c` | Success/Aprobado |
| `.div-resultado-E` | `rgba(225, 77, 77, 0.16)` | `#a90012` | Error/Rechazado |
| `.div-resultado-G` | `rgba(0, 132, 213, 0.4)` | `#000e20` | Generic/Info |
| `.div-resultado-A` | `rgba(0, 132, 213, 0.4)` | `#000e20` | Alternate |
| `.div-resultado-voucher` | `rgba(225, 77, 77, 0.16)` | `#a90012` | Voucher/Pending |

---

## CUSTOM SCROLLBAR STYLING

For `.contenidoTerminos` elements:
```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 147, 211, 1);  /* SNR Blue */
  border-radius: 8px;
}
```

---

## KEY ARCHITECTURAL PATTERNS

### 1. **Flex-based Layouts**
- Heavy use of `display: flex` for responsive grids
- Flex-wrap for multi-line layouts
- Justify-content and align-items for alignment

### 2. **Semantic HTML Containers**
- `#homeNotLogin` - Non-authenticated experience
- `#mainContainer` - Main content wrapper
- `#menuContainer` - Slide-out navigation menu
- `#contactenos` - Contact/support section

### 3. **Modal Management**
- Multiple modal dialogs positioned absolutely
- Different `top` values for desktop vs mobile
- Z-index layering: 222 (overlay), 100 (modals), 1 (menu)

### 4. **Icon Containers**
- `.mainOptionContainer` - Square card for icon + label
- `.mainOptionContainerInverted` - Compact horizontal variant
- `.panel-opciones-content` - Grid-based option display

### 5. **Transaction Flow**
- Home page → Oficina selection → Matricula entry
- Payment method selection modals
- Result display with status indicators
- Scrollable terms/conditions in modals

---

## MIGRATION NOTES

### Framework-Specific Classes Removed
The following PrimeFaces framework classes were intentionally excluded:
- `.ui-widget*` - PrimeFaces widget styling
- `.ui-state-*` - PrimeFaces state classes
- `.ui-selectonemenu*` - Select dropdown components
- All jQuery UI related utilities

### CSS Specificity Notes
- Heavy use of `!important` flags (legacy from JSF/PrimeFaces)
- Can be cleaned up when migrating to pure HTML/CSS
- Maintain cascade order for proper override behavior

### Color Extraction Summary
**Total unique colors found:** 90+ variants
**Primary institutional colors:** 3 main (red, blue, gray families)
**Status indicator colors:** 7 semantic (success, error, info, warning)

---

## QUICK CSS CUSTOMIZATION GUIDE

### To change institutional branding:
1. Update `--snr-primary-dark-red` (#8b0000) for header
2. Update `--snr-primary-blue` (#3772ff) for accents
3. Update `.snrColor` background color
4. Update `.div-resultado-*` background overlays if needed

### To adjust spacing:
- Container width: modify `91%` and `1143px` in header/main sections
- Padding: adjust `padding: 20px 43px 2px` values

### To modify responsive behavior:
- Desktop breakpoint: currently `720px`
- Adjust all `@media (min-width: 720px)` and `@media (max-width: 720px)`
- Special viewport: `@media (max-width: 1020px)` for video modal hide

---

## COMPATIBILITY NOTES

- **Font Loading:** Expects 'Montserrat' from Google Fonts
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Flexbox:** Full flexbox support required
- **CSS Variables:** `:root` variables for easy theming
- **Prefixes:** Includes `-webkit-`, `-moz-` prefixes for legacy support


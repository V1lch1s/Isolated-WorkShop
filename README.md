# 🛬 Landing Components
Este repositorio contiene un conjunto de componetes para ser utilizados en una página de landing.

## 🛠️ Tecnologías
- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first

## ⚡ Instalación y Configuración Rápida

### 1. Crear Proyecto con Vite
```bash
npm create vite@latest
```
Selecciona las opciones:
- **Project name:** `isolated-workshop`
- **Framework:** `React`
- **Variant:** `TypeScript`
- **Use rolldown-vite:** `No`
- **Install with npm and start now:** `Yes`

### 2. Instalar Tailwind CSS
```bash
npm install tailwindcss @tailwindcss/vite
```

### 3. Configurar Vite
Edita `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### 4. Importar Tailwind CSS
En `src/index.css` (**SIEMPRE como primera línea**):

```css
@import "tailwindcss";
```

### 5. Usar Tailwind en tu HTML/JSX
```tsx
function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

### 6. Ejecutar el Proyecto
```bash
npm run dev
```

## 📁 Estructura del Proyecto
```
isolated-workshop/
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Características
- ✅ Configuración optimizada para desarrollo
- ✅ Hot Module Replacement (HMR)
- ✅ Tipado TypeScript
- ✅ Utilidades CSS con Tailwind
- ✅ Build de producción optimizado

## 📝 Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
```

## 🔧 Configuración Recomendada
Asegúrate de que tu `index.html` incluya:
```html
<link href="/src/index.css" rel="stylesheet">
```
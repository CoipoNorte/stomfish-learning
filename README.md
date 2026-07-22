# ♞ Stomfish Learning

<p align="center">
  <img src="public/favicon.svg" alt="Stomfish Learning" width="120" height="120" />
</p>

<p align="center">
  <strong>Construye tu propia plataforma de ajedrez desde cero</strong>
</p>

<p align="center">
  <a href="#características">Características</a> •
  <a href="#empezar">Empezar</a> •
  <a href="#estructura-del-curso">Estructura</a> •
  <a href="#contribuir">Contribuir</a> •
  <a href="#licencia">Licencia</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Stockfish-16+-green?style=flat-square" alt="Stockfish" />
  <img src="https://img.shields.io/badge/Licencia-MIT-blue?style=flat-square" alt="MIT License" />
</p>

---

## 🎯 ¿Qué es Stomfish Learning?

**Stomfish Learning** es un curso interactivo y gratuito que te enseña paso a paso cómo construir tu propia plataforma de ajedrez tipo Lichess usando el motor Stockfish.

Aprenderás:
- ⚙️ Cómo funciona un motor de ajedrez
- 🔌 Integración de Stockfish via WebAssembly
- ♟️ Construcción de un tablero interactivo
- 🎨 Sistema de temas y piezas personalizables
- 📊 Análisis en tiempo real con evaluación del motor
- 🚀 Despliegue en GitHub Pages

## ✨ Características

- **100% Gratuito y Open Source** - Sin pagos, sin registro
- **Bilingüe** - Contenido completo en español e inglés
- **Interactivo** - Ejemplos de código ejecutables
- **Paso a paso** - Desde cero hasta producción
- **Moderno** - React 18, TypeScript, Vite, Tailwind CSS

## 🚀 Empezar

### Requisitos previos

- Node.js 18+
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CoipoNorte/stomfish-learning.git

# Entrar al directorio
cd stomfish-learning

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para producción

```bash
npm run build
```

Los archivos se generarán en `dist/`.

## 📚 Estructura del Curso

### Módulo 01: Fundamentos del Motor
- ¿Qué es Stockfish y cómo funciona?
- Descargando Stockfish
- Configuración del entorno
- Tu primer comando UCI

### Módulo 02: El Tablero de Ajedrez
- Entendiendo la notación FEN
- Renderizando el tablero
- Componentes Square y Piece
- Sistema de coordenadas

### Módulo 03: Piezas e Interacción
- Sets de piezas SVG
- Implementando drag & drop
- Soporte táctil
- Animaciones de movimiento

### Módulo 04: Lógica del Juego
- Validación de movimientos
- Movimientos especiales
- Detección de jaque/mate
- Notación PGN

### Módulo 05: Integración del Motor
- Web Workers
- Protocolo UCI en JS
- Análisis en tiempo real
- Multi-PV y profundidad

### Módulo 06: Interfaz de Usuario
- Barra de evaluación
- Lista de movimientos
- Flechas de mejor movimiento
- Controles de análisis

### Módulo 07: Temas y Personalización
- Sistema de temas
- Piezas personalizables
- Sonidos
- Preferencias de usuario

### Módulo 08: Despliegue
- Build de producción
- GitHub Pages
- PWA
- Optimización

## 🏗️ Estructura del Proyecto

```
stomfish-learning/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/      # Componentes React
│   │   ├── Board/       # Tablero de ajedrez
│   │   ├── course/      # Componentes del curso
│   │   └── ...
│   ├── context/         # Contextos (idioma, etc.)
│   ├── data/            # Contenido del curso
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Traducciones
│   ├── pages/           # Páginas
│   └── App.tsx
├── index.html
├── package.json
├── README.md
└── vite.config.ts
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes ayudar de varias formas:

- 🐛 **Reportar bugs** - Abre un issue describiendo el problema
- 📝 **Mejorar documentación** - Corrige errores o añade claridad
- 🌍 **Traducciones** - Ayuda a traducir a otros idiomas
- 💻 **Código** - Envía PRs con mejoras o nuevas funcionalidades

### Guía de contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mi-mejora`)
3. Commit tus cambios (`git commit -am 'Añade mi mejora'`)
4. Push a la rama (`git push origin feature/mi-mejora`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 Créditos

- [Stockfish](https://stockfishchess.org/) - El motor de ajedrez
- [Lichess](https://lichess.org/) - Inspiración para el proyecto
- [React](https://react.dev/) - Biblioteca UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

<p align="center">
  Hecho con ♟️ y 💜 por la comunidad
</p>

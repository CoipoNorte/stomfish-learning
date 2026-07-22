export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: {
      features: 'Características',
      lessons: 'Lecciones',
      docs: 'Documentación',
      community: 'Comunidad',
      startLearning: 'Empezar a Aprender',
    },
    hero: {
      badge: 'Open Source · 100% Gratuito · Hecho con ♥',
      title1: 'Construye Tu Propia',
      titleHighlight: 'Plataforma de Ajedrez',
      title2: 'Desde Cero',
      subtitle: 'Aprende paso a paso cómo usar el motor Stomfish — desde la instalación hasta desplegar tu propia app de ajedrez. Tablero interactivo, piezas modulares, temas, y todo lo que necesitas para crear tu propio',
      subtitleHighlight: 'Lichess',
      cta1: 'Comenzar Tutorial',
      cta2: 'Ver en GitHub',
      stats: {
        lessons: 'Lecciones',
        modules: 'Módulos',
        contributors: 'Contribuidores',
      },
    },
    logoCloud: {
      title: 'Construido con tecnologías que ya conoces y amas',
    },
    features: {
      badge: 'Todo lo que aprenderás',
      title: 'De Cero a App de Ajedrez',
      titleHighlight: ' Completa',
      subtitle: 'Un camino de aprendizaje completo que te lleva desde descargar Stomfish hasta desplegar tu propia plataforma de ajedrez — con lecciones interactivas, visuales y prácticas.',
      items: {
        download: {
          title: 'Descarga y Configuración',
          description: 'Aprende exactamente dónde obtener Stomfish, cómo configurarlo, y tenlo funcionando localmente en minutos.',
        },
        jsIntegration: {
          title: 'Integración con JavaScript',
          description: 'Conecta Stomfish a tu proyecto JS/TS mediante Web Workers y WASM para análisis ultrarrápido.',
        },
        board: {
          title: 'Construcción del Tablero',
          description: 'Construye un tablero de ajedrez responsive y accesible desde cero — SVG o Canvas, tú eliges.',
        },
        pieces: {
          title: 'Piezas Modulares',
          description: 'Sets de piezas plug-and-play con soporte para temas SVG personalizados y librerías animadas.',
        },
        dragDrop: {
          title: 'Arrastrar y Soltar',
          description: 'Implementa drag-and-drop suave con soporte táctil, validación de movimientos y transiciones animadas.',
        },
        animations: {
          title: 'Animaciones de Movimiento',
          description: 'Animaciones de piezas a 60fps con curvas de easing, efectos de captura y overlays de promoción.',
        },
        themes: {
          title: 'Temas y Preferencias',
          description: 'Tableros claro/oscuro, estilos de piezas, packs de sonido, y toggle de coordenadas — totalmente personalizable.',
        },
        components: {
          title: 'Componentes Pre-construidos',
          description: 'Componentes React optimizados para listas de movimientos, barras de evaluación, relojes y controles.',
        },
        analysis: {
          title: 'Análisis del Motor',
          description: 'Evaluación de posición en tiempo real con flechas de mejor movimiento, control de profundidad y líneas multi-PV.',
        },
        examples: {
          title: 'Ejemplos Interactivos',
          description: 'Cada lección incluye ejemplos de código en vivo y editables que puedes modificar en tu navegador.',
        },
        deploy: {
          title: 'Paquete Desplegable',
          description: 'Recibe un bundle optimizado listo para producción, desplegable en GitHub Pages con un comando.',
        },
        fullApp: {
          title: 'Clon Completo de Lichess',
          description: 'Al final del curso, tendrás una plataforma de ajedrez funcional con análisis, juego y puzzles.',
        },
      },
    },
    showcase: {
      badge: 'Vista Previa Interactiva',
      title: 'Mira Lo Que',
      titleHighlight: ' Construirás',
      subtitle: 'APIs limpias, ejemplos interactivos y componentes listos para producción. Esta es la calidad del código que escribirás al final.',
      tabs: {
        board: 'Tablero',
        code: 'Código',
        preview: 'Vista Previa',
      },
      engineConnected: 'Motor conectado — profundidad 20',
      liveEval: 'Evaluación en Vivo',
      moveHistory: 'Historial de Movimientos',
      bestLine: 'Mejor Línea',
    },
    roadmap: {
      badge: 'Ruta de Aprendizaje',
      title: '8 Módulos.',
      titleHighlight: ' 45+ Lecciones.',
      title2: 'Una App Completa.',
      subtitle: 'Cada módulo construye sobre el anterior, llevándote paso a paso desde la configuración del motor hasta desplegar tu propia plataforma de ajedrez.',
      startModule: 'Comenzar módulo',
      modules: {
        m1: {
          title: 'Fundamentos del Motor',
          subtitle: 'Descarga, instala y configura Stomfish',
          lessons: ['Qué es Stomfish y cómo funciona', 'Descargando los binarios del motor', 'Configuración local y del entorno', 'Tu primer comando al motor'],
        },
        m2: {
          title: 'Puente JavaScript',
          subtitle: 'Conecta Stomfish a tu app web',
          lessons: ['Web Workers para comunicación con el motor', 'Compilación y carga de WASM', 'Protocolo UCI en JavaScript', 'Enviando posiciones y leyendo respuestas'],
        },
        m3: {
          title: 'El Tablero de Ajedrez',
          subtitle: 'Construye un tablero responsive y bonito',
          lessons: ['Estructuras de datos y parsing FEN', 'Renderizado con SVG', 'Tamaño responsive y coordenadas', 'Resaltado de casillas e indicadores'],
        },
        m4: {
          title: 'Piezas e Interacción',
          subtitle: 'Arrastra, suelta y anima piezas',
          lessons: ['Renderizado de piezas SVG y temas', 'Implementación de drag-and-drop', 'Soporte para dispositivos táctiles', 'Animaciones de movimiento suaves'],
        },
        m5: {
          title: 'Lógica del Juego',
          subtitle: 'Movimientos legales, capturas y reglas especiales',
          lessons: ['Generación y validación de movimientos', 'Enroque, en passant, promoción', 'Jaque, jaque mate y tablas', 'Notación PGN e historial de partida'],
        },
        m6: {
          title: 'Análisis del Motor',
          subtitle: 'Evaluación en tiempo real y mejores movimientos',
          lessons: ['Integración de búsqueda multi-profundidad', 'Visualización de barra de evaluación', 'Flechas de mejor movimiento en el tablero', 'Integración de libro de aperturas'],
        },
        m7: {
          title: 'Temas y Pulido',
          subtitle: 'Personalización, sonidos y preferencias',
          lessons: ['Sistema de temas de tablero y piezas', 'Efectos de sonido para movimientos', 'Almacenamiento de preferencias de usuario', 'Accesibilidad y navegación por teclado'],
        },
        m8: {
          title: 'Desplegar y Publicar',
          subtitle: 'Build de producción y GitHub Pages',
          lessons: ['Build optimizado para producción', 'Despliegue en GitHub Pages', 'Configuración PWA', 'Paquete modular final'],
        },
      },
    },
    gettingStarted: {
      badge: 'Empezar Ahora',
      title: 'Comienza Tu',
      titleHighlight: ' Viaje',
      subtitle: 'Todo lo que necesitas para empezar está aquí. Sin registro, sin pagos, solo aprende.',
      steps: {
        s1: {
          title: 'Clona el Repositorio',
          description: 'Obtén todo el código fuente y los ejemplos en tu máquina local.',
        },
        s2: {
          title: 'Instala Dependencias',
          description: 'Configura tu entorno de desarrollo con un solo comando.',
        },
        s3: {
          title: 'Abre la Documentación',
          description: 'Sigue las lecciones interactivas paso a paso.',
        },
        s4: {
          title: '¡Construye y Aprende!',
          description: 'Experimenta, modifica, y haz tuyo el proyecto.',
        },
      },
      cta: 'Ver Documentación Completa',
    },
    community: {
      badge: 'Comunidad Open Source',
      title: 'Hecho Por y Para la',
      titleHighlight: ' Comunidad',
      subtitle: 'Stomfish Learning es un proyecto de código abierto mantenido por desarrolladores apasionados por el ajedrez y la programación.',
      stats: {
        stars: 'GitHub Stars',
        forks: 'Forks',
        contributors: 'Contribuidores',
        commits: 'Commits',
      },
      contribute: {
        title: '¿Quieres Contribuir?',
        description: 'Aceptamos pull requests, reportes de bugs, traducciones y mejoras en la documentación. ¡Toda ayuda es bienvenida!',
        cta: 'Ver Guía de Contribución',
      },
    },
    faq: {
      badge: 'Preguntas Frecuentes',
      title: 'Dudas',
      titleHighlight: ' Comunes',
      items: {
        q1: {
          question: '¿Qué es Stomfish exactamente?',
          answer: 'Stomfish es un toolkit de motor de ajedrez que agrupa todo lo necesario para construir tu propia plataforma de ajedrez virtual. Piensa en él como los cimientos — provee análisis del motor, renderizado del tablero, gestión de piezas, validación de movimientos, y más, todo consumible mediante JavaScript. Este curso te enseña cómo usar cada parte.',
        },
        q2: {
          question: '¿Necesito saber jugar ajedrez para tomar este curso?',
          answer: '¡Conocimiento básico de ajedrez ayuda (saber cómo se mueven las piezas), pero no necesitas ser un gran maestro! El curso explica conceptos de ajedrez a medida que se vuelven relevantes para el código. Está diseñado para desarrolladores curiosos sobre el ajedrez, no expertos en ajedrez aprendiendo a programar.',
        },
        q3: {
          question: '¿Qué experiencia en programación necesito?',
          answer: 'Deberías sentirte cómodo con los fundamentos de JavaScript — variables, funciones, arrays, objetos, y manipulación básica del DOM. Experiencia con React es útil pero no requerida. Cubrimos TypeScript, Web Workers y WASM desde cero.',
        },
        q4: {
          question: '¿Qué obtengo al final del curso?',
          answer: 'Una plataforma de ajedrez totalmente funcional y desplegable — tu propia app web tipo Lichess. Incluye un tablero interactivo con drag-and-drop, análisis del motor con barras de evaluación y flechas de mejor movimiento, múltiples temas y sets de piezas, historial de movimientos, y está listo para desplegar en GitHub Pages con un solo comando.',
        },
        q5: {
          question: '¿Es un curso en video o basado en texto?',
          answer: 'Es principalmente basado en texto con ejemplos interactivos y código en vivo que puedes editar y experimentar directamente en tu navegador. Cada lección incluye vistas previas visuales, demostraciones animadas, y snippets de código ejecutables. Creemos que este formato es más efectivo que ver videos pasivamente.',
        },
        q6: {
          question: '¿Puedo usar esto para proyectos comerciales?',
          answer: '¡Absolutamente! Todo el código es open source bajo licencia MIT. Construye una app de entrenamiento de ajedrez, un sitio web para un club, o incluso una startup — es tuyo para usarlo como quieras.',
        },
        q7: {
          question: '¿En qué se diferencia de chess.js o chessboard.js?',
          answer: 'Esas son excelentes librerías, pero son cajas negras. Stomfish Learning te enseña cómo construir todo el stack tú mismo. Entenderás cada línea de código, y terminarás con una solución personalizada y optimizada adaptada a tus necesidades — no una dependencia genérica.',
        },
        q8: {
          question: '¿Cómo puedo contribuir al proyecto?',
          answer: '¡Nos encantaría tu ayuda! Puedes contribuir de muchas formas: reportando bugs, mejorando la documentación, añadiendo traducciones, o enviando pull requests con nuevas funcionalidades. Visita nuestro repositorio en GitHub para ver la guía de contribución.',
        },
      },
    },
    cta: {
      title1: '¿Listo para Construir Tu',
      title2: 'Propia Plataforma de Ajedrez?',
      subtitle: 'Únete a una comunidad de desarrolladores que combinaron su amor por el ajedrez y el código en algo real. 100% gratuito, 100% open source.',
      cta: 'Comenzar Ahora',
      note: 'Sin registro · Sin pagos · Solo aprende',
    },
    footer: {
      description: 'La plataforma de aprendizaje completa para construir tu propia aplicación de ajedrez usando el motor Stomfish. De cero a despliegue.',
      product: 'Producto',
      resources: 'Recursos',
      community: 'Comunidad',
      links: {
        features: 'Características',
        lessons: 'Lecciones',
        roadmap: 'Ruta de Aprendizaje',
        changelog: 'Changelog',
        gettingStarted: 'Primeros Pasos',
        apiReference: 'Referencia API',
        examples: 'Ejemplos',
        blog: 'Blog',
        github: 'GitHub',
        discord: 'Discord',
        contributing: 'Contribuir',
        codeOfConduct: 'Código de Conducta',
      },
      copyright: 'Stomfish Learning. Proyecto Open Source.',
      madeWith: 'Hecho con',
    },
  },
  en: {
    nav: {
      features: 'Features',
      lessons: 'Lessons',
      docs: 'Documentation',
      community: 'Community',
      startLearning: 'Start Learning',
    },
    hero: {
      badge: 'Open Source · 100% Free · Made with ♥',
      title1: 'Build Your Own',
      titleHighlight: 'Chess Platform',
      title2: 'From Scratch',
      subtitle: 'Learn step by step how to use the Stomfish engine — from installation to deploying your own chess app. Interactive board, modular pieces, themes, and everything you need to create your own',
      subtitleHighlight: 'Lichess',
      cta1: 'Start Tutorial',
      cta2: 'View on GitHub',
      stats: {
        lessons: 'Lessons',
        modules: 'Modules',
        contributors: 'Contributors',
      },
    },
    logoCloud: {
      title: 'Built with technologies you already know & love',
    },
    features: {
      badge: 'Everything You Will Learn',
      title: 'From Zero to',
      titleHighlight: ' Complete Chess App',
      subtitle: 'A complete learning path that takes you from downloading Stomfish to deploying your own chess platform — with interactive, visual, hands-on lessons.',
      items: {
        download: {
          title: 'Download & Setup',
          description: 'Learn exactly where to get Stomfish, how to configure it, and have it running locally in minutes.',
        },
        jsIntegration: {
          title: 'JavaScript Integration',
          description: 'Connect Stomfish to your JS/TS project via Web Workers and WASM for blazing-fast analysis.',
        },
        board: {
          title: 'Board Construction',
          description: 'Build a responsive, accessible chessboard from scratch — SVG or Canvas, your choice.',
        },
        pieces: {
          title: 'Modular Pieces',
          description: 'Plug-and-play piece sets with support for custom SVG themes and animated libraries.',
        },
        dragDrop: {
          title: 'Drag & Drop',
          description: 'Implement smooth drag-and-drop with touch support, move validation, and animated transitions.',
        },
        animations: {
          title: 'Move Animations',
          description: 'Silky 60fps piece animations with easing curves, capture effects, and promotion overlays.',
        },
        themes: {
          title: 'Themes & Preferences',
          description: 'Dark/light boards, piece styles, sound packs, and coordinate toggle — fully customizable.',
        },
        components: {
          title: 'Pre-built Components',
          description: 'Optimized React components for move lists, evaluation bars, clocks, and controls.',
        },
        analysis: {
          title: 'Engine Analysis',
          description: 'Real-time position evaluation with best move arrows, depth control, and multi-PV lines.',
        },
        examples: {
          title: 'Interactive Examples',
          description: 'Every lesson includes live, editable code examples you can tinker with in your browser.',
        },
        deploy: {
          title: 'Deployable Package',
          description: 'Receive a production-ready, optimized bundle deployable to GitHub Pages in one command.',
        },
        fullApp: {
          title: 'Full Lichess Clone',
          description: "By course end, you'll have a fully functional chess platform with analysis, play, and puzzles.",
        },
      },
    },
    showcase: {
      badge: 'Interactive Preview',
      title: 'See What You Will',
      titleHighlight: ' Build',
      subtitle: 'Clean APIs, interactive examples, and production-ready components. This is the quality of code you will write by the end.',
      tabs: {
        board: 'Board',
        code: 'Code',
        preview: 'Preview',
      },
      engineConnected: 'Engine connected — depth 20',
      liveEval: 'Live Evaluation',
      moveHistory: 'Move History',
      bestLine: 'Best Line',
    },
    roadmap: {
      badge: 'Learning Path',
      title: '8 Modules.',
      titleHighlight: ' 45+ Lessons.',
      title2: 'One Complete App.',
      subtitle: 'Each module builds on the last, taking you step-by-step from engine setup to deploying your own chess platform.',
      startModule: 'Start module',
      modules: {
        m1: {
          title: 'Engine Foundations',
          subtitle: 'Download, install & configure Stomfish',
          lessons: ['What is Stomfish & how it works', 'Downloading the engine binaries', 'Local setup & environment config', 'Your first engine command'],
        },
        m2: {
          title: 'JavaScript Bridge',
          subtitle: 'Connect Stomfish to your web app',
          lessons: ['Web Workers for engine communication', 'WASM compilation & loading', 'UCI protocol in JavaScript', 'Sending positions & reading responses'],
        },
        m3: {
          title: 'The Chessboard',
          subtitle: 'Build a responsive, beautiful board',
          lessons: ['Board data structures & FEN parsing', 'Rendering with SVG', 'Responsive sizing & coordinates', 'Square highlighting & indicators'],
        },
        m4: {
          title: 'Pieces & Interaction',
          subtitle: 'Drag, drop, and animate pieces',
          lessons: ['SVG piece rendering & themes', 'Drag-and-drop implementation', 'Touch device support', 'Smooth move animations'],
        },
        m5: {
          title: 'Game Logic',
          subtitle: 'Legal moves, captures & special rules',
          lessons: ['Move generation & validation', 'Castling, en passant, promotion', 'Check, checkmate & stalemate', 'PGN notation & game history'],
        },
        m6: {
          title: 'Engine Analysis',
          subtitle: 'Real-time evaluation & best moves',
          lessons: ['Multi-depth search integration', 'Eval bar visualization', 'Best move arrows on board', 'Opening book integration'],
        },
        m7: {
          title: 'Themes & Polish',
          subtitle: 'Customization, sounds & preferences',
          lessons: ['Board & piece theme system', 'Sound effects for moves', 'User preferences storage', 'Accessibility & keyboard nav'],
        },
        m8: {
          title: 'Deploy & Ship',
          subtitle: 'Production build & GitHub Pages',
          lessons: ['Optimized production build', 'GitHub Pages deployment', 'PWA configuration', 'Final modular package'],
        },
      },
    },
    gettingStarted: {
      badge: 'Get Started Now',
      title: 'Start Your',
      titleHighlight: ' Journey',
      subtitle: 'Everything you need to start is here. No signup, no payments, just learn.',
      steps: {
        s1: {
          title: 'Clone the Repository',
          description: 'Get all source code and examples on your local machine.',
        },
        s2: {
          title: 'Install Dependencies',
          description: 'Set up your development environment with a single command.',
        },
        s3: {
          title: 'Open the Documentation',
          description: 'Follow the interactive lessons step by step.',
        },
        s4: {
          title: 'Build & Learn!',
          description: 'Experiment, modify, and make the project your own.',
        },
      },
      cta: 'View Full Documentation',
    },
    community: {
      badge: 'Open Source Community',
      title: 'Made By and For the',
      titleHighlight: ' Community',
      subtitle: 'Stomfish Learning is an open source project maintained by developers passionate about chess and programming.',
      stats: {
        stars: 'GitHub Stars',
        forks: 'Forks',
        contributors: 'Contributors',
        commits: 'Commits',
      },
      contribute: {
        title: 'Want to Contribute?',
        description: 'We accept pull requests, bug reports, translations, and documentation improvements. All help is welcome!',
        cta: 'View Contribution Guide',
      },
    },
    faq: {
      badge: 'FAQ',
      title: 'Frequently Asked',
      titleHighlight: ' Questions',
      items: {
        q1: {
          question: 'What is Stomfish exactly?',
          answer: 'Stomfish is a chess engine toolkit that bundles everything you need to build your own virtual chess platform. Think of it as the foundation — it provides engine analysis, board rendering, piece management, move validation, and more, all consumable through JavaScript. This course teaches you how to use every part of it.',
        },
        q2: {
          question: 'Do I need to know chess to take this course?',
          answer: "Basic chess knowledge helps (knowing how pieces move), but you don't need to be a grandmaster! The course explains chess concepts as they become relevant to the code. It's designed for developers who are curious about chess, not chess experts learning to code.",
        },
        q3: {
          question: 'What programming experience do I need?',
          answer: "You should be comfortable with JavaScript fundamentals — variables, functions, arrays, objects, and basic DOM manipulation. Experience with React is helpful but not required. We cover TypeScript, Web Workers, and WASM from the ground up.",
        },
        q4: {
          question: 'What do I get at the end of the course?',
          answer: "A fully functional, deployable chess platform — your own Lichess-like web app. It includes an interactive board with drag-and-drop, engine analysis with evaluation bars and best-move arrows, multiple themes and piece sets, move history, and it's ready to deploy to GitHub Pages with a single command.",
        },
        q5: {
          question: 'Is this a video course or text-based?',
          answer: "It's primarily text-based with interactive, live-coded examples you can edit and experiment with directly in your browser. Every lesson includes visual previews, animated demonstrations, and runnable code snippets. We believe this format is more effective than passive video watching.",
        },
        q6: {
          question: 'Can I use this for commercial projects?',
          answer: "Absolutely! All code is open source under MIT license. Build a chess training app, a club website, or even a startup — it's yours to use however you want.",
        },
        q7: {
          question: "How is this different from chess.js or chessboard.js?",
          answer: "Those are great libraries, but they're black boxes. Stomfish Learning teaches you how to build the entire stack yourself. You'll understand every line of code, and you'll end up with a customized, optimized solution tailored to your needs — not a generic dependency.",
        },
        q8: {
          question: 'How can I contribute to the project?',
          answer: "We'd love your help! You can contribute in many ways: reporting bugs, improving documentation, adding translations, or submitting pull requests with new features. Visit our GitHub repository to see the contribution guide.",
        },
      },
    },
    cta: {
      title1: 'Ready to Build Your',
      title2: 'Own Chess Platform?',
      subtitle: 'Join a community of developers who combined their love for chess and code into something real. 100% free, 100% open source.',
      cta: 'Start Now',
      note: 'No signup · No payments · Just learn',
    },
    footer: {
      description: 'The complete learning platform for building your own chess application using the Stomfish engine. From zero to deployment.',
      product: 'Product',
      resources: 'Resources',
      community: 'Community',
      links: {
        features: 'Features',
        lessons: 'Lessons',
        roadmap: 'Learning Path',
        changelog: 'Changelog',
        gettingStarted: 'Getting Started',
        apiReference: 'API Reference',
        examples: 'Examples',
        blog: 'Blog',
        github: 'GitHub',
        discord: 'Discord',
        contributing: 'Contributing',
        codeOfConduct: 'Code of Conduct',
      },
      copyright: 'Stomfish Learning. Open Source Project.',
      madeWith: 'Made with',
    },
  },
};

export function useTranslation(lang: Language) {
  return translations[lang];
}

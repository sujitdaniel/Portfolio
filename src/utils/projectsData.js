import {
  SiThreedotjs,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiBlender,
  SiCplusplus,
  SiPython,
  SiNumpy,
  SiScikitlearn,
  SiSwift,
  SiApple,
} from "react-icons/si";

export const projects = [
  {
    title: "3D Portfolio",
    can: "images/projects/3dPortfolio/3dPortfolioCan.webp",
    images: [
      { src: "images/projects/3dPortfolio/1.gif", alt: "Portfolio scene" },
      { src: "images/projects/3dPortfolio/2.gif", alt: "Camera move" },
      { src: "images/projects/3dPortfolio/3.gif", alt: "Screen panel" },
      { src: "images/projects/3dPortfolio/4.gif", alt: "Section view" },
    ],
    description: {
      en: "An interactive personal site built with Three.js and React Three Fiber. About, projects, games, music, and contact live on 3D screens inside the scene, with GSAP camera moves and a language toggle.",
      de: "Eine interaktive persönliche Website mit Three.js und React Three Fiber. Über mich, Projekte, Spiele, Musik und Kontakt liegen auf 3D-Bildschirmen in der Szene, mit GSAP-Kamerafahrten und Sprachumschaltung.",
    },
    tech: [SiThreedotjs, SiReact, SiTailwindcss, SiVite, SiBlender],
    features: {
      en: [
        "Immersive 3D navigation between portfolio sections.",
        "Real HTML rendered on 3D screens.",
        "GSAP camera transitions.",
        "Background music controls.",
        "English and German interface copy.",
      ],
      de: [
        "Immersive 3D-Navigation zwischen den Portfolio-Bereichen.",
        "Echtes HTML auf 3D-Bildschirmen.",
        "GSAP-Kamerafahrten.",
        "Steuerung für Hintergrundmusik.",
        "Oberfläche auf Englisch und Deutsch.",
      ],
    },
    date: { en: "August 2025", de: "August 2025" },
    github: "https://github.com/sujitdaniel/Portfolio",
  },
  {
    title: "Stock Direction & Volatility",
    can: "images/projects/AIRacingLine/AIRacingLineCan.webp",
    images: [
      { src: "images/projects/AIRacingLine/AIRacingLineCan.webp", alt: "Stock research" },
    ],
    description: {
      en: "A research pipeline that tests whether price history predicts the next day's stock direction. Chronological k-NN, SVM, and random-forest experiments showed no tradable edge, so the project adds a volatility target that cuts drawdown.",
      de: "Eine Forschungspipeline, die prüft, ob die Kurshistorie die Richtung des nächsten Tages vorhersagt. Chronologische k-NN-, SVM- und Random-Forest-Experimente zeigten keinen handelbaren Vorteil, daher begrenzt ein Volatilitätsziel den Drawdown.",
    },
    tech: [SiPython, SiScikitlearn, SiNumpy],
    features: {
      en: [
        "126 k-NN, SVM, and random-forest runs with chronological splits.",
        "Train-only scaling so future prices never leak into training.",
        "50.34% mean directional accuracy, no reliable edge.",
        "Volatility targeting cut max drawdown from -34.5% to -16.8%.",
      ],
      de: [
        "126 k-NN-, SVM- und Random-Forest-Läufe mit chronologischen Splits.",
        "Skalierung nur auf Trainingsdaten, damit zukünftige Kurse nicht leaken.",
        "50,34 % mittlere Richtungsgenauigkeit, kein verlässlicher Vorteil.",
        "Volatilitätsziel senkte den maximalen Drawdown von -34,5 % auf -16,8 %.",
      ],
    },
    date: { en: "January 2025 – June 2025", de: "Januar 2025 – Juni 2025" },
    github: "https://github.com/sujitdaniel/stock-direction-volatility-targeting",
  },
  {
    title: "NetOpt",
    can: "images/projects/ArcfaceBackbones/ArcfaceCan.webp",
    images: [
      { src: "images/projects/ArcfaceBackbones/ArcfaceCan.webp", alt: "NetOpt compiler" },
    ],
    description: {
      en: "An MLIR compiler for packet processing. It models how a network card spreads work across CPU cores, then removes unused queues and parallelizes loops that do not share state.",
      de: "Ein MLIR-Compiler für die Paketverarbeitung. Er modelliert, wie eine Netzwerkkarte Arbeit auf CPU-Kerne verteilt, entfernt ungenutzte Queues und parallelisiert Schleifen ohne gemeinsamen Zustand.",
    },
    tech: [SiCplusplus, SiPython],
    features: {
      en: [
        "MLIR framework for how a NIC spreads packets across cores.",
        "Lock-free multi-consumer queue in C++17, benchmarked above 15.6M items/s.",
        "Passes that drop unused queues and parallelize conflict-free affine loops.",
        "16 FileCheck tests for safe and unsafe transformations.",
      ],
      de: [
        "MLIR-Framework dafür, wie eine NIC Pakete auf Kerne verteilt.",
        "Lock-freie Multi-Consumer-Queue in C++17, über 15,6 Mio. Elemente/s.",
        "Passes entfernen ungenutzte Queues und parallelisieren konfliktfreie affine Schleifen.",
        "16 FileCheck-Tests für sichere und unsichere Transformationen.",
      ],
    },
    date: { en: "March 2026 – May 2026", de: "März 2026 – Mai 2026" },
    github: "https://github.com/sujitdaniel/mlir-netopt",
  },
  {
    title: "NYC 311 Escalation",
    can: "images/projects/CicataNexus/CicataNexusCan.webp",
    images: [
      { src: "images/projects/CicataNexus/CicataNexusCan.webp", alt: "NYC 311 app" },
    ],
    description: {
      en: "An iOS app for overdue NYC 311 cases. It pulls open complaints from NYC Open Data, tags delays against historical resolution times, maps them, drafts an escalation email, and exports a PDF report.",
      de: "Eine iOS-App für überfällige NYC-311-Fälle. Sie lädt offene Beschwerden von NYC Open Data, markiert Verzögerungen anhand historischer Bearbeitungszeiten, zeigt sie auf einer Karte, erstellt eine Eskalations-E-Mail und exportiert einen PDF-Bericht.",
    },
    tech: [SiSwift, SiApple],
    features: {
      en: [
        "Case list, map, analytics, daily digest, and settings.",
        "Delay tags from P50, P80, and P90 resolution times by area and complaint type.",
        "Escalation drafts with subject and body, mailed through the system composer.",
        "PDF reports with timeline, map snapshot, photos, and the recommendation.",
        "Core Data cache and a best-effort daily background refresh.",
      ],
      de: [
        "Fallliste, Karte, Analytik, täglicher Digest und Einstellungen.",
        "Verzögerungsmarken aus P50-, P80- und P90-Zeiten nach Gebiet und Beschwerdeart.",
        "Eskalationsentwürfe mit Betreff und Text über den System-Mail-Composer.",
        "PDF-Berichte mit Zeitlinie, Kartenausschnitt, Fotos und Empfehlung.",
        "Core-Data-Cache und eine tägliche Hintergrundaktualisierung.",
      ],
    },
    date: { en: "May 2026", de: "Mai 2026" },
    github: "https://github.com/sujitdaniel/NYC-311-Escalation-iOS-App",
  },
];

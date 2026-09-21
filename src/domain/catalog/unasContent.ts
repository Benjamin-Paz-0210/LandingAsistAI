import type { ExtensionCourse } from "./unas";

export type CareerReview = {
  name: string;
  year: string;
  text: string;
};

export type CareerContent = {
  review: string;
  reviews: CareerReview[];
  courses: ExtensionCourse[];
};

function course(code: string, name: string, hours: string, summary: string, image: string): ExtensionCourse {
  return { code, name, hours, summary, image };
}

export const CAREER_CONTENT: Record<string, CareerContent> = {
  agronomia: {
    review:
      "Agronomía forma profesionales para el trópico húmedo: suelos, fitotecnia, sanidad vegetal y sistemas agroforestales. El campus de Tingo María permite práctica permanente en campo, con énfasis en cacao, plátano, arroz y cultivos nativos.",
    reviews: [
      {
        name: "Lucía Mendoza",
        year: "Egresada 2022",
        text: "Las prácticas en parcelas de la UNAS me dieron criterio real de campo. Hoy asesoro a productores del Alto Huallaga.",
      },
      {
        name: "Pedro Vásquez",
        year: "Egresado 2021",
        text: "La carrera combina investigación y extensión. El vínculo con cooperativas de cacao es una fortaleza.",
      },
    ],
    courses: [
      course("agro-suelos", "Manejo de suelos tropicales", "40 horas", "Fertilidad, erosión y enmiendas en selva alta.", "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"),
      course("agro-cacao", "Cacao y sistemas agroforestales", "36 horas", "Diseño de sombra, clones y postcosecha.", "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=80"),
      course("agro-sanidad", "Sanidad vegetal amazónica", "32 horas", "Diagnóstico de plagas y manejo integrado.", "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  zootecnia: {
    review:
      "Zootecnia prepara para la producción animal sostenible en trópico: pastos, nutrición, reproducción y sanidad de ganado, aves y especies menores adaptadas a la selva.",
    reviews: [
      {
        name: "María Huamán",
        year: "Egresada 2023",
        text: "Aprendí a diseñar dietas con insumos locales. Eso marca la diferencia en fincas de Tingo María.",
      },
      {
        name: "José Ríos",
        year: "Egresado 2020",
        text: "El módulo de pastos tropicales y el trabajo con productores me abrieron el campo laboral.",
      },
    ],
    courses: [
      course("zoo-pastos", "Pastos y forrajes tropicales", "32 horas", "Especies, rotación y carga animal.", "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"),
      course("zoo-nutricion", "Nutrición de rumiantes", "36 horas", "Raciones con residuos agrícolas de la selva.", "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80"),
      course("zoo-sanidad", "Sanidad pecuaria básica", "28 horas", "Prevención y bioseguridad en granja.", "https://images.unsplash.com/photo-1415369629372-d7ef7bf16a44?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  forestal: {
    review:
      "Ingeniería Forestal se centra en el manejo de bosques, inventario, concesiones y restauración. El entorno del Huallaga es el laboratorio natural de la carrera.",
    reviews: [
      {
        name: "Ana Pinedo",
        year: "Egresada 2021",
        text: "Inventariar bosque en práctica real no se compara con el aula. La UNAS da ese acceso.",
      },
      {
        name: "Raúl Cachique",
        year: "Egresado 2019",
        text: "Hoy trabajo en restauración de cuencas. La base forestal de la universidad fue decisiva.",
      },
    ],
    courses: [
      course("for-inventario", "Inventario forestal", "48 horas", "Muestreo, cubicación y SIG de campo.", "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"),
      course("for-manejo", "Manejo de bosques amazónicos", "40 horas", "Planes de manejo y aprovechamiento de bajo impacto.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"),
      course("for-restauracion", "Restauración ecológica", "32 horas", "Especies nativas y viveros comunales.", "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  ambiental: {
    review:
      "Ingeniería Ambiental forma en calidad de agua, residuos, evaluación de impacto y normativa, con casos de minería, agroindustria y ciudades amazónicas.",
    reviews: [
      {
        name: "Diana Flores",
        year: "Egresada 2022",
        text: "Los laboratorios de agua y los EIA de campo me dieron un perfil que las consultoras buscan.",
      },
      {
        name: "Kevin Salas",
        year: "Egresado 2023",
        text: "Entender la norma y el territorio juntos es lo que más valoro de la carrera.",
      },
    ],
    courses: [
      course("amb-agua", "Calidad de agua en cuencas", "36 horas", "Muestreo, parámetros y tratamiento primario.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"),
      course("amb-eia", "Evaluación de impacto ambiental", "40 horas", "Línea base y medidas de mitigación.", "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"),
      course("amb-residuos", "Gestión de residuos sólidos", "28 horas", "Separación, relleno y valorización.", "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  "recursos-naturales": {
    review:
      "La ingeniería en recursos naturales renovables articula flora, fauna y servicios ecosistémicos para un aprovechamiento sustentable con comunidades de la selva.",
    reviews: [
      {
        name: "Inés Tapullima",
        year: "Egresada 2020",
        text: "Trabajo con comunidades en planes de uso de bosque. La mirada interdisciplinaria de la UNAS me formó.",
      },
      {
        name: "Hugo Panduro",
        year: "Egresado 2021",
        text: "La carrera enseña a negociar conservación y producción, que es el dilema real de la región.",
      },
    ],
    courses: [
      course("rn-biodiversidad", "Monitoreo de biodiversidad", "40 horas", "Indicadores de flora y fauna.", "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80"),
      course("rn-servicios", "Servicios ecosistémicos", "32 horas", "Agua, carbono y turismo de naturaleza.", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"),
      course("rn-comunidades", "Gestión comunal de recursos", "28 horas", "Acuerdos de uso y gobernanza local.", "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  "industrias-alimentarias": {
    review:
      "Industrias Alimentarias transforma materia prima amazónica con inocuidad, procesos y control de calidad: cacao, frutas, raíces y bebidas nativas.",
    reviews: [
      {
        name: "Carla Reátegui",
        year: "Egresada 2022",
        text: "Monté una planta piloto de pulpa de camu camu. La malla de procesos de la UNAS fue la base.",
      },
      {
        name: "Luis Guerra",
        year: "Egresado 2019",
        text: "La inocuidad no es teoría: en planta se nota quién tuvo laboratorio serio.",
      },
    ],
    courses: [
      course("ali-inocuidad", "Inocuidad y BPM", "36 horas", "Higiene, HACCP y trazabilidad.", "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&q=80"),
      course("ali-nativos", "Procesamiento de alimentos nativos", "40 horas", "Camu camu, plátano y yuca.", "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"),
      course("ali-cacao", "Tecnología del cacao y chocolate", "32 horas", "Fermentación, tostado y conchado.", "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  informatica: {
    review:
      "Ingeniería en Informática y Sistemas forma en software, datos y redes aplicados al sector agrario, la gestión pública y las empresas de la región. El perfil combina programación, bases de datos y sistemas de información territorial.",
    reviews: [
      {
        name: "Benjamin Paz",
        year: "Estudiante 9.º ciclo",
        text: "Los proyectos con datos de campo me hicieron ver que el software sí resuelve problemas de la selva.",
      },
      {
        name: "Fiorella Ruiz",
        year: "Egresada 2023",
        text: "Salí con un portafolio de sistemas web y eso pesó más que cualquier certificado suelto.",
      },
    ],
    courses: [
      course("inf-web", "Desarrollo web institucional", "40 horas", "Sitios y trámites en línea para entidades públicas.", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"),
      course("inf-datos", "Bases de datos y reportes", "36 horas", "Modelado, SQL y tableros para gestión académica.", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"),
      course("inf-redes", "Redes y seguridad básica", "32 horas", "LAN, respaldo y buenas prácticas de acceso.", "https://images.unsplash.com/photo-1558494949-ef526af2c6d5?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  ciberseguridad: {
    review:
      "Ciberseguridad cubre protección de redes, análisis de vulnerabilidades, respuesta a incidentes y cumplimiento, con escenarios de gobierno electrónico y datos académicos.",
    reviews: [
      {
        name: "Andrea Salazar",
        year: "Egresada 2024",
        text: "El laboratorio de pentesting me dio método. Ahora audito redes de municipalidades.",
      },
      {
        name: "Marco Aliaga",
        year: "Egresado 2023",
        text: "Aprendí a explicar riesgo a no técnicos. Eso vale tanto como la herramienta.",
      },
    ],
    courses: [
      course("cib-hardening", "Hardening de servidores", "32 horas", "CIS, parches y cuentas privilegiadas.", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"),
      course("cib-soc", "Monitoreo y respuesta", "40 horas", "Registros, alertas y playbooks de incidente.", "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"),
      course("cib-datos", "Protección de datos personales", "28 horas", "Clasificación, cifrado y normativa peruana.", "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  civil: {
    review:
      "Ingeniería Civil forma en estructuras, hidráulica, geotecnia y vías, con el reto de construir en clima húmedo, suelos tropicales y geografía de ceja de selva.",
    reviews: [
      {
        name: "Elena Torres",
        year: "Egresada 2021",
        text: "Diseñar drenaje para lluvias de Tingo María no está en cualquier libro. Aquí sí se practica.",
      },
      {
        name: "Ricardo Peña",
        year: "Egresado 2020",
        text: "Las visitas a puentes y defensas ribereñas me dieron criterio de obra.",
      },
    ],
    courses: [
      course("civ-estructuras", "Concreto y estructuras ligeras", "40 horas", "Cálculo básico y control de obra.", "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"),
      course("civ-vias", "Caminos vecinales", "36 horas", "Trazado, afirmado y drenaje.", "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80"),
      course("civ-hidraulica", "Hidráulica de cuencas", "32 horas", "Alcantarillas y defensas contra crecidas.", "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  economia: {
    review:
      "Economía estudia desarrollo regional, mercados agrarios y política pública. El laboratorio es la economía del café, el cacao y los servicios de Tingo María.",
    reviews: [
      {
        name: "Nadia Campos",
        year: "Egresada 2022",
        text: "Hacer tesis con data de cooperativas me conectó con el empleo en proyectos de desarrollo.",
      },
      {
        name: "Óscar Vilca",
        year: "Egresado 2021",
        text: "La carrera enseña a leer territorio, no solo modelos. Eso se nota en el trabajo diario.",
      },
    ],
    courses: [
      course("eco-agraria", "Economía agraria amazónica", "32 horas", "Precios, cadenas y márgenes.", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"),
      course("eco-proyectos", "Formulación de proyectos", "40 horas", "Marco lógico e indicadores.", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"),
      course("eco-datos", "Estadística aplicada", "28 horas", "Encuestas y análisis descriptivo.", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  contabilidad: {
    review:
      "Contabilidad cubre registro, auditoría y control en el sector público y privado, con énfasis en entidades universitarias, cooperativas y mypes de la selva.",
    reviews: [
      {
        name: "Patricia León",
        year: "Egresada 2023",
        text: "Las prácticas en tesorería municipal me hicieron entender SIAF de verdad.",
      },
      {
        name: "Henry Quispe",
        year: "Egresado 2022",
        text: "Auditoría interna en cooperativas de cacao es un nicho que la UNAS conoce bien.",
      },
    ],
    courses: [
      course("con-nif", "NIIF para pymes", "36 horas", "Estados financieros y revelaciones.", "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"),
      course("con-publica", "Contabilidad pública", "40 horas", "Presupuesto, SIAF y control.", "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"),
      course("con-auditoria", "Auditoría básica", "32 horas", "Papeles de trabajo y muestreo.", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  administracion: {
    review:
      "Administración forma gestores para empresas, cooperativas y el Estado, con herramientas de planificación, personas y operaciones en contextos amazónicos.",
    reviews: [
      {
        name: "Sofía Bardales",
        year: "Egresada 2021",
        text: "Armé un plan de negocio de turismo rural como tesis. Hoy es mi empresa.",
      },
      {
        name: "Daniel Ruiz",
        year: "Egresado 2020",
        text: "La UNAS enseña a gestionar con pocos recursos y mucha gente. Eso es Tingo María.",
      },
    ],
    courses: [
      course("adm-plan", "Planeamiento estratégico", "32 horas", "FODA, OKR y tablero de control.", "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"),
      course("adm-personas", "Gestión de personas", "28 horas", "Clima, inducción y evaluación.", "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"),
      course("adm-mypes", "Administración de mypes", "36 horas", "Costos, flujo de caja y ventas.", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
  "turismo-hoteleria": {
    review:
      "Turismo y Hotelería forma en hospitalidad, operación de destinos y puesta en valor del paisaje, la gastronomía y la cultura de la selva alta, con Tingo María como aula viva.",
    reviews: [
      {
        name: "Melisa Guerra",
        year: "Egresada 2023",
        text: "Practiqué en lodge y en la cueva de las lechuzas. El destino se enseña caminándolo.",
      },
      {
        name: "Jorge Sangama",
        year: "Egresado 2022",
        text: "Aprendí a armar paquetes con comunidades. El turismo aquí no es de escritorio.",
      },
    ],
    courses: [
      course("tur-destino", "Gestión de destinos amazónicos", "36 horas", "Inventario turístico y señalética.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"),
      course("tur-hotel", "Operación hotelera", "40 horas", "Recepción, housekeeping y costos.", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"),
      course("tur-gastro", "Gastronomía regional", "28 horas", "Carta amazónica y servicio.", "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"),
    ],
  },
};

export function contentForCareer(code: string | null | undefined): CareerContent | undefined {
  if (!code) return undefined;
  return CAREER_CONTENT[code];
}

export function allExtensionCourses(): ExtensionCourse[] {
  return Object.values(CAREER_CONTENT).flatMap((item) => item.courses);
}

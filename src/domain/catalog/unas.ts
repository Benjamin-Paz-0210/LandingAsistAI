export type Career = {
  code: string;
  name: string;
  faculty: string;
  duration: string;
  summary: string;
  image: string;
};

export type ExtensionCourse = {
  code: string;
  name: string;
  hours: string;
  summary: string;
  image: string;
};

export const UNAS = {
  name: "Universidad Nacional Agraria de la Selva",
  shortName: "UNAS",
  city: "Tingo María",
  address: "Carretera Central km 1.21, Tingo María — Huánuco, Perú",
  motto: "Formar profesionales para administrar de manera sustentable la biodiversidad amazónica.",
};

export const CAREERS: Career[] = [
  {
    code: "agronomia",
    name: "Agronomía",
    faculty: "Facultad de Agronomía",
    duration: "10 semestres",
    summary: "Producción agrícola tropical, suelos, fitotecnia y sistemas agroforestales de la selva.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "zootecnia",
    name: "Zootecnia",
    faculty: "Facultad de Zootecnia",
    duration: "10 semestres",
    summary: "Producción animal sostenible, pastos tropicales y sanidad pecuaria.",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "forestal",
    name: "Ingeniería Forestal",
    faculty: "Facultad de Recursos Naturales Renovables",
    duration: "10 semestres",
    summary: "Manejo de bosques, inventario forestal y conservación de la cuenca del Huallaga.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "ambiental",
    name: "Ingeniería Ambiental",
    faculty: "Facultad de Recursos Naturales Renovables",
    duration: "10 semestres",
    summary: "Gestión ambiental, calidad de agua y mitigación del impacto en ecosistemas de selva.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "recursos-naturales",
    name: "Ingeniería en Recursos Naturales Renovables",
    faculty: "Facultad de Recursos Naturales Renovables",
    duration: "10 semestres",
    summary: "Aprovechamiento sustentable de flora, fauna y servicios ecosistémicos.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "industrias-alimentarias",
    name: "Ingeniería en Industrias Alimentarias",
    faculty: "Facultad de Ingeniería en Industrias Alimentarias",
    duration: "10 semestres",
    summary: "Transformación de materia prima amazónica, inocuidad y tecnología de alimentos.",
    image:
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "informatica",
    name: "Ingeniería en Informática y Sistemas",
    faculty: "Facultad de Ingeniería en Informática y Sistemas",
    duration: "10 semestres",
    summary: "Sistemas de información, datos y soluciones digitales para el sector agrario.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "economia",
    name: "Economía",
    faculty: "Facultad de Ciencias Económicas y Administrativas",
    duration: "10 semestres",
    summary: "Economía regional, desarrollo rural y planificación del territorio amazónico.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "contabilidad",
    name: "Contabilidad",
    faculty: "Facultad de Ciencias Económicas y Administrativas",
    duration: "10 semestres",
    summary: "Contabilidad pública y privada, auditoría y control institucional.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "administracion",
    name: "Administración",
    faculty: "Facultad de Ciencias Económicas y Administrativas",
    duration: "10 semestres",
    summary: "Gestión de organizaciones, emprendimiento y administración pública universitaria.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "ciberseguridad",
    name: "Ciberseguridad",
    faculty: "Facultad de Ingeniería en Informática y Sistemas",
    duration: "10 semestres",
    summary: "Protección de sistemas, redes y datos; análisis de vulnerabilidades y respuesta a incidentes.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "civil",
    name: "Ingeniería Civil",
    faculty: "Facultad de Ingeniería",
    duration: "10 semestres",
    summary: "Diseño y construcción de infraestructura vial, edificaciones e hidráulica en la región.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "turismo-hoteleria",
    name: "Turismo y Hotelería",
    faculty: "Facultad de Ciencias Económicas y Administrativas",
    duration: "10 semestres",
    summary: "Gestión turística, hospitalidad y puesta en valor del patrimonio natural de la selva alta.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
];

export const COURSES: ExtensionCourse[] = [
  {
    code: "cacao",
    name: "Cacao fino de aroma",
    hours: "40 horas",
    summary: "Postcosecha, fermentación y perfil sensorial del cacao de Tingo María.",
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "cafe",
    name: "Café de especialidad",
    hours: "32 horas",
    summary: "Beneficio húmedo, catación y trazabilidad para cooperativas de la selva alta.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "bosques",
    name: "Manejo de bosques amazónicos",
    hours: "48 horas",
    summary: "Inventario, concesiones y restauración de cobertura forestal.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    code: "alimentos",
    name: "Procesamiento de alimentos nativos",
    hours: "36 horas",
    summary: "Camu camu, plátano, yuca y derivados con normas de inocuidad.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  },
];

export const CAREER_CODES = CAREERS.map((item) => item.code);

export function careerByCode(code: string | null | undefined): Career | undefined {
  if (!code) return undefined;
  return CAREERS.find((item) => item.code === code);
}

export interface Agente {
  nombre: string;
  marca: string;
  lema: string;
  descripcion: string;
  instagram: string;
  whatsapp: string;
  web?: string;
  foto?: string;
  fotoAjuste?: string;
  fotoAjusteCirculo?: string;
  fotoCirculoClassName?: string;
  fotoFondo?: string;
  fotoSinBorde?: boolean;
}

export const AGENTES_DATA: Agente[] = [
  {
    nombre: "Lucinda Lara y Abril Ortiz",
    marca: "Lucinda Lara seguros",
    lema: "“25 años cuidando el futuro de quienes más importan.”",
    descripcion:
      "Unámonos todos por aquel que caiga en desgracia. Ese es el verdadero significado del seguro: la solidaridad, la prevención y la tranquilidad. Porque asegurar no solo es proteger un patrimonio; es cuidar el futuro de quienes más importan.",
    instagram: "@lucindalaraseguros",
    whatsapp: "5539617361",
    foto: "/agentes/lucinda-lara-abril.png",
    fotoAjuste: "object-cover object-[50%_40%]",
    fotoAjusteCirculo: "object-cover object-[50%_42%] scale-[1.45]",
  },
  {
    nombre: "Diego Cárdenas Quezada",
    marca: "Contigo y tus finanzas",
    lema: "Ayudo a las personas a planear un mejor futuro financiero.",
    descripcion:
      "Cumplir metas y consolidar sueños mediante estrategias financieras de ahorro, retiro, inversión y protección.\n\nMiembro de la MDRT con más de 12 años de experiencia en el sector.",
    instagram: "@contigoytusfinanzas",
    whatsapp: "5522507952",
    foto: "/agentes/diego-cardenas.png",
    fotoAjuste: "object-cover object-[center_32%]",
    fotoAjusteCirculo: "object-cover object-[center_28%] scale-110",
  },
  {
    nombre: "Dolores Sánchez Olivas",
    marca: "DSO | Seguros Integrales",
    lema: "Diseñamos estrategias para proteger tu salud y tu patrimonio.",
    descripcion:
      "24 años como agente de seguros aprendiendo que cada póliza representa una historia, una familia y un proyecto de vida.\n\nEn DSO no vendemos seguros, diseñamos estrategias.",
    instagram: "",
    whatsapp: "5522710833",
    foto: "/agentes/dolores-sanchez.png",
  },
  {
    nombre: "Martha Patricia Medina Flores",
    marca: "AS&CORP",
    lema: "Integridad, honestidad y trabajo continuo.",
    descripcion:
      "38 años protegiendo lo que más quieres con integridad, honestidad y trabajo continuo. Miembro de la MDRT y docente universitaria.",
    instagram: "",
    whatsapp: "5514529695",
    foto: "/agentes/patricia-medina.png",
  },
  {
    nombre: "Cristina Montero",
    marca: "ABEIRO",
    lema: "Trabajamos todos los días desde el 2010 para que este sea tu lugar seguro.",
    descripcion:
      "Porque las decisiones importantes merecen una conversación humana.",
    instagram: "@o.abeiro",
    whatsapp: "5573966005",
    foto: "/agentes/cristina-montero.png",
  },
  {
    nombre: "Noe Diego Flores Sánchez",
    marca: "Agente de Seguros",
    lema: "Siempre ayudando a mis asegurados a tener paz mental.",
    descripcion:
      "28 años protegiendo lo más valioso que tiene una persona: su vida, su salud y su familia.",
    instagram: "",
    whatsapp: "5518380844",
    foto: "/agentes/noe-diego-flores.png",
  },
  {
    nombre: "Blanca Mendoza",
    marca: "Veycom Agente de Seguros",
    lema: "Enfocados en brindar el mejor servicio.",
    descripcion:
      "Agente con más de 60 años de experiencia en seguros personales y de daños nos enfocamos en brindar el mejor servicio y sobre todo apoyar a los clientes cuando llega el momento de usar el seguro.",
    instagram: "",
    whatsapp: "",
    web: "https://www.veycom.com",
    foto: "/agentes/veycom-logo.png",
    fotoAjuste: "object-contain bg-white p-2",
  },
  {
    nombre: "Ordena Finanzas",
    marca: "",
    lema: "Algunas cosas cambian con el tiempo. Otras se vuelven más importantes.",
    descripcion:
      "En Ordena Finanzas ayudamos a personas, familias y empresarios a construir un patrimonio sólido mediante estrategias de ahorro, inversión, retiro y protección, para que cada decisión financiera tenga un propósito y cada meta un plan.",
    instagram: "@ordena_finanzas",
    whatsapp: "5513055590",
    web: "https://ordena-finanzas.com",
    foto: "/agentes/ordena-finanzas-logo.png",
    fotoAjuste: "object-cover object-center",
    fotoAjusteCirculo: "object-cover object-center",
    fotoCirculoClassName: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
    fotoFondo: "bg-black",
    fotoSinBorde: true,
  },
];

export function buildAgentWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  const normalized = digits.startsWith("52") ? digits : `52${digits}`;
  return `https://wa.me/${normalized}`;
}

export function buildAgentInstagramUrl(handle: string) {
  const trimmed = handle.trim();
  if (!trimmed) return "";
  return `https://instagram.com/${trimmed.replace(/^@/, "")}`;
}

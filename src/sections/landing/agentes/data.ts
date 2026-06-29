export interface Agente {
  nombre: string;
  marca: string;
  lema: string;
  descripcion: string;
  instagram: string;
  whatsapp: string;
  web?: string;
}

export const AGENTES_DATA: Agente[] = [
  {
    nombre: "Lucinda Lara y Abril Ortiz",
    marca: "Lucinda Lara seguros",
    lema: "“Unámonos todos por aquel que caiga en desgracia”",
    descripcion:
      "Ese es el verdadero significado del seguro: la solidaridad, la prevención y la tranquilidad porque asegurar no solo es proteger un patrimonio; es cuidar el futuro de quienes más importan. 25 años cuidando el futuro de quienes más importan.",
    instagram: "@lucindalaraseguros",
    whatsapp: "5539617361",
  },
  {
    nombre: "Diego Cárdenas Quezada",
    marca: "Contigo y tus finanzas",
    lema: "Ayudo a las personas a planear un mejor futuro financiero",
    descripcion:
      "Cumplir metas y consolidar sueños mediante estrategias financieras de ahorro, retiro, inversión y protección. Miembro de la MDRT con más de 12 años de experiencia en el sector.",
    instagram: "@contigoytusfinanzas",
    whatsapp: "5522507952",
  },
  {
    nombre: "Dolores Sánchez Olivas",
    marca: "DSO | Seguros Integrales",
    lema: "Diseñamos estrategias para proteger tu salud y tu patrimonio",
    descripcion:
      "24 años como agente de seguros aprendiendo que cada póliza representa una historia, una familia y un proyecto de vida. En DSO no vendemos seguros, diseñamos estrategias.",
    instagram: "",
    whatsapp: "5522710833",
  },
  {
    nombre: "Martha Patricia Medina Flores",
    marca: "AS&CORP",
    lema: "Integridad, honestidad y trabajo continuo",
    descripcion:
      "38 años protegiendo lo más quieres con integridad, honestidad y trabajo continuo. Miembro de la MDRT y docente universitaria.",
    instagram: "",
    whatsapp: "",
  },
  {
    nombre: "Cristina Montero",
    marca: "ABEIRO",
    lema: "Trabajamos todos los días desde el 2010 para que este sea tu lugar seguro",
    descripcion:
      "Porque las decisiones importantes merecen una conversación humana.",
    instagram: "@o.abeiro",
    whatsapp: "5573966005",
  },
  {
    nombre: "Noe Diego Flores Sánchez",
    marca: "Veycom agente de seguros",
    lema: "Siempre ayudando a mis asegurados a tener paz mental",
    descripcion:
      "28 años protegiendo lo más valioso que tiene una persona: su vida, su salud y su familia.",
    instagram: "",
    whatsapp: "5518390844",
  },
  {
    nombre: "Blanca Mendoza",
    marca: "Veycom",
    lema: "Enfocados en brindar el mejor servicio",
    descripcion:
      "Agente con más de 60 años de experiencia en seguros personales y de daños nos enfocamos en brindar el mejor servicio y sobre todo apoyar a los clientes cuando llega el momento de usar el seguro.",
    instagram: "",
    whatsapp: "",
    web: "https://www.veycom.com",
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

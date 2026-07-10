export type Archetype = "MEYAJ" | "NEPA" | "BALAM" | "KAN";

export type Question = {
  id: string;
  position: number;
  archetype: Archetype;
  text: string;
};

export const questions: Question[] = [
  {
    id: "q01",
    position: 1,
    archetype: "MEYAJ",
    text: "¿Sientes que eres la persona que siempre resuelve cuando otros no pueden?",
  },
  {
    id: "q02",
    position: 2,
    archetype: "KAN",
    text: "¿La gente suele buscarte cuando necesita consejo, ayuda o conexión?",
  },
  {
    id: "q03",
    position: 3,
    archetype: "NEPA",
    text: "¿Sientes que constantemente estás dividiéndote entre cuidar a otros y cuidarte a ti?",
  },
  {
    id: "q04",
    position: 4,
    archetype: "BALAM",
    text: "¿Te desespera trabajar con personas que no tienen tu nivel de compromiso?",
  },
  {
    id: "q05",
    position: 5,
    archetype: "NEPA",
    text: "¿A veces sientes que perdiste una parte de tu identidad en el camino?",
  },
  {
    id: "q06",
    position: 6,
    archetype: "MEYAJ",
    text: "¿Frecuentemente trabajas más de lo que se reconoce o recompensa?",
  },
  {
    id: "q07",
    position: 7,
    archetype: "BALAM",
    text: "¿Sientes que tu entorno actual limita tu crecimiento?",
  },
  {
    id: "q08",
    position: 8,
    archetype: "KAN",
    text: "¿Disfrutas construir relaciones y conocer personas nuevas?",
  },
  {
    id: "q09",
    position: 9,
    archetype: "BALAM",
    text: "¿Te incomoda la idea de que alguien más determine cuánto puedes ganar?",
  },
  {
    id: "q10",
    position: 10,
    archetype: "NEPA",
    text: "¿Te gustaría generar ingresos sin sacrificar tu presencia en casa o con tu familia?",
  },
  {
    id: "q11",
    position: 11,
    archetype: "KAN",
    text: "¿Sientes que tu red de contactos tiene mucho más potencial del que hoy aprovechas?",
  },
  {
    id: "q12",
    position: 12,
    archetype: "MEYAJ",
    text: "¿Te frustra sentir que tu esfuerzo está construyendo el sueño de alguien más?",
  },
  {
    id: "q13",
    position: 13,
    archetype: "KAN",
    text: "¿Se te da naturalmente generar confianza con otros?",
  },
  {
    id: "q14",
    position: 14,
    archetype: "BALAM",
    text: "¿Tienes una ambición grande que rara vez compartes con otros?",
  },
  {
    id: "q15",
    position: 15,
    archetype: "MEYAJ",
    text: "¿Tienes disciplina y constancia, pero sientes que podrías lograr mucho más?",
  },
  {
    id: "q16",
    position: 16,
    archetype: "NEPA",
    text: "¿Sueles priorizar a todos antes que a ti?",
  },
  {
    id: "q17",
    position: 17,
    archetype: "MEYAJ",
    text: "Si dependiera solo de ti, ¿confiarías en tu capacidad para sacar adelante un proyecto propio?",
  },
  {
    id: "q18",
    position: 18,
    archetype: "KAN",
    text: "¿Te motiva crear oportunidades donde otros solo ven conversaciones?",
  },
  {
    id: "q19",
    position: 19,
    archetype: "NEPA",
    text: "¿Sientes que todavía hay una versión tuya que no ha podido expresarse por completo?",
  },
  {
    id: "q20",
    position: 20,
    archetype: "BALAM",
    text: "¿Sientes que naciste para construir algo más grande?",
  },
];

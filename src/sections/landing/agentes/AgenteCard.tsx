import Image from "next/image";
import type { Agente } from "./data";

interface AgenteCardProps {
  agente: Agente;
}

export default function AgenteCard({ agente }: AgenteCardProps) {
  const circuloGrande = Boolean(agente.fotoCirculoClassName);
  const contentPadding = circuloGrande
    ? "px-5 pb-5 pt-[5.5rem] sm:px-6 sm:pb-6 sm:pt-[5.75rem]"
    : "px-5 pb-5 pt-[4.75rem] sm:px-6 sm:pb-6 sm:pt-[5rem]";
  const fotoFondo = agente.fotoFondo ?? "bg-xamani-navy-light/80";
  const fotoBorde = agente.fotoSinBorde
    ? "border-0"
    : "border border-xamani-cyan/30";
  const circuloClass =
    agente.fotoCirculoClassName ?? "h-12 w-12 sm:top-6 sm:left-6";

  return (
    <article className="glass-panel relative flex h-full w-full flex-col overflow-hidden rounded-card">
      <div
        className={`relative flex min-h-0 flex-1 flex-col overflow-hidden ${contentPadding}`}
      >
        <h3 className="font-ambit text-base leading-snug text-xamani-silver sm:text-lg">
          {agente.nombre}
        </h3>
        {agente.marca.trim() && (
          <p className="mt-1 font-archia text-[0.65rem] uppercase tracking-[0.22em] text-xamani-cyan sm:text-xs">
            {agente.marca}
          </p>
        )}

        <p className="mt-2 line-clamp-2 font-archia text-xs italic leading-relaxed text-xamani-silver/90 sm:text-sm">
          {agente.lema}
        </p>

        <div className="mt-2 min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-none [touch-action:pan-y]">
          <p className="whitespace-pre-line font-archia text-xs leading-relaxed text-xamani-silver-muted sm:text-sm">
            {agente.descripcion}
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className={`agente-card-photo pointer-events-none absolute top-5 left-5 z-10 overflow-hidden rounded-full ${fotoFondo} ${fotoBorde} ${circuloClass}`}
      >
        {agente.foto && (
          <Image
            src={agente.foto}
            alt=""
            fill
            sizes="96px"
            className={
              agente.fotoAjusteCirculo ??
              agente.fotoAjuste ??
              "object-cover object-center"
            }
            draggable={false}
          />
        )}
      </div>
    </article>
  );
}

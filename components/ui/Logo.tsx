import {
  MONOGRAM_CAPSULE as K,
  MONOGRAM_S_PATH,
  MONOGRAM_VIEWBOX,
} from "@/components/ui/monogram";

/**
 * Kurumsal logo: kapsül monogram + yazı.
 *
 * Monogram SVG olarak çizilir; her ekran yoğunluğunda net kalır. Renk
 * bulunduğu yerin metin rengini (currentColor) devralır: açık zeminde koyu,
 * koyu kahve footer'da ve fotoğraf üstünde açık görünür.
 */

const sizes = {
  sm: { mark: "h-9", title: "text-[12px]", sub: "text-[8px]", gap: "gap-3" },
  md: { mark: "h-12", title: "text-[15px]", sub: "text-[9px]", gap: "gap-3.5" },
  lg: { mark: "h-16", title: "text-xl", sub: "text-[11px]", gap: "gap-4" },
} as const;

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      className={`w-auto shrink-0 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x={K.x}
        y={K.y}
        width={K.width}
        height={K.height}
        rx={K.rx}
        fill="none"
        stroke="currentColor"
        /* Ölçekten bağımsız 1.2 px: küçük boyutta çerçeve kaybolmaz,
           büyük boyutta kalınlaşmaz. */
        strokeWidth={1.2}
        vectorEffect="non-scaling-stroke"
      />
      <path fill="currentColor" d={MONOGRAM_S_PATH} />
    </svg>
  );
}

export default function Logo({
  size = "md",
  variant = "full",
  className = "",
}: {
  size?: keyof typeof sizes;
  /** "mark": yalnızca monogram */
  variant?: "full" | "mark";
  className?: string;
}) {
  const s = sizes[size];

  if (variant === "mark") return <Monogram className={`${s.mark} ${className}`} />;

  return (
    <span className={`inline-flex items-center leading-none ${s.gap} ${className}`}>
      <Monogram className={s.mark} />
      <span className="flex flex-col">
        <span
          className={`font-sans font-normal uppercase whitespace-nowrap ${s.title}`}
          style={{ letterSpacing: "0.22em" }}
        >
          Seçkin Mimarlık
        </span>
        <span
          className={`font-sans font-light uppercase whitespace-nowrap opacity-75 mt-1.5 ${s.sub}`}
          style={{ letterSpacing: "0.26em" }}
        >
          Tasarım · Üretim · Montaj
        </span>
      </span>
    </span>
  );
}

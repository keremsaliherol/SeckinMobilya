/**
 * Kurumsal logo — tipografik.
 *
 * Görsel dosya yerine metin olarak kuruldu: her ekran yoğunluğunda net kalır,
 * bulunduğu yerin metin rengini (currentColor) devraldığı için hem koyu hem
 * açık zeminde çalışır ve ek bir görsel indirmesi gerektirmez.
 */

const sizes = {
  sm: { title: "text-[13px]", sub: "text-[7px]", gap: "mt-1" },
  md: { title: "text-lg", sub: "text-[9px]", gap: "mt-1.5" },
  lg: { title: "text-2xl", sub: "text-[11px]", gap: "mt-2" },
} as const;

export default function Logo({
  size = "md",
  className = "",
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];

  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-sans font-light uppercase whitespace-nowrap ${s.title}`}
        style={{ letterSpacing: "0.18em" }}
      >
        Seçkin Mimarlık
      </span>
      <span
        className={`font-sans font-light uppercase whitespace-nowrap opacity-80 ${s.sub} ${s.gap}`}
        style={{ letterSpacing: "0.3em" }}
      >
        Mobilya | İnşaat
      </span>
    </span>
  );
}

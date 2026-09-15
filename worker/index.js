/**
 * Cloudflare Worker — yalnızca `/video/*` istekleri buraya gelir
 * (wrangler.jsonc → assets.run_worker_first). Sitenin geri kalanı doğrudan
 * statik varlık olarak sunulur, bu kod çalışmaz.
 *
 * Neden var: Cloudflare'in statik varlık sunucusu bayt aralığı (Range)
 * isteklerine 206 dönmüyor, dosyanın tamamını 200 ile gönderiyor. iPhone
 * Safari MP4 oynatmak için 206 şart koşuyor; Instagram bandındaki telefon
 * videosu bu yüzden iPhone'da hiç oynamıyordu. Burada dosya varlıklardan
 * alınıp istenen aralık 206 ile gönderilir.
 */
const worker = {
  async fetch(istek, env) {
    const kaynak = await env.ASSETS.fetch(new Request(istek.url, { method: "GET" }));
    if (!kaynak.ok) return kaynak;

    const basliklar = new Headers(kaynak.headers);
    basliklar.set("Accept-Ranges", "bytes");
    basliklar.delete("Content-Encoding");

    const aralik = istek.headers.get("Range");
    if (istek.method === "HEAD") {
      return new Response(null, { status: 200, headers: basliklar });
    }
    if (!aralik) {
      return new Response(kaynak.body, { status: 200, headers: basliklar });
    }

    const govde = new Uint8Array(await kaynak.arrayBuffer());
    const boyut = govde.byteLength;
    const eslesme = /^bytes=(\d*)-(\d*)$/.exec(aralik.trim());
    if (!eslesme || (eslesme[1] === "" && eslesme[2] === "")) {
      return new Response(govde, { status: 200, headers: basliklar });
    }

    let bas;
    let son;
    if (eslesme[1] === "") {
      // "bytes=-500": son 500 bayt
      bas = Math.max(0, boyut - Number(eslesme[2]));
      son = boyut - 1;
    } else {
      bas = Number(eslesme[1]);
      son = eslesme[2] === "" ? boyut - 1 : Math.min(Number(eslesme[2]), boyut - 1);
    }
    if (bas >= boyut || bas > son) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${boyut}` } });
    }

    basliklar.set("Content-Range", `bytes ${bas}-${son}/${boyut}`);
    basliklar.set("Content-Length", String(son - bas + 1));
    return new Response(govde.slice(bas, son + 1), { status: 206, headers: basliklar });
  },
};

export default worker;

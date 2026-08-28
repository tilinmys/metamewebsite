const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "C:/Users/Tilin Bijoy/Downloads/";
const OUT = path.join(__dirname, "..", "public", "images");

// source -> output. Gemini watermark sits bottom-right (~y > 1410 on a 2752x1536 frame),
// so we drop the bottom ~9.4% before the quality resize.
const MAP = [
  ["metamefinal5.jpeg", "faq_portal_01.jpg"], // clinician's dossier notebook
  ["metamelast1.jpeg", "faq_portal_02.jpg"], // hand + tablet, glowing anatomy
  ["metame8.jpeg", "faq_portal_03.jpg"], // preventive health roadmap tablet
  ["metamefinal7.jpeg", "faq_portal_04.jpg"], // kiosk atrium
];

(async () => {
  for (const [src, out] of MAP) {
    const m = await sharp(SRC + src).metadata();
    const cropH = Math.round(m.height * 0.906);
    const buf = await sharp(SRC + src)
      .extract({ left: 0, top: 0, width: m.width, height: cropH })
      .resize({ width: 2400, withoutEnlargement: false, kernel: "lanczos3" })
      .sharpen({ sigma: 0.6 })
      .jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(path.join(OUT, out), buf);
    const nm = await sharp(buf).metadata();
    console.log(
      out.padEnd(20),
      nm.width + "x" + nm.height,
      ((buf.length / 1024) | 0) + "KB  (from " + src + ")",
    );
  }
})();

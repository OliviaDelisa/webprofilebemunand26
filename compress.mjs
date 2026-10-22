import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "public/images";
const OUT = "images-compressed";

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });

const gagal = [];
for (const f of walk(SRC)) {
  if (!/\.jpe?g$/i.test(f)) continue;
  const size = fs.statSync(f).size;
  if (size < 300 * 1024) continue;
  const out = path.join(OUT, path.relative(SRC, f));
  try {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    const buf = await sharp(fs.readFileSync(f))
      .rotate()
      .resize({ width: 1000, height: 1000, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(out, buf);
    console.log(f, Math.round(size / 1024) + "KB ->", Math.round(buf.length / 1024) + "KB");
  } catch (e) {
    gagal.push(f);
    console.log("GAGAL:", f, e.code || e.message);
  }
}
console.log("Selesai. Gagal:", gagal.length);
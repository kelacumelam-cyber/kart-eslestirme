import {mkdir,readFile,writeFile,copyFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {dirname,resolve} from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const htmlPath=resolve(root,"game-mobile-v1.html");
const jsPath=resolve(root,"src/level-core.js");
const levelsPath=resolve(root,"src/level-100.js");
const html=await readFile(htmlPath,"utf8");
const source='./src/level-core.js';
const levelsSource='./src/level-100.js';
if(!html.includes(source))throw new Error("Mobile game level-core dependency not found");
const offline=html.replaceAll(source,"./level-core.js").replaceAll(levelsSource,"./level-100.js");
if(!offline.includes('<script src="./level-core.js"></script>'))throw new Error("Offline core script not linked");
const dest=resolve(root,"www");
await mkdir(dest,{recursive:true});
await writeFile(resolve(dest,"index.html"),offline,"utf8");
await copyFile(jsPath,resolve(dest,"level-core.js"));
await copyFile(levelsPath,resolve(dest,"level-100.js"));
// Update the native Android launcher icon when a Capacitor Android project exists.
const androidRes=resolve(root,"android/app/src/main/res");
const launcher=resolve(root,"assets/android-launcher-fox.xml");
try{
 const {stat}=await import("node:fs/promises");
 if((await stat(androidRes)).isDirectory()){
  const drawable=resolve(androidRes,"drawable");const adaptive=resolve(androidRes,"mipmap-anydpi-v26");
  await mkdir(drawable,{recursive:true});await mkdir(adaptive,{recursive:true});
  await copyFile(launcher,resolve(drawable,"kart_fox_launcher.xml"));
  const adaptiveXml='<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@android:color/transparent"/><foreground android:drawable="@drawable/kart_fox_launcher"/></adaptive-icon>\n';
  await writeFile(resolve(adaptive,"ic_launcher.xml"),adaptiveXml);
  await writeFile(resolve(adaptive,"ic_launcher_round.xml"),adaptiveXml);
  console.log("Custom fox memory-card launcher prepared for Android adaptive icons");
 }
}catch(error){if(error.code!=="ENOENT")throw error}
console.log("Offline 100-level game prepared: www/index.html + both engine scripts");

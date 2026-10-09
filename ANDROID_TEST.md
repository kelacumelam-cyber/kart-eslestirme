# Yerel Android test APK

Bu kurulum, **100 bölümlük aile checkpoint sürümünü** (`game-100.html`) paketler. `src/level-core.js` ve `src/level-100.js` çevrimdışı dahil edilir. Ana `index.html` geri dönüş için korunur. Android Studio/SDK ve JDK gereklidir; internet yalnızca ilk npm/Gradle bağımlılık indirmelerinde gerekebilir.

Windows PowerShell, repo kökünde:

```powershell
npm.cmd install
npm.cmd run test:core
npm.cmd run android:init
npm.cmd run android:apk
```

**Android projesini daha önce kurduysan `android:init` çalıştırma.** Güncel dosyaları alıp `npm.cmd install`, `npm.cmd run test:core`, ardından `npm.cmd run android:apk` çalıştırman yeterli.

**Sonraki APK'lar:** HTML veya çekirdek güncellendiğinde `npm.cmd run android:apk` yeterli. Android projesi zaten oluşturulmuşsa `android:init` bir daha çalıştırılmaz.

APK: `dist/kart-eslestirme-test-debug.apk`

Android Studio ile kontrol etmek için `npm.cmd run android:open`; Studio'dan Build > Build APK(s) da kullanılabilir.

**Not:** Derleme şu ana kadar geliştiricinin yerel ortamında doğrulanmadı. Paketleme scripti dosya eksikliğinde durur; Gradle hatası varsa gerçek hata raporunu inceleriz. Android proje klasörü yerelde otomatik oluşturulur ve yanlışlıkla repoya gönderilmemesi için ignore edilir.

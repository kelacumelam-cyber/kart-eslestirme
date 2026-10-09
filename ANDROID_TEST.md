# Yerel Android test APK

Bu kurulum, **100 bölümlük mobil sürümü** (`game-mobile-v1.html`) paketler. `src/level-core.js` ve `src/level-100.js` çevrimdışı dahil edilir. Ana `index.html` geri dönüş için korunur. Android Studio/SDK ve JDK gereklidir; internet yalnızca ilk npm/Gradle bağımlılık indirmelerinde gerekebilir.

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

## Giriş, ayarlar ve kayıt

- Uygulama girişinde ayrı gece ormanı temalı **Hafıza Macerası** ekranı bulunur. **Oyuna Başla**, son açık bölümden devam eder.
- `kart_eslestirme_100_v1` kayıt anahtarı değiştirilmedi: ilerleme cihazda yerel kalır, mevcut kayıt korunur. `kart_eslestirme_100_v1_completed` 100. bölüm tamamlanmasını saklar. Uygulama verilerini temizlemek veya uygulamayı kaldırmak yerel kayıtları silebilir; bulut eşitleme yoktur.
- Ses ve hatalı eşleşme titreşimi ana ekrandaki **Ayarlar** sayfasından ayrı ayrı kapatılabilir. Ayarlar `kart_eslestirme_settings_v1` ile yerel saklanır. Web/Android cihaz titreşimi desteklemiyorsa etkisiz kalabilir.
- Yeni tilki-kart launcher ikonu APK hazırlığında `assets/android-launcher-fox.xml` kaynaklı Android adaptive icon olarak kurulur (Android 8+). Android proje klasörü oluşturulmuş olmalıdır. Yerel APK derlemesinde kontrol edilecek.
- Eski sürümün üstüne kurulum uygulama kimliği aynı kaldığı sürece yerel veriyi koruyabilir; telefonda sil-kur yapmak yerine üzerine kurmak tercih edilir.

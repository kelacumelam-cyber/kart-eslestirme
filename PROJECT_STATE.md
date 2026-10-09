# Proje durumu

Amaç: Dikey Android ekranına uygun, her bölümü farklı hissettiren, 100 bölümlük kart eşleştirme oyunu.

- Başlangıç sürümü ayrı commit olarak korundu: `6ade330da4910f5a72680496f600c68e724e715e`.
- A/S test kısayolları ve mobil viewport düzenlemesi ayrı commit: `071bab4b4aba5cb069b5c9347698326eb2a2de48`.
- Yerel JS syntax kontrolü geçti; tarayıcı ve gerçek cihaz oynanış testi henüz yapılmadı.
- Görsel/bölüm varyasyonu sonraki iterasyon. Günlük seri ve tekrar eden emoji kusurları takip edilecek.
- Mevcut APK yok; son paketleme Android portrait orientation lock gerektirir.
- Başlangıç ZIP dört dosyalı, GitHub'daki ilk sürüm ise tek HTML ile kolay test ediliyor.

## Planlanan — Açılış ve ana menü deneyimi (2026-10-09)

Kullanıcı ekran görüntüsüyle mevcut ana menünün oyun ekranı üzerinde bulanık arka planlı bir modal olarak açıldığını gösterdi. Bu, yalnızca duraklatma penceresi için uygun; **gerçek giriş/ana menü deneyimi için değil**.

Hedefler (henüz uygulanmadı):
- Uygulama açıldığında oyunun üstünde modal değil, **tam ekran, kendine ait teması ve görsel kimliği olan giriş sahnesi** gösterilsin.
- Gerçek yükleme/başlatma sırasında kısa bir **“Yükleniyor”** durumu gösterilsin; sahte bekleme süresi, gereksiz splash ekranı veya yanıltıcı ilerleme çubuğu olmasın.
- Açılış tamamlandığında ayrı **ana menü sahnesi** görünsün: Devam Et/Oyna, Bölümler, Günlük Görev, Ayarlar gibi az sayıda açık eylem.
- Oyun ekranı kartlara odaklansın; **duraklatma** oyun üzerinde modal/panel olarak kalabilir.
- Ana menüye dönüşte oyun durumu, süre ve kayıtlı ilerleme korunma/yeniden başlama semantiği açıkça tasarlansın.
- Mobil dikey ekran, farklı ekran yükseklikleri, okunabilirlik, dokunmatik erişilebilirlik ve düşük donanım maliyeti dikkate alınsın.
- Görsel kimlik tasarımı ayrı iterasyonda değerlendirilsin; ilk denemeden önce geri dönüş checkpoint'i korunsun.

Durum: **yalnız hedef kaydı; kod, UX akışı ve yayın değiştirilmedi**.

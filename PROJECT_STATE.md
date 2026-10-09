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

## Planlanan — 500+ bölüm, ilerleme sürekliliği ve benzersiz çiftler (2026-10-09)

Kullanıcının gözlemi: yüksek bölümlerde **aynı emoji bir bölümde birden fazla çift olarak** çıkabiliyor; tekrar hissi var. Temel kesin kural: **bir sembol bir bölümde yalnızca bir çifte karşılık gelir (tam iki kart)**. Kasıtlı benzer görünümlü farklı semboller ayrıca görsel ayırt edilebilirlik kontrolünden geçmeli.

### Öncelik 1: Doğruluk (kısa teknik düzeltme)
- Normal ve günlük destede seçmeden önce emoji havuzlarını tekilleştir; aynı emojiyi iki kez seçme.
- Eşleşme garantisi: 2*N kart, N benzersiz sembol, her sembolden tam 2 kart; yeterli sembol yoksa sessizce kırık deste üretme, yapılandırma testinde açık hata ver.
- Mevcut 100 bölümde bütün dünya/ızgara kapasitelerini otomatik denetle; gündelik deterministik seed sözleşmesi bozulmasın.
- Mevcut kayıtlar/yıldızlar bozulmasın.

### İlk 500 bölüm tasarım ilkeleri — henüz uygulanmadı
- 100→101 gibi kilometre taşlarında **yeniden 2 çiftle başlamama**: kazanılmış ustalık devam etmeli.
- Zorluk tek boyutlu kart sayısı artışı olmamalı; mobil dikey ekranda okunabilir maksimum yoğunluk korunmalı.
- Konfigürasyon temelli veri odaklı seviye üretici: `levelId`, `world`, `layout`, `challengeRules`, `rewardGoals`, `visualStyle`, `seed`, `difficultyBand` gibi sürümlenmiş alanlar; rastgeleliği kontrollü/deterministik tut.
- Yeni mekanikleri kontrollü tanıt; ardından farklı kombinasyonlarla ve küçük dinlenme duraklarıyla tekrar kullan. Sadece kozmetik farklılık yeni bölüm sayılmasın.
- Mekanik adayları: kısa ön izleme; hamle hedefleri; süreli özel görev; çiftleri stratejik bulma; kısıtlı ipucu; karma ve birleştirilmiş hedefler. Bazı varyasyonlar erişilebilirlik ve adillik testleriyle onaylanmalı.
- Her yeni dilimde ilerleme/zorluk monoton **aynı kart sayısı** anlamına gelmez; ustalık eğilimi artarken bilinçli tempo çeşitliliği olabilir.
- Çeşitlilik ölçümü: ardışık seviyelerde aynı `layout + challengeRules + objective` dizisinin uzun bloklar hâlinde yinelenmesini önleyen otomatik kontroller ve oynanış testleri.
- 100 veya 500 “nihai bitiş” olarak sabitlenmemeli: yeni dünya ve bölüm paketleri eklenebilir. Önce 500'lük katalog üretmek yerine üretici + doğrulayıcı altyapıyı kurup küçük grupta oyuncu kabul testi yap.
- Kullanıcı kaydı seviye kimliklerinden bağımsız olmayan geçiş/migrasyon planına sahip olsun; eskiden kazanılmış bölüm ilerlemesi korunmalı.
- 10 dünya sadece emoji değil, atmosfer ve sonraki aşamada mekanik kombinasyonu ile ayırt edilmeli.
- Sahte içerik hacmi yerine gerçekten ayırt edilebilir, eğlenceli 100+ bölüm hedefi; kapsamı test sonucuna göre artır.
- Açılış/ana menü tasarım hedefleri yukarıda; bu işten ayrı iterasyon.
Durum: **tasarım hedefleri kayıtlı; bu commit oyun kodunu değiştirmez**.

## Ürün kalite ilkesi — görsel tutarlılık ve gerçek bölüm benzersizliği (2026-10-09)

Kullanıcının kesin talebi: Emoji kütüphanesi belirgin biçimde büyüsün; ancak mevcut renkli Unicode emoji diliyle görsel uyum bozulmasın. **Bölüm sayısı kozmetik değişikliklerle şişirilmesin; oyuncu kandırılmasın.**

- Emoji kaynakları veri odaklı kategoriler/alt havuzlar olarak yönetilecek; dünyayla alakasız semboller sırf sayı artırmak için eklenmeyecek.
- Tek bölümde her sembol yalnız bir çifttir; görsel olarak birbirine aşırı benzeyen semboller için ayrı çakışma denetimi uygulanacak.
- Farklı Android/Windows emoji çizimleri ve font desteği gerçek cihazda kontrol edilecek. İleride görsel birliği için sahip olunan/lisanslı ikon seti araştırılabilir, ancak şimdilik mevcut estetik korunur.
- **İçerik çeşitliliği ile oynanış çeşitliliği ayrı ölçülecek.** Rastgele kart dağılımı, farklı emoji, renk, tema veya sırf ızgara değişimi tek başına benzersiz oynanış olarak sayılmayacak.
- Seviye tanımı; mekanik, hedef, karar tipi, öğrenilen beceri, oyuncuya uygulanan kısıt, zorluk/tempo ve sunum açısından değerlendirilecek.
- Ardışık bölümlerde eşdeğer oynanışları tespit eden otomatik benzerlik raporu istenecek. Tekrarlı bölümler geçerli bir öğretme/pekiştirme gerekçesi taşımıyorsa yeniden tasarlanacak.
- 500 sayısı içerik kotası değildir; gerçek çeşitlilik doğrulanmıyorsa daha az ama iyi bölüm yayımlamak tercih edilecek. Rastgele üretilen bölüm başına benzersizlik garantisi iddia edilmeyecek.
- Büyük kütüphane artışı ve mekanik genişleme küçük, geri alınabilir dilimlerle doğrulanacak. İlk iş benzersiz çift doğruluğu ve içerik doğrulayıcılarıdır.

Durum: **hedef kaydı; henüz emoji kataloğu, bölüm üreticisi veya oyun kodu değişmedi**.

## Bölüm laboratuvarı oyuncu geri bildirimi — 2026-10-09

İlk laboratuvar üçlüsü (klasik, ön izleme, şekilli tahta) kullanıcı tarafından 5/5 değerlendirildi. İkinci üçlü (hamle ustalığı, buz kırıcı, kart dalgaları) da kullanıcı tarafından beğenildi. **Altı bölüm karakteri ilk oyuncu kabulünden geçti; geniş ölçekli kalite/doğrulama kanıtı değildir.**

Karar:
- Yeni mekanik arayışına şimdilik ara ver.
- Bu altı arketipi korunacak adaylar olarak kabul et ve **kendi iç varyasyonlarını** tasarla (ön izleme süresi ve bilgi miktarı; şekilli tahtada güvenli boşluk düzenleri; hamle hedefi/adil yıldız ölçütü; buz yerleşimi/çözülme sırası; dalga sayısı/boyutu; klasik bölümde amaca uygun tempo).
- Sonraki aşamada bazı arketipleri birbirleriyle birleştirmeyi araştır; kombinasyonları yeni içerik saymadan önce gerçek oynanış farkı ve adillik testlerinden geçir.
- Rastgelelik ve emoji farklılığı tek başına benzersizlik değildir; bölüm içinde her emoji yalnızca bir çift oluşturur.
- Oyunun mevcut 100 bölümünü topluca değiştirme. Önce kural/konfigürasyon altyapısı ve küçük elle değerlendirilen bölüm grubu oluştur.
- Mobil dikey ekran, rahat dokunmatik alanlar, anlaşılır öğretim ve korunmuş ilerleme önemini koruyor.
- Deneyler: `experiments/level-feel.html`, `experiments/level-feel-v2.html`.
- İkinci laboratuvar için kullanıcı sayısal puan vermedi; yalnız üç karakteri de beğendiğini bildirdi.

Durum: **geri bildirim ve karar kaydı; bu commit oyun koduna dokunmaz.**

## Animasyon ve oyun hissi hedefi (2026-10-09)

Kullanıcı, laboratuvar prototiplerinde orijinal oyundaki animasyonların eksik olduğunu belirtti. Orijinaldeki 3D kart çevirme, doğru eşleşme parlaması, yanlış eşleşme sarsılması, konfeti, ses ve titreşim temeli korunacak ve iyileştirilecek.

- Animasyonlar oyun durumunu açıkça anlatmalı; dokunuşa hızlı tepki vermeli.
- Doğru çiftte kısa eşzamanlı vurgu ve yaylanma; yanlış çiftte kısa sarsılma ve kapanma; komboda ölçülü tepki.
- Buz için çözülme/çatlama; yeni kart dalgasında sıralı giriş; ön izlemede geri sayım ve toplu kapanma; bitişte akıcı yıldız/kutlama.
- Eski Android cihazlarda performans, transform/opacity ağırlıklı efektler, az parçacık ve hareket azaltma tercihi (prefers-reduced-motion).
- Animasyon sırasında hızlı çift tıklama, gecikmiş zamanlayıcıların yeni bölümü etkilemesi ve eşleşme durumu gibi hataları test et.
- Gerçek animasyon sürümü ayrı, geri alınabilir commit ve telefon testiyle değerlendirilecek.

Durum: yalnız hedef kaydı, oyun kodu değiştirilmedi.

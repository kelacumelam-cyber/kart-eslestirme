# Bölüm Karakteri Araştırması — R1 (2026-10-09)

## Amaç
Kart eşleştirme oyunu için, ilk 100 bölümden 500+ bölüme ilerlerken aynı görünümlü ve aynı davranışlı seviyeleri çoğaltmadan mekanik çeşitlilik üretmek. **Henüz uygulama kararı veya test başarısı değildir.**

## İncelenen örnekler ve kaynaklar
- **Lumosity Memory Matrix** — kısa süre görünür olan kare konumlarını hatırlama; başarısına göre sonraki görev zorluğunu düzenleme. https://help.lumosity.com/hc/en-us/articles/12819233072919-Memory-Matrix
- **Lumosity Tidal Treasures** — yeni eklenen ve görsel olarak benzeyen nesneleri takip etme/ayırt etme. https://www.lumosity.com/en/brain-games/tidal-treasures/
- **Two Dots** — bölüm başına farklı hedefler, engeller ve hamle bütçesi; buz, geçit gibi sistemler. https://dots.helpshift.com/hc/en/3-two-dots/faq/368-how-do-i-play-two-dots/ ve https://www.twodots-game.com/tutorials
- **Royal Match** — kısa, net bölüm hedefi; sınırlı hamle ve öğe etkileşimleri. https://dreamgames.helpshift.com/hc/en/3-royal-match/faq/4-how-can-i-play-the-levels/
- **Memory Match: Card Pairs** — 3D kart çevirme, kombo ve hamle verimliliği. https://play.google.com/store/apps/details?id=com.muwumgames.memorymatch
- **Link Match: Memory Puzzle** — delikli şekilli tahtalar, taş, buz, sis, zincir, bomba; aynı sembolü eşleme veya ilişkili sembolleri eşleme modları. https://play.google.com/store/apps/details?id=com.Link.Match
- **Memory Match (Opira Solution)** — sekiz tematik dünya, ilerleme haritası, güçlendirmeler; fakat tek başına tema farklılığı oynanış yeniliği garantisi değildir. https://play.google.com/store/apps/details?id=com.opirasolution.memorymatch

Not: Kaynaklar oyunların resmi yardım/sunum metinleri ve mağaza açıklamalarıdır. Oyunların tamamı gerçek cihazda oynanıp test edilmedi.

## Mekanik adaylarının değerlendirmesi
| Aday | Bölüm karakteri katkısı | Mobil/erişilebilirlik riski | İlk deney kararı |
|---|---|---|---|
| Ön izleme hafızası | Yüksek: gör-gizle-hatırla döngüsü | Süre adil olmalı | **Pilot A** |
| Delikli/şekilli tahta | Orta: mekânsal harita değişir | Kartlara dokunma alanı küçülmesin | **Pilot B** |
| Bölüm hedefi ve hamle bütçesi | Yüksek: oyun planını değiştirir | Rastgele kötü deste nedeniyle haksızlık | **Pilot C** |
| Etkileşimli engel (buz gibi) | Yüksek: sıra/strateji değişimi | Aşırı karmaşıklık, eğitim ihtiyacı | **Pilot D**, sonra |
| Kartların aşamalı gelmesi | Yüksek: çalışan hafıza ve tempo | Kaybolan bilginin adilliği | **Pilot E**, sonra |
| Kartlar arasında benzerlik | Orta: ayırt etme becerisi | Emoji fontları ve görme erişilebilirliği | Şimdilik beklet |
| İlişkisel çiftler (anahtar-kilit) | Çok yüksek ama temel eşleme sözleşmesini değiştirir | Tek emoji = tam çift kuralıyla çatışabilir | Ana moda ekleme; ayrı mod araştırması |
| Kombo/skor çarpanları | Düşük-orta: hedefi etkileyebilir | Tek başına yeni oyun değil | Destek mekanizması |
| Dünya rengi/kart arkası | Görsel ritim sağlar | Yalnız kozmetik | Benzersiz bölüm olarak sayma |
| Süre baskısı | Tempo farkı sağlar | Erişilebilirlik/gerilim | Opsiyonel veya açıklamalı özel seviye |

## Tasarım ilkeleri
1. Bir seviyede N sembolün her biri **tam iki kart**, hiçbir sembol iki çift değildir. Aynı emoji farklı bölümlerde serbestçe yeniden kullanılabilir.
2. 500 seviyeye genişlerken her 100 bölüm sonunda 2 çifte dönülmez; uzmanlık geliştirilir. Dikey mobil ekranda okunabilir kart boyutu korunur.
3. Yeni öğeyi önce tek başına öğret, sonradan açıklanmış öğelerle birleştir; bölüm sayısı kota değildir.
4. Her bölümde yalnız farklı emoji dizisi, dünya paleti veya kart dizilimi **yeni oynanış** sayılmaz.
5. Seviye tarifi veri tabanlı ve testlenebilir olmalı: kimlik, tahta hücreleri, sembol havuzu, hedef, kural modülleri, kısıtlar, zorluk bandı, seed.
6. Bölüm sıralamasında aynı `kural kombinasyonu + hedef + yerleşim karakteri` tekrarına benzerlik cezası verilerek tasarımcı uyarılır.
7. Otomatik benzerlik puanı oyuncu algısının kanıtı değildir: gerçek telefon oynanış geri bildirimi esastır.
8. Yanlışlıkla çok karmaşık hâle gelen veya adil olmayan seviyeler otomatik testlerle ayıklanmalıdır.
9. Mekanikler hafif tek sayfa JavaScript altyapısında denenebilir; ilk aşamada ağır oyun motoru gerekmez.

## Önerilen deney sırası — kod değişikliği yok
0. Mevcut emoji/çift hatasını düzelt ve seviye invariant testleri kur.
1. **Üç küçük karşılaştırmalı prototip**: normal temel seviye; kısa ön izleme; şekilli tahta; sonra hedef/hamle kısıtı.
2. Her prototipi ilk bölüm tekrar hissi, anlaşılırlık, dokunma rahatlığı ve keyif açısından ayrı değerlendir.
3. İyi adayları kural modülleri olarak tasarla; 10-20 bölümlük *elle gözden geçirilmiş* örnek dizi üret.
4. Mekaniklerin öğrenme sırası ve benzerlik testleri oturduktan sonra 500+ bölüm üreticisine geç.

## Bilinmeyenler
- Kullanıcıların gerçekten hangi mekaniği daha eğlenceli bulacağı ölçülmedi.
- Küçük telefonlarda delikli tahta yerleşimleri ve emoji boyutları test edilmedi.
- Çok zor seviye üretmeden sürdürülmesi mümkün kombinasyon sayısı henüz doğrulanmadı.

Durum: **Araştırma ve öneri kayıtları; uygulama yok.**

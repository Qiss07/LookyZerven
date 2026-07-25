import { Layout } from "@/components/Layout";
import { Lock, Eye, Upload, MessageSquare, KeyRound, Download, Image, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const encodeSteps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload Gambar",
    description:
      "Pilih gambar PNG atau JPG dari perangkat Anda. Gambar ini akan menjadi wadah untuk menyembunyikan pesan rahasia Anda. Semakin besar resolusi gambar, semakin banyak teks yang bisa disembunyikan.",
  },
  {
    icon: MessageSquare,
    step: "2",
    title: "Tulis Pesan Rahasia",
    description:
      "Ketik pesan yang ingin Anda sembunyikan di dalam gambar. Pesan bisa berupa teks biasa, kode, atau informasi sensitif apa pun.",
  },
  {
    icon: KeyRound,
    step: "3",
    title: "Tambahkan Password (Opsional)",
    description:
      "Untuk keamanan ekstra, masukkan password. Pesan Anda akan dienkripsi dengan AES sebelum disembunyikan, sehingga hanya orang yang tahu password yang bisa membacanya.",
  },
  {
    icon: Download,
    step: "4",
    title: "Download Stego-Image",
    description:
      'Klik "Encode Message" lalu download gambar hasilnya. Gambar ini terlihat sama persis dengan aslinya, tetapi sudah berisi pesan rahasia Anda di dalamnya.',
  },
];

const decodeSteps = [
  {
    icon: Image,
    step: "1",
    title: "Upload Stego-Image",
    description:
      "Upload gambar yang sudah berisi pesan tersembunyi (stego-image). Pastikan gambar dalam format PNG agar data tidak rusak.",
  },
  {
    icon: KeyRound,
    step: "2",
    title: "Masukkan Password (Jika Ada)",
    description:
      "Jika pesan dienkripsi saat encoding, masukkan password yang sama. Tanpa password yang benar, pesan terenkripsi tidak bisa dibaca.",
  },
  {
    icon: Search,
    step: "3",
    title: "Reveal Pesan",
    description:
      'Klik "Reveal Message" dan pesan tersembunyi akan ditampilkan. Anda bisa langsung menyalin pesan ke clipboard.',
  },
];

const tips = [
  "Selalu simpan stego-image dalam format PNG. Kompresi JPG akan merusak data tersembunyi.",
  "Gunakan gambar beresolusi tinggi agar bisa menyimpan pesan yang lebih panjang.",
  "Jangan lupa password yang Anda gunakan saat encoding — tidak ada cara untuk memulihkannya.",
  "Semua proses dilakukan di browser Anda. Data tidak pernah dikirim ke server mana pun.",
  "Gambar hasil encoding terlihat identik dengan aslinya — tidak ada perbedaan yang terlihat.",
];

const TutorialPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-1 mb-10">
          <h1 className="text-2xl font-bold">Panduan Penggunaan</h1>
          <p className="text-sm text-muted-foreground">
            Pelajari cara menyembunyikan dan mengekstrak pesan rahasia dari gambar menggunakan Looky.
          </p>
        </div>

        {/* Encode Guide */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Cara Encode (Sembunyikan Pesan)</h2>
              <p className="text-xs text-muted-foreground">Menyisipkan pesan rahasia ke dalam gambar</p>
            </div>
          </div>

          <div className="space-y-3">
            {encodeSteps.map((item, i) => (
              <div
                key={item.step}
                className="glass-card rounded-xl p-5 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link to="/encode">
                Coba Encode <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Decode Guide */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Cara Decode (Baca Pesan)</h2>
              <p className="text-xs text-muted-foreground">Mengekstrak pesan tersembunyi dari stego-image</p>
            </div>
          </div>

          <div className="space-y-3">
            {decodeSteps.map((item, i) => (
              <div
                key={item.step}
                className="glass-card rounded-xl p-5 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link to="/decode">
                Coba Decode <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-lg font-semibold mb-4">💡 Tips Penting</h2>
          <div className="rounded-xl bg-muted/50 p-6 space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TutorialPage;

import { Layout } from "@/components/Layout";
import { Shield, Binary, Eye, Lock } from "lucide-react";

const steps = [
  {
    icon: Binary,
    title: "Gambar digital terbuat dari piksel",
    body: "Setiap piksel menyimpan nilai warna (Merah, Hijau, Biru) sebagai angka 0–255. Perubahan kecil pada bit terakhir — misalnya dari 200 ke 201 — tidak terlihat oleh mata manusia.",
  },
  {
    icon: Eye,
    title: "Steganografi LSB menyembunyikan data di bit tersebut",
    body: "Kami mengganti bit terakhir dari setiap channel warna dengan satu bit pesan rahasia. Karena setiap piksel punya 3 channel, gambar 1000×1000 bisa menyimpan sekitar 375 KB teks tersembunyi.",
  },
  {
    icon: Lock,
    title: "Enkripsi AES opsional menambah lapisan keamanan",
    body: "Sebelum disisipkan, kami bisa mengenkripsi pesan dengan password menggunakan algoritma AES. Bahkan jika seseorang mengekstrak datanya, mereka tidak bisa membacanya tanpa kunci.",
  },
  {
    icon: Shield,
    title: "Data Anda tetap privat",
    body: "Semua pemrosesan terjadi di browser Anda menggunakan JavaScript. Tidak ada gambar atau pesan yang dikirim ke server. Tutup tab dan data hilang.",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="space-y-1 mb-10">
          <h1 className="text-2xl font-bold">Cara Kerja</h1>
          <p className="text-sm text-muted-foreground">
            Penjelasan singkat tentang teknik steganografi yang digunakan di Looky.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.title} className="glass-card rounded-xl p-6 space-y-3 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-sm">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-muted/50 p-6 space-y-2">
          <h3 className="font-semibold text-sm">Keterbatasan</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Kompresi JPG menghancurkan data tersembunyi — selalu download sebagai PNG.</li>
            <li>Pesan sangat pendek di gambar sangat kecil mungkin bisa terdeteksi oleh analisis statistik.</li>
            <li>Alat ini untuk penggunaan edukasi dan pribadi. Bukan pengganti enkripsi profesional.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

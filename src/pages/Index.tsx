import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Shield, Lock, Eye, ArrowRight, Zap, Globe, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Steganografi LSB",
    description: "Sembunyikan pesan di bit paling rendah dari piksel gambar — sepenuhnya tidak terlihat oleh mata manusia.",
  },
  {
    icon: KeyRound,
    title: "Enkripsi AES",
    description: "Opsional enkripsi pesan Anda dengan password sebelum disisipkan untuk keamanan berlapis.",
  },
  {
    icon: Zap,
    title: "Proses di Browser",
    description: "Semua pemrosesan terjadi di browser Anda. Tidak ada data yang dikirim ke server mana pun.",
  },
  {
    icon: Globe,
    title: "Format Universal",
    description: "Mendukung gambar PNG dan JPG. Download stego-image Anda dalam format PNG lossless.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Lock className="h-3.5 w-3.5" />
            100% Privasi di Sisi Klien
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Sembunyikan Pesan di
            <span className="gradient-text"> Depan Mata</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Sisipkan teks rahasia ke dalam gambar menggunakan steganografi.
            Tidak ada yang tahu gambar Anda menyimpan pesan tersembunyi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/encode">
                <Lock className="mr-2 h-4 w-4" />
                Encode Pesan
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/decode">
                <Eye className="mr-2 h-4 w-4" />
                Decode Pesan
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 space-y-3 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-accent">
                <feature.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-xl mx-auto text-center glass-card rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-semibold">Siap mencoba?</h2>
          <p className="text-sm text-muted-foreground">
            Mulai dengan menyisipkan pesan rahasia ke gambar apa pun. Gratis, privat, dan instan.
          </p>
          <Button asChild className="rounded-full">
            <Link to="/encode">
              Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

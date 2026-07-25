import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { loadImageData, encodeMessage, imageDataToBlob } from "@/lib/steganography";
import { encryptMessage } from "@/lib/encryption";
import { Download, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const EncodePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const handleEncode = async () => {
    if (!file) return toast.error("Silakan pilih gambar terlebih dahulu.");
    if (!message.trim()) return toast.error("Silakan masukkan pesan.");

    setLoading(true);
    setResultUrl(null);

    try {
      const { imageData } = await loadImageData(file);

      let finalMessage = message;
      if (password) {
        finalMessage = encryptMessage(message, password);
      }

      const encoded = encodeMessage(imageData, finalMessage);
      const blob = await imageDataToBlob(encoded);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      toast.success("Pesan berhasil disembunyikan!");
    } catch (err: any) {
      toast.error(err.message || "Encoding gagal.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "stego-image.png";
    a.click();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-bold">Encode Pesan</h1>
          <p className="text-sm text-muted-foreground">
            Sembunyikan pesan rahasia di dalam gambar menggunakan steganografi LSB.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>1. Pilih Gambar</Label>
            <ImageDropzone file={file} onFileSelect={setFile} onClear={() => { setFile(null); setResultUrl(null); }} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">2. Masukkan Pesan Rahasia</Label>
            <Textarea
              id="message"
              placeholder="Ketik pesan rahasia Anda di sini..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {message && (
              <p className="text-xs text-muted-foreground">{message.length} karakter</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">3. Password (Opsional)</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password untuk enkripsi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Jika diisi, pesan akan dienkripsi AES sebelum disisipkan.
            </p>
          </div>

          <Button
            onClick={handleEncode}
            disabled={loading || !file || !message.trim()}
            className="w-full rounded-full"
            size="lg"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</>
            ) : (
              "Encode Pesan"
            )}
          </Button>

          {resultUrl && (
            <div className="glass-card rounded-xl p-5 space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-sm font-medium text-success">
                <div className="h-2 w-2 rounded-full bg-success" />
                Pesan berhasil disembunyikan
              </div>
              <img src={resultUrl} alt="Hasil stego" className="rounded-lg w-full max-h-64 object-contain bg-muted/30" />
              <Button onClick={handleDownload} variant="outline" className="w-full rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Download Stego-Image
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EncodePage;

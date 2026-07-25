import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ImageDropzone } from "@/components/ImageDropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadImageData, decodeMessage } from "@/lib/steganography";
import { decryptMessage, isEncrypted } from "@/lib/encryption";
import { Eye, Lock, Loader2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const DecodePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleDecode = async () => {
    if (!file) return toast.error("Silakan pilih gambar terlebih dahulu.");

    setLoading(true);
    setRevealed(null);

    try {
      const { imageData } = await loadImageData(file);
      let message = decodeMessage(imageData);

      if (isEncrypted(message)) {
        if (!password) {
          toast.error("Pesan ini terenkripsi. Silakan masukkan password.");
          setLoading(false);
          return;
        }
        message = decryptMessage(message, password);
      }

      setRevealed(message);
      toast.success("Pesan tersembunyi berhasil ditemukan!");
    } catch (err: any) {
      toast.error(err.message || "Decoding gagal.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!revealed) return;
    await navigator.clipboard.writeText(revealed);
    setCopied(true);
    toast.success("Disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl font-bold">Decode Pesan</h1>
          <p className="text-sm text-muted-foreground">
            Ekstrak pesan tersembunyi dari stego-image.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>1. Upload Stego-Image</Label>
            <ImageDropzone file={file} onFileSelect={setFile} onClear={() => { setFile(null); setRevealed(null); }} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">2. Password (jika terenkripsi)</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password dekripsi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button
            onClick={handleDecode}
            disabled={loading || !file}
            className="w-full rounded-full"
            size="lg"
          >
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</>
            ) : (
              <><Eye className="mr-2 h-4 w-4" /> Tampilkan Pesan</>
            )}
          </Button>

          {revealed && (
            <div className="glass-card rounded-xl p-5 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-success flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  Pesan Tersembunyi Ditemukan
                </span>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-3">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                {revealed}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DecodePage;

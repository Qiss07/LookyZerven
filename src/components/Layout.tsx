import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>LookyZerven — Steganografi sisi klien. Data Anda tidak pernah meninggalkan browser.</p>
      </footer>
    </div>
  );
}

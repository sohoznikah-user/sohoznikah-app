import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function BiodatasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mt-16 mx-auto flex flex-col">
        <div className="text-3xl text-black">Biodatas Page</div>
      </main>

      <Footer />
    </div>
  );
}

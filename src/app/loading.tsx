import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#FFEFF5] to-[#E4F1FF]">
      <Loader2 className="animate-spin text-[#E25A6F]" size={64} />
    </div>
  );
}

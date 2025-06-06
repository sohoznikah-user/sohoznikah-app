// src/app/(main)/biodatas/page.tsx

import BiodataPage from "./listPageComponentes/BiodataPage";

export default function BiodatasPage() {
  return (
    <div className="container mx-auto px-4 pb-14">
      <div className="mt-12 text-3xl text-center text-black mb-4 font-semibold">
        বায়োডাটা সমূহ
      </div>
      <BiodataPage />
    </div>
  );
}

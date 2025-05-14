// src/app/(main)/biodatas/page.tsx

import BiodataPage from "./listPageComponentes/BiodataPage";

export default function BiodatasPage() {
  return (
    <>
      <div className="mt-12 text-3xl text-center text-black mb-4 ">
        বায়োডাটা সমূহ
      </div>
      <BiodataPage />
    </>
  );
}

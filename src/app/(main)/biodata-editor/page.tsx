// File: src/app/(main)/biodata-editor/page.tsx
import { Metadata } from "next";
import BiodataEditor from "./BiodataEditor";

interface BiodataEditorPageProps {
  searchParams: Promise<{ biodataId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your biodata",
};

export default async function BiodataEditorPage({
  searchParams,
}: BiodataEditorPageProps) {
  const { biodataId } = await searchParams;

  //TO:DO get userId from token

  const biodataToEdit = biodataId
    ? null // get from db
    : null;

  return (
    <main className="flex-grow min-h-screen bg-[#f1f1f1]">
      <div className="text-[#1f4f69] flex flex-col items-center justify-center mt-4 mb-12">
        <BiodataEditor biodataToEdit={biodataToEdit} />
      </div>
    </main>
  );
}

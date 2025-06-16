// File: src/app/(main)/biodata-editor/page.tsx
import { Metadata } from "next";
import BiodataEditorByAdmin from "./BiodataEditorByAdmin";

interface BiodataEditorPageProps {
  searchParams: Promise<{ biodataId?: string }>;
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Design your biodata",
};

export default async function BiodataEditorPage({
  searchParams,
  params,
}: BiodataEditorPageProps) {
  const { biodataId } = await searchParams;
  const { id } = await params;

  //TO:DO get userId from token

  const biodataToEdit = biodataId
    ? null // get from db
    : null;

  return (
    <main className="flex-grow">
      <div className="text-[#1f4f69] flex flex-col items-center justify-center mt-4 mb-12">
        <BiodataEditorByAdmin biodataToEdit={biodataToEdit} id={id} />
      </div>
    </main>
  );
}

// File: src/app/(main)/dashboard/biodata/[id]/page.tsx

import BiodataClient from "@/app/(main)/biodatas/[biodataId]/BiodataClient";

export default async function BiodataPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BiodataClient biodataId={id} myBiodata={false} isAdmin={true} />;
}

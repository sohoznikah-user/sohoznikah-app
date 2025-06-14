// File: src/app/(main)/dashboard/biodata/[id]/page.tsx

import AdminBiodataClient from "./AdminBiodataClient";

export default async function BiodataPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdminBiodataClient biodataId={id} />;
}

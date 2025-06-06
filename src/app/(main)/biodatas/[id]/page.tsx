// File: src/app/(main)/biodatas/[id]/page.tsx

import BiodataClient from "./BiodataClient";

export default async function BiodataPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BiodataClient biodataId={id} myBiodata={false} />;
  // return <div>BiodataPage</div>;
}

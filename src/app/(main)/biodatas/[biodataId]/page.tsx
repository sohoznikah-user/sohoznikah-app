// File: src/app/(main)/biodatas/[id]/page.tsx

import BiodataClient from "./BiodataClient";

export default async function BiodataPage({
  params,
}: {
  params: Promise<{ biodataId: string }>;
}) {
  // Ensure we have a valid string ID
  const biodataId = (await params).biodataId;

  if (!biodataId || typeof biodataId !== "string") {
    return <div>Invalid Biodata ID</div>;
  } else {
    return <BiodataClient biodataId={biodataId} />;
  }
}

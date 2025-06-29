// File: src/app/(main)/biodatas/[id]/page.tsx

import PrivateBiodataClient from "./PrivateBiodataClient";

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
    return <PrivateBiodataClient biodataId={biodataId} />;
  }
}

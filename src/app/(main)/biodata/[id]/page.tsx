import EditBiodata from "./EditBiodata";
import ViewBiodata from "./ViewBiodata";

export default function BiodataPage() {
  const own = false;
  return (
    <>
      {own && <EditBiodata />}
      {!own && <ViewBiodata />}
    </>
  );
}

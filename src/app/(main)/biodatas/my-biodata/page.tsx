// File: src/app/(main)/biodatas/my-biodata/page.tsx

import BiodataClient from "../[id]/BiodataClient";

const MyBiodata = () => {
  return (
    <div>
      <BiodataClient myBiodata={true} />
    </div>
  );
};

export default MyBiodata;

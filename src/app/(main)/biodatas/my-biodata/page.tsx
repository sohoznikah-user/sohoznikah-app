// File: src/app/(main)/biodatas/my-biodata/page.tsx

import BiodataClient from "../[biodataId]/BiodataClient2";

const MyBiodata = () => {
  return (
    <div>
      <BiodataClient myBiodata={true} />
    </div>
  );
};

export default MyBiodata;

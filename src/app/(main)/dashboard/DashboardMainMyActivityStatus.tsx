export default function DashboardMainMyActivityStatus() {
  return (
    <div className="w-96 bg-[#f2f4fc] p-8 flex flex-col space-y-4 rounded-xl">
      <div className="text-2xl text-[#005381] text-center mb-8">
        আপনার বায়োডাটা সর্বমোট
      </div>
      <div className="flex justify-between">
        <div>ভিউ হয়েছে</div>
        <div className="w-6 text-center">১২</div>
      </div>
      <div className="flex justify-between">
        <div>পছন্দের তালিকায় রেখেছে</div>
        <div className="w-6 text-center">৮</div>
      </div>
      <div className="flex justify-between">
        <div>শর্টলিস্টে রেখেছে</div>
        <div className="w-6 text-center">৫</div>
      </div>
      <div className="flex justify-between">
        <div>প্রাথমিক প্রস্তাব এসেছে</div>
        <div className="w-6 text-center">১২</div>
      </div>
      <div className="flex justify-between">
        <div>যোগাযোগ তথ্য নিয়েছে</div>
        <div className="w-6 text-center">৩</div>
      </div>
      <div className="flex justify-between">
        <div>রিপোর্ট এসেছে</div>
        <div className="w-6 text-center">৩</div>
      </div>
    </div>
  );
}

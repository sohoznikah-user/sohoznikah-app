// File: src/app/(main)/dashboard/DashboardMainNotifications.tsx

export default function DashboardMainNotifications() {
  const notiication = [
    {
      id: 1,
      description: "নোটিফিকেশন 1",
    },
    {
      id: 2,
      description: "নোটিফিকেশন 2",
    },
  ];

  return (
    <div className="bg-[#f2f4fc] p-8 flex flex-col space-y-4 rounded-xl text-black">
      <div className="text-[#005381] text-center text-2xl mb-4">নোটিফিকেশন</div>
      {notiication &&
        notiication.map((x) => (
          <div key={x.id} className="bg-[#e8e8ed] mx-8 p-2 rounded-md text-sm">
            {x.description}
          </div>
        ))}
    </div>
  );
}

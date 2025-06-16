"use client";

import { useRouter } from "next/navigation";
import { ReusableModal, ReusableModalProps } from "./ReusableModal";

const NeedLoginModal = ({ open, onClose, loading }: ReusableModalProps) => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="ফিচারটি ব্যবহার করতে চাইলে লগইন করতে হবে।"
      description="এই ফিচারটি ব্যবহার করতে চাইলে আপনাকে লগইন করতে হবে। লগইন করার পর আপনি এই ফিচারটি ব্যবহার করতে পারবেন।"
      onConfirm={handleLogin}
      loading={loading}
      confirmText="লগইন করুন"
      cancelText="বাতিল"
    />
  );
};

export default NeedLoginModal;

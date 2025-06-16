"use client";

import { ReusableModal } from "./ReusableModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
  itemName?: string;
  description?: string;
}

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onDelete,
  loading,
  itemName,
  description,
}: Props) => {
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="ডিলিট করার সিদ্ধান্ত নিন"
      description={
        description
          ? description
          : `আপনি কি ${itemName || "এই তথ্যটি"} ডিলেট করতে চান?`
      }
      onConfirm={onDelete}
      loading={loading}
      confirmText="ডিলিট করুন"
      cancelText="বাতিল"
    />
  );
};

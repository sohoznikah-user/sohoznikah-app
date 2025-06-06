"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export interface ReusableModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  hideFooter?: boolean;
  hideCancelButton?: boolean;
  hideButtons?: boolean;
}

export const ReusableModal = ({
  open,
  onClose,
  title,
  description,
  onConfirm,
  loading = false,
  confirmText = "ওকে",
  cancelText = "বাতিল",
  children,
  hideFooter = false,
  hideCancelButton = false,
  hideButtons = false,
}: ReusableModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className=" text-black bg-[#F5F4FC]  overflow-y-auto">
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription className="text-md text-gray-600 my-3">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {children && <div className="p-2">{children}</div>}

        {!hideFooter && (
          <DialogFooter>
            {!hideButtons && (
              <>
                {!hideCancelButton && (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="text-white border-gray-300 text-md"
                  >
                    {cancelText}
                  </Button>
                )}
                <Button
                  onClick={onConfirm}
                  disabled={loading}
                  className="bg-red-600 text-white hover:bg-red-700 text-md"
                >
                  {loading ? "প্রসেসিং..." : confirmText}
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { useEffect } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "default";
  icon?: React.ReactNode;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  icon,
}: ConfirmationModalProps) {
  // ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Compact, clean modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] bg-card border border-border rounded-3xl p-6 shadow-xl z-10 text-center"
          >
            {/* Minimal Icon */}
            <div
              className={`w-11 h-11 rounded-full mx-auto flex items-center justify-center mb-3 ${
                variant === "danger"
                  ? "bg-destructive/10 text-destructive"
                  : "bg-brand-sand text-brand-orange-dark"
              }`}
            >
              {icon ||
                (variant === "danger" ? (
                  <Trash2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                ))}
            </div>

            {/* Title */}
            <h3
              id="modal-title"
              className="text-base font-bold text-card-foreground tracking-tight"
            >
              {title}
            </h3>

            {/* Description */}
            <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-normal">
              {description}
            </div>

            {/* Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 w-full">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-10 rounded-full border-border text-xs font-semibold hover:bg-muted cursor-pointer"
              >
                {cancelText}
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`h-10 rounded-full text-xs font-semibold cursor-pointer shadow-xs ${
                  variant === "danger"
                    ? "bg-destructive hover:bg-destructive/90"
                    : "bg-brand-green hover:bg-brand-green-hover text-white"
                }`}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


import { useEffect, useId, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  color?: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, subtitle, color = "var(--ink)", children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="detail-dialog" aria-labelledby={titleId}
      style={{ "--phase-color": color } as CSSProperties}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.target === event.currentTarget && (
          event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom
        )) onClose();
      }}>
      <div className="detail-toolbar">
        <span className="detail-phase">{subtitle}</span>
        <button type="button" className="detail-close" autoFocus onClick={onClose} aria-label="Fechar modal">
          Fechar <span aria-hidden="true">×</span>
        </button>
      </div>
      <article className="detail-article">
        <h2 id={titleId}>{title}</h2>
        {children}
      </article>
    </dialog>
  );
}

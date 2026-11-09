import { useState } from "react";
import type { Phase, Step } from "../types";
import { Icon } from "../../../components/Icon";
import { Modal } from "../../../components/Modal";
import { StepContent } from "./StepContent";

export function StepCard({ step, phase, showIcon = true }: { step: Step; phase: Phase; showIcon?: boolean }) {
  const [open, setOpen] = useState(false);

  return <>
    <button type="button" className="node" aria-haspopup="dialog" onClick={() => setOpen(true)}>
      {showIcon && <Icon name={step.icon} />}
      <span>{step.label}</span>
      <span className="node-detail-hint" aria-hidden="true">+</span>
    </button>
    <Modal open={open} onClose={() => setOpen(false)} title={step.label} subtitle={phase.title} color={`var(--fase-${phase.color})`}>
      <StepContent step={step} />
    </Modal>
  </>;
}

import type { Phase, Step } from "../types";
import { Icon } from "../../../components/Icon";
import { StepCard } from "./StepCard";

export function StepGroup({ step, phase }: { step: Step; phase: Phase }) {
  return <div className="subgroup">
    <div className="subgroup-head"><Icon name={step.icon} />{step.label}</div>
    <div className="subgroup-children">
      {step.children?.map((child, i) => <StepCard key={i} step={child} phase={phase} showIcon={false} />)}
    </div>
  </div>;
}


import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { RoadmapNode } from "../types";
import { NODES } from "../content/loadContent";

const STORAGE_KEY = "syn4tdf-roadmap:v1";

export interface ProgressData {
  version: 1;
  done: Record<string, boolean>;
  checks: Record<string, number[]>;
  lastVisited?: string;
  startedAt: string;
}

const empty = (): ProgressData => ({
  version: 1,
  done: {},
  checks: {},
  startedAt: new Date().toISOString(),
});

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1) return empty();
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

function save(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* navegador sem storage (aba anônima, bloqueio): o progresso só vale nesta sessão */
  }
}

/** O nó conta para a barra de progresso? (todo mundo segue a trilha completa; só os opcionais ficam de fora) */
export function isRequired(node: RoadmapNode) {
  return !node.optional;
}

/** Contagem de uma fase: obrigatórias concluídas (ou todas, se a fase só tem opcionais). */
export function phaseProgress(
  nodes: RoadmapNode[],
  data: Pick<ProgressData, "done">,
) {
  const required = nodes.filter((n) => isRequired(n));
  const base = required.length ? required : nodes;
  const done = base.filter((n) => data.done[n.id]).length;
  return {
    done,
    total: base.length,
    optionalOnly: required.length === 0,
    complete: base.length > 0 && done === base.length,
  };
}

interface ProgressApi {
  data: ProgressData;
  isDone: (id: string) => boolean;
  setDone: (id: string, value: boolean) => void;
  toggleCheck: (node: RoadmapNode, index: number) => void;
  visit: (id: string) => void;
  reset: () => void;
  importData: (json: string) => boolean;
  exportData: () => string;
  stats: { done: number; total: number };
  nextPending: () => RoadmapNode | undefined;
}

const Ctx = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressData>(load);

  useEffect(() => save(data), [data]);

  // mantém abas abertas em sincronia
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setData(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isDone = useCallback((id: string) => !!data.done[id], [data.done]);

  const setDone = useCallback((id: string, value: boolean) => {
    setData((d) => {
      const node = NODES.find((n) => n.id === id);
      const checks = { ...d.checks };
      if (node && node.checklist.length) {
        checks[id] = value ? node.checklist.map((_, i) => i) : [];
      }
      return { ...d, checks, done: { ...d.done, [id]: value } };
    });
  }, []);

  const toggleCheck = useCallback((node: RoadmapNode, index: number) => {
    setData((d) => {
      const current = new Set(d.checks[node.id] ?? []);
      if (current.has(index)) current.delete(index);
      else current.add(index);
      const list = [...current].sort((a, b) => a - b);
      const allChecked = node.checklist.length > 0 && list.length === node.checklist.length;
      return {
        ...d,
        checks: { ...d.checks, [node.id]: list },
        done: { ...d.done, [node.id]: allChecked },
      };
    });
  }, []);

  const visit = useCallback(
    (id: string) => setData((d) => (d.lastVisited === id ? d : { ...d, lastVisited: id })),
    [],
  );
  const reset = useCallback(() => setData(empty()), []);
  const exportData = useCallback(() => JSON.stringify(data, null, 2), [data]);
  const importData = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed?.version !== 1 || typeof parsed.done !== "object") return false;
      setData({ ...empty(), ...parsed });
      return true;
    } catch {
      return false;
    }
  }, []);

  const stats = useMemo(() => {
    const required = NODES.filter((n) => isRequired(n));
    return { total: required.length, done: required.filter((n) => data.done[n.id]).length };
  }, [data]);

  const nextPending = useCallback(
    () => NODES.find((n) => isRequired(n) && !data.done[n.id]),
    [data],
  );

  const api: ProgressApi = {
    data, isDone, setDone, toggleCheck, visit, reset,
    importData, exportData, stats, nextPending,
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress fora do ProgressProvider");
  return ctx;
}

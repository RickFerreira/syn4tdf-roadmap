import { useRef, useState } from "react";
import { useProgress } from "../state/progress";

export default function Footer() {
  const { exportData, importData, reset } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");

  const doExport = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "progresso-trilha-syn4tdf.json";
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Arquivo de progresso baixado.");
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ok = importData(await file.text());
    setMsg(ok ? "Progresso importado." : "Arquivo inválido.");
    e.target.value = "";
  };

  const doReset = () => {
    if (window.confirm("Apagar todo o progresso salvo neste navegador?")) {
      reset();
      setMsg("Progresso zerado.");
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
      <div className="footer-tools">
        <span>Seu progresso fica só neste navegador.</span>
        <button className="btn ghost small" onClick={doExport}>Exportar progresso</button>
        <button className="btn ghost small" onClick={() => fileRef.current?.click()}>Importar</button>
        <button className="btn ghost small danger" onClick={doReset}>Zerar</button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={onFile} />
        {msg && <span className="footer-msg" role="status">{msg}</span>}
      </div>
      <p>
        <strong>Synchro4TDF</strong> · Laboratório IDE.IA (IFPB) · LSI (UFCG). Trilha mantida pelo
        time; os links apontam para a wiki do labgit, o Notion e a Alura. Viu algo desatualizado?
        Edite o arquivo do nó no repositório e abra um PR.
      </p>
      <p className="footer-copy">Synchro Soluções Fiscais</p>
      </div>
    </footer>
  );
}

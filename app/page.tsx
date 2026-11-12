"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = { id: string; name: string; slug: string; description: string | null };
type Report = {
  id: string;
  report_number: number;
  title: string;
  status: string;
  priority: string;
  created_at: string;
  projects: { name: string; slug: string } | null;
};

const statusLabel: Record<string, string> = {
  Open: "Offen",
  "In progress": "In Bearbeitung",
  Resolved: "Gelöst",
  Closed: "Geschlossen",
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    let active = true;
    async function load() {
      if (!supabase) {
        setError("Die Datenbank ist noch nicht verbunden. Hinterlege die Supabase-Umgebungsvariablen in Vercel.");
        setLoading(false);
        return;
      }
      const [projectResult, reportResult] = await Promise.all([
        supabase.from("projects").select("id,name,slug,description").order("name"),
        supabase.from("reports").select("id,report_number,title,status,priority,created_at,projects(name,slug)").order("created_at", { ascending: false }).limit(100),
      ]);
      if (!active) return;
      if (projectResult.error) setError("Projekte konnten nicht geladen werden: " + projectResult.error.message);
      else setProjects(projectResult.data ?? []);
      if (reportResult.error) {
        setError("Meldungen sind noch nicht lesbar. Richte zuerst Login und Workspace-Berechtigungen ein, damit private Bug-Reports geschützt bleiben.");
      } else {
        setReports((reportResult.data ?? []) as unknown as Report[]);
      }
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => reports.filter((report) => {
    const matchesStatus = status === "all" || report.status === status;
    const matchesQuery = (report.title + " " + report.report_number + " " + (report.projects?.name ?? "")).toLowerCase().includes(query.toLowerCase());
    return matchesStatus && matchesQuery;
  }), [reports, status, query]);

  return (
    <div className="app-shell jira-shell">
      <aside className="sidebar jira-sidebar">
        <a className="brand" href="/"><span className="brand-mark">B</span><span>bughunt</span></a>
        <div className="workspace-label">WORKSPACE</div>
        <a className="nav-link active" href="/"> <span className="nav-icon">▦</span> Übersicht</a>
        <a className="nav-link" href="#meldungen"><span className="nav-icon">☷</span> Meldungen</a>
        <a className="nav-link" href="#projekte"><span className="nav-icon">◫</span> Projekte</a>
        <div className="sidebar-bottom"><div className="sidebar-hint">BugHunt Workspace</div></div>
      </aside>

      <main className="main jira-main">
        <header className="jira-header">
          <div><div className="eyebrow">WORKSPACE</div><h1 className="page-title">Übersicht</h1></div>
          <div className="top-actions">
            <input className="search" aria-label="Meldungen suchen" placeholder="Suchen…" value={query} onChange={(event) => setQuery(event.target.value)} />
            <a className="button-primary" href={projects[0] ? `/projects/${projects[0].slug}/report` : "#projekte"}>＋ Bug melden</a>
          </div>
        </header>

        {error && <div className="notice" role="status">{error}</div>}

        <section className="jira-section" id="meldungen">
          <div className="section-heading">
            <div><h2>Meldungen</h2><p>{reports.length} Meldungen in diesem Workspace</p></div>
          </div>
          <div className="filter-row jira-filters">
            {[["all", "Alle"], ["Open", "Offen"], ["In progress", "In Bearbeitung"], ["Resolved", "Gelöst"]].map(([value, label]) =>
              <button key={value} className={`filter-chip ${status === value ? "selected" : ""}`} onClick={() => setStatus(value)}>{label}</button>
            )}
          </div>
          <div className="jira-table-wrap">
            <table className="bug-table jira-table">
              <thead><tr><th>Zusammenfassung</th><th>Projekt</th><th>Status</th><th>Erstellt</th></tr></thead>
              <tbody>
                {filtered.map((report) => (
                  <tr key={report.id}>
                    <td><div className="bug-id">BUG-{String(report.report_number).padStart(3, "0")}</div><div className="bug-name">{report.title}</div></td>
                    <td>{report.projects?.name ?? "–"}</td>
                    <td><span className={`status ${report.status === "Resolved" || report.status === "Closed" ? "resolved" : report.status === "In progress" ? "progress" : "open"}`}>{statusLabel[report.status] ?? report.status}</span></td>
                    <td>{new Date(report.created_at).toLocaleDateString("de-CH")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && filtered.length === 0 && <div className="empty-state"><div className="empty-icon">☷</div><strong>{reports.length === 0 ? "Noch keine Meldungen" : "Keine Treffer"}</strong><p>{reports.length === 0 ? "Sobald jemand einen Fehler meldet, erscheint er hier." : "Passe deine Suche oder den Statusfilter an."}</p></div>}
            {loading && <div className="empty-state">Daten werden geladen…</div>}
          </div>
        </section>

        <section className="jira-section projects-section" id="projekte">
          <div className="section-heading"><div><h2>Projekte</h2><p>Projekte in deinem Workspace</p></div></div>
          {projects.length > 0 ? <div className="jira-project-list">{projects.map((project) => <a className="jira-project" href={`/projects/${project.slug}/report`} key={project.id}><span className="project-avatar">{project.name.slice(0, 1).toUpperCase()}</span><span><strong>{project.name}</strong><small>{project.description || project.slug}</small></span><span className="project-arrow">→</span></a>)}</div> : !loading && <div className="project-empty">Noch keine Projekte angelegt.</div>}
        </section>
      </main>
    </div>
  );
}

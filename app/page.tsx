import { query, singleton } from "#contentrain";
import { DashboardShell } from "./dashboard-shell";

export default function HomePage() {
  const overview = singleton("dashboard-overview").locale("en").get();
  const tenants = query("tenant-profile").locale("en").all();
  const notices = query("ops-notice").locale("en").all();

  return (
    <DashboardShell
      activePath="/"
      kicker={overview.eyebrow ?? "White-label portal"}
      title={overview.title}
      description={overview.summary}
    >
      <section className="hero-banner surface">
        <div>
          <span className="pill">{overview.environment_badge}</span>
          <p className="muted">{overview.status_note}</p>
        </div>
        <a href={overview.primary_cta_href ?? "/tenants"} className="button">
          {overview.primary_cta_label ?? "Review tenants"}
        </a>
      </section>

      <div className="content-grid">
        <section className="section-block">
          <h2>Seeded tenants</h2>
          <div className="tenant-grid">
            {tenants.map((tenant) => (
              <article key={tenant.slug} className="surface tenant-card">
                <img src={tenant.logo_mark} alt={tenant.name} className="tenant-logo" />
                <div className="queue-head">
                  <h3>{tenant.name}</h3>
                  {tenant.theme_badge ? <span className="pill">{tenant.theme_badge}</span> : null}
                </div>
                <p className="muted">{tenant.summary}</p>
                <div className="meta-row muted">
                  <span>{tenant.industry}</span>
                  <span>{tenant.available_locales?.join(", ")}</span>
                </div>
                <a href={`/tenants/${tenant.slug}`} className="text-link">
                  Open tenant profile
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <h2>Operator notices</h2>
          <div className="stack">
            {notices.map((notice) => (
              <article key={notice.id} className="surface notice-card">
                <div className="queue-head">
                  <h3>{notice.title}</h3>
                  <span className={`pill tone-${notice.tone ?? "info"}`}>{notice.tone}</span>
                </div>
                <p className="muted">{notice.body}</p>
                {notice.cta_href ? (
                  <a href={notice.cta_href} className="text-link">
                    {notice.cta_label ?? "Open"}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

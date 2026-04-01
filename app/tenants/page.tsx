import { query } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function TenantsPage() {
  const tenants = query("tenant-profile").locale("en").all();

  return (
    <DashboardShell
      activePath="/tenants"
      kicker="Tenants"
      title="Each tenant can carry a different vocabulary and locale set."
      description="This route makes tenant-specific portal rules visible instead of burying them inside conditional components."
    >
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
              <span>{tenant.support_email}</span>
            </div>
            <a href={`/tenants/${tenant.slug}`} className="text-link">
              Open profile
            </a>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}

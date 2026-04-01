import { query } from "#contentrain";
import { DashboardShell } from "../../dashboard-shell";

export function generateStaticParams() {
  return query("tenant-profile")
    .locale("en")
    .all()
    .map((tenant) => ({ slug: tenant.slug }));
}

export default async function TenantProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenant = query("tenant-profile").locale("en").where("slug", slug).first();

  if (!tenant) {
    return null;
  }

  return (
    <DashboardShell
      activePath="/tenants"
      kicker={tenant.theme_badge ?? "Tenant"}
      title={tenant.name}
      description={tenant.summary}
    >
      <section className="hero-banner surface tenant-hero">
        <img src={tenant.logo_mark} alt={tenant.name} className="tenant-logo tenant-logo-large" />
        <div className="stack">
          <div className="meta-row muted">
            <span>{tenant.industry}</span>
            <span>{tenant.accent_label}</span>
          </div>
          <div className="meta-row muted">
            <span>{tenant.support_email}</span>
            <span>{tenant.available_locales?.join(", ")}</span>
          </div>
          {tenant.docs_href ? (
            <a href={tenant.docs_href} className="button ghost">
              Open support docs
            </a>
          ) : null}
        </div>
      </section>

      <section className="section-block">
        <h2>Portal terminology</h2>
        <div className="term-grid">
          {tenant.terminology?.map((term) => (
            <article key={term.label} className="surface settings-card">
              <strong>{term.label}</strong>
              <span className="muted">{term.value}</span>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

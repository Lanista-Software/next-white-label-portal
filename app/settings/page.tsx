import { dictionary, query } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function SettingsPage() {
  const groups = query("settings-group").locale("en").all();
  const copy = dictionary("ui-copy").locale("en");

  return (
    <DashboardShell
      activePath="/settings"
      kicker="Settings"
      title="Locale and brand governance should be visible product content."
      description="White-label systems fail when terminology changes hide in conditionals. This route keeps locale policy and brand rules explicit."
    >
      <section className="section-block">
        <h2>Governance focus</h2>
        <div className="surface settings-card">
          <div className="setting-row">
            <strong>{copy.get("surface.tenantsLabel") ?? "Tenants"}</strong>
            <span>{query("tenant-profile").locale("en").all().length}</span>
          </div>
          <div className="setting-row">
            <strong>{copy.get("surface.localeLabel") ?? "Available locales"}</strong>
            <span>en, de, es, fr, tr</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>Settings matrix</h2>
        <div className="stack">
          {groups.map((group) => (
            <article key={group.id} className="surface settings-card">
              <h3>{group.title}</h3>
              <p className="muted">{group.summary}</p>
              <div className="setting-items">
                {group.items?.map((item) => (
                  <div key={item.label} className="setting-row">
                    <div>
                      <strong>{item.label}</strong>
                      <p className="muted">{item.hint}</p>
                    </div>
                    <div className="setting-value">
                      <span>{item.value}</span>
                      {item.status ? <span className="pill">{item.status}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

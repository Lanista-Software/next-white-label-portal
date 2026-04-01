import { query } from "#contentrain";
import { DashboardShell } from "../dashboard-shell";

export default function BillingPage() {
  const plans = query("billing-plan").locale("en").all();

  return (
    <DashboardShell
      activePath="/billing"
      kicker="Billing"
      title="Portal billing plans are also a copy-governance problem."
      description="White-label products need plan naming, customer-facing upgrade copy, and support language to vary safely without branching into chaos."
    >
      <section className="section-block">
        <h2>Plan matrix</h2>
        <div className="stat-grid">
          {plans.map((plan) => (
            <article key={plan.id} className={`surface plan-card ${plan.featured ? "featured" : ""}`}>
              <div className="queue-head">
                <h3>{plan.name}</h3>
                {plan.status_badge ? <span className="pill">{plan.status_badge}</span> : null}
              </div>
              <div className="price-block">
                <strong>{plan.price_label}</strong>
                <span className="muted">{plan.cadence}</span>
              </div>
              <ul className="bullet-list">
                {plan.features?.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              {plan.cta_href ? (
                <a href={plan.cta_href} className="button">
                  {plan.cta_label ?? "Open"}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

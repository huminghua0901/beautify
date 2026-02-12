import { config } from "@/lib/config";

export function ReportView({ partial, full, unlocked }: { partial: string; full: string; unlocked: boolean }) {
  const canView = config.commercialMode || unlocked;
  return (
    <div className="card">
      <h3>Report</h3>
      <pre>{partial}</pre>
      {!canView ? (
        <div>
          <p>🔒 Full report locked.</p>
          <a href="#pay">Go to payment</a>
        </div>
      ) : (
        <pre>{full}</pre>
      )}
    </div>
  );
}

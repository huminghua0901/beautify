export type Report = {
  id: string;
  unlocked: boolean;
  partial: string;
  full: string;
};

const db = new Map<string, Report>();

export function saveReport(report: Report) {
  db.set(report.id, report);
}

export function getReport(id: string) {
  return db.get(id);
}

export function unlockReport(id: string) {
  const report = db.get(id);
  if (!report) return;
  report.unlocked = true;
  db.set(id, report);
}

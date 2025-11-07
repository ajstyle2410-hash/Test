// src/app/features/dashboard/components/DashboardCard.tsx
interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <div className={`card shadow-sm border-0 text-center bg-${color}-subtle`}>
      <div className="card-body">
        <i className={`bi ${icon} display-5 text-${color}`}></i>
        <h5 className="fw-semibold mt-3">{title}</h5>
        <h3 className="fw-bold text-dark">{value}</h3>
      </div>
    </div>
  );
}

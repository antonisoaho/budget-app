import React from "react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  children,
  icon,
}) => {
  return <div className=""></div>;
};

export default DashboardCard;

export interface BizCardProps {
  id: string;
  tag: string;
  name: string;
  nameEn: string;
  desc: string;
  specs: string[];
  accentColor: string;
}

export interface Metric {
  id: string;
  label: string;
  target: number;
  decimals: number;
  suffix: string;
  unit: string;
  barWidth: number;
}
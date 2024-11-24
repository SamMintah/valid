import {
  CheckCircle,
  Clock,
  Database,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const metrics = [
  {
    title: 'Total Validations',
    value: '12,345',
    change: '+12%',
    icon: CheckCircle,
  },
  {
    title: 'Failed Validations',
    value: '234',
    change: '-5%',
    icon: XCircle,
  },
  {
    title: 'Pending Validations',
    value: '45',
    change: '+2%',
    icon: Clock,
  },
  {
    title: 'Processed Data',
    value: '1.2TB',
    change: '+8%',
    icon: Database,
  },
];

export default function MetricsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
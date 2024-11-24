import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', success: 40, failure: 24 },
  { name: 'Tue', success: 30, failure: 13 },
  { name: 'Wed', success: 20, failure: 8 },
  { name: 'Thu', success: 27, failure: 12 },
  { name: 'Fri', success: 18, failure: 5 },
  { name: 'Sat', success: 23, failure: 9 },
  { name: 'Sun', success: 34, failure: 16 },
];

export default function ValidationChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Validation Performance</CardTitle>
        <CardDescription>
          Success and failure rates over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tick={{ fill: 'currentColor' }}
                stroke="currentColor"
                tickLine={{ stroke: 'currentColor' }}
              />
              <YAxis
                tick={{ fill: 'currentColor' }}
                stroke="currentColor"
                tickLine={{ stroke: 'currentColor' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Line
                type="monotone"
                dataKey="success"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="failure"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
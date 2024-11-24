import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ModelStatus() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Model Status</CardTitle>
          <Badge>v2.1.0</Badge>
        </div>
        <CardDescription>Current model performance and training</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div>Training Progress</div>
            <div>78%</div>
          </div>
          <Progress value={78} />
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Recent Updates</h4>
          <div className="space-y-2">
            {[
              'Added new validation rules for email formats',
              'Improved accuracy for date validation',
              'Enhanced phone number pattern recognition',
            ].map((update, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-lg border p-3 text-sm"
              >
                {update}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
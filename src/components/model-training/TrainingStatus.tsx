import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pause, Square } from 'lucide-react';

export default function TrainingStatus() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Training Session</CardTitle>
              <CardDescription>Model version 2.1.0</CardDescription>
            </div>
            <Badge variant="secondary">In Progress</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Training Progress</span>
              <span>67%</span>
            </div>
            <Progress value={67} />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Accuracy</p>
              <p className="text-2xl font-bold">94.8%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Training Data Size</p>
              <p className="text-2xl font-bold">1.2M</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Time Remaining</p>
              <p className="text-2xl font-bold">2h 15m</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="icon">
              <Pause className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Square className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Training Sessions</CardTitle>
          <CardDescription>History of model training attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                version: '2.0.0',
                date: '2024-03-08',
                accuracy: '93.5%',
                status: 'Completed',
              },
              {
                version: '1.9.0',
                date: '2024-03-01',
                accuracy: '92.8%',
                status: 'Completed',
              },
            ].map((session) => (
              <div
                key={session.version}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">Version {session.version}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.date}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">Accuracy: {session.accuracy}</p>
                  <Badge variant="secondary">{session.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
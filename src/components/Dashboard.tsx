import { ScrollArea } from '@/components/ui/scroll-area';
import MetricsSection from '@/components/dashboard/MetricsSection';
import ValidationChart from '@/components/dashboard/ValidationChart';
import ValidationTable from '@/components/dashboard/ValidationTable';
import ModelStatus from '@/components/dashboard/ModelStatus';

export default function Dashboard() {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-8">
        <MetricsSection />
        <div className="grid gap-8 md:grid-cols-2">
          <ValidationChart />
          <ModelStatus />
        </div>
        <ValidationTable />
      </div>
    </ScrollArea>
  );
}
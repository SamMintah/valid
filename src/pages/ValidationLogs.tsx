import LogsTable from '@/components/validation-logs/LogsTable';

export default function ValidationLogs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Validation Logs</h1>
        <p className="text-muted-foreground">
          View and analyze the history of data validation operations
        </p>
      </div>
      <LogsTable />
    </div>
  );
}
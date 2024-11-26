import RulesTable from '@/components/validation-rules/RulesTable';

export default function ValidationRules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Validation Rules</h1>
        <p className="text-muted-foreground">
          Manage and configure data validation rules for your AI model
        </p>
      </div>
      <RulesTable />
    </div>
  );
}
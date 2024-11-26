import TrainingStatus from '@/components/model-training/TrainingStatus';

export default function ModelTraining() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Model Training</h1>
        <p className="text-muted-foreground">
          Monitor and manage your AI model training sessions
        </p>
      </div>
      <TrainingStatus />
    </div>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const sections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using the AI Data Validation Tool',
    content: 'Welcome to the AI Data Validation Tool documentation...',
  },
  {
    title: 'Validation Rules',
    description: 'Understanding and creating validation rules',
    content: 'Learn how to create and manage validation rules...',
  },
  {
    title: 'API Documentation',
    description: 'Integrate with our REST API',
    content: 'Explore our API endpoints and integration options...',
  },
  {
    title: 'Model Training',
    description: 'Guide to training the AI model',
    content: 'Understand how to train and optimize the AI model...',
  },
];

export default function Documentation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documentation</h1>
        <p className="text-muted-foreground">
          Comprehensive guides and documentation for the AI Data Validation Tool
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
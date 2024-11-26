import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Database, Link, FileJson, CheckCircle2 } from 'lucide-react';

const formSchema = z.object({
  sourceType: z.enum(['api', 'database', 'file']),
  apiUrl: z.string().url().optional(),
  apiHeaders: z.string().optional(),
  dbHost: z.string().optional(),
  dbPort: z.string().optional(),
  dbName: z.string().optional(),
  dbUsername: z.string().optional(),
  dbPassword: z.string().optional(),
});

export default function DataSourceSettings() {
  const [isValidating, setIsValidating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceType: 'api',
      apiUrl: '',
      apiHeaders: '{\n  "Authorization": "Bearer token"\n}',
      dbHost: 'localhost',
      dbPort: '5432',
      dbName: '',
      dbUsername: '',
      dbPassword: '',
    },
  });

  const sourceType = form.watch('sourceType');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsValidating(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Data source configuration saved successfully');
    } catch (error) {
      toast.error('Failed to save data source configuration');
    } finally {
      setIsValidating(false);
    }
  };

  const validateConnection = async () => {
    try {
      setIsValidating(true);
      // Simulate connection test
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Connection validated successfully');
    } catch (error) {
      toast.error('Connection validation failed');
    } finally {
      setIsValidating(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate file upload
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success('File uploaded successfully');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Source Configuration</CardTitle>
            <CardDescription>
              Configure your data source for validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="sourceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data source type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="api">
                        <div className="flex items-center">
                          <Link className="mr-2 h-4 w-4" />
                          REST API
                        </div>
                      </SelectItem>
                      <SelectItem value="database">
                        <div className="flex items-center">
                          <Database className="mr-2 h-4 w-4" />
                          Database
                        </div>
                      </SelectItem>
                      <SelectItem value="file">
                        <div className="flex items-center">
                          <FileJson className="mr-2 h-4 w-4" />
                          File Upload
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {sourceType === 'api' && (
              <>
                <FormField
                  control={form.control}
                  name="apiUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://api.example.com" />
                      </FormControl>
                      <FormDescription>
                        The endpoint URL for your data source
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apiHeaders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headers (JSON)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="font-mono"
                          rows={4}
                        />
                      </FormControl>
                      <FormDescription>
                        Request headers in JSON format
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {sourceType === 'database' && (
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dbHost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Host</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dbPort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Port</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dbName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Database Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dbUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dbPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {sourceType === 'file' && (
              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv,.json"
                      onChange={handleFileUpload}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload CSV or JSON files for validation
                  </FormDescription>
                </FormItem>
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Upload Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-2">
              <Button type="submit" disabled={isValidating}>
                Save Configuration
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={validateConnection}
                disabled={isValidating}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
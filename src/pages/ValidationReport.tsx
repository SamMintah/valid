import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FileJson, FileText, Search } from 'lucide-react';

const metrics = [
  {
    title: 'Total Errors',
    value: '1,234',
    change: '+2.5%',
  },
  {
    title: 'AI Suggestions',
    value: '856',
    change: '+12%',
  },
  {
    title: 'Approved',
    value: '645',
    change: '+8%',
  },
  {
    title: 'Rejected',
    value: '211',
    change: '-5%',
  },
];

const records = [
  {
    id: '1',
    field: 'email',
    value: 'john.doe@gmial.com',
    issueType: 'Typo',
    suggestion: 'john.doe@gmail.com',
    status: 'pending',
  },
  {
    id: '2',
    field: 'phone',
    value: '+1234567890',
    issueType: 'Format',
    suggestion: '+1 (234) 567-890',
    status: 'approved',
  },
  {
    id: '3',
    field: 'date',
    value: '2024-13-45',
    issueType: 'Invalid',
    suggestion: '2024-03-15',
    status: 'rejected',
  },
];

export default function ValidationReport() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const downloadReport = (format: 'csv' | 'json') => {
    // Implementation for downloading report
    console.log(`Downloading ${format} report`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Validation Report</h1>
        <p className="text-muted-foreground">
          Overview of data validation results and corrections
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>Flagged Records</CardTitle>
          <CardDescription>
            Review and manage flagged data records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => downloadReport('csv')}
              >
                <FileText className="mr-2 h-4 w-4" />
                CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => downloadReport('json')}
              >
                <FileJson className="mr-2 h-4 w-4" />
                JSON
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Suggestion</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.field}
                    </TableCell>
                    <TableCell>{record.value}</TableCell>
                    <TableCell>{record.issueType}</TableCell>
                    <TableCell>{record.suggestion}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === 'approved'
                            ? 'default'
                            : record.status === 'rejected'
                            ? 'destructive'
                            : 'secondary'
                        }
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
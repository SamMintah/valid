import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';

const initialLogs = [
  {
    id: '1',
    ruleName: 'Email Validation',
    sample: 'user@example.com',
    status: 'success',
    timestamp: '2024-03-10 14:30:00',
  },
  {
    id: '2',
    ruleName: 'Phone Number Format',
    sample: '+1234567890',
    status: 'error',
    timestamp: '2024-03-10 14:28:00',
  },
  {
    id: '3',
    ruleName: 'Date Format',
    sample: '2024-03-10',
    status: 'success',
    timestamp: '2024-03-10 14:25:00',
  },
];

export default function LogsTable() {
  const [logs] = useState(initialLogs);
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-[200px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Sample Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.ruleName}</TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1">
                    {log.sample}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={log.status === 'success' ? 'default' : 'destructive'}
                  >
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
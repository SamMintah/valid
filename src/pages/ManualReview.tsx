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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Check, X } from 'lucide-react';

interface Record {
  id: string;
  field: string;
  value: string;
  issueType: string;
  suggestion: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

const initialRecords: Record[] = [
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
    status: 'pending',
  },
];

export default function ManualReview() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState('');

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRecords(
      records.map((record) =>
        record.id === id
          ? { ...record, status: action === 'approve' ? 'approved' : 'rejected' }
          : record
      )
    );
  };

  const openNotes = (record: Record) => {
    setSelectedRecord(record);
    setNotes(record.notes || '');
    setIsNotesOpen(true);
  };

  const saveNotes = () => {
    if (selectedRecord) {
      setRecords(
        records.map((record) =>
          record.id === selectedRecord.id
            ? { ...record, notes }
            : record
        )
      );
      setIsNotesOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manual Review</h1>
        <p className="text-muted-foreground">
          Review and approve AI-suggested corrections
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flagged Records</CardTitle>
          <CardDescription>
            Review and manage flagged data records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Issue Type</TableHead>
                  <TableHead>Suggested Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
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
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction(record.id, 'approve')}
                          disabled={record.status !== 'pending'}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction(record.id, 'reject')}
                          disabled={record.status !== 'pending'}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => openNotes(record)}
                        >
                          Notes
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Notes</DialogTitle>
            <DialogDescription>
              Add notes or comments for this record
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter your notes here..."
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
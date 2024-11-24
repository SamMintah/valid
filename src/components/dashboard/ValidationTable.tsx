import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const validations = [
  {
    id: '1',
    rule: 'Email Format',
    status: 'success',
    timestamp: '2024-03-10 14:30',
    message: 'Valid email format detected',
  },
  {
    id: '2',
    rule: 'Phone Number',
    status: 'error',
    timestamp: '2024-03-10 14:28',
    message: 'Invalid country code',
  },
  {
    id: '3',
    rule: 'Date Format',
    status: 'success',
    timestamp: '2024-03-10 14:25',
    message: 'Date matches ISO 8601',
  },
  {
    id: '4',
    rule: 'Currency Format',
    status: 'warning',
    timestamp: '2024-03-10 14:20',
    message: 'Decimal precision warning',
  },
];

export default function ValidationTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Validations</CardTitle>
        <CardDescription>
          Latest data validation results and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validations.map((validation) => (
              <TableRow key={validation.id}>
                <TableCell className="font-medium">
                  {validation.rule}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      validation.status === 'success'
                        ? 'default'
                        : validation.status === 'error'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {validation.status}
                  </Badge>
                </TableCell>
                <TableCell>{validation.timestamp}</TableCell>
                <TableCell>{validation.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
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
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import CreateRuleDialog from './CreateRuleDialog';

const initialRules = [
  {
    id: '1',
    name: 'Email Validation',
    description: 'Validates email format and domain existence',
    status: true,
    lastUpdated: '2024-03-10',
  },
  {
    id: '2',
    name: 'Phone Number Format',
    description: 'Checks international phone number formats',
    status: false,
    lastUpdated: '2024-03-09',
  },
  {
    id: '3',
    name: 'Date Format',
    description: 'Validates various date formats',
    status: true,
    lastUpdated: '2024-03-08',
  },
];

export default function RulesTable() {
  const [rules, setRules] = useState(initialRules);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredRules = rules.filter(
    (rule) =>
      rule.name.toLowerCase().includes(search.toLowerCase()) ||
      rule.description.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === id ? { ...rule, status: !rule.status } : rule
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{rule.description}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={rule.status}
                      onCheckedChange={() => toggleStatus(rule.id)}
                    />
                    <Badge
                      variant={rule.status ? 'default' : 'secondary'}
                    >
                      {rule.status ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{rule.lastUpdated}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateRuleDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
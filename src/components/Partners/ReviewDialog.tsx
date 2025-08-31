import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Save } from 'lucide-react';

interface FlaggedItem {
  id: string;
  field: string;
  value: string;
  issue: string;
}

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (items: FlaggedItem[]) => void;
}

const ReviewDialog = ({ open, onClose, onSave }: ReviewDialogProps) => {
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([
    {
      id: '1',
      field: 'Child Age',
      value: '15',
      issue: 'Age seems high for provided documentation'
    },
    {
      id: '2',
      field: 'Location',
      value: 'Rural area',
      issue: 'Location not specific enough'
    },
    {
      id: '3',
      field: 'Severity Score',
      value: '8.5',
      issue: 'Score requires verification based on uploaded content'
    }
  ]);

  const handleValueChange = (id: string, newValue: string) => {
    setFlaggedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, value: newValue } : item
      )
    );
  };

  const handleSave = () => {
    onSave(flaggedItems);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Items flagged for review
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Please double check this information:
          </p>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {flaggedItems.map((item) => (
            <div key={item.id} className="space-y-2 p-4 border rounded-lg">
              <div className="flex items-center gap-2">
                <Label className="font-medium">{item.field}</Label>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  {item.issue}
                </span>
              </div>
              <Input
                value={item.value}
                onChange={(e) => handleValueChange(item.id, e.target.value)}
                placeholder={`Enter ${item.field.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
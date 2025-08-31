import { useState } from 'react';
import { X, AlertTriangle, Calendar, Mail, Phone, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ChildProfile } from '@/types/childProfile';
import { useToast } from '@/hooks/use-toast';

interface DataReconciliationModalProps {
  profile: ChildProfile;
  open: boolean;
  onClose: () => void;
  onDataRequested: (id: string) => void;
}

const DataReconciliationModal = ({ profile, open, onClose, onDataRequested }: DataReconciliationModalProps) => {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState('');
  const { toast } = useToast();

  const dataIssues = [
    { id: 'missing_documents', label: 'Missing required documents', description: 'Some essential documents are not provided' },
    { id: 'incomplete_info', label: 'Incomplete personal information', description: 'Basic information fields are missing or unclear' },
    { id: 'unclear_status', label: 'Unclear graduation status', description: 'Current enrollment/graduation status needs clarification' },
    { id: 'invalid_contact', label: 'Invalid contact information', description: 'Partner contact details are incorrect or outdated' },
    { id: 'inconsistent_data', label: 'Inconsistent data across documents', description: 'Information conflicts between different sources' },
    { id: 'quality_concerns', label: 'Document quality issues', description: 'Photos or documents are unclear or corrupted' },
    { id: 'verification_needed', label: 'Identity verification required', description: 'Additional verification of child identity needed' },
    { id: 'program_details', label: 'Missing program details', description: 'Specific program information needs clarification' }
  ];

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSendDataRequest = () => {
    if (selectedIssues.length === 0) {
      toast({
        title: "No issues selected",
        description: "Please select at least one data issue to address.",
        variant: "destructive"
      });
      return;
    }

    onDataRequested(profile.id);
    toast({
      title: "Data request sent",
      description: `Data reconciliation request sent to ${profile.submittedByPartnerName}`,
    });
  };

  const handleScheduleZoom = () => {
    toast({
      title: "Zoom meeting scheduled",
      description: `Meeting request sent to ${profile.partnerContact.email}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">Data Reconciliation</DialogTitle>
              <p className="text-muted-foreground">Request additional data for {profile.name}</p>
            </div>
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Requires Attention
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Partner Information */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-3">Partner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Organization:</span>
                <p>{profile.partnerContact.organization}</p>
              </div>
              <div>
                <span className="font-medium">Contact Person:</span>
                <p>{profile.submittedByPartnerName}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p className="text-blue-600">{profile.partnerContact.email}</p>
              </div>
              <div>
                <span className="font-medium">Phone:</span>
                <p className="text-blue-600">{profile.partnerContact.phone}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2" onClick={handleScheduleZoom}>
                <Video className="w-4 h-4" />
                Schedule Zoom
              </Button>
            </div>
          </div>

          {/* Data Issues Checklist */}
          <div>
            <h3 className="font-semibold mb-3">Select Data Issues to Address</h3>
            <div className="space-y-3">
              {dataIssues.map((issue) => (
                <div key={issue.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  <Checkbox
                    id={issue.id}
                    checked={selectedIssues.includes(issue.id)}
                    onCheckedChange={() => handleIssueToggle(issue.id)}
                  />
                  <div className="flex-1">
                    <label htmlFor={issue.id} className="text-sm font-medium cursor-pointer">
                      {issue.label}
                    </label>
                    <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <label className="text-sm font-medium mb-2 block">Additional Message (Optional)</label>
            <Textarea
              placeholder="Add any specific instructions or context for the partner..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={4}
            />
          </div>

          {/* Selected Issues Summary */}
          {selectedIssues.length > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Issues to be addressed ({selectedIssues.length}):</h4>
              <div className="flex flex-wrap gap-2">
                {selectedIssues.map((issueId) => {
                  const issue = dataIssues.find(i => i.id === issueId);
                  return (
                    <Badge key={issueId} variant="secondary" className="text-xs">
                      {issue?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSendDataRequest} disabled={selectedIssues.length === 0}>
              Send Data Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DataReconciliationModal;
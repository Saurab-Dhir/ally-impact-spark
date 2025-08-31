import { X, User, MapPin, Calendar, FileText, Mic, Image, Link, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChildProfile } from '@/types/childProfile';

interface ProfileDetailModalProps {
  profile: ChildProfile;
  open: boolean;
  onClose: () => void;
}

const ProfileDetailModal = ({ profile, open, onClose }: ProfileDetailModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'needs_review': return 'bg-red-100 text-red-800';
      case 'data_requested': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (score: number) => {
    if (score >= 8) return 'text-red-600 bg-red-50';
    if (score >= 6) return 'text-orange-600 bg-orange-50';
    if (score >= 4) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'photo': return <Image className="w-4 h-4" />;
      case 'link': return <Link className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{profile.name}</DialogTitle>
              <p className="text-muted-foreground">Child Profile Details</p>
            </div>
            <Badge className={getStatusColor(profile.status)}>
              {profile.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Personal Info</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>Age: {profile.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.location.region}, {profile.location.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="capitalize">{profile.graduationStatus.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Program Info</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Program: </span>
                    <span className="text-sm">{profile.programType}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Certificate: </span>
                    <Badge variant={profile.graduationCertificateObtained ? "default" : "secondary"}>
                      {profile.graduationCertificateObtained ? "Obtained" : "Pending"}
                    </Badge>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(profile.severityScore)}`}>
                    <span>Severity Score: {profile.severityScore}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Description</h3>
              <p className="text-sm leading-relaxed">{profile.description}</p>
            </div>

            {/* Skills Learned */}
            {profile.skillsLearned.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Skills Learned</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skillsLearned.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Documents ({profile.documents.length})</h3>
              <div className="space-y-2">
                {profile.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    {getDocumentIcon(doc.type)}
                    <span className="flex-1 text-sm">{doc.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {doc.type.toUpperCase()}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Partner Information & Timeline */}
          <div className="space-y-6">
            {/* Partner Contact */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Partner Contact</h3>
              <div className="p-4 border rounded-lg space-y-2">
                <div>
                  <span className="font-medium text-sm">Organization:</span>
                  <p className="text-sm">{profile.partnerContact.organization}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Contact:</span>
                  <p className="text-sm">{profile.submittedByPartnerName}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Email:</span>
                  <p className="text-sm">{profile.partnerContact.email}</p>
                </div>
                <div>
                  <span className="font-medium text-sm">Phone:</span>
                  <p className="text-sm">{profile.partnerContact.phone}</p>
                </div>
                <Button size="sm" className="w-full mt-3">
                  Schedule Zoom Meeting
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 border-l-2 border-blue-500 pl-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border-l-2 border-gray-300 pl-4">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.lastUpdated.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow-up Status */}
            {profile.needsFollowup && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Action Required</h3>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800">
                    This profile requires follow-up attention.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetailModal;
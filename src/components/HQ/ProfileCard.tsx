import { Calendar, MapPin, User, AlertTriangle, CheckCircle, Clock, FileX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChildProfile } from '@/types/childProfile';

interface ProfileCardProps {
  profile: ChildProfile;
  onApprove?: (id: string) => void;
  onRequestData?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProfileCard = ({ profile, onApprove, onRequestData, onViewDetails }: ProfileCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'needs_review': return 'bg-red-100 text-red-800';
      case 'data_requested': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'needs_review': return <AlertTriangle className="w-4 h-4" />;
      case 'data_requested': return <FileX className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (score: number) => {
    if (score >= 8) return 'bg-red-500';
    if (score >= 6) return 'bg-orange-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{profile.name}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Age {profile.age}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profile.location.region}, {profile.location.country}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(profile.status)}>
              {getStatusIcon(profile.status)}
              <span className="ml-1 capitalize">{profile.status.replace('_', ' ')}</span>
            </Badge>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Severity:</span>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getSeverityColor(profile.severityScore)}`} />
                <span className="text-xs font-medium">{profile.severityScore}/10</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {profile.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Program:</span>
            <p className="text-muted-foreground">{profile.programType}</p>
          </div>
          <div>
            <span className="font-medium">Status:</span>
            <p className="text-muted-foreground capitalize">{profile.graduationStatus.replace('_', ' ')}</p>
          </div>
        </div>

        <div>
          <span className="font-medium text-sm">Partner:</span>
          <p className="text-sm text-muted-foreground">{profile.submittedByPartnerName}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          Submitted: {profile.submittedAt.toLocaleDateString()}
        </div>

        {profile.skillsLearned.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {profile.skillsLearned.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {profile.skillsLearned.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{profile.skillsLearned.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails?.(profile.id)}
          >
            View Details
          </Button>
          
          {profile.status === 'pending' && (
            <Button
              size="sm"
              onClick={() => onApprove?.(profile.id)}
            >
              Approve
            </Button>
          )}
          
          {(profile.status === 'needs_review' || profile.needsFollowup) && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onRequestData?.(profile.id)}
            >
              Request Data
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
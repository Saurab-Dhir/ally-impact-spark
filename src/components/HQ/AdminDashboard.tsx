import { useState } from 'react';
import { Users, Clock, CheckCircle, AlertTriangle, FileX, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { mockChildProfiles, ChildProfile } from '@/types/childProfile';
import ProfileCard from './ProfileCard';
import ProfileDetailModal from './ProfileDetailModal';
import DataReconciliationModal from './DataReconciliationModal';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState<ChildProfile[]>(mockChildProfiles);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showReconciliationModal, setShowReconciliationModal] = useState(false);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id 
        ? { ...profile, status: 'approved' as const, lastUpdated: new Date() }
        : profile
    ));
    toast({
      title: "Profile approved",
      description: "Child profile has been approved and is now active in the system.",
    });
  };

  const handleRequestData = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setShowReconciliationModal(true);
    }
  };

  const handleViewDetails = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setSelectedProfile(profile);
      setShowDetailModal(true);
    }
  };

  const getStatusCount = (status: string) => {
    return profiles.filter(p => p.status === status).length;
  };

  const getTotalChildren = () => profiles.length;

  const pendingProfiles = profiles.filter(p => p.status === 'pending');
  const needsReviewProfiles = profiles.filter(p => p.status === 'needs_review');
  const dataRequestedProfiles = profiles.filter(p => p.status === 'data_requested');
  const approvedProfiles = profiles.filter(p => p.status === 'approved');

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{getTotalChildren()}</p>
                <p className="text-sm text-muted-foreground">Total Children</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{getStatusCount('pending')}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{getStatusCount('approved')}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{getStatusCount('needs_review')}</p>
                <p className="text-sm text-muted-foreground">Needs Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Management Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingProfiles.length})
          </TabsTrigger>
          <TabsTrigger value="needs_review" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Needs Review ({needsReviewProfiles.length})
          </TabsTrigger>
          <TabsTrigger value="data_requested" className="flex items-center gap-2">
            <FileX className="w-4 h-4" />
            Data Requested ({dataRequestedProfiles.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedProfiles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onApprove={handleApprove}
                onRequestData={handleRequestData}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {pendingProfiles.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Pending Profiles</h3>
              <p className="text-muted-foreground">All profiles have been processed.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="needs_review" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {needsReviewProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onApprove={handleApprove}
                onRequestData={handleRequestData}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {needsReviewProfiles.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Profiles Need Review</h3>
              <p className="text-muted-foreground">All profiles are in good standing.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="data_requested" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dataRequestedProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onApprove={handleApprove}
                onRequestData={handleRequestData}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {dataRequestedProfiles.length === 0 && (
            <div className="text-center py-12">
              <FileX className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Data Requests Pending</h3>
              <p className="text-muted-foreground">All data requests have been resolved.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {approvedProfiles.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Approved Profiles</h3>
              <p className="text-muted-foreground">Start approving pending profiles to see them here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {selectedProfile && (
        <>
          <ProfileDetailModal
            profile={selectedProfile}
            open={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedProfile(null);
            }}
          />
          <DataReconciliationModal
            profile={selectedProfile}
            open={showReconciliationModal}
            onClose={() => {
              setShowReconciliationModal(false);
              setSelectedProfile(null);
            }}
            onDataRequested={(id) => {
              setProfiles(prev => prev.map(profile => 
                profile.id === id 
                  ? { ...profile, status: 'data_requested' as const, lastUpdated: new Date() }
                  : profile
              ));
              setShowReconciliationModal(false);
              setSelectedProfile(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
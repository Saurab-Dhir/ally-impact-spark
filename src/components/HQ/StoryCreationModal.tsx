import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChildProfile } from '@/types/childProfile';
import { Download, Eye, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface StoryCreationModalProps {
  profile: ChildProfile;
  open: boolean;
  onClose: () => void;
}

const StoryCreationModal = ({ profile, open, onClose }: StoryCreationModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [presentationUrl, setPresentationUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState('');

  const generateStory = async () => {
    setIsGenerating(true);
    setProgress(0);
    setPresentationUrl(null);

    try {
      // Step 1: Generate images
      setCurrentStep('Generating compelling images...');
      setProgress(20);
      
      const storyService = await import('../../services/StoryPresentationService');
      const service = new storyService.StoryPresentationService();
      
      // Step 2: Create slide content
      setCurrentStep('Crafting the story narrative...');
      setProgress(40);
      
      // Step 3: Generate PowerPoint
      setCurrentStep('Building the presentation...');
      setProgress(60);
      
      const pptxUrl = await service.createStoryPresentation(profile, (step, progressValue) => {
        setCurrentStep(step);
        setProgress(progressValue);
      });
      
      setCurrentStep('Story presentation complete!');
      setProgress(100);
      setPresentationUrl(pptxUrl);
      
      toast.success('Story presentation created successfully!');
    } catch (error) {
      console.error('Error generating story:', error);
      toast.error('Failed to create story presentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPresentation = () => {
    if (presentationUrl) {
      const link = document.createElement('a');
      link.href = presentationUrl;
      link.download = `${profile.name.replace(/\s+/g, '_')}_Story_Presentation.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Presentation downloaded!');
    }
  };

  const viewPresentation = () => {
    if (presentationUrl) {
      window.open(presentationUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            Create Story Presentation
          </DialogTitle>
          <p className="text-muted-foreground">
            Generate a compelling PowerPoint presentation telling {profile.name}'s story for potential donors
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">Story Subject</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted-foreground">
                  Age {profile.age} • {profile.location.region}, {profile.location.country}
                </p>
              </div>
            </div>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{currentStep}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Success State */}
          {presentationUrl && !isGenerating && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <h3 className="font-semibold text-success mb-2">Story Created Successfully!</h3>
              <p className="text-sm text-success/80 mb-4">
                Your presentation includes 5 compelling slides with generated images and sympathetic storytelling.
              </p>
              <div className="flex gap-2">
                <Button onClick={viewPresentation} variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={downloadPresentation} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PowerPoint
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {!presentationUrl && (
              <Button 
                onClick={generateStory} 
                disabled={isGenerating}
                className="bg-primary hover:bg-primary/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Story...
                  </>
                ) : (
                  'Generate Story Presentation'
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryCreationModal;
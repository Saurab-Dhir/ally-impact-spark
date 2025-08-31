import { useState } from 'react';
import { Upload, FileText, Mic, Link, Image, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'voice' | 'link' | 'photo';
  url: string;
  uploadedAt: Date;
}

const FileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const { toast } = useToast();

  const handleFileUpload = (type: 'pdf' | 'voice' | 'photo') => {
    const mockFile: UploadedFile = {
      id: Date.now().toString(),
      name: `${type}_document_${Date.now()}`,
      type,
      url: '#',
      uploadedAt: new Date()
    };
    
    setUploadedFiles(prev => [...prev, mockFile]);
    toast({
      title: "File uploaded",
      description: `${type.toUpperCase()} file uploaded successfully`,
    });
  };

  const handleLinkAdd = () => {
    if (!googleDriveLink.trim()) return;
    
    const mockLink: UploadedFile = {
      id: Date.now().toString(),
      name: 'Google Drive Link',
      type: 'link',
      url: googleDriveLink,
      uploadedAt: new Date()
    };
    
    setUploadedFiles(prev => [...prev, mockLink]);
    setGoogleDriveLink('');
    toast({
      title: "Link added",
      description: "Google Drive link added successfully",
    });
  };

  const submitForProcessing = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files",
        description: "Please upload at least one file before submitting",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Submitted for processing",
      description: "Files sent to AI processing. Child profile will be created automatically.",
    });

    // Reset form
    setUploadedFiles([]);
    setAdditionalNotes('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Document Upload Center
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload documents, photos, voice notes, or share Google Drive links for AI processing
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleFileUpload('pdf')}
            >
              <FileText className="w-6 h-6" />
              Upload PDF
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleFileUpload('voice')}
            >
              <Mic className="w-6 h-6" />
              Voice Note
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => handleFileUpload('photo')}
            >
              <Image className="w-6 h-6" />
              Upload Photo
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={handleLinkAdd}
            >
              <Link className="w-6 h-6" />
              Add Link
            </Button>
          </div>

          {/* Google Drive Link Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Drive Link</label>
            <div className="flex gap-2">
              <Input
                placeholder="Paste Google Drive link here..."
                value={googleDriveLink}
                onChange={(e) => setGoogleDriveLink(e.target.value)}
              />
              <Button onClick={handleLinkAdd} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes</label>
            <Textarea
              placeholder="Any additional context or notes about the uploaded files..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    {file.type === 'pdf' && <FileText className="w-4 h-4" />}
                    {file.type === 'voice' && <Mic className="w-4 h-4" />}
                    {file.type === 'photo' && <Image className="w-4 h-4" />}
                    {file.type === 'link' && <Link className="w-4 h-4" />}
                    <span className="text-sm flex-1">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {file.uploadedAt.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            onClick={submitForProcessing}
            className="w-full"
            size="lg"
          >
            Submit to Ally
          </Button>
        </CardContent>
      </Card>

      {/* Processing Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium">How AI Processing Works</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• AI analyzes all uploaded content</p>
              <p>• Extracts key information (age, status, achievements)</p>
              <p>• Creates standardized child profile</p>
              <p>• Assigns severity score based on content</p>
              <p>• Profile sent to HQ for approval</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploader;
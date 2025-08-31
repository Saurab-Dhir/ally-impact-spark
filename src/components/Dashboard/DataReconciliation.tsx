import { useState } from 'react';
import { Upload, Link, FileSpreadsheet, AlertTriangle, CheckCircle, Brain, ChevronDown, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DataRow {
  id: number;
  [key: string]: any;
}

interface Discrepancy {
  row: number;
  column: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  suggestion?: string;
}

interface UploadedFile {
  id: string;
  name: string;
  type: 'excel' | 'google-sheet';
  data: DataRow[];
  uploadDate: string;
}

const DataReconciliation = () => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('line-items');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { toast } = useToast();

  const handleGoogleSheetConnect = () => {
    if (!googleSheetUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid Google Sheets URL",
        variant: "destructive",
      });
      return;
    }

    // Mock data for demo
    const mockSheetData = [
      { id: 1, name: 'John Doe', age: 25, location: 'Nepal', program: 'Prevention', headcount: 15, date: '2024-01-15' },
      { id: 2, name: 'Jane Smith', age: 30, location: 'Cambodia', program: 'Provide', headcount: 22, date: '2024-02-20' },
      { id: 3, name: 'Bob Johnson', age: 35, location: 'Canada', program: 'Prepare', headcount: 18, date: '2024-13-25' }, // Invalid date
      { id: 4, name: 'Alice Brown', age: 28, location: 'Nepal', program: 'Prevention', headcount: -5, date: '2024-03-10' }, // Negative headcount
    ];

    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: 'Google Sheet - ' + new Date().toLocaleDateString(),
      type: 'google-sheet',
      data: mockSheetData,
      uploadDate: new Date().toISOString()
    };

    setUploadedFiles(prev => [...prev, newFile]);
    setSelectedFileId(newFile.id);
    setGoogleSheetUrl('');
    setShowUploadDialog(false);
    
    toast({
      title: "Success",
      description: "Google Sheet connected successfully",
    });
  };

  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Mock Excel data parsing
    const mockExcelData = [
      { id: 1, name: 'Mike Wilson', age: 32, location: 'Cambodia', program: 'Provide', headcount: 20, date: '2024-01-18' },
      { id: 2, name: 'Sarah Davis', age: 27, location: 'Canada', program: 'Prepare', headcount: 25, date: '2024-02-22' },
      { id: 3, name: 'Tom Garcia', age: 45, location: 'Nepal', program: 'Prevention', headcount: 12, date: '2024-02-30' }, // Invalid date
      { id: 4, name: 'Lisa Martinez', age: 29, location: 'Cambodia', program: 'Provide', headcount: 0, date: '2024-03-15' }, // Zero headcount
    ];

    const newFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      type: 'excel',
      data: mockExcelData,
      uploadDate: new Date().toISOString()
    };

    setUploadedFiles(prev => [...prev, newFile]);
    setSelectedFileId(newFile.id);
    setShowUploadDialog(false);
    
    toast({
      title: "Success",
      description: `Excel file "${file.name}" uploaded successfully`,
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    if (selectedFileId === fileId) {
      setSelectedFileId(uploadedFiles.length > 1 ? uploadedFiles.filter(f => f.id !== fileId)[0].id : '');
    }
  };

  const getCurrentFileData = () => {
    const currentFile = uploadedFiles.find(f => f.id === selectedFileId);
    return currentFile?.data || [];
  };

  const runAIInsights = () => {
    const currentData = getCurrentFileData();
    if (currentData.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const foundDiscrepancies: Discrepancy[] = [];
      
      // Analyze current file data
      currentData.forEach((row, index) => {
        // Check for invalid dates
        if (row.date && !isValidDate(row.date)) {
          foundDiscrepancies.push({
            row: index + 1,
            column: 'date',
            issue: `Invalid date format: ${row.date}`,
            severity: 'high',
            suggestion: 'Use YYYY-MM-DD format'
          });
        }
        
        // Check for negative or zero headcount
        if (row.headcount <= 0) {
          foundDiscrepancies.push({
            row: index + 1,
            column: 'headcount',
            issue: `Invalid headcount: ${row.headcount}`,
            severity: row.headcount < 0 ? 'high' : 'medium',
            suggestion: 'Headcount should be a positive number'
          });
        }
        
        // Check for age anomalies
        if (row.age && (row.age < 16 || row.age > 80)) {
          foundDiscrepancies.push({
            row: index + 1,
            column: 'age',
            issue: `Unusual age: ${row.age}`,
            severity: 'low',
            suggestion: 'Verify age is correct'
          });
        }
      });
      
      setDiscrepancies(foundDiscrepancies);
      setIsAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: `Found ${foundDiscrepancies.length} potential discrepancies`,
      });
    }, 2000);
  };

  const isValidDate = (dateString: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    const [year, month, day] = dateString.split('-').map(Number);
    
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const currentFile = uploadedFiles.find(f => f.id === selectedFileId);
  const currentData = getCurrentFileData();

  return (
    <div className="enhanced-card p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Data Reconciliation</h3>
        <p className="text-muted-foreground">
          Upload and analyze multiple Excel files and Google Sheets for data quality and discrepancies
        </p>
      </div>

      {/* File Management Header */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {uploadedFiles.length > 0 ? (
              <Select value={selectedFileId} onValueChange={setSelectedFileId}>
                <SelectTrigger className="w-80">
                  <SelectValue placeholder="Select a file to work with" />
                </SelectTrigger>
                <SelectContent>
                  {uploadedFiles.map((file) => (
                    <SelectItem key={file.id} value={file.id}>
                      <div className="flex items-center gap-2">
                        {file.type === 'excel' ? <FileSpreadsheet className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                        <span>{file.name}</span>
                        <Badge variant="outline" className="ml-2">{file.data.length} rows</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-muted-foreground">No files uploaded yet</div>
            )}
          </div>
          <Button onClick={() => setShowUploadDialog(true)} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add File
          </Button>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file) => (
              <Badge key={file.id} variant={file.id === selectedFileId ? "default" : "secondary"} className="flex items-center gap-2 px-3 py-1">
                {file.type === 'excel' ? <FileSpreadsheet className="w-3 h-3" /> : <Link className="w-3 h-3" />}
                {file.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      {showUploadDialog && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upload New File
              <Button variant="ghost" size="sm" onClick={() => setShowUploadDialog(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Sheets Connection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Link className="w-5 h-5" />
                  <Label className="text-base font-medium">Google Sheets</Label>
                </div>
                <div>
                  <Label htmlFor="sheet-url">Google Sheets URL</Label>
                  <Input
                    id="sheet-url"
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={googleSheetUrl}
                    onChange={(e) => setGoogleSheetUrl(e.target.value)}
                  />
                </div>
                <Button onClick={handleGoogleSheetConnect} className="w-full">
                  Connect Sheet
                </Button>
              </div>

              {/* Excel Upload */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <Label className="text-base font-medium">Excel Upload</Label>
                </div>
                <div>
                  <Label htmlFor="excel-file">Excel File (.xlsx, .xls)</Label>
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleExcelUpload}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Analysis Controls */}
      {uploadedFiles.length > 0 && (
        <div className="mb-6 flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div>
            <h4 className="text-lg font-semibold">AI Data Analysis</h4>
            <p className="text-muted-foreground">
              Run AI-powered validation to identify data quality issues across all files
            </p>
          </div>
          <Button 
            onClick={runAIInsights}
            disabled={isAnalyzing || !selectedFileId}
            className="flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </div>
      )}

      {/* File Content Tabs */}
      {uploadedFiles.length > 0 ? (
        <Tabs value={selectedFileId || uploadedFiles[0]?.id} onValueChange={setSelectedFileId} className="w-full">
          <TabsList className={`grid w-full ${uploadedFiles.length <= 3 ? `grid-cols-${uploadedFiles.length}` : 'grid-cols-3'}`}>
            {uploadedFiles.map((file) => (
              <TabsTrigger key={file.id} value={file.id} className="flex items-center gap-2">
                {file.type === 'excel' ? <FileSpreadsheet className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                <span className="truncate max-w-[120px]">{file.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {uploadedFiles.map((file) => (
            <TabsContent key={file.id} value={file.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {file.type === 'excel' ? <FileSpreadsheet className="w-5 h-5" /> : <Link className="w-5 h-5" />}
                    {file.name}
                  </CardTitle>
                  <CardDescription>{file.data.length} records found</CardDescription>
                </CardHeader>
                <CardContent>
                  {file.data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            {Object.keys(file.data[0]).map((key) => (
                              <th key={key} className="border border-gray-300 px-4 py-2 text-left">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {file.data.map((row, index) => (
                            <tr key={index}>
                              {Object.values(row).map((value, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                                  {String(value)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      No data records to display.
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Analysis Results for this file */}
              {selectedFileId === file.id && discrepancies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analysis Results</CardTitle>
                    <CardDescription>Data quality issues found in {file.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{discrepancies.length} Issues Found</Badge>
                        <Badge variant="destructive">
                          {discrepancies.filter(d => d.severity === 'high').length} High Priority
                        </Badge>
                        <Badge variant="default">
                          {discrepancies.filter(d => d.severity === 'medium').length} Medium Priority
                        </Badge>
                        <Badge variant="secondary">
                          {discrepancies.filter(d => d.severity === 'low').length} Low Priority
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {discrepancies.map((discrepancy, index) => (
                          <Alert key={index}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle className="flex items-center gap-2">
                              Row {discrepancy.row} - {discrepancy.column}
                              <Badge variant={getSeverityColor(discrepancy.severity)}>
                                {discrepancy.severity}
                              </Badge>
                            </AlertTitle>
                            <AlertDescription>
                              <p>{discrepancy.issue}</p>
                              {discrepancy.suggestion && (
                                <p className="mt-1 text-blue-600">
                                  <strong>Suggestion:</strong> {discrepancy.suggestion}
                                </p>
                              )}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Analysis Status */}
              {selectedFileId === file.id && isAnalyzing && (
                <div className="text-center py-8">
                  <Brain className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Analyzing data for discrepancies...</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No File Selected</AlertTitle>
          <AlertDescription>
            Please upload a file or connect a Google Sheet to get started.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DataReconciliation;
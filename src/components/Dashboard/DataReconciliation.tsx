import { useState } from 'react';
import { Upload, Link, FileSpreadsheet, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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

const DataReconciliation = () => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [excelData, setExcelData] = useState<DataRow[]>([]);
  const [sheetData, setSheetData] = useState<DataRow[]>([]);
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
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

    setSheetData(mockSheetData);
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

    setExcelData(mockExcelData);
    toast({
      title: "Success",
      description: `Excel file "${file.name}" uploaded successfully`,
    });
  };

  const runAIInsights = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const foundDiscrepancies: Discrepancy[] = [];
      
      // Analyze sheet data
      sheetData.forEach((row, index) => {
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
      
      // Analyze excel data
      excelData.forEach((row, index) => {
        if (row.date && !isValidDate(row.date)) {
          foundDiscrepancies.push({
            row: index + 1,
            column: 'date',
            issue: `Invalid date format: ${row.date} (Excel)`,
            severity: 'high',
            suggestion: 'Use YYYY-MM-DD format'
          });
        }
        
        if (row.headcount <= 0) {
          foundDiscrepancies.push({
            row: index + 1,
            column: 'headcount',
            issue: `Invalid headcount: ${row.headcount} (Excel)`,
            severity: row.headcount < 0 ? 'high' : 'medium',
            suggestion: 'Headcount should be a positive number'
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

  return (
    <div className="enhanced-card p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Data Reconciliation</h3>
        <p className="text-muted-foreground">
          Connect Google Sheets or upload Excel files to analyze data quality and identify discrepancies
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Data Sources</TabsTrigger>
          <TabsTrigger value="preview">Data Preview</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Sheets Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5" />
                  Google Sheets
                </CardTitle>
                <CardDescription>
                  Connect to a Google Sheets document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                {sheetData.length > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Connected ({sheetData.length} rows)</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Excel Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  Excel Upload
                </CardTitle>
                <CardDescription>
                  Upload an Excel file (.xlsx, .xls)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="excel-file">Excel File</Label>
                  <Input
                    id="excel-file"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleExcelUpload}
                  />
                </div>
                {excelData.length > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Uploaded ({excelData.length} rows)</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {(sheetData.length > 0 || excelData.length > 0) ? (
            <div className="space-y-6">
              {sheetData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Google Sheets Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            {Object.keys(sheetData[0]).map((key) => (
                              <th key={key} className="border border-gray-300 px-4 py-2 text-left">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sheetData.map((row, index) => (
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
                  </CardContent>
                </Card>
              )}

              {excelData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Excel Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            {Object.keys(excelData[0]).map((key) => (
                              <th key={key} className="border border-gray-300 px-4 py-2 text-left">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {excelData.map((row, index) => (
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
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>No Data Available</AlertTitle>
              <AlertDescription>
                Please upload data sources in the "Data Sources" tab first.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">AI Data Quality Analysis</h4>
              <p className="text-muted-foreground">
                Identify potential data discrepancies and quality issues
              </p>
            </div>
            <Button 
              onClick={runAIInsights}
              disabled={isAnalyzing || (sheetData.length === 0 && excelData.length === 0)}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
            </Button>
          </div>

          <Separator />

          {discrepancies.length > 0 ? (
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
          ) : isAnalyzing ? (
            <div className="text-center py-8">
              <Brain className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Analyzing data for discrepancies...</p>
            </div>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Ready for Analysis</AlertTitle>
              <AlertDescription>
                Click "Run AI Analysis" to scan your data for potential issues and discrepancies.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataReconciliation;
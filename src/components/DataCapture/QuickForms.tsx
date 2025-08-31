import { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'multiselect' | 'range';
  options?: string[];
  min?: number;
  max?: number;
  required?: boolean;
}

interface FormTemplate {
  title: string;
  icon: string;
  color: string;
  fields: FormField[];
}

const QuickForms = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const templates: { [key: string]: FormTemplate } = {
    rescue: {
      title: "Rescue Operation",
      icon: "🚨",
      color: "red",
      fields: [
        { name: "location", label: "Location", type: "select", options: ["Nepal", "Cambodia", "Canada"], required: true },
        { name: "count", label: "Number Rescued", type: "number", min: 1, required: true },
        { name: "age_range", label: "Age Range", type: "select", options: ["0-5", "6-12", "13-17", "18+"] },
        { name: "immediate_needs", label: "Immediate Needs", type: "multiselect", 
          options: ["Medical Care", "Safe Shelter", "Counseling", "Documentation", "Food/Water"] },
        { name: "notes", label: "Additional Notes", type: "textarea" }
      ]
    },
    prevention: {
      title: "Prevention Program",
      icon: "🛡️",
      color: "purple",
      fields: [
        { name: "program_type", label: "Program Type", type: "select", 
          options: ["School Visit", "Community Meeting", "Training Session"], required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "participants", label: "Number of Participants", type: "number", min: 1, required: true },
        { name: "topics", label: "Topics Covered", type: "multiselect",
          options: ["Online Safety", "Trafficking Signs", "Safe Migration", "Rights Education", "Reporting"] },
        { name: "engagement", label: "Engagement Level", type: "range", min: 0, max: 100 }
      ]
    },
    support: {
      title: "Survivor Support",
      icon: "🤝",
      color: "green",
      fields: [
        { name: "support_type", label: "Support Type", type: "select", 
          options: ["Counseling", "Education", "Vocational Training", "Healthcare"], required: true },
        { name: "survivor_count", label: "Number of Survivors", type: "number", min: 1, required: true },
        { name: "progress", label: "Progress Level", type: "range", min: 0, max: 100 },
        { name: "achievements", label: "Recent Achievements", type: "textarea" },
        { name: "next_steps", label: "Next Steps", type: "text" }
      ]
    },
    community: {
      title: "Community Engagement",
      icon: "👥",
      color: "orange",
      fields: [
        { name: "community", label: "Community Name", type: "text", required: true },
        { name: "attendees", label: "Number of Attendees", type: "number", min: 1, required: true },
        { name: "leaders", label: "Community Leaders Present", type: "number", min: 0 },
        { name: "partnerships", label: "New Partnerships", type: "number", min: 0 },
        { name: "commitments", label: "Community Commitments", type: "textarea" }
      ]
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', {
        template: selectedTemplate,
        data: formData
      });
      
      setIsSubmitting(false);
      setSelectedTemplate('');
      setFormData({});
      
      // Success feedback
      alert(`${templates[selectedTemplate].title} recorded successfully!`);
    }, 1500);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateFormData(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required={field.required}
          />
        );
        
      case 'number':
        return (
          <input
            type="number"
            value={value}
            min={field.min}
            max={field.max}
            onChange={(e) => updateFormData(field.name, parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required={field.required}
          />
        );
        
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => updateFormData(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required={field.required}
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
        
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => updateFormData(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
            required={field.required}
          />
        );
        
      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={(value as string[])?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || [];
                    if (e.target.checked) {
                      updateFormData(field.name, [...currentValues, option]);
                    } else {
                      updateFormData(field.name, currentValues.filter(v => v !== option));
                    }
                  }}
                  className="rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        );
        
      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={field.min}
              max={field.max}
              value={value}
              onChange={(e) => updateFormData(field.name, parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{field.min}%</span>
              <span className="font-medium text-primary">{value}%</span>
              <span>{field.max}%</span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Entry Forms</h3>
      
      {/* Template selection */}
      {!selectedTemplate && (
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={cn(
                "p-4 border-2 border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <p className="text-sm font-medium text-slate-900">{template.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Quick data entry
              </p>
            </button>
          ))}
        </div>
      )}
      
      {/* Dynamic form */}
      {selectedTemplate && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{templates[selectedTemplate].icon}</span>
              <div>
                <h4 className="font-bold text-slate-900">{templates[selectedTemplate].title}</h4>
                <p className="text-sm text-muted-foreground">Fill in the details below</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedTemplate('');
                setFormData({});
              }}
              className="p-2 text-muted-foreground hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {templates[selectedTemplate].fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit {templates[selectedTemplate].title}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickForms;
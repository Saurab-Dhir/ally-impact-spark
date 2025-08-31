export interface ChildProfile {
  id: string;
  age: number;
  name: string;
  graduationStatus: 'enrolled' | 'graduated' | 'dropped_out' | 'at_risk';
  graduationCertificateObtained: boolean;
  submittedByPartnerName: string;
  partnerContact: {
    email: string;
    phone: string;
    organization: string;
  };
  severityScore: number; // 1-10 scale
  description: string;
  status: 'pending' | 'approved' | 'needs_review' | 'data_requested';
  submittedAt: Date;
  lastUpdated: Date;
  documents: {
    type: 'pdf' | 'voice' | 'photo' | 'link';
    name: string;
    url: string;
  }[];
  location: {
    country: string;
    region: string;
  };
  programType: string;
  skillsLearned: string[];
  needsFollowup: boolean;
}

export const mockChildProfiles: ChildProfile[] = [
  {
    id: '1',
    age: 16,
    name: 'Anita K.',
    graduationStatus: 'enrolled',
    graduationCertificateObtained: false,
    submittedByPartnerName: 'Nepal Youth Foundation',
    partnerContact: {
      email: 'contact@nepalyouth.org',
      phone: '+977-1-4567890',
      organization: 'Nepal Youth Foundation'
    },
    severityScore: 7,
    description: 'Rescued from trafficking situation 6 months ago. Currently enrolled in vocational training program for tailoring. Shows strong motivation and good progress. Needs continued psychological support.',
    status: 'pending',
    submittedAt: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    documents: [
      { type: 'pdf', name: 'intake_form.pdf', url: '#' },
      { type: 'photo', name: 'progress_photo.jpg', url: '#' }
    ],
    location: {
      country: 'Nepal',
      region: 'Kathmandu'
    },
    programType: 'Vocational Training',
    skillsLearned: ['Basic Tailoring', 'Literacy'],
    needsFollowup: true
  },
  {
    id: '2',
    age: 18,
    name: 'Sophea M.',
    graduationStatus: 'graduated',
    graduationCertificateObtained: true,
    submittedByPartnerName: 'Cambodia Safe Haven',
    partnerContact: {
      email: 'info@cambodiasafehaven.org',
      phone: '+855-23-123456',
      organization: 'Cambodia Safe Haven'
    },
    severityScore: 3,
    description: 'Successfully completed 2-year program in computer skills and business training. Now employed at local tech company. Excellent success story for program impact.',
    status: 'approved',
    submittedAt: new Date('2024-01-10'),
    lastUpdated: new Date('2024-01-12'),
    documents: [
      { type: 'pdf', name: 'graduation_certificate.pdf', url: '#' },
      { type: 'voice', name: 'success_interview.mp3', url: '#' },
      { type: 'photo', name: 'graduation_photo.jpg', url: '#' }
    ],
    location: {
      country: 'Cambodia',
      region: 'Phnom Penh'
    },
    programType: 'Computer Skills & Business',
    skillsLearned: ['Computer Programming', 'Business Management', 'English'],
    needsFollowup: false
  },
  {
    id: '3',
    age: 14,
    name: 'Maya R.',
    graduationStatus: 'at_risk',
    graduationCertificateObtained: false,
    submittedByPartnerName: 'Toronto Youth Services',
    partnerContact: {
      email: 'maya.support@torontoyouth.ca',
      phone: '+1-416-555-0123',
      organization: 'Toronto Youth Services'
    },
    severityScore: 9,
    description: 'Recently identified case. Family situation unstable. Requires immediate intervention and support. Missing several key documents for program enrollment.',
    status: 'needs_review',
    submittedAt: new Date('2024-01-20'),
    lastUpdated: new Date('2024-01-20'),
    documents: [
      { type: 'voice', name: 'initial_assessment.mp3', url: '#' }
    ],
    location: {
      country: 'Canada',
      region: 'Ontario'
    },
    programType: 'Emergency Support',
    skillsLearned: [],
    needsFollowup: true
  },
  {
    id: '4',
    age: 17,
    name: 'Raj P.',
    graduationStatus: 'enrolled',
    graduationCertificateObtained: false,
    submittedByPartnerName: 'Nepal Youth Foundation',
    partnerContact: {
      email: 'contact@nepalyouth.org',
      phone: '+977-1-4567890',
      organization: 'Nepal Youth Foundation'
    },
    severityScore: 5,
    description: 'Making steady progress in carpentry training program. Good attendance and engagement. Family support system is strong.',
    status: 'data_requested',
    submittedAt: new Date('2024-01-18'),
    lastUpdated: new Date('2024-01-21'),
    documents: [
      { type: 'pdf', name: 'progress_report.pdf', url: '#' },
      { type: 'link', name: 'Google Drive Folder', url: 'https://drive.google.com/folder/example' }
    ],
    location: {
      country: 'Nepal',
      region: 'Pokhara'
    },
    programType: 'Carpentry Training',
    skillsLearned: ['Basic Carpentry', 'Tool Safety'],
    needsFollowup: true
  }
];
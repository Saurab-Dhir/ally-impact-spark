import PptxGenJS from 'pptxgenjs';
import { ChildProfile } from '@/types/childProfile';

export class StoryPresentationService {
  private pptx: PptxGenJS;

  constructor() {
    this.pptx = new PptxGenJS();
  }

  async createStoryPresentation(
    profile: ChildProfile,
    onProgress?: (step: string, progress: number) => void
  ): Promise<string> {
    onProgress?.('Initializing presentation...', 10);

    // Set presentation properties
    this.pptx.author = 'Ally Impact Intelligence Hub';
    this.pptx.company = 'Ally';
    this.pptx.subject = `${profile.name} - Story Presentation`;
    this.pptx.title = `A Story of Hope: ${profile.name}`;

    // Generate images for slides
    onProgress?.('Generating compelling images...', 20);
    const images = await this.generateSlideImages(profile);

    // Create slides
    onProgress?.('Creating slide 1: Introduction...', 30);
    await this.createTitleSlide(profile, images.title);

    onProgress?.('Creating slide 2: Background...', 45);
    await this.createBackgroundSlide(profile, images.background);

    onProgress?.('Creating slide 3: Journey...', 60);
    await this.createJourneySlide(profile, images.journey);

    onProgress?.('Creating slide 4: Impact...', 75);
    await this.createImpactSlide(profile, images.impact);

    onProgress?.('Creating slide 5: Call to Action...', 90);
    await this.createCallToActionSlide(profile, images.callToAction);

    onProgress?.('Finalizing presentation...', 95);

    // Generate and return the presentation
    const pptxArrayBuffer = await this.pptx.write({ outputType: 'arraybuffer' });
    const pptxBlob = new Blob([pptxArrayBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
    });
    const url = URL.createObjectURL(pptxBlob);
    
    onProgress?.('Presentation ready!', 100);
    return url;
  }

  private async generateSlideImages(profile: ChildProfile) {
    // Use the generated template images
    const images = {
      title: '/src/assets/story-title-template.jpg',
      background: '/src/assets/story-background-template.jpg',
      journey: '/src/assets/story-journey-template.jpg',
      impact: '/src/assets/story-impact-template.jpg',
      callToAction: '/src/assets/story-cta-template.jpg'
    };

    return images;
  }

  private async createTitleSlide(profile: ChildProfile, imagePath: string) {
    const slide = this.pptx.addSlide();
    
    // Background image
    slide.background = { path: imagePath };
    
    // Dark overlay for text readability
    slide.addShape('rect', {
      x: 0, y: 0, w: '100%', h: '100%',
      fill: { color: '000000', transparency: 50 }
    });

    // Title
    slide.addText(`A Story of Hope:\n${profile.name}`, {
      x: 1, y: 2, w: 8, h: 2,
      fontSize: 44,
      fontFace: 'Arial',
      color: 'FFFFFF',
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    // Subtitle
    slide.addText(`Age ${profile.age} • ${profile.location.region}, ${profile.location.country}`, {
      x: 1, y: 4.5, w: 8, h: 1,
      fontSize: 24,
      fontFace: 'Arial',
      color: 'FFFFFF',
      align: 'center'
    });

    // Footer
    slide.addText('Ally Impact Intelligence Hub', {
      x: 1, y: 6.5, w: 8, h: 0.5,
      fontSize: 18,
      fontFace: 'Arial',
      color: 'FFFFFF',
      align: 'center'
    });
  }

  private async createBackgroundSlide(profile: ChildProfile, imagePath: string) {
    const slide = this.pptx.addSlide();
    
    // Background
    slide.background = { color: 'F8F9FA' };
    
    // Image on left
    slide.addImage({
      path: imagePath,
      x: 0.5, y: 1, w: 4.5, h: 5
    });

    // Content on right
    slide.addText('The Challenge', {
      x: 5.5, y: 1, w: 4, h: 0.8,
      fontSize: 32,
      fontFace: 'Arial',
      color: '2D3748',
      bold: true
    });

    const challengeText = this.getChallengeText(profile);
    slide.addText(challengeText, {
      x: 5.5, y: 2, w: 4, h: 3.5,
      fontSize: 16,
      fontFace: 'Arial',
      color: '4A5568',
      lineSpacing: 28
    });

    // Severity indicator
    const severityColor = profile.severityScore >= 8 ? 'DC2626' : 
                         profile.severityScore >= 6 ? 'EA580C' : 
                         profile.severityScore >= 4 ? 'CA8A04' : '16A34A';
    
    slide.addText(`Severity Level: ${profile.severityScore}/10`, {
      x: 5.5, y: 5.8, w: 4, h: 0.5,
      fontSize: 14,
      fontFace: 'Arial',
      color: severityColor,
      bold: true
    });
  }

  private async createJourneySlide(profile: ChildProfile, imagePath: string) {
    const slide = this.pptx.addSlide();
    
    slide.background = { color: 'F8F9FA' };
    
    slide.addText('The Journey of Transformation', {
      x: 1, y: 0.5, w: 8, h: 0.8,
      fontSize: 32,
      fontFace: 'Arial',
      color: '2D3748',
      bold: true,
      align: 'center'
    });

    slide.addImage({
      path: imagePath,
      x: 0.5, y: 1.5, w: 9, h: 3
    });

    const journeyText = this.getJourneyText(profile);
    slide.addText(journeyText, {
      x: 1, y: 5, w: 8, h: 1.5,
      fontSize: 16,
      fontFace: 'Arial',
      color: '4A5568',
      align: 'center',
      lineSpacing: 24
    });
  }

  private async createImpactSlide(profile: ChildProfile, imagePath: string) {
    const slide = this.pptx.addSlide();
    
    slide.background = { color: 'F8F9FA' };
    
    slide.addText('The Impact of Your Support', {
      x: 1, y: 0.5, w: 8, h: 0.8,
      fontSize: 32,
      fontFace: 'Arial',
      color: '16A34A',
      bold: true,
      align: 'center'
    });

    slide.addImage({
      path: imagePath,
      x: 5.5, y: 1.5, w: 4, h: 3
    });

    // Skills learned
    if (profile.skillsLearned.length > 0) {
      slide.addText('Skills Gained:', {
        x: 0.5, y: 1.5, w: 4.5, h: 0.5,
        fontSize: 18,
        fontFace: 'Arial',
        color: '2D3748',
        bold: true
      });

      const skillsText = profile.skillsLearned.map(skill => `• ${skill}`).join('\n');
      slide.addText(skillsText, {
        x: 0.5, y: 2.2, w: 4.5, h: 2.5,
        fontSize: 14,
        fontFace: 'Arial',
        color: '4A5568',
        lineSpacing: 24
      });
    }

    const impactText = this.getImpactText(profile);
    slide.addText(impactText, {
      x: 0.5, y: 5, w: 9, h: 1.5,
      fontSize: 16,
      fontFace: 'Arial',
      color: '16A34A',
      align: 'center',
      lineSpacing: 24
    });
  }

  private async createCallToActionSlide(profile: ChildProfile, imagePath: string) {
    const slide = this.pptx.addSlide();
    
    slide.background = { path: imagePath };
    
    // Dark overlay
    slide.addShape('rect', {
      x: 0, y: 0, w: '100%', h: '100%',
      fill: { color: '000000', transparency: 60 }
    });

    slide.addText('Help Us Create More Stories Like This', {
      x: 1, y: 1.5, w: 8, h: 1,
      fontSize: 36,
      fontFace: 'Arial',
      color: 'FFFFFF',
      bold: true,
      align: 'center'
    });

    const ctaText = `Every child deserves a chance at a better future.\n\nYour support can transform lives, just like ${profile.name}'s.\n\nTogether, we can create lasting change.`;
    
    slide.addText(ctaText, {
      x: 1, y: 3, w: 8, h: 2.5,
      fontSize: 20,
      fontFace: 'Arial',
      color: 'FFFFFF',
      align: 'center',
      lineSpacing: 32
    });

    slide.addText('Make a Difference Today', {
      x: 1, y: 6, w: 8, h: 0.8,
      fontSize: 24,
      fontFace: 'Arial',
      color: '00B7C4',
      bold: true,
      align: 'center'
    });
  }

  private getChallengeText(profile: ChildProfile): string {
    const challenges = [
      `In ${profile.location.country}, many children face significant challenges that limit their opportunities for growth and success.`,
      `${profile.name} was among those who needed support to overcome these obstacles.`,
      `The situation required immediate attention and comprehensive intervention to ensure a brighter future.`
    ];

    return challenges.join('\n\n');
  }

  private getJourneyText(profile: ChildProfile): string {
    return `Through the ${profile.programType}, ${profile.name} embarked on a transformative journey of learning and growth. With dedicated support and comprehensive programming, remarkable progress was achieved.`;
  }

  private getImpactText(profile: ChildProfile): string {
    const certificateStatus = profile.graduationCertificateObtained ? 
      'Successfully completed the program and received certification.' :
      'Currently progressing toward program completion and certification.';
    
    return `${certificateStatus} This transformation demonstrates the power of targeted support and the incredible potential within every child.`;
  }
}
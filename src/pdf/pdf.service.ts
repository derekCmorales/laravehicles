import { Injectable, Logger } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';
import * as htmlToPdf from 'html-pdf-node';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  async generatePdfFromTemplate(templateName: string, data: any): Promise<Buffer> {
    const templatePath = path.join(__dirname, '..', '..', 'src', 'pdf', 'templates', `${templateName}.hbs`);

    let htmlTemplate: string;
    try {
      htmlTemplate = fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
      this.logger.error(`Error reading template ${templateName}:`, error);
      throw new Error('Template not found');
    }

    const template = handlebars.compile(htmlTemplate);
    const htmlContent = template(data);

    const options = {
      format: 'Letter',
      printBackground: true,
      landscape: templateName === 'vehicle-decal' || templateName === 'vehicle-registration' ? true : false,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    };

    const file = { content: htmlContent };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const pdfBuffer = await htmlToPdf.generatePdf(file, options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pdfBuffer;
  }
}

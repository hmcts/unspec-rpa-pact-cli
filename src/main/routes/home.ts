import * as express from 'express';
import MailService from '@sendgrid/mail';
import traverse from 'traverse';

/* tslint:disable:no-default-export */
export default function(app: express.Application): void {

  const isNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === 'string' && num.trim() !== '') && !isNaN(num as number);

  function splice(value: string, index: number, str: string) {
    return value.slice(0, index) + str + value.slice(index);
  }

  function prepareCaseNumber(caseReferenceStartIndex: number) {
    process.env.RPA_CASE_REFERENCE_START_INDEX = String(caseReferenceStartIndex + 1);
    return splice(String(caseReferenceStartIndex).padStart(6, '0'), 3, 'LR');
  }

  function hasCaseReferenceStartIndex(caseReferenceStartIndex: string): boolean {
    return caseReferenceStartIndex && caseReferenceStartIndex.trim().length > 0;
  }

  app.post('/fake-endpoint', async (req: express.Request, res: express.Response) => {
    const title = req.header('title');
    const version = req.header('version');
    console.log('Title:', title);
    console.log('Version:', version);
    console.log('Payload:', JSON.stringify(req.body));
    const fileName = `civil-unspecified-rpa-${version}.json`;
    const tag: string = process.env.RPA_CONSUMER_VERSION_TAG;
    const subject = `Version: ${version} - Tag: ${tag} - ${title}`;
    const body = `Please find attached RPA Json for: ${title} - version ${version} and consumer version tag ${tag}`;

    const apiKey: string = process.env.RPA_SENDGRID_API_KEY;
    if (!(apiKey && apiKey.length > 0)) {
      throw new Error('RPA_SENDGRID_API_KEY is a required environment variable, but wasn`t set');
    }
    MailService.setApiKey(apiKey);

    const toEmail: string = process.env.RPA_TO_EMAIL;
    if (!(toEmail && toEmail.length > 0)) {
      throw new Error('RPA_TO_EMAIL is a required environment variable, but wasn`t set');
    }

    const fromEmail: string = process.env.RPA_FROM_EMAIL || 'civilunspecified@gmail.com';
    if (!(process.env.RPA_FROM_EMAIL && process.env.RPA_FROM_EMAIL.length > 0)) {
      console.log(`RPA_FROM_EMAIL environment variable is not set, using default as ${fromEmail}`);
    }

    let repeatCount = process.env.RPA_EMAIL_REPEAT_COUNT || 1;
    if (isNumeric(repeatCount) && repeatCount < 1) {
      repeatCount = 1;
    }

    let attachmentJson = req.body;
    let caseNumber: string;
    for (let count=1; count <= repeatCount; count++) {
      let caseReferenceStartIndex: string = process.env.RPA_CASE_REFERENCE_START_INDEX;
      if (hasCaseReferenceStartIndex(caseReferenceStartIndex) || repeatCount > 1) {
        if (!hasCaseReferenceStartIndex(caseReferenceStartIndex)) {
          caseReferenceStartIndex = '1';
        }
        console.log('Will override the case reference number based on the index:', caseReferenceStartIndex);
        caseNumber = prepareCaseNumber(Number(caseReferenceStartIndex));
        console.log('caseNumber = ', caseNumber);
        attachmentJson = traverse(req.body).map(function () {
          if (this.key === 'caseNumber') {
            this.update(caseNumber);
          }
        });
        console.log('Updated Payload:', JSON.stringify(attachmentJson));
      }

      const msg = {
        to: toEmail,
        from: fromEmail,
        subject: caseNumber ? `Case reference: ${caseNumber} ${subject}` : subject,
        text: body,
        attachments: [
          {
            content: Buffer.from(JSON.stringify(attachmentJson)).toString('base64'),
            filename: fileName,
            type: 'application/json',
            disposition: 'attachment',
          },
        ],
      };

      try {
        await MailService.send(msg);
        console.log(`Count ${count}: Email sent to RPA with subject: ${subject}`);
      } catch (error) {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    }
    return res
      .status(200)
      .json(req.body);
  });

  app.get('/', (req, res) => {
    res.render('home');
  });
}

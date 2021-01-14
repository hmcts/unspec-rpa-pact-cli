import * as express from 'express';
import MailService from '@sendgrid/mail';

/* tslint:disable:no-default-export */
export default function(app: express.Application): void {

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

    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: subject,
      text: body,
      attachments: [
        {
          content: Buffer.from(JSON.stringify(req.body)).toString('base64'),
          filename: fileName,
          type: 'application/json',
          disposition: 'attachment',
        },
      ],
    };

    try {
      await MailService.send(msg);
      console.log(`Email sent to RPA with subject: ${subject}`);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
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

import { EmailService, SendEmailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("EmailService", () => {
  const mockSendEmail = jest.fn();

  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendEmail,
  });

  const emailService = new EmailService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should send an email", async () => {
    const options: SendEmailOptions = {
      to: "joaquincaggiano@gmail.com",
      subject: "test",
      htmlBody: "test",
    };

    await emailService.sendEmail(options);

    expect(mockSendEmail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "test",
      subject: "test",
      to: "joaquincaggiano@gmail.com",
    });
  });

  test("should send an email with attachments", async () => {
    const email = "joaquincaggiano@gmail.com";
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendEmail).toHaveBeenCalledWith({
      to: email,
      subject: "Logs del servidor",
      html: expect.any(String),
      attachments: expect.arrayContaining([
        {
          filename: "logs-all.log",
          path: "./logs/logs-all.log",
        },
        {
          filename: "logs-high.log",
          path: "./logs/logs-high.log",
        },
        {
          filename: "logs-medium.log",
          path: "./logs/logs-medium.log",
        },
      ]),
    });
  });
});

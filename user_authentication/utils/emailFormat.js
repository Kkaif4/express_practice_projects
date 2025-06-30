export const emailFormat = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        background-color: #0f172a;
        font-family: 'Segoe UI', Roboto, sans-serif;
        color: #f1f5f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 480px;
        margin: 40px auto;
        background-color: #1e293b;
        border-radius: 12px;
        padding: 32px;
        box-shadow: 0 0 12px rgba(0, 255, 255, 0.2);
      }
      .header {
        text-align: center;
        margin-bottom: 24px;
      }
      .header h1 {
        color: #38bdf8;
        letter-spacing: 1px;
      }
      .message {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 24px;
        text-align: center;
      }
      .code-box {
        background-color: #0f766e;
        padding: 16px;
        border-radius: 10px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 4px;
        color: #ffffff;
        box-shadow: 0 0 8px #14b8a6;
        margin: 0 auto 20px;
        width: fit-content;
      }
      .footer {
        font-size: 13px;
        text-align: center;
        color: #94a3b8;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Email</h1>
      </div>
      <div class="message">
        <p>Hello,</p>
        <p>To complete your signup, please enter the following verification code:</p>
      </div>
      <div class="code-box">CODE_HERE</div>
      <div class="message">
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        &copy; 2025 Futurio Systems — All Rights Reserved.
      </div>
    </div>
  </body>
</html>
`;

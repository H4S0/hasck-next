import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  username?: string;
}

export function EmailTemplate({ firstName, username }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        color: '#333',
      }}
    >
      <h1>Welcome aboard, {firstName}!</h1>
      <p>🎉 Your registration was successful.</p>

      {username && (
        <p>
          You can now log in using your username: <strong>{username}</strong>
        </p>
      )}

      <p>We are excited to have you as part of our community.</p>

      <p>
        If you have any questions, feel free to reach out to our support team.
      </p>

      <p style={{ marginTop: '30px' }}>
        Best regards,
        <br />
        The Team 🚀
      </p>
    </div>
  );
}

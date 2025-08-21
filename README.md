hasck-next

hasck-next is a lightweight and secure authentication system built entirely with Next.js, featuring modern auth capabilities without additional backend frameworks.

Features

Secure Authentication: Simple and secure login/signup flow.

Email Notifications: Uses Resend
 for email confirmation and notifications.

Password Management: Supports password reset, update, and “forgot password” flows.

Email Management: Supports email updates and confirmations.

Next.js Only: No external backend; everything handled within Next.js.

Session Helpers:

useHasckClientSession – for client components.

getHasckServerSession – for server components.

Getting Started

Clone the repository:

git clone https://github.com/H4S0/hasck-next.git
cd hasck-next

Install dependencies:

npm install

Set up environment variables (e.g., Resend API key, JWT secret):

RESEND_API_KEY=your_resend_api_key
JWT_SECRET=your_jwt_secret

Run the development server:

npm run dev

Open http://localhost:3000
 to see it in action.

Contributing

Contributions are welcome! Fork the repo, create a feature branch, and submit a pull request.



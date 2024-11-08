## Hi!

This isn’t exactly a traditional portfolio—“portfolio” sounds a bit formal for what this is. Instead, this project is a space where I learn, build, and explore new ideas. Right now, I’m focused on deepening my skills in the AWS ecosystem and demonstrating my design philosophy, along with my ability to connect AWS Lambda functions, S3 buckets, and a frontend into a cohesive, interesting experience.

This site was built with Next.js and bootstrapped using create-next-app.

## Tech Stack
Frontend: Next.js for a seamless and efficient user experience.
Backend / Serverless:
AWS Lambda: For serverless functions to handle backend logic.
S3 Buckets: For storing and serving assets.
API Gateway: To route requests to Lambda functions.
Design Philosophy: Focused on elegance and simplicity, with a goal to create a clean and visually appealing interface.
Getting Started
To view the project locally, follow these steps:

## Getting Started

To view the project locally, follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.

## Environment Variables

This project requires a few environment variables to connect with AWS services. Create a .env.local file in the root of the project with the following variables:

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

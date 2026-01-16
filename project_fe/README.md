# Saigontourist Tour Travel Website

## Overview
This project is a React 18 + TypeScript tour booking e-commerce application built using Vite, React Router v7, and Tailwind CSS. It follows a strict page-feature separation pattern inspired by Next.js App Router conventions.

## Deployment Instructions

1. **Build the Application**: Run the following command to create a production build of your application:
   ```
   npm run build
   ```

2. **Set Environment Variables**: Ensure that your application is configured to use the backend URL. You can set this in your `vite.config.ts` or directly in your code where API calls are made. For example:
   ```typescript
   const API_BASE_URL = 'https://projectbe-fe-production.up.railway.app/';
   ```

3. **Deploy the Build**: After building the application, you will have a `dist` folder containing the production-ready files. You can deploy this folder to your hosting provider. If you are using a service like Vercel, Netlify, or Railway, follow their specific instructions for deploying a static site.

4. **Test the Deployment**: Once deployed, navigate to your application URL to ensure everything is working correctly. Check that API calls are being made to the correct backend URL.

5. **Monitor and Maintain**: Keep an eye on your application for any issues and update dependencies as needed. Regularly check the backend service to ensure it is operational.

By following these steps, you should be able to successfully deploy your front-end application with the specified backend URL.
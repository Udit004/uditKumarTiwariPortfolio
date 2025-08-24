# Environment Setup Guide

## Quick Fix for Sanity Project ID Error

If you're seeing the error `projectId can only contain only a-z, 0-9 and dashes`, follow these steps:

### 1. Create Environment File

Create a `.env.local` file in the root directory of your project with the following content:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-19
```

### 2. Get Your Sanity Project ID

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to Project Settings
4. Copy the Project ID (it should look like `abc12345` or `my-project-name`)

### 3. Replace the Placeholder

Replace `your-sanity-project-id` in the `.env.local` file with your actual project ID.

### 4. Restart Development Server

```bash
npm run dev
```

## Project ID Format Requirements

Your Sanity project ID must:
- Only contain lowercase letters (a-z)
- Only contain numbers (0-9)  
- Only contain dashes (-)
- Not contain spaces, underscores, or special characters

**Examples of valid project IDs:**
- `my-blog-project`
- `portfolio2024`
- `udit-portfolio`

**Examples of invalid project IDs:**
- `My_Blog_Project` (uppercase and underscores)
- `portfolio 2024` (spaces)
- `portfolio@2024` (special characters)

## Troubleshooting

If you're still getting errors:

1. **Check file location**: Make sure `.env.local` is in the root directory (same level as `package.json`)
2. **Restart the server**: Environment variables are loaded when the server starts
3. **Check for typos**: Ensure there are no extra spaces or characters
4. **Verify project ID**: Double-check your project ID in Sanity dashboard

## Optional Environment Variables

You can also add these optional variables to `.env.local`:

```bash
# For write operations (if needed)
SANITY_API_TOKEN=your-sanity-api-token

# For AI chatbot feature
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

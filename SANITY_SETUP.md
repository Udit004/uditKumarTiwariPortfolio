# Sanity API Token Setup Guide

## 🔑 **The Problem**
You're getting this error because your Sanity client doesn't have write permissions:
```
Insufficient permissions; permission "create" required
```

## ✅ **Solution: Get a Sanity API Token**

### **Step 1: Go to Sanity Manage**
1. Visit [sanity.io/manage](https://sanity.io/manage)
2. Sign in to your account
3. Select your project (`4i5h1wuv`)

### **Step 2: Create an API Token**
1. In your project dashboard, go to **Settings** → **API**
2. Click **Add API token**
3. Fill in the details:
   - **Name**: `Blog Write Token` (or any name you prefer)
   - **Role**: Select **Editor** or **Write** permissions
   - **Dataset**: `production` (or your dataset name)
4. Click **Create token**
5. **Copy the token** (it looks like: `sk...`)

### **Step 3: Add Token to Environment**
1. Open your `.env.local` file
2. Replace `your-sanity-api-token-here` with your actual token:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=4i5h1wuv
NEXT_PUBLIC_SANITY_DATASET=production

# Add your Sanity API token here (get it from sanity.io/manage)
SANITY_API_TOKEN=sk_your_actual_token_here
```

### **Step 4: Restart Your Development Server**
```bash
npm run dev
```

## 🔒 **Security Notes**
- The `SANITY_API_TOKEN` is **server-side only** and won't be exposed to the browser
- Never commit your API token to version control
- The `.env.local` file is already in your `.gitignore`

## 🧪 **Test the Setup**
1. Visit `/test-sanity` to check your connection
2. Try creating a post at `/blog/write`
3. Check your blog page to see the new post

## 🚨 **Common Issues**

### **Token Not Working**
- Make sure you copied the entire token (starts with `sk`)
- Verify the token has **Editor** or **Write** permissions
- Check that the dataset matches your environment variable

### **Still Getting Permission Errors**
- Ensure you restarted the development server after adding the token
- Verify the token is in the correct environment file (`.env.local`)
- Check that the token is for the correct project and dataset

## 📞 **Need Help?**
If you're still having issues:
1. Double-check your token permissions in Sanity
2. Verify your project ID and dataset name
3. Make sure the token is properly added to `.env.local`
4. Restart your development server

## 🎯 **Next Steps**
Once you have the token working:
1. Create your first blog post
2. Add more features like image uploads
3. Set up author management
4. Add categories and tags

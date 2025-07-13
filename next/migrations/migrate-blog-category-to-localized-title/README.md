# Blog Category Title Localization Migration with AI Translation

## Purpose

This migration transforms the `blog.category` document type from the old title structure to the new localized title structure, and uses **Gemini AI** to automatically translate Arabic titles to English when English translations are missing.

## Migration Details

### Before (Old Structure)

```typescript
{
  title: "العنوان بالعربية",      // Arabic title only
}
```

### After (New Structure)

```typescript
{
  title: {
    ar: "العنوان بالعربية",      // Arabic title (default language)
    en: "Arabic Title in English", // AI-translated English title
  }
}
```

## What This Migration Does

1. **Target Document Type**: `blog.category`
2. **Field Transformation**:

   - Combines `title` (Arabic) and `title_en` (English) into a single localized `title` object
   - Maps `title` → `title.ar` (Arabic as default language)
   - **Uses Gemini AI to translate Arabic titles to English** when `title_en` is missing
   - Maps existing `title_en` → `title.en` (preserves existing English titles)
   - Removes the old `title_en` field after migration

3. **AI Translation Features**:

   - Automatically translates Arabic text to English using Gemini 1.5 Flash
   - Only translates when English title is missing
   - Preserves existing English titles if they exist
   - Graceful error handling - continues migration even if translation fails

4. **Safety Checks**:
   - Skips documents that don't have either `title` or `title_en` fields
   - Skips documents where `title` is already an object (migration already applied)
   - Handles translation failures gracefully

## Prerequisites

1. **Google AI API Key**: You need a Google AI API key for Gemini

   - Get your API key from: https://ai.google.dev/gemini-api/docs/api-key
   - Set the environment variable: `GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here`

2. **Required packages**: Make sure these packages are installed:
   ```bash
   npm install ai @ai-sdk/google
   ```

## How to Run

1. **Set up your Google AI API key**:

   ```bash
   export GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
   ```

2. **Navigate to the Sanity project directory**:

   ```bash
   cd next
   ```

3. **Install required packages** (if not already installed):

   ```bash
   npm install ai @ai-sdk/google
   ```

4. **Run the migration**:

   ```bash
   npx sanity migration run migrate-blog-category-to-localized-title
   ```

5. **Verify the migration**:
   - Check your Sanity Studio to ensure blog categories now have the localized title structure
   - Verify that Arabic titles have been translated to English
   - Check the console output for translation logs

## Rollback

If you need to rollback this migration, you would need to create a reverse migration that:

1. Extracts `title.ar` back to `title`
2. Extracts `title.en` back to `title_en`
3. Removes the localized `title` object

## Notes

- This migration is idempotent - it can be run multiple times safely
- The migration preserves existing data and only transforms the structure
- Make sure to backup your dataset before running any migration in production

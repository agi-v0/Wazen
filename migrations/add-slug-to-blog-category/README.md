# Blog Category Slug Migration

## Purpose

This migration adds a slug field to existing `blog.category` documents and populates it based on the English title (`title.en`) using the slugify function.

## Migration Details

### Before

```typescript
{
  title: {
    en: "English Title",
    ar: "العنوان بالعربية"
  }
  // no slug field
}
```

### After

```typescript
{
  title: {
    en: "English Title",
    ar: "العنوان بالعربية"
  },
  slug: {
    _type: "slug",
    current: "english-title"
  }
}
```

## What This Migration Does

1. **Target Document Type**: `blog.category`
2. **Operations**:
   - Skips documents that already have a slug or lack an English title
   - Computes slug from `title.en` using slugify
   - Sets the slug field as a slug object
3. **Safety**:
   - Idempotent: Safe to run multiple times
   - Only affects documents without existing slugs

## How to Run

1. Navigate to the next directory:
   ```bash
   cd next
   ```
2. Run the migration:
   ```bash
   npx sanity migration run add-slug-to-blog-category
   ```
3. Verify in Sanity Studio that categories now have slugs.

## Notes

- Ensure the schema has been updated to include the slug field before running.
- Backup your dataset before running in production.

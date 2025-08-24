// sanity/sanity.config.js
import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';
import {colorInput} from '@sanity/color-input';
import {codeInput} from '@sanity/code-input';

// Import your schemas
import post from './src/sanity/schemaTypes/post';
import author from './src/sanity/schemaTypes/author';
import category from './src/sanity/schemaTypes/category';

export default defineConfig({
  name: 'default',
  title: 'Modern Blog',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || (() => {
    throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please add it to your .env.local file.')
  })(),
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Featured section for easy access
            S.listItem()
              .title('Featured Posts')
              .child(
                S.documentTypeList('post')
                  .title('Featured Posts')
                  .filter('featured == true')
              ),
            S.divider(),
            // Regular content sections
            S.listItem()
              .title('Posts')
              .child(S.documentTypeList('post').title('Posts')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    visionTool(), // Useful for testing GROQ queries
    colorInput(),
    codeInput()
  ],

  schema: {
    types: [post, author, category],
  },

  document: {
    // Remove 'delete' action for published posts to prevent accidents
    actions: (prev, {schemaType}) => {
      if (schemaType === 'post') {
        return prev.filter(({action}) => action !== 'delete')
      }
      return prev
    },
  },
})
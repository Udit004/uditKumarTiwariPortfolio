// sanity/sanity.config.js
import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';
import {visionTool} from '@sanity/vision';

// Import your schemas
import post from './src/sanity/schemaTypes/post.js';
import author from './src/sanity/schemaTypes/author.js';
import category from './src/sanity/schemaTypes/category.js';

export default defineConfig({
  name: 'default',
  title: 'Udit Portfolio Blog',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
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
    visionTool() // Useful for testing GROQ queries
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
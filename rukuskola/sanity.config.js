import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'rukuskola',

  projectId: 'grqykmy9',
  dataset: 'rukuskola-db',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

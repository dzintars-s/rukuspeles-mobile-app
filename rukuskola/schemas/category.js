import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Uzdevumi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Uzdevuma nosaukums',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Uzdevuma bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Spēles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Spēles nosaukums',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Spēles apraksts',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Spēles bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Uzdevumi',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'body',
      title: 'Par ko būs spēle?',
      type: 'blockContent',
    }),
  ],
})

import { defineField, defineType } from 'sanity'

export const project = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Automotive', value: 'Automotive' },
                    { title: 'Game Art', value: 'Game Art' },
                    { title: 'Texture', value: 'Texture' },
                    { title: 'Architecture', value: 'Architecture' },
                    { title: 'Abstract', value: 'Abstract' },
                    { title: 'Sports', value: 'Sports' },
                    { title: 'Typography', value: 'Typography' },
                    { title: 'Portrait', value: 'Portrait' },
                    { title: 'Legend', value: 'Legend' },
                ]
            }
        }),
        defineField({
            name: 'hexColor',
            title: 'Hex Color (e.g. #FF0000)',
            type: 'string',
            initialValue: '#000000',
        }),
        defineField({
            name: 'size',
            title: 'Grid Size',
            type: 'string',
            options: {
                list: [
                    { title: 'Small (1x1)', value: 'small' },
                    { title: 'Medium (Tall 1x2)', value: 'medium' },
                    { title: 'Large (2x2)', value: 'large' },
                ],
                layout: 'radio'
            },
            initialValue: 'small'
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})

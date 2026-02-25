import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
    projectId: projectId || 'dummy',
    dataset: dataset || 'production',
    apiVersion,
    useCdn,
    perspective: 'published',
})

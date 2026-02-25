export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    category?: string;
    imageUrl?: string;
    size?: 'small' | 'medium' | 'large';
    publishedAt?: string;
    hexColor?: string;
    description?: string;
    mainImage?: unknown;
    dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
    };
}

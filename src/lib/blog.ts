import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface Post {
    slug: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    content: string;
    image: string;
    tags?: string[];
    keywords?: string;
}

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []): Post {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items: Record<string, string | string[] | undefined> = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });

    return items as unknown as Post;
}

export function getAllPosts(fields: string[] = []): Post[] {
    const slugs = getPostSlugs();
    // Always include 'date' in fields for sorting
    const fieldsToFetch = fields.includes('date') ? fields : [...fields, 'date'];

    const posts = slugs
        .filter((slug) => slug.endsWith('.md'))
        .map((slug) => getPostBySlug(slug, fieldsToFetch))
        .sort((post1, post2) => {
            const date1 = post1.date ? new Date(post1.date).getTime() : 0;
            const date2 = post2.date ? new Date(post2.date).getTime() : 0;
            return (date2 || 0) - (date1 || 0);
        });
    return posts;
}

export async function markdownToHtml(markdown: string) {
    const result = await remark().use(remarkGfm).use(html).process(markdown);
    return result.toString();
}

/**
 * Format blog post date from YYYY-MM-DD to DD MMM YYYY format
 * Example: "2026-01-17" -> "17 Jan 2026"
 */
export function formatBlogDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
}

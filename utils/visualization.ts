import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface VisualizationContent {
    algorithm_id: string
    content: string
}
const visContentDir = path.join(process.cwd(), '/visualization_content');

export const getAllVisualizationContent = async (): Promise<VisualizationContent[]> => {
    const fileNames = fs.readdirSync(visContentDir);
    const data = fileNames.map(async (fileName: string) => {
        return await getVisualizationContent(fileName.replace(/\.md$/, ''));
    });
    return await Promise.all(data);
}

export const getVisualizationContent = async (algorithm_id: string): Promise<VisualizationContent> => {
    // get the algorithm's associated content
    const fullPath = path.join(visContentDir, `${algorithm_id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);
    const content = matterResult.content;

    return {
        algorithm_id,
        content
    };

}
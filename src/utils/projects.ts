import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), '/src/projects');

export const getAllProjectsData = () => {
    const projectNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = projectNames.map((project) => {
        const id = project.replace(/\.md$/, '');

        const fullPath = path.join(projectsDirectory, project);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);
        console.log(matterResult);

        return {
            id,
            ...matterResult.data,
        };
    });

    return allProjectsData.sort((a: any, b: any) => {
        if (a.date < b.date) {
            return 1;
        } else if (a.date > b.date) {
            return -1;
        } else {
            return 0;
        }
    });
}

export const getAllProjectIds = () => {
    const fileNames = fs.readdirSync(projectsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                project_id: fileName.replace(/\.md$/, ''),
            }
        }
    });
}

export const getProjectData = async (project_id) => {
    const fullPath = path.join(projectsDirectory, `${project_id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);
    const content = matterResult.content;
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        project_id,
        content,
        ...matterResult.data,
    };

}
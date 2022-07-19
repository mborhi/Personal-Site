import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), '/projects');

/**
 * Gets the list of all the markdown data of markdown files in ./projects directory
 * @returns the list of markdown data
 */
export const getAllProjectsData = () => {
    const projectNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = projectNames.map((project) => {
        const id = project.replace(/\.md$/, '');

        const fullPath = path.join(projectsDirectory, project);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });

    // sort the markdown data by date
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

/**
 * Gets a list of all project_ids from makrdown files in the ./projects directory
 * @returns list of all project_ids
 */
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

/**
 * Returns the data of the given project specified by its id
 * @param project_id the id of the project to get data
 * @returns the projects data
 */
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
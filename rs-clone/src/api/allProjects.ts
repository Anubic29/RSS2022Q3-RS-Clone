import ProjectType from '../types/project/projectType';
import { ACCESS_TOKEN, BASE_URL } from './config';
import { ProjectCreateBody } from '../types/project/projectCreateBody';

async function getProjectsRequest(userId: string): Promise<ProjectType[]> {
  const res = await fetch(`${BASE_URL}/projects?user=${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  return await res.json();
}

async function deleteProjectRequest(id: string) {
  await fetch(`${BASE_URL}/projects/${id}/info`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
}

async function createProjectRequest(body: ProjectCreateBody) {
  await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export { getProjectsRequest, deleteProjectRequest, createProjectRequest };

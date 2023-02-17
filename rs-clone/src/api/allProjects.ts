import ProjectType from '../types/project/projectType';

export type ProjectCreateBody = Pick<
  ProjectType,
  'title' | 'description' | 'author' | 'pathImage' | 'key' | 'color'
>;

const BASE_URL = 'http://localhost:5050/api';
const ACCESS_TOKEN = localStorage.getItem('accessToken');

async function getCurrentUserId(): Promise<string> {
  const res = await fetch(`${BASE_URL}/users/current`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
  const user = await res.json();

  return user._id;
}

async function getProjectsRequest(): Promise<ProjectType[]> {
  const currentUserId = await getCurrentUserId();
  const res = await fetch(`${BASE_URL}/projects?user=${currentUserId}`, {
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

export { getProjectsRequest, deleteProjectRequest, createProjectRequest, getCurrentUserId };

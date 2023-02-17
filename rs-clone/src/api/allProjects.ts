interface ColumnList {
  _id: string;
  title: string;
  type: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  key: string;
  author: string;
  team: string[];
  pathImage: string;
  boardTitle: string;
  color: string;
  columnList: ColumnList;
}

export type ProjectCreateBody = Pick<
  Project,
  'title' | 'description' | 'author' | 'pathImage' | 'key' | 'color'
>;

const BASE_URL = 'http://localhost:5050/api';
const ACCESS_TOKEN = JSON.parse(localStorage.getItem('accessToken') as string);

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

async function getProjects(): Promise<Project[]> {
  const currentUserId = await getCurrentUserId();
  const res = await fetch(`${BASE_URL}/projects?user=${currentUserId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });

  return await res.json();
}

async function deleteProject(id: string) {
  await fetch(`${BASE_URL}/projects/${id}/info`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  });
}

async function createProject(body: ProjectCreateBody) {
  await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export { getProjects, deleteProject, createProject, getCurrentUserId };

import React from 'react';
import { useUser, useProjects } from '../../../../contexts';

function OwnProjects() {
  const { ...userData } = useUser();
  const { ...projects } = useProjects();

  console.log(projects.getProjects(userData.currentUser as unknown as string));

  return <div>OwnProjects</div>;
}

export default OwnProjects;

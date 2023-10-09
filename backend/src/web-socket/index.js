const WebSocket = require('ws');
const openHandler = require('./handlers/open');
const joinHandler = require('./handlers/join');
const projectsHandler = require('./handlers/projects');
const tasksHandler = require('./handlers/tasks');
const columnsHandler = require('./handlers/columns');
const commentsHandler = require('./handlers/comments');
const teamHandler = require('./handlers/team');
const notedHandler = require('./handlers/noted');
const userHandler = require('./handlers/user');

const userDucts = {};

function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server: server });
  
  wss.on('connection', function connection(socket) {
    let userId = '';
    let projectEnv;

    socket.on('message', async function incoming(mess) {
      const req = JSON.parse(mess);

      try {
        const objDuct = {
          current: { id: userId, array: userDucts[userId]},
          all: userDucts
        }

        switch (req.type) {
          case 'open':
            userId = await openHandler(socket, req.token);
            if (!userDucts[userId]) userDucts[userId] = [];
            userDucts[userId].push({ socket, projectEnv: undefined });
            break;
          case 'user':
            await userHandler(req.method, req.data, objDuct);
            break;
          case 'join':
            await joinHandler(socket, userId, req.projectId);
            userDucts[userId].find((client) => client.socket === socket).projectEnv = req.projectId;
            projectEnv =  req.projectId;
            break;
          case 'leave':
            userDucts[userId].find((client) => client.socket === socket).projectEnv = undefined;
            projectEnv =  undefined;
            break;
          case 'noted':
            await notedHandler(req.method, req.data, objDuct);
            break;
          case 'project':
            await projectsHandler(req.method, req.data, objDuct);
            break;
          case 'task':
            if (projectEnv) await tasksHandler(req.method, req.data, objDuct, projectEnv);
            break;
          case 'team':
            await teamHandler(req.method, req.data, objDuct);
            break;
          case 'column':
            await columnsHandler(req.method, req.data, objDuct);
            break;
          case 'comment':
            if (projectEnv) await commentsHandler(req.method, req.data, objDuct, projectEnv, socket);
            break;
        }
      } catch (error) {
        console.error(error);
        const alert = {type: 'error', message: error.message};
        socket.send(JSON.stringify({type: 'alerts', method: 'get', data: [alert]}));
        return;
      }
    });

    socket.on('close', () => {
      if (userDucts[userId].length === 1) delete userDucts[userId];
      else {
        const idx = userDucts[userId].findIndex((client) => client.socket === socket);
        userDucts[userId].splice(idx, 1);
      }
    });
  });

  return userDucts;
}

module.exports = createWebSocketServer;

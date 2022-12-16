const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { readOneUserFromId } = require('./users');

const jsonDbPath = path.join(__dirname, '/../data/forum.json');

const defaultThreads = [
  {
    id: 1,
    author: 1,
    date: Math.round(new Date('03/12/2022').getTime() / 1000).toString(),
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    content: `Fusce euismod eros commodo lectus aliquet ultrices eget sed felis. Nulla placerat`,
    replies: [
      {
        id: 2,
        author: 1,
        date: Math.round(new Date('03/12/2022').getTime() / 1000).toString(),
        content: `Fusce euismod eros commodo lectus aliquet ultrices eget sed felis. Nulla placerat`,
      },
    ],
  },
];

function getInfo(_thread) {
  if (!_thread) return _thread;

  // Clone the thread to avoid modifying the original object
  try {
    const thread = JSON.parse(JSON.stringify(_thread));

    // Add author info
    let user = readOneUserFromId(thread.author);
    if (!user) user = { id: thread.author, username: 'Inconnu' };
    thread.author = {
      id: user.id,
      username: user.username,
    };

    if (thread.replies) thread.replies = thread.replies.map(getInfo);

    return thread;
  } catch (e) {
    console.error(e);
    return _thread;
  }
}

// Internal function to get the threads from the json file
function getThreads() {
  const threads = parse(jsonDbPath, defaultThreads);

  return threads;
}

function readAllThreads() {
  const threads = getThreads();

  return threads.map(getInfo);
}

function readOneThread(id) {
  const threads = getThreads();
  const thread = threads.find((p) => p.id === Number(id));

  return getInfo(thread);
}

function createThread(thread) {
  if (!thread.author || !thread.title || !thread.content)
    throw new Error('Le titre et le contenu sont obligatoires');

  const title = thread.title.trim();
  const content = thread.content.trim();

  if (title.length < 3 || title.length > 100)
    throw new Error('Le titre doit être compris entre 3 et 100 caractères');
  if (content.length < 3 || content.length > 400)
    throw new Error('Le contenu doit être compris entre 3 et 400 caractères');

  const threads = getThreads();
  const newThread = {
    id: Date.now(),
    title,
    content,
    author: thread.author,
    replies: [],
    date: Math.round(new Date().getTime() / 1000).toString(),
  };

  threads.unshift(newThread);

  serialize(jsonDbPath, threads);
  return getInfo(newThread);
}

function replyToThread(threadId, reply) {
  if (!reply.author || !reply.content) throw new Error('Le contenu est requis');
  if (!threadId) throw new Error("L'identifiant du fil est requis");

  const content = reply.content.trim();

  if (content.length < 3 || content.length > 400)
    throw new Error('Le contenu doit être compris entre 3 et 400 caractères');

  const threads = getThreads();
  const thread = threads.find((p) => p.id === Number(threadId));

  if (!thread) throw new Error('Fil de discussion introuvable');

  const newReply = {
    id: Date.now(),
    content: content,
    author: reply.author,
    date: Math.round(new Date().getTime() / 1000).toString(),
  };
  thread.replies.push(newReply);

  serialize(jsonDbPath, threads);
  return getInfo(newReply);
}

function deleteThread(id) {
  const threads = getThreads();
  const threadIndex = threads.findIndex((p) => p.id === Number(id));

  if (threadIndex === -1) throw new Error('Fil de discussion introuvable');

  threads.splice(threadIndex, 1);

  serialize(jsonDbPath, threads);
}

function deleteReply(threadId, replyId) {
  const threads = getThreads();
  const thread = threads.find((p) => p.id === Number(threadId));

  if (!thread) throw new Error('Fil de discussion introuvable');

  const replyIndex = thread.replies.findIndex((p) => p.id === Number(replyId));

  if (replyIndex === -1) throw new Error('Réponse introuvable');

  thread.replies.splice(replyIndex, 1);

  serialize(jsonDbPath, threads);
}

module.exports = {
  readAllThreads,
  readOneThread,

  createThread,
  replyToThread,

  deleteThread,
  deleteReply,
};

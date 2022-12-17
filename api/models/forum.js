// @ts-check
const db = require('../utils/database');
const { readOneUserFromId } = require('./users');

const defaultThreads = [
  {
    id: 1,
    author: 1,
    title: 'Bienvenue sur le forum ! 🐈',
    content:
      'Ce forum est un espace de discussion pour ceux qui ont des questions sur le cours ou qui veulent partager des astuces.\n' +
      "Vous pouvez aussi utiliser ce forum pour discuter entre vous, mais n'oubliez pas que ce forum est public et que tout le monde peut y accéder.\n" +
      'Le markdown est supporté, vous pouvez donc utiliser des **gras**, des *italiques* et des [liens](https://vinci.be).\n' +
      'Nous espérons que vous allez apprécier notre bon site ! 🐈‍⬛🐈\n\n' +
      "*L'équipe de CatByte* 🐱",
    replies: [],
    date: Math.floor(Date.now() / 1000),

    pinned: true,
    locked: true,
  },
];

db.setDefault('/forum', defaultThreads);

async function getInfo(_thread) {
  if (!_thread) return _thread;

  try {
    // Clone the thread to avoid modifying the original object
    const thread = JSON.parse(JSON.stringify(_thread));

    // Add author info
    let user = await readOneUserFromId(thread.author);
    if (!user) user = { id: thread.author, username: 'Inconnu' };
    thread.author = {
      id: user.id,
      username: user.username,
    };

    if (thread.replies) thread.replies = await Promise.all(thread.replies.map(getInfo));

    return thread;
  } catch (e) {
    return _thread;
  }
}

// Internal function to get the threads from the json file
async function getThreads() {
  const threads = await db.get('/forum');

  return threads;
}

async function readAllThreads() {
  const threads = await getThreads();

  return (await Promise.all(threads.map(getInfo))).sort((a, b) => b.date - a.date);
}

async function readOneThread(id) {
  const threads = await getThreads();
  const thread = threads.find((p) => p.id === Number(id));

  return getInfo(thread);
}

async function createThread(thread) {
  if (!thread.author || !thread.title || !thread.content)
    throw new Error('Le titre et le contenu sont obligatoires');

  const title = thread.title.trim();
  const content = thread.content.trim();

  if (title.length < 3 || title.length > 100)
    throw new Error('Le titre doit être compris entre 3 et 100 caractères');
  if (content.length < 3 || content.length > 400)
    throw new Error('Le contenu doit être compris entre 3 et 400 caractères');

  const newThread = {
    id: Date.now(),
    title,
    content,
    author: thread.author,
    replies: [],
    date: Math.round(new Date().getTime() / 1000).toString(),
  };

  await db.push('/forum[]', newThread);

  return getInfo(newThread);
}

async function replyToThread(threadId, reply) {
  if (!reply.author || !reply.content) throw new Error('Le contenu est requis');
  if (!threadId) throw new Error("L'identifiant du fil est requis");

  const content = reply.content.trim();

  if (content.length < 3 || content.length > 400)
    throw new Error('Le contenu doit être compris entre 3 et 400 caractères');

  const threads = await getThreads();
  const threadIndex = threads.findIndex((p) => p.id === Number(threadId));

  if (threadIndex === -1) throw new Error('Fil de discussion introuvable');

  const newReply = {
    id: Date.now(),
    content,
    author: reply.author,
    date: Math.round(new Date().getTime() / 1000).toString(),
  };

  await db.push(`/forum[${threadIndex}]/replies[]`, newReply);

  return getInfo(newReply);
}

async function deleteThread(id) {
  const threads = await getThreads();
  const threadIndex = threads.findIndex((p) => p.id === Number(id));

  if (threadIndex === -1) throw new Error('Fil de discussion introuvable');

  await db.delete(`/forum[${threadIndex}]`);
}

async function deleteReply(threadId, replyId) {
  const threads = await getThreads();
  const threadIndex = threads.findIndex((p) => p.id === Number(threadId));

  if (threadIndex === -1) throw new Error('Fil de discussion introuvable');

  const replyIndex = (await db.get(`/forum[${threadIndex}]/replies`)).findIndex(
    (p) => p.id === Number(replyId),
  );

  if (replyIndex === -1) throw new Error('Réponse introuvable');

  await db.delete(`/forum[${threadIndex}]/replies[${replyIndex}]`);
}

async function deleteAuthorPosts(authorId) {
  const threads = await getThreads();

  // The linter complains about this but I need to run these in sequence
  // eslint-disable-next-line no-restricted-syntax
  for (const thread of threads) {
    if (thread.author === authorId) {
      // eslint-disable-next-line no-await-in-loop
      await deleteThread(thread.id);
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const reply of thread.replies) {
        if (reply.author === authorId) {
          // eslint-disable-next-line no-await-in-loop
          await deleteReply(thread.id, reply.id);
        }
      }
    }
  }
}

module.exports = {
  readAllThreads,
  readOneThread,

  createThread,
  replyToThread,

  deleteThread,
  deleteReply,

  deleteAuthorPosts,
};

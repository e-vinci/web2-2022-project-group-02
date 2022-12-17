// @ts-check
const express = require('express');
const {
  readAllThreads,
  readOneThread,
  createThread,
  replyToThread,
  deleteThread,
  deleteReply,
} = require('../models/forum');
const { authorize } = require('../utils/auths');

const router = express.Router();

/* Get all threads */
router.get('/', async (req, res) => {
  const threads = await readAllThreads();

  if (req.query.author) {
    const { author } = req.query;
    console.log(threads, author, typeof author, Number(author));
    return res.json(threads.filter((thread) => thread.author.id === Number(author)));
  }

  return res.json(threads);
});

/* Get one thread */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const thread = await readOneThread(id);

  if (!thread) return res.sendStatus(404);

  return res.json(thread);
});

/* Create a thread */
router.post('/', authorize, async (req, res) => {
  const thread = req.body;

  if (!thread || typeof thread !== 'object') throw new Error('Invalid thread');

  const newThread = await createThread({ ...thread, author: req.user.id });

  return res.json(newThread);
});

/* Reply to a thread */
router.post('/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const reply = req.body;

  if (!reply || typeof reply !== 'object') throw new Error('Invalid reply');

  const newReply = await replyToThread(id, { ...reply, author: req.user.id });

  return res.json(newReply);
});

/* Delete a thread */
router.delete('/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const thread = await readOneThread(id);

  if (!thread) throw new Error('Thread not found');

  if (thread.author.id !== req.user.id && req.user.username !== 'admin') return res.sendStatus(401);

  await deleteThread(id);

  return res.json({ status: 'OK' });
});

/* Delete a reply */
router.delete('/:id/:replyId', authorize, async (req, res) => {
  const { id } = req.params;
  const { replyId } = req.params;
  const thread = await readOneThread(id);

  if (!thread) throw new Error('Thread not found');

  const reply = thread.replies.find((rep) => rep.id === Number(replyId));

  if (!reply) throw new Error('Reply not found');

  if (reply.author.id !== req.user.id && req.user.username !== 'admin') return res.sendStatus(401);

  await deleteReply(id, replyId);

  return res.json({ status: 'OK' });
});

module.exports = router;

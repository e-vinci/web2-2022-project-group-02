import express from 'express';

import EM from './em.js';

const router = express.Router();

function sendError(res, err) {
  res.contentType('text/javascript');
  res.send(`
    postMessage({
      error: ${JSON.stringify(err.trim())},
    });
  `);
}

router.post('/', async (req, res) => {
  if (typeof req.body.code !== 'string') {
    res.status(400).json({ error: 'code is not a string' });
    return;
  }

  try {
    const wasm = await EM.compile(req.body.code);

    res.contentType('text/javascript');
    res.send(wasm);
  } catch (err) {
    let errorString = err?.message || "Une erreur interne s'est produite";
    errorString = errorString.replaceAll(/^Aborted.*$/gm, '');

    sendError(res, errorString);
  }
});

export default router;

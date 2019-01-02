
import BetterQueue from 'better-queue';
import express from 'express';

import {processor, ProcessResult} from './processor';

const app = express();

const queue = new BetterQueue({process: processor, concurrent: 10});

app.post('/:id', (req, res) => {
  queue.push(req.params.id)
    .on('queued', () => {
      console.log('task queued');
      res.sendStatus(202);
    })
    .on('failed', (err) => {
      console.log('failed to process', err);
    })
    .on('finish', (result: ProcessResult) => {
      console.log('finished', result);
      // res.status(200);
    });
});

app.listen(8080, () => {
  console.log('Server started listening on port 8080.');
});

// Queue Level Ticket Handling

// fired when item is queued
// queue.on('task_queued', (taskId: string, value: number) => {
//   console.log('task queued', taskId, value);
// });

// fired when cb is called with error
// fired after push.on('failed') finishes;
// queue.on('task_failed', (taskId: string, errorMessage: string) => {
//   console.log('task failure', taskId, errorMessage);
// });

// fired when queue starts to process queue item.
// queue.on('task_started', (taskId: string, value: number) => {
//   console.log('task started', taskId, value);
// });

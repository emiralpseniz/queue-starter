
import BetterQueue from 'better-queue';

interface ProcessResult {
  task: number;
  message: string;
}

const processor: BetterQueue.ProcessFunction<number, ProcessResult> = (task: number, cb: BetterQueue.ProcessFunctionCb<ProcessResult>) => {
  console.log('processing queue item', task);
  if (task === 2.5) {
    cb('Invalid number');
  } else {
    // we have to call the callback to proceed with next elements in the queue.
    cb(undefined, {task, message: 'success'});
  }
};

const queue = new BetterQueue({process: processor});

// fired when item is queued
queue.on('task_queued', (taskId: string, value: number) => {
  console.log('task queued', taskId, value);
});

// fired when cb is called with error
// fired after push.on('failed') finishes;
queue.on('task_failed', (taskId: string, errorMessage: string) => {
  console.log('task failure', taskId, errorMessage);
});

// fired when queue starts to process queue item.
// queue.on('task_started', (taskId: string, value: number) => {
//   console.log('task started', taskId, value);
// });

queue.push(1).on('finish', (result: ProcessResult) => {
  console.log('finished', result);
});

queue.push(2).on('finish', (result: ProcessResult) => {
  console.log('finished', result);
});

queue.push(2.5)
  .on('finish', (result: ProcessResult) => {
    console.log('finished', result);
  })
  .on('failed', (err, result) => {
    console.log('failed to process', err);
  });

queue.push(3).on('finish', (result: ProcessResult) => {
  console.log('finished', result);
});

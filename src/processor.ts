import {ProcessFunction, ProcessFunctionCb} from 'better-queue';

export interface ProcessResult {
  task: number;
  message: string;
}

export const processor: ProcessFunction<number, ProcessResult> = (task: number, cb: ProcessFunctionCb<ProcessResult>) => {
  console.log('processing queue item', task);
  setTimeout(() => {
    if (task == 2.5) {
      cb('Invalid number');
    } else {
      // we have to call the callback to proceed with next elements in the queue.
      cb(undefined, {task, message: 'success'});
    }
  }, 3000);
};

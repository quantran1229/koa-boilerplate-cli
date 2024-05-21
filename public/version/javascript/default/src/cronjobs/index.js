// import {CronJob} from 'cron';

import logger from '../utils/logger';

logger.info('Cronjobs started!');

// Cron job example. https://www.npmjs.com/package/cron. Checking cronjob with https://crontab.guru/
// const cronJob = new CronJob('0 * * * * *', async () => {
//   logger.info('CronJob run each mins');
//   await diamondSerialService.validateAllDiamondSerials({});
// });

const cronList = [];
console.log('START CRON. Total cron:', cronList.length);
cronList.forEach((cron) => {
  console.log('Next start', cron.nextDate().toISOTime());
  cron.start();
});
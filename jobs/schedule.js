const cron = require('node-cron');

const schedule = (timing, cb) => {
  return cron.schedule(timing, () => {
    cb();
  });
};

module.exports = schedule;

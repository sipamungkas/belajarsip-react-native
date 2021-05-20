import moment from 'moment';

export function durationToTime(start, duration) {
  const startAt = moment(start, 'hh:mm:ss').format('HH:mm');
  const endAt = moment(start, 'hh:mm:ss').add(duration, 'ms').format('HH:mm');
  return `${startAt} - ${endAt}`;
}

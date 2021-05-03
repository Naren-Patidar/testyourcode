import moment from 'moment';

export const toUtcMoment = (utc: Date | null): moment.Moment => {
  const utcMoment: moment.Moment = moment.utc(utc);
  return utcMoment;
};

export const toLocalMoment = (utc: Date | null): moment.Moment => {
  const localMoment: moment.Moment = moment(utc).local();

  return localMoment;
};

export const toLocalDate = (utc: string | null): Date => {
  const localMoment: Date = moment(`${utc}Z`).local().toDate();

  return localMoment;
};
export const toLocalTimeFormatted = (
  utc: Date | null,
  format = 'MMM DD, YYYY | hh:mm A'
): string => {
  const localMoment: moment.Moment = toLocalMoment(utc);
  const localFormattedTime: string = localMoment.format(format);

  return localFormattedTime;
};

export const toLocalTimeStringFormatted = (
  utc: string,
  format = 'MMM DD, YYYY | hh:mm A'
): string => {
  const localMoment: moment.Moment = moment(`${utc}Z`).local();
  const localFormattedTime: string = localMoment.format(format);

  return localFormattedTime;
};

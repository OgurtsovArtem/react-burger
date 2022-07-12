import moment from "moment";

export const formatDate = (orderTimeISO: string | undefined): string => {
  const orderDay = moment(orderTimeISO).format('DD');
  const orderTime = moment(orderTimeISO).format('HH:mm');
  const today = moment().format('DD');

  const yesterdayMessageFromOrder = moment(orderTimeISO).fromNow();

  if (orderDay === today) {
      return `сегодня, ${orderTime}`;
  } else if (Number(orderDay) + 1 === Number(today)) {
      return `вчера, ${orderTime}`;
  } else {
      return `${yesterdayMessageFromOrder}, ${orderTime}`;
  }
};
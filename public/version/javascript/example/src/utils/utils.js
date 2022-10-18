import Constant from '../constants';

// Write all util functions here. Some of sample functions.

// Paging function to set default list
export function paging(query) {
  const pager = {
    limit: 20,
    offset: 0,
  };
  if (query['getAll'] && query['getAll'].toString() === 'true') {
    return {};
  }
  const page = query['page']
    ? parseInt(query['page'].toString(), 10)
    : Constant.instance.DEFAULT_PAGE_NUMBER;
  const limit = query['limit']
    ? parseInt(query['limit'].toString(), 10)
    : Constant.instance.DEFAULT_LIMIT_PER_PAGE;
  pager.limit = limit;
  pager.offset = (page - 1) * limit;
  return pager;
}

export function bytesToHumanValue(n) {
  // Calculate bytes to human readable value
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (n == 0) {
    return 'n/a';
  }
  const i = parseInt(Math.floor(Math.log(n) / Math.log(1024)));
  if (i == 0) {
    return n + ' ' + sizes[i];
  }
  return (n / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}

export function secondToHumanValue(n) {
  let result = '';
  n = Math.ceil(n);
  const day = Math.floor(n / (24 * 60 * 60));
  if (day > 0) {
    result = result + `${day} day `;
  }
  n = n - day * 24 * 60 * 60;
  const hours = Math.floor(n / (60 * 60));
  const mins = Math.floor((n - 60 * 60 * hours) / 60);
  const sec = n - 60 * 60 * hours - mins * 60;
  result =
    result +
    `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}:${
      sec < 10 ? '0' + sec : sec
    }`;
  return result;
}

export function getRandomString(length) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

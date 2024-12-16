interface Query {
  page: string;
  total: string;
}
interface ResQuery {
  limit: number;
  offset: number;
}
const pagination = (query: Query) => {
  const { page, total } = query;
  if (page && total) {
    const limit: number = total ? Number(total) : 10;
    const offset: number = Number(page) * limit - limit;
    const queryGet: ResQuery = {
      offset: offset,
      limit: limit,
    };
    return queryGet;
  } else {
    return {};
  }
};
export { pagination, Query, ResQuery };

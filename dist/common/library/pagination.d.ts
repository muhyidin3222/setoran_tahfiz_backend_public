interface Query {
    page: string;
    total: string;
}
interface ResQuery {
    limit: number;
    offset: number;
}
declare const pagination: (query: Query) => {};
export { pagination, Query, ResQuery };

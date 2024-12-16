export default function responeSuccess({
  status_code,
  status_message,
  data,
  total,
}: any) {
  return {
    status_code: status_code || 200,
    status_message: status_message || 'Success respone data',
    total,
    data: data || [],
  };
}

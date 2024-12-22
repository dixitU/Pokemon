import client from '../utility/client';

export const getList = async ({limit, offset}: any) => {
  const {data} = await client.get<any>(`/v2/pokemon?limit=${limit}&offset=${offset}`);
  return data;
}

export async function getDetail(id: any) {
  const {data} = await client.get<{data: any}>(`/v2/pokemon/${id}/`);
  return data;
}

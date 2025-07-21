import { Result } from 'gm-app-components';

/**
 * 获取文件内容
 */
export const getFileBodyApi = (path: string) =>
  window.$gm.request<Result>(`/api/files/read_file_body`, {
    method: 'post',
    data: {
      path,
      auto_create: '0',
    },
  });

/**
 * 保存文件内容
 */
export const saveFileBodyApi = (data: {
  path: string;
  data: string;
  encoding?: string;
}) =>
  window.$gm.request<Result>(`/api/files/write_file_body`, {
    method: 'post',
    data,
  });

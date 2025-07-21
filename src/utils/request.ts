import { i18n } from '@/locales';
const $t = (...args) => i18n.global.t(...args);
import { naiveui, Result } from 'gm-app-components';
const request = <T = Result>(
  url: string,
  data: { [key: string]: any } = {}
): Promise<T> => {
  return new Promise((resolve, reject) => {
    return window.$gm
      .request<Result>(url, {
        method: 'post',
        data,
      })
      .then((res) => {
        if (res.code == 200000) {
          resolve(res as T);
        } else {
          reject(res);
          naiveui.message.error(res?.data?.msg || $t('utils.request.LNfO6O'));
        }
      })
      .catch((err) => {
        reject(err);
        naiveui.message.error($t('utils.request.LNfO6O'));
      });
  });
};
export default request;

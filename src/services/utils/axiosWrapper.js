/**
 * axios 二次包装 用于全局处理请求异常
 * */

import axios, { CancelToken } from 'axios';
import { BusinessError, NetError, CancelError } from './errors';

export class AxiosCancelablePromise extends Promise {
  constructor(excutor, cancelToken) {
    super(excutor);
    this.cancelToken = cancelToken;
  }

  /**
   * 中断当前请求，但是不会抛出任何错误
   * 你应该自己处理中断请求后的操作
   */
  cancel() {
    this.cancelToken.cancel();
  }
}

/**
 * 二次封装axios实例
 */
class Wrapper {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  _wrapReq(req, cancelTokenSource) {
    return new AxiosCancelablePromise((resolve, reject) => {
      req.then((res) => {
        const {data} = res;

        if (data.errcode === 0) {
          resolve(data);
        } else {
          reject(new BusinessError(data.errcode, data.errmsg));
        }
      }).catch((e) => {
        if (axios.isCancel(e)) {
          return reject(new CancelError('request canceled'));
        }

        const errcode = Number(e.code) || 0;

        reject(new NetError(errcode));
      });
    }, cancelTokenSource);
  }

  head(url, config) {
    const cancelTokenSource = CancelToken.source();

    return this._wrapReq(
      this.axiosInstance.head(url, Object.assign(config || {}, {cancelToken: cancelTokenSource.token})),
      cancelTokenSource
    );
  }

  get(url, config) {
    const cancelTokenSource = CancelToken.source();

    return this._wrapReq(
      this.axiosInstance.get(url, Object.assign(config || {}, {cancelToken: cancelTokenSource.token})),
      cancelTokenSource
    );
  }

  delete(url, config) {
    const cancelTokenSource = CancelToken.source();

    return this._wrapReq(
      this.axiosInstance.delete(url, Object.assign(config || {}, {cancelToken: cancelTokenSource.token})),
      cancelTokenSource
    );
  }

  post(url, data, config) {
    const cancelTokenSource = CancelToken.source();

    return this._wrapReq(
      this.axiosInstance.post(url, data, Object.assign(config || {}, {cancelToken: cancelTokenSource.token})),
      cancelTokenSource
    );
  }

  put(url, data, config) {
    const cancelTokenSource = CancelToken.source();

    return this._wrapReq(
      this.axiosInstance.put(url, data, Object.assign(config || {}, {cancelToken: cancelTokenSource.token})),
      cancelTokenSource
    );
  }

  patch(url, data, config) {
    const cancelTokenSource = CancelToken.source();

    return this._wrapReq(
      this.axiosInstance.patch(url, data, Object.assign(config || {}, {cancelToken: cancelTokenSource.token})),
      cancelTokenSource
    );
  }
}


export default Wrapper;

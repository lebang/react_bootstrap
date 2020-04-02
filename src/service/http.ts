import axios, { AxiosRequestConfig as _AxiosRequestConfig } from "axios";
import { Toast } from "antd-mobile";
import { domain, loginDomain } from "./domain";

export interface AxiosRequestConfig extends _AxiosRequestConfig {
    startTime?: Date;
}

interface IParam {
    [propsName: string]: any;
}

export interface HttpResquest {
    get(url: string, data: IParam, baseUrl?: string): Promise<any>;
    post(url: string, data: IParam, baseUrl?: string): Promise<any>;
    delete(url: string, data: IParam, baseUrl?: string): Promise<any>;
    put(url: string, data: IParam, baseUrl?: string): Promise<any>;
}

enum HTTPERROR {
    LOGICERROR,
    TIMEOUTERROR,
    NETWORKERROR
}

const TOKENERROR = [6002, 40006, 40003];

const DEFAULTCONFIG = {
    baseURL: domain
};

const http = {} as HttpResquest;
const methods = ["get", "post", "put", "delete"] as const;

let authTimer: number;

const isSuccess = (res: any) => res.resultCode === 200 || res.code === 0;
const resFormat = (res: any) => res.response || res || {};

methods.forEach(v => {
    http[v] = (url: string, data: IParam, baseUrl?: string) => {
        const axiosConfig: AxiosRequestConfig = {
            method: v,
            url,
            baseURL: baseUrl || DEFAULTCONFIG.baseURL,
            withCredentials: true // 跨域
        };
        const instance = axios.create(DEFAULTCONFIG);
        // Add a request interceptor
        instance.interceptors.request.use(
            cfg => {
                const ts = Date.now() / 1000;
                const queryData = { ts };
                cfg.params = { ...cfg.params, ...queryData };
                return cfg;
            },
            error => Promise.reject(error)
        );
        // Add a response interceptor
        instance.interceptors.response.use(
            response => {
                let json = null;
                // response.data为后端返回的所有数据
                if (typeof response.data === "object" && !isNaN(response.data.length)) {
                    json = response.data[0];
                } else {
                    json = response.data;
                }
                if (!isSuccess(json)) {
                    const _err = {
                        msg: json.resultMsg || json.message,
                        errCode: json.resultCode || json.code,
                        type: HTTPERROR[HTTPERROR.LOGICERROR],
                        config: response.config
                    };
                    return Promise.reject(_err);
                }
                return resFormat(json);
            },
            error => {
                const _err = {
                    msg:
                        (error && error.response && error.response.statusText) ||
                        error.message ||
                        "网络错误",
                    type: /^timeout of/.test(error.message)
                        ? HTTPERROR[HTTPERROR.TIMEOUTERROR]
                        : HTTPERROR[HTTPERROR.NETWORKERROR],
                    config: error.config
                };
                return Promise.reject(_err);
            }
        );
        if (v === "get") {
            axiosConfig.params = data;
        } else if (data instanceof FormData) {
            axiosConfig.data = data;
        } else {
            // axiosConfig.data = qs.stringify(data)
            axiosConfig.data = data;
        }
        axiosConfig.startTime = new Date();
        return instance
            .request(axiosConfig)
            .then(res => res)
            .catch(err => {
                if (TOKENERROR.includes(err.errCode)) {
                    Toast.fail({
                        content: "用户认证失败! 请登录!"
                    });
                    window.clearTimeout(authTimer);
                    authTimer = window.setTimeout(() => {
                        // 跳转登录
                        window.location.replace(
                            loginDomain +
                            "?returnUrl=" +
                            encodeURIComponent(window.location.href)
                        );
                    }, 300);
                    return;
                }
                Toast.fail({
                    content: err || err.response || err.msg || err.stack || "未知错误"
                }
                );

                return Promise.reject({
                    err,
                    stack: err || err.msg || err.stack || ""
                });
            });
    };
});

export default http;

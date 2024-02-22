import { useAppStore } from "@/src/store/app/app.store";
import { isServer } from "@/src/utils/common.utils";

export class ApiService {
  private static init: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  public static delete = async <T>(
    url: string,
    optInit?: RequestInit
  ): Promise<T | undefined> => {
    try {
      optInit = await ApiService.requestMiddlewares(url, optInit);

      const urlWithQuery = new URL(
        url,
        !isServer ? window.location.origin : undefined
      );

      return ApiService.responseMiddlewares<T>(
        fetch(urlWithQuery.href, {
          ...ApiService.init,
          ...optInit,
          method: "DELETE",
        })
      );
    } catch (error) {
      // TODO: add logger
      console.error(error);
    }
  };

  public static get = async <T>(
    url: string,
    queryParams?: Record<string, string>,
    optInit?: RequestInit
  ): Promise<T | undefined> => {
    try {
      optInit = await ApiService.requestMiddlewares(url, optInit);

      const urlWithQuery = new URL(
        url,
        !isServer ? window.location.origin : undefined
      );

      if (queryParams) {
        urlWithQuery.search = new URLSearchParams(queryParams).toString();
      }

      return ApiService.responseMiddlewares<T>(
        fetch(urlWithQuery.href, {
          ...ApiService.init,
          ...optInit,
          method: "GET",
        })
      );
    } catch (error) {
      // TODO: add logger
      console.error(error);
    }
  };

  public static put = async <T>(
    url: string,
    body?: Record<string, any>,
    optInit?: RequestInit
  ): Promise<T | undefined> => {
    try {
      optInit = await ApiService.requestMiddlewares(url, optInit);

      const urlWithQuery = new URL(
        url,
        !isServer ? window.location.origin : undefined
      );

      if (body) {
        optInit.body = JSON.stringify(body);
      }

      return ApiService.responseMiddlewares<T>(
        fetch(urlWithQuery.href, {
          ...ApiService.init,
          ...optInit,
          method: "PUT",
        })
      );
    } catch (error) {
      // TODO: add logger
      console.error(error);
    }
  };

  public static post = async <T>(
    url: string,
    body?: Record<string, any>,
    optInit?: RequestInit
  ): Promise<T | undefined> => {
    try {
      optInit = await ApiService.requestMiddlewares(url, optInit);

      const urlWithQuery = new URL(
        url,
        !isServer ? window.location.origin : undefined
      );

      if (body) {
        optInit.body = JSON.stringify(body);
      }

      return ApiService.responseMiddlewares<T>(
        fetch(urlWithQuery.href, {
          ...ApiService.init,
          ...optInit,
          method: "POST",
        })
      );
    } catch (error) {
      // TODO: add logger
      console.error(error);
    }
  };

  private static requestMiddlewares = async (
    url: string,
    optInit: RequestInit = {}
  ) => {

    const basicHeaders = {
      ...ApiService.init.headers,
      ...{ ...(optInit.headers || {}) },
    };
    const headers = new Headers(basicHeaders);

    return { ...optInit, headers };
  };

  private static responseMiddlewares = <T>(
    response: Promise<Response>
  ): Promise<T> =>
    response
      .then(async (res: Response) => {
        try {
          if (!res.ok || Number(res.status) < 200 || Number(res.status) > 299) {
            const error = await res?.json();
            useAppStore.getState().setError(error);
            throw new Error(`${res.status} ${res.statusText}`);
          } else {
            const parsed = await res?.json();
            return parsed;
          }
        } catch (error) {
          throw new Error(error?.toString());
        }
      })
      .catch((error: string) => {
        console.error(error);
        throw new Error(error);
      });
}

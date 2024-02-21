import { HeadersEnum } from "@/src/enums/headers.enums";
import { useAppStore } from "@/src/store/app/app.store";
import { isServer } from "@/src/utils/common.utils";
import { AuthService, UserService } from "@/src/services";

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
    // region AUTH HEADERS
    const results = await Promise.allSettled([
      AuthService.getAuthToken(),
      AuthService.getAppToken(),
    ]);
    const fulfilledValues = results
      .filter(
        <T>(p: PromiseSettledResult<T>): p is PromiseFulfilledResult<T> =>
          p.status === "fulfilled"
      )
      .map((p) => p.value);

    const { uid: user = "" } = (await UserService.getUser()) || {};
    const authToken = fulfilledValues[0] || "";
    const appToken = fulfilledValues[1] || "";
    // endregion AUTH HEADERS

    const basicHeaders = {
      ...ApiService.init.headers,
      ...{ ...(optInit.headers || {}) },
      [HeadersEnum.USER]: user?.toString(),
      [HeadersEnum.AUTH_TOKEN]: authToken.toString(),
      [HeadersEnum.APP_TOKEN]: appToken.toString(),
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

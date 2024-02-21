import {
  getBlob,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { AppInstance } from "@/src/utils/firebase.utils";

const storage = getStorage(AppInstance);

const errorHanlder = (error: any) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case "storage/object-not-found":
      console.error("File doesn't exist");
      break;
    case "storage/unauthorized":
      console.error("User doesn't have permission to access the object");
      break;
    case "storage/canceled":
      console.error("User canceled the upload");
      break;

    case "storage/unknown":
      console.error("Unknown error occurred, inspect the server response");
      break;
  }
};

const createRef = (pathToFile: string) => ref(storage, pathToFile);

export const StorageUtils = {
  getURL: async (pathToFile: string) => {
    try {
      return await getDownloadURL(createRef(pathToFile));
    } catch (error) {
      errorHanlder(error);
    }
  },
  getBlob: async (pathToFile: string) => {
    try {
      const response = await getBlob(createRef(pathToFile));
      console.log(response);
      return response;
    } catch (error) {
      errorHanlder(error);
    }
  },
  getJSON: async (pathToFile: string) =>
    new Promise((resolve, reject) => {
      try {
        /*const jsonBkp = _storage.getSessionValues(pathToFile);
      if (jsonBkp !== '{}') {
        console.log('json found, should return static');
      } else {*/
        StorageUtils.getBlob(pathToFile).then((blob) => {
          if (blob) {
            const fileReader = new FileReader();
            fileReader.onload = (result) => {
              const json = JSON.parse(result?.target?.result?.toString() || "");
              StorageUtils.setSessionValues(pathToFile, json);
              resolve(json);
            };
            fileReader.readAsText(blob);
          } else {
            reject();
          }
        });
        //}
      } catch (error) {
        errorHanlder(error);
        reject();
      }
    }),
  uploadFile: async (base64File: string, pathToFile: string, metadata = {}) =>
    new Promise((resolve, reject) => {
      if (!(base64File && pathToFile)) {
        reject();
      }
      uploadString(createRef(pathToFile), base64File, "base64", metadata)
        .then((snapshot) => {
          console.log("File uploaded!", pathToFile, snapshot);
          resolve(snapshot);
        })
        .catch((error) => {
          console.error(error);
        });
    }),
  getSessionValues: (key: string) => localStorage.getItem(key) || "{}",
  setSessionValues: (key: string, data: string | Record<string, unknown>) => {
    const value =
      typeof data === "string"
        ? data
        : JSON.stringify({ ...data, session_timestamp: new Date().getTime() });
    localStorage.setItem(key, value);
  },
  clearSessionValues: (key?: string) => {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.clear();
    }
  },
};

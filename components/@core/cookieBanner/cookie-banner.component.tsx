"use client";

import { useEffect, useState } from "react";
import { CookieUtils } from "@/src/utils/cookie.utils";
import { Button } from "@/components";
import { Toggle } from "@/components/form";

const cookieCheck = "cookiesBanner";

const CookieBannerComponent = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);

  const closeCookieBanner = () => {
    CookieUtils.setCookie(cookieCheck, "closed", 30);
    setShowCookieBanner(false);
  };

  const checkCookie = () => {
    setShowCookieBanner(!CookieUtils.getCookie(cookieCheck));
  };

  useEffect(() => {
    checkCookie();
  }, []);

  if (!showCookieBanner) return null;

  return (
    <div className="fixed bottom-0 w-full text-black">
      <div className="relative">
        <section
          aria-label="cookies banner"
          id="cookies-banner"
          className="mx-auto max-w-screen-md w-full sticky bottom-0 rounded text-center p-4 border border-gray-200 bg-white-100 shadow transition"
        >
          <div className="flex flex-wrap w-full items-center justify-center gap-4">
            <>
              <div className="w-full text-left text-sm">
                <h4 className="text-lg font-medium">Cookie policy</h4>
                <p className="p-1 bg-gray-100 rounded">
                  {!showCookiePreferences ? (
                    "Cookies text"
                  ) : (
                    <>
                      List here cookies preferences
                      <ul className="p-1 w-full">
                        <li className="w-full inline-flex items-center justify-between">
                          <label>preference 1</label>
                          <Toggle
                            label={"preference 1"}
                            withIcon
                            value={1}
                            onChange={({ target: { checked } }) =>
                              console.log(checked)
                            }
                          />
                        </li>
                      </ul>
                    </>
                  )}
                </p>
              </div>
              {!showCookiePreferences ? (
                <Button
                  action={() =>
                    setShowCookiePreferences(!showCookiePreferences)
                  }
                  text
                  label="Show preferences"
                />
              ) : null}
            </>
            <Button action={closeCookieBanner} primary label="Accept" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookieBannerComponent;

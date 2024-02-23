"use client";

import { useEffect, useState } from "react";
import { CookieUtils } from "@/src/utils/cookie.utils";
import { Button, Logo } from "@/components";
import { AppConstants } from "@/src/constants";

const adultsBannerCheck = "adultsBanner";

const AdultsBanner = () => {
  const [showAdultBanner, setShowAdultBanner] = useState(false);

  const closeAdultBanner = () => {
    CookieUtils.setCookie(adultsBannerCheck, "closed", 30);
    setShowAdultBanner(false);
  };

  const exitWebsite = () => {
    window.history.back();
  };

  const checkAdults = () => {
    setShowAdultBanner(!CookieUtils.getCookie(adultsBannerCheck));
  };

  useEffect(() => {
    checkAdults();
  }, []);

  if (!showAdultBanner) return null;

  return (
    <div className="adult-banner fixed h-screen w-full top-0 left-0 bg-background-900 z-50">
      <div className="relative h-screen w-full inline-flex items-center">
        <section
          aria-label="adults banner"
          id="adults-banner"
          className="mx-auto max-w-screen-md w-full rounded-lg text-center p-8 bg-background-500 shadow transition"
        >
          <div className="flex flex-wrap w-full items-center justify-center gap-4 md:gap-16">
            <>
              <div className="w-full text-center">
                <div className="mb-8 inline-flex items-center gap-1">
                  <Logo />
                  <span>{AppConstants.title}</span>
                </div>

                <h1 className="text-lg font-medium">Age Verification</h1>
                <p className="mt-2 px-8">
                  This site contains R-rated material, including nudity and
                  explicit depictions of sexual activity.
                  <br />
                  By entering, you represent that you are at least 18 years old,
                  or the age of majority in the jurisdiction from which you are
                  accessing the site and you consent to the viewing of sexually
                  explicit content.
                </p>
              </div>
            </>
            <Button
              action={closeAdultBanner}
              primary
              label="I'm 18 years old or older - Enter"
            />
            <Button
              action={exitWebsite}
              secondary
              label="I am under 18 years old - Leave"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdultsBanner;

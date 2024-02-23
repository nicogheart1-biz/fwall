import { ButtonLink } from "@/components";
import AdsBlock from "@/components/ads/adsBlock.component";
import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";
import { useEffect, useState } from "react";

type ContentRedirectComponentI = {
  contentUrl: string;
};
const ContentRedirectComponent = (props: ContentRedirectComponentI) => {
  const { contentUrl } = props;
  const [continueDisabled, setContinueDisabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setContinueDisabled(false);
    }, 4500);
  }, []);

  return (
    <>
      <div className="w-full inline-flex items-center justify-center sm:justify-end">
        {contentUrl ? (
          <ButtonLink
            isLoading={continueDisabled}
            disabled={continueDisabled}
            primary
            label="Continue to video"
            href={decodeURIComponent(contentUrl)}
          />
        ) : null}
      </div>
      <div className="mx-auto mt-8">
        <AdsBlock type={AdsBlockTypeEnum.SQUARE} />
      </div>
    </>
  );
};

export default ContentRedirectComponent;

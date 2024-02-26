import { BaseHero } from "@/components/hero";
import { CmsPageHeroI } from "@/src/types/cms.types";

type PageComponentI = {
  hero?: CmsPageHeroI;
};

const PageComponent = (props: PageComponentI) => {
  const { hero } = props;
  return (
    <section>
      {hero ? (
        <BaseHero
          title={hero?.title || ""}
          subtitle={hero?.subtitle}
          payoff={hero?.payoff}
          primaryAction={
            hero?.cta?.[0]
              ? {
                  label: hero?.cta?.[0]?.label || "",
                  href: hero?.cta?.[0]?.url || "",
                }
              : undefined
          }
          secondaryAction={
            hero?.cta?.[1]
              ? {
                  label: hero?.cta?.[1]?.label || "",
                  href: hero?.cta?.[1]?.url || "",
                }
              : undefined
          }
        />
      ) : null}
    </section>
  );
};

export default PageComponent;

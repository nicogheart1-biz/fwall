import { Routes } from "@/src/routes";
import { capitalize } from "@/src/utils/common.utils";
import Link from "next/link";

type TagsComponentI = {
  tags: string[];
};

const TagsComponent = (props: TagsComponentI) => {
  const { tags = [] } = props;
  return (
    <section
      className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8"
      id="tag-grid"
    >
      <h2 className="py-4 text-lg font-medium">Tags</h2>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {tags.sort().map((tag) => (
          <Link
            key={tag}
            href={`${Routes.tags.url}/${tag
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            <span className="bg-background-500 text-secondary-100 py-2 px-4 rounded-lg transition hover:bg-background-500/50 hover:text-secondary-500">
              {capitalize(tag)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TagsComponent;

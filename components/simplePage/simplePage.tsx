import clsx from "clsx";

type SimplePageI = {
  centered?: boolean;
  children?: React.ReactNode;
  title: string;
  text?: string;
};

const SimplePage = (props: SimplePageI) => {
  const { centered = false, children, title, text } = props;

  return (
    <div
      className={clsx(
        "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col justify-between",
        centered && "items-center"
      )}
    >
      <div className={clsx(centered && "max-w-xl mx-auto text-center")}>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>

        {text ? <p className="mt-4 text-white-100">{text}</p> : null}

        {children}
      </div>
    </div>
  );
};

export default SimplePage;

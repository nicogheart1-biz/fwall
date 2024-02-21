import { isReleased } from "@/src/utils/envs.utils";
import dynamic from "next/dynamic";
import { AggregateField, getFirestore } from "firebase-admin/firestore";
import { initAdmin } from "@/server/firebaseAdmin";

const PlaygroundComponent = dynamic(() => import("./playground.component"), {
  ssr: false,
});

const test1 = async () => {
  try {
    await initAdmin();
    const firestore = getFirestore();
    const snapshot = await firestore
      .collection("content-public")
      .where("category", "==", "FASHION")
      .orderBy("dueDate", "asc")
      .limit(1)
      .get();
    return snapshot?.docs.map((item) => item.data());
  } catch (error) {
    throw new Error(`Playground test failed with error: ${error}`);
  }
};

const test2 = async () => {
  try {
    await initAdmin();
    const firestore = getFirestore();
    const snapshot = await firestore
    .collection("content-public")
    .where("category", "==", "FINANCE")
    .aggregate({ count: AggregateField.count()})
    .get();
    return snapshot.data();
  } catch (error) {
    throw new Error(`Playground test failed with error: ${error}`);
  }
};

export default async function Playground() {
  if (isReleased) return;
  const data = {};
  //const data = await test1();
  //const data = await test2();

  return (
    <div className="mx-auto max-w-screen-xl py-4 sm:px-6 lg:px-8">
      <PlaygroundComponent data={JSON.stringify(data)} />
    </div>
  );
}

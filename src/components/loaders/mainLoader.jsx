import Image from "next/image";
import Loader from "./loader";

export default function MainLoader() {
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center backdrop-blur-lg">
      <Loader />
    </div>
  );
}
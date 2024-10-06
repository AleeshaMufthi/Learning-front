import { Spinner } from "flowbite-react";

export default function Loading() {
    return (
      <div className="text-center absolute" style={{ left: "50%", top: "50%" }}>
        <Spinner aria-label="Spinner is running" />
      </div>
    );
  }
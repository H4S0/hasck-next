import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";


export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {


  return (
    <div className="p-2">
      homee
    </div>
  );
}

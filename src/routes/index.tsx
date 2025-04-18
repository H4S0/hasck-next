import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { user } from "~/network-handler/api";
import { UserLoginSchema } from "~/network-handler/api/user";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const form = useForm<z.infer<typeof UserLoginSchema>>({});
  const onSubmit = form.handleSubmit(async (data) => {
    const res = await user.login(data);
    console.log(res);
  });

  return (
    <div className="p-2">
      <form onSubmit={onSubmit}>
        <input {...form.register("username")} />
        <input {...form.register("password")} />
        <button type="submit">jes</button>
      </form>
      <h3>Welcome Home!!!</h3>
    </div>
  );
}

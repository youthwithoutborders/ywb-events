import { api, HydrateClient } from "~/trpc/server";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { View } from "../../_components/view";
import { auth } from "~/server/auth";

export default async function PeoplePage() {
  const people = await api.person.all();
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <View title="People" fixedHeight>
        <DataTable columns={columns} data={people} />
      </View>
    </HydrateClient>
  );
}
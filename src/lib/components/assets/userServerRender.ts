import { user } from "$lib/stores/stores";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
  return {
    user: user
  };
};

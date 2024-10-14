import { user } from "$lib/stores/firebaseUser";
import type { Load } from "@sveltejs/kit";

export const load: Load = async () => {
  return {
    user: user
  };
};

import type { PageServerLoad } from '../../../.svelte-kit/types/src/routes/[userID]/$types';

export const load = (async ({params}) => {
	const userID = params.userID

	return {};
}) satisfies PageServerLoad;

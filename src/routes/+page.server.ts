import {redirect} from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(301, '/login');
	redirect(200, '/dashboard');
}) satisfies PageServerLoad;

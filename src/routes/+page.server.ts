import { adminDB } from '$lib/server/Firebase';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './budget/$types';

export const load = (async ({ locals }) => {
	const uid = locals.userID;
	if (!uid) return redirect(401, '/login');
	redirect(301, '/dashboard');
}) satisfies PageServerLoad;

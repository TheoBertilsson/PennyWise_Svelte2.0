import { adminAuth } from '$lib/server/admin.server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const sessionCookie = cookies.get('__session');

	if (!sessionCookie) throw error(401, 'Unauthorized');
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
		return {}
	} catch (error) {
		console.error(error);
		redirect(301,'/login');
	}
}) satisfies PageServerLoad;

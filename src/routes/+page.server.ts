import { initializeApp } from 'firebase-admin';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	initializeApp();
	return {};
}) satisfies PageServerLoad;

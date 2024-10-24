import { adminAuth } from '$lib/server/admin.server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { idToken } = await request.json();
		const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
		const decodedIdToken = await adminAuth.verifyIdToken(idToken);

		if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
			const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
			const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };

			cookies.set('__session', cookie, options);
			return json({ status: 'signedIn' });
		} else {
			throw error(401, 'Recent sign in required!');
		}
	} catch (err) {
		console.error('Error in POST handler:', err);
		throw error(500, 'Internal Server Error');
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};

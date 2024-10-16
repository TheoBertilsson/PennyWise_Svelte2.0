import { adminAuth } from "$lib/server/admin.server";
import { error, type Handle } from "@sveltejs/kit";

export const handle = (async ({event, resolve}) => {
	const sessionCookie = event.cookies.get('__session');
	if (!sessionCookie) throw error(401, 'Unauthorized, no cookie');
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
		event.locals.userID = decodedClaims.uid;
		console.log('found');

	} catch (error) {
		event.locals.userID = null;
		console.log('not found');
	}
	return resolve(event);
}) satisfies Handle;

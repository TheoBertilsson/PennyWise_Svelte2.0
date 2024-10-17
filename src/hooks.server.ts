import { adminAuth } from "$lib/server/admin.server";
import { error, type Handle } from "@sveltejs/kit";

export const handle = (async ({event, resolve}) => {
	const sessionCookie = event.cookies.get('__session');
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!, true);
		event.locals.userID = decodedClaims.uid;
		console.log('found cookie noom');

	} catch (error) {
		event.locals.userID = null;
		console.log('no found cookie');
	}
	return resolve(event);
}) satisfies Handle;

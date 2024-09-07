import { getAuth } from 'firebase-admin/auth';
import { getFirestore,CollectionGroup } from 'firebase-admin/firestore';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID } from '$env/static/private';
import admin from 'firebase-admin';
import { Collection } from '$lib/constants/firebase';

const initializeFirebase = () => {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: FB_PROJECT_ID,
				clientEmail: FB_CLIENT_EMAIL,
				privateKey: FB_PRIVATE_KEY
			})
		});
	}
};
export const getPlannedRouteData = async (userID: string): Promise<any | undefined> => {
	initializeFirebase();
	const snapshot = await admin
		.firestore()
		.collection(Collection.users)
		.doc(plannedRouteID)
		.get();
	const data = snapshot.data();
	if (!data) return;

	return {};
};

export const adminDB = getFirestore();
export const adminAuth = getAuth();

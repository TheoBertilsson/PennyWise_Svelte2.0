// import { getAuth } from 'firebase-admin/auth';
// import { getFirestore } from 'firebase-admin/firestore';
// import { GOOGLE_APPLICATION_CREDENTIALS } from '$env/static/private';
// import admin, { credential } from 'firebase-admin';

// const initializeFirebase = () => {
// 	if (!admin.apps.length) {
// 		admin.initializeApp({
// 			credential: credential.cert(GOOGLE_APPLICATION_CREDENTIALS)
// 		});
// 	}
// };
// export const getPlannedRouteData = async (userID: string): Promise<any | undefined> => {
// 	initializeFirebase();
// 	const snapshot = await admin
// 		.firestore()
// 		.collection('budget')
// 		.doc(userID)
// 		.get();
// 	const data = snapshot.data();
// 	console.log(data);

// 	if (!data) return;
// 	console.log(data);

// 	return {};
// };

// export const adminDB = getFirestore();
// export const adminAuth = getAuth();

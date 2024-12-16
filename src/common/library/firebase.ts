import * as admin from 'firebase-admin';
import firebaseConfiga from './firebase-sdk.json';

const params = {
  type: firebaseConfiga.type,
  projectId: firebaseConfiga.project_id,
  privateKeyId: firebaseConfiga.private_key_id,
  privateKey: firebaseConfiga.private_key,
  clientEmail: firebaseConfiga.client_email,
  clientId: firebaseConfiga.client_id,
  authUri: firebaseConfiga.auth_uri,
  tokenUri: firebaseConfiga.token_uri,
  authProviderX509CertUrl: firebaseConfiga.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfiga.client_x509_cert_url,
};

export const firebaseInit = admin.initializeApp({
  credential: admin.credential.cert(params),
});

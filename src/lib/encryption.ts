import { KEYUTIL, KJUR, RSAKey } from 'jsrsasign';

export function generatePrivateKey(): string {
  // Generate an RSA key pair
  const rsaKey = KEYUTIL.generateKeypair('RSA', 1024);

  // Export the keys to PEM format
  return KEYUTIL.getPEM(rsaKey.prvKeyObj, 'PKCS8PRV');
}

export function derivePublicKey(privateKeyPEM: string) {
  const privKey = KEYUTIL.getKey(privateKeyPEM) as RSAKey;
  const privKeyJWK = KEYUTIL.getJWKFromKey(privKey);
  let pubKeyJWK;
  {
    const { e, kty, n } = privKeyJWK;
    pubKeyJWK = { e, kty, n };
  }
  const pubKey = KEYUTIL.getKey(pubKeyJWK);
  const pubKeyPEMText = KEYUTIL.getPEM(pubKey);
  return pubKeyPEMText;
}

export function encryptData(data: string, publicKeyPEM: string): string {
  const publicKey = KEYUTIL.getKey(publicKeyPEM) as RSAKey;
  return KJUR.crypto.Cipher.encrypt(data, publicKey, 'RSAOAEP');
}

export function decryptData(data: string, privateKeyPEM: string): string {
  const privateKey = KEYUTIL.getKey(privateKeyPEM) as RSAKey;
  return KJUR.crypto.Cipher.decrypt(data, privateKey, 'RSAOAEP');
}

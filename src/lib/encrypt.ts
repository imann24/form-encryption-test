import CryptoJS from 'crypto-js'

export function encryptData(data: string, secretKey: string) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
}

export function decryptData(ciphertext: string, secretKey: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

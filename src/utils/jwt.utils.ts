import jwt from 'jsonwebtoken'
import config from 'config'

const PRIVATE_KEY = config.get<string>('privateKey')
const PUBLIC_KEY = config.get<string>('publicKey')

export const signJwt = (payload: Object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, PRIVATE_KEY, {
    ...options,
    // TODO: fix issues when using the algorithm => `secretOrPrivateKey must be an asymmetric key when using RS256`
    // algorithm: 'RS256'
  })
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      docoded: null
    }
  }
}
const isProduction = process.env.NODE_ENV === 'production'

export const SERVER = isProduction ? '' : 'http://localhost:3000'
export const BEGIN_TRANSITION = 'BEGIN_TRANSITION'
export const END_TRANSITION = 'END_TRANSITION'
export const FETCH_TOPICS = 'FETCH_TOPICS'
export const VOTE_UP = 'VOTE_UP'
export const VOTE_DOWN = 'VOTE_DOWN'
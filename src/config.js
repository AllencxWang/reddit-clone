const isProduction = process.env.NODE_ENV === 'production'

export default {
  server: isProduction ? '' : 'http://localhost:3000'
}
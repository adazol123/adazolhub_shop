/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_API_KEY: 'AIzaSyDK8IZ-MNspBOOJ_S7k35HbDU2Q92HFiS8',
    FIREBASE_APP_ID: '1:636404332362:web:f4f7cc1bb6bbe66c3633b3',
    FIREBASE_DB_URL: 'https://bscpe-store-v2-default-rtdb.asia-southeast1.firebasedatabase.app'
  }
}

module.exports = nextConfig

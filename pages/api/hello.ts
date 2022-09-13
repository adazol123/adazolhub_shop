// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDK8IZ-MNspBOOJ_S7k35HbDU2Q92HFiS8",
  authDomain: "bscpe-store-v2.firebaseapp.com",
  databaseURL:
    "https://bscpe-store-v2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bscpe-store-v2",
  storageBucket: "bscpe-store-v2.appspot.com",
  messagingSenderId: "636404332362",
  appId: "1:636404332362:web:f4f7cc1bb6bbe66c3633b3",
  measurementId: "G-7LSYK1Y8L6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

type Data = {
  name: Auth;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: auth });
}

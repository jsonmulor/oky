import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { api } from '../api';
import Layout from './Layout';
export default function KhoaHoc() {
  const {
    user: { uid, email },
  } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    document.title = 'KHÓA HỌC LIVE THẦY HOẠCH';
  }, []);

  useEffect(() => {
    async function handleCheckUserSession() {
      try {
        const sessionKey = localStorage.getItem('sessionKey') || '';
        await api.checkUserSession({
          email,
          sessionKey,
        });
      } catch (error) {
        // router.push('/dang-nhap?code=401');
        console.log(error);
      }
    }
    if (uid) handleCheckUserSession();
  }, [email, uid]);

  return (
    <Layout>
      <iframe src="https://static.khokhoahocfree.xyz/noi-dung-khoa-hoc-livetream-sinh-hoc-9+-thay-hoach.html"></iframe>
    </Layout>
  );
}

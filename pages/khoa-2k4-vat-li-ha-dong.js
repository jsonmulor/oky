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
    document.title = 'Khóa 2K4 Vật Lí Hà Đông		';
  });

  useEffect(() => {
    async function handleCheckUserSession() {
      try {
        const sessionKey = localStorage.getItem('sessionKey') || '';
        await api.checkUserSession({
          email,
          sessionKey,
        });
      } catch (error) {
        router.push('/dang-nhap?code=401');
        console.log(error);
      }
    }
    if (uid) handleCheckUserSession();
  }, [email, uid]);

  return (
    <Layout>
      <iframe src="https://static.khokhoahocfree.xyz/khoa-2k4-vat-li-ha-djong.html"></iframe>
    </Layout>
  );
}

'use client'

import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function KakaoAuth() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      fetch(`http://localhost:8080/api/auth/kakao/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .then(
        redirect('/sign-up')
      )
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [code]);
  <div>

  </div>
}
"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()

  const supabase = createClientComponentClient();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const onLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    // router.push('/login')
  };

  if (user) {
    return (
      <div>
        <h1>Logged in to {user.email}</h1>
        <button onClick={onLogout}>Log Out</button>
      </div>
    )
  }

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (!user) {
    router.push('/login')
  }
}

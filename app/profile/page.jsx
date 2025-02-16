'use client'

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "@node_modules/next/router"

import Profile from "@components/Profile"



const MyProfile = () => {

    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
      if (!session?.user?.id) return;
    
      const fetchPosts = async () => {
        try {
          console.log("Fetching posts for user:", session.user.id);
          const response = await fetch(`/api/prompt/${session.user.id}/posts`, {
            cache: "no-store",
          });
    
          if (!response.ok) {
            throw new Error(`Failed to fetch posts. Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log("Fetched data:", data);
    
          if (Array.isArray(data)) {
            setPosts(data);
          } else if (data.success && Array.isArray(data.data)) {
            setPosts(data.data);
          } else {
            console.error("Unexpected data format:", data);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
    
      fetchPosts();
    }, [session?.user?.id]);
    
    
      

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    return (
      <Profile
          name="My"
          desc="Welcome to your profile page"
          image={session?.user?.image}
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
      />
  );
  
}


export default MyProfile

import Link from "next/link";
import { useState, useEffect } from "react";
import { shortAddress, getAddress, sleep } from "@/utils";
import { LoadingCircle } from "@/components/Icons";
import PostBox from "@/components/PostBox";
import { useGlobal } from "@/contexts/Global";
import Button from "./Button";
import Pfp from "./Pfp";

export default function Chat({context}) {
  const { orbisdb, user, connect, data, setUser, profile, updateProfileVis, setUpdateProfileVis, badgesProfileVis, setBadgesProfileVis } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, [context])

  /** Will load all posts already shared by this user in the social demo context */
  async function loadPosts() {
    setLoading(true);
    console.log("Enter loadPosts");
    try {
      const results = await orbisdb.select().from(data.models.posts_with_profiles).context(context).limit(100).run();
      console.log("result posts:", results);
      if(results) {
        setPosts(results.rows);
      }
    } catch(e) {
      console.log("Error loading posts:", e);
    }

    setLoading(false);
  }

  return(
    <>
        {loading ?
            <div className="flex-1 flex pt-12 justify-center text-white">
                <LoadingCircle />
            </div>
        :
            <div className="flex flex-col-reverse flex-1 overflow-y-scroll">
                <LoopPosts posts={posts} />
            </div>
        }
        
        
        {user ?
          <PostBox context={context} posts={posts} setPosts={setPosts} />
        :
        <div className="flex flex-col items-center space-y-2 justify-center w-full py-4">
            <Button title="Connect with Phantom" onClick={() => connect("phantom")}/>
            <Button title="Connect with Metamask" onClick={() => connect("metamask")}/>
        </div>
        }  
    </> 
  )
}

const LoopPosts = ({posts}) => {
    return posts.map((post, key) => {
      return (
          <Post post={post} key={key} />
      );
    });
  }
  
  const Post = ({post}) => {
    return(
      <div className="p-4 border-b border-slate-700 w-full flex flex-row space-x-3 items-start">
        <div className="flex flex-row items-center">
          <Pfp profile={post.profile} />
        </div>
        <div className="flex-1">
          <div className="flex flex-row space-x-1.5 items-center">
            <p className="text-white uppercase text-xs">{(post.profile && post.profile.username) ? post.profile.username : shortAddress(post.controller)}</p>
            <Link href={"https://solscan.io/account/" + getAddress(post.controller)} target="_blank" className="bg-slate-700 text-xs px-2 py-1 rounded-full border border-transparent hover:border-slate-600 cursor-pointer" style={{fontSize: 10}}>{shortAddress(getAddress(post.controller))}</Link>
          </div>
          <p className="mt-0.5 text-slate-300 whitespace-pre-wrap ">{post.body}</p>
        </div>
      </div>
    )
  }

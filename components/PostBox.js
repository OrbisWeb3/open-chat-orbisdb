import { useGlobal } from "@/contexts/Global";
import { useState, useEffect } from "react";
import Button from "./Button";
import Pfp from "./Pfp";

export default function PostBox({ posts, setPosts, context }) {
    const { orbisdb, user, profile, data } = useGlobal();
    const [status, setStatus] = useState(0);
    const [content, setContent] = useState("");

    // Function to handle the change and auto-resize
    const handleChange = (e) => {
        const textarea = e.target;
        setContent(textarea.value);

        // Automatically adjust the height
        textarea.style.height = 'auto'; // Reset the height
        textarea.style.height = textarea.scrollHeight + 'px'; // Set to scroll height
    };

    /** Will create a new post from this user in the social demo context */
    async function createPost() {
        setStatus(1);
        try {
            const result = await orbisdb.insert(data.models.post).value(
                {
                    body: content
                }
            )
            .context(context)
            .run();

            console.log("result:", result);
            
            if(result) {
                setStatus(0);
                setPosts([{
                    profile: profile,
                    controller: user.did,
                    body: content,
                }, ...posts]);
                setContent("")
            } else {
                console.log("Error sharing post.");
            }
        } catch(e) {
            console.log("Error sharing post:", e);
        }
    }

    return(
        <div className="flex flex-col p-3 border-t border-slate-600 bg-[#162133]">
            <div className="flex flex-row space-x-2 relative resize-none overflow-hidden">
                <Pfp profile={profile} />
                <textarea 
                    className="outline-none bg-slate-800 px-3 py-2 rounded-md text-white overflow-hidden border-2 border-transparent focus:border-slate-600 flex-1" 
                    placeholder={"Type your message here..." }
                    style={{minHeight: "52px"}}
                    value={content} 
                    onChange={handleChange}>
                </textarea>
                <div className="flex justify-end absolute right-2 bottom-2">
                    <Button type="primary" title="Share" onClick={() => createPost()} status={status}/>
                </div>
            </div>
        </div>
    )
}
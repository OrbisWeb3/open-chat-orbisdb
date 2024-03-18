import React, { useState, useEffect, useContext } from "react";

import Modal from ".";
import Button from "../Button";
import { useGlobal } from "@/contexts/Global";
import { sleep } from "@/utils";

/** Modal to start tracking a new model */
export default function UpdateProfile({hide, callback}) {
  const { orbisdb, setProfile, profile, data } = useGlobal();
  const [status, setStatus] = useState(0);
  const [username, setUsername] = useState(profile ? profile.username : "");
  const [bio, setBio] = useState(profile ? profile.description : "");


  async function editProfile() {
    setStatus(1);
    let result;

    /** This could be updated to also add PFP etc */
    let content = {
      username: username,
      description: bio
    };

    // Will either create a new profile for the user or update the existing one (using the "single" ceramic relationship) automatically
    try {
      result = await orbisdb.insert(data.models.profile).value(content).run();
    } catch(e) {
      console.log("Error creating profile:", e);
    }
    console.log("result updating profile:", result);

    // Callback
    if(result) {
      setProfile(result.content);
      setStatus(2);
      await sleep(1500);
      setStatus(0);
      hide();
    }
  }

  return(
    <Modal hide={hide} title="Update your profile" description="Make sure it looks good!">
      <div className="flex flex-col justify-center">
        <div className="w-full">
        <div className="flex flex-col items-center">
            <input type="text" placeholder="Username" className="bg-slate-700 w-full mt-2 px-2 py-2 rounded-md border border-slate-700 text-xs text-white mb-2" onChange={(e) => setUsername(e.target.value)} value={username} />
            <textarea type="text" placeholder="Bio" className="bg-slate-700 w-full mt-0.5 mb-2 px-2 py-2 rounded-md border border-slate-700 text-xs text-white" onChange={(e) => setBio(e.target.value)} value={bio} />   
            <Button type="primary" onClick={() => editProfile()} status={status} title="Save" />
          </div>
        </div>
      </div>
    </Modal>
  )
}
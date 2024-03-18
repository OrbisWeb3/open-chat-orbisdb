import React, { useState, useEffect, useContext } from "react";

/** Import OrbisDB libraries */
import { OrbisDB } from "@useorbis/db-sdk";
import { OrbisSolanaAuth, OrbisEVMAuth } from "@useorbis/db-sdk/auth"

const orbisdb = new OrbisDB({
    ceramic: {
        gateway: "https://ceramic-orbisdb-mainnet.hirenodes.io/"
    },
    nodes: [
        {
            gateway: "https://orbisdb-mainnet.hirenodes.io/"
        }
    ]
})

/** Data to display for protocols */
const data = {
    contexts: {
        governance: "kjzl6kcym7w8yaqg89zeosq7iccqtlb0aimeip509v5eost5xg8a3d3t7baa80u",
        social: {
            home: "kjzl6kcym7w8yaychom8qxpidicp7vh9k3ncnyybrmfomzuwn9v4ucfy8d19bcv",
            drift: "kjzl6kcym7w8y5sx04ejnl669g3l3bl88c2sakot9ff7jggawidql93wv8oy47c",
            jupiter: "kjzl6kcym7w8y97gnp9vj4lbnjp06jdtnc4l9j3s8v06drs5ecltailzk7yieu2",
            orca: "kjzl6kcym7w8y99cldk1si2491g6pqyfmprwtfq2v8plwzyjy6u75z5d6ycpv10"
        }
    },
    models: {
        profile: "kjzl6hvfrbw6c9ajvxfoyxcpi8zbiilf5c62zyxk1tzt31rsei9zeq1sqddy09a",
        post: "kjzl6hvfrbw6c88wvnnb8x62rwvt5iphtvgmg88s4qis09nvchbij21c70th28a",
        reactions: "kjzl6hvfrbw6catjwpn53stszvbv04ez7phlfheparps47kbx8q7t11z6l06lwl",
        proposals: "kjzl6hvfrbw6c9k9g95am3g8s7gp8fp48qqjvxtrarwfo7njbcd0la801wcfwoz",
        votes: "kjzl6hvfrbw6ca82toboen7mrjumkcmldfv0dn9rlyr73jpvvge867aqzuikfcj",
        posts_with_profiles: "posts_with_profiles"
    }
}

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {  
    const [user, setUser] = useState();
    const [profile, setProfile] = useState();
    const [showLeftNav, setShowLeftNav] = useState(false);
    const [updateProfileVis, setUpdateProfileVis] = useState(false);
    const [badgesProfileVis, setBadgesProfileVis] = useState(false);

    useEffect(() => {
        autoConnect();
    }, [])

    useEffect(() => {
        if(user) {
            getProfile(user.did);
        }
    }, [user]);

    /** Will connect user to OrbisDB using Phantom or Metamask */
    async function connect(type = "phantom") {
        // Orbis Authenticator, will use Ethereum or Solana auth
        let auth;
        switch(type) {
            case "phantom":
                auth = new OrbisSolanaAuth(window.phantom?.solana);
                break;
            case "metamask":
                auth = new OrbisEVMAuth(window.ethereum);
                break;
        }

        // Authenticate the user and persist the session in localStorage
        try {
            const authResult = await orbisdb.connectUser({ auth });
            if(authResult?.user) {
                setUser(authResult.user);
            }
            console.log("authResult:", authResult);
        } catch(e) {
            console.log("Error connecting user:", e);
        }
    }

    /** Will reconnect user automatically if we find a session in local storage */
    async function autoConnect() {
        const currentUser = await orbisdb.getConnectedUser();
        if(currentUser) {
          setUser(currentUser.user);
        }
    }

    /** Will disconnect the user */
    async function logout() {
        let res = await orbisdb.disconnectUser();
        setUser(null);
        console.log("res:", res);
    }
    
     /** Will retrieve the active profile for the connected user */
    async function getProfile(did) {
        try {
            let _profileRes = await orbisdb.select().from(data.models.profile).where({"controller": did}).orderBy(["indexed_at", "desc"]).run();
            console.log("profile:", _profileRes);
            if(_profileRes && _profileRes.rows.length > 0) {
                setProfile(_profileRes.rows[0])
            } else {
                setProfile(null);
            }
        } catch(e) {
            console.log("Error retrieving profile:", e);
            setProfile(null);
        }
    }
    
    return <GlobalContext.Provider value={{ orbisdb, user, setUser, profile, setProfile, updateProfileVis, setUpdateProfileVis, showLeftNav, setShowLeftNav, badgesProfileVis, setBadgesProfileVis, connect, logout, data }}>{children}</GlobalContext.Provider>;
};
  
export const useGlobal = () => useContext(GlobalContext);
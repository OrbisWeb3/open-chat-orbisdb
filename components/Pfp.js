export default function Pfp({profile}) {
    if(profile && profile.pfp) {
        return(
            <div className="rounded-full h-10 w-10 overflow-hidden">
                <img src={profile.pfp} />
            </div>
        )
    } else {
        return(
            <div className="rounded-full h-10 w-10 overflow-hidden">
                <img src="/img/EmptyPfp.png" />
            </div>
        )
    }
}
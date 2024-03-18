export function BadgePoints({points, onClick}) {
    return(
        <div onClick={onClick ? onClick : null} className="bg-amber-300 rounded-full text-xxs text-amber-950 px-2 py-1 border border-transparent hover:border-amber-600 cursor-pointer"><span className="text-amber-900">XP:</span><span className="font-medium"></span>{points}</div>
    )
}
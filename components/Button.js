import { LoadingCircle } from "./Icons";

export default function Button({title, onClick, type, status}) {
    function _onClick() {
        if(status == 0 || !status) {
            onClick();
        } else {
            console.log("Is loading.");
        }
    }

    function getTitle() {
        switch(status) {
            case 0:
                return title;
            case 1:
                return <LoadingCircle />;
            default:
                return title;
        }
    }
    switch(type) {
        case "primary":
            return(
                <div className="bg-white hover:bg-slate-100 text-slate-950 rounded-md px-4 py-2 text-xs cursor-pointer uppercase" onClick={_onClick}>{getTitle()}</div>
            );
        case "secondary":
            return(
                <div className="bg-slate-700 hover:bg-slate-800 rounded-md px-4 py-2 text-xs cursor-pointer uppercase" onClick={_onClick}>{getTitle()}</div>
            );
        default:
            return(
                <div className="bg-slate-700 hover:bg-slate-800 rounded-md px-4 py-2 text-xs cursor-pointer uppercase" onClick={_onClick}>{getTitle()}</div>
            );
    }
    
}
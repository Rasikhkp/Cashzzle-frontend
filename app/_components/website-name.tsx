import React from "react";
import { garamond } from "../fonts";

const WebsiteName = () => {
    return (
        <div className={`${garamond.className} z-10 h-[68.5px] flex items-center font-bold text-3xl fixed xl:w-[calc(378px)] w-[calc(33%-48px)] fixed bg-white/30 backdrop-blur-sm`}>
            Takutmiskin.
        </div>
    )
};

export default WebsiteName;

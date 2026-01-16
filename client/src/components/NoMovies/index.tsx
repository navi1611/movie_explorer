import React from "react";
import { Film } from "lucide-react";

const EmptyMovie: React.FC = () => {
    return (
        <div className="h-full flex items-center justify-center ">
            <div className="text-center py-12">
                <Film className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No movies found </p>
            </div>
        </div>
    );
};

export default EmptyMovie;

import React from "react";
import Transaction from "./transaction";

const TransactonList = () => {
    const dontknow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <div className="transaction-list flex text-sm py-3 flex-col gap-3 h-[85vh] border-b border-gray-700 overflow-y-scroll">
            {dontknow.map((e, i) => {
                if (e == 1) {
                    return (
                        <div key={i} className="font-medium">
                            Monday, 12
                        </div>
                    );
                } else if (e == 5) {
                    return (
                        <div key={i} className="font-medium">
                            Tuesday, 12
                        </div>
                    );
                } else {
                    return <Transaction key={i} />;
                }
            })}
        </div>
    );
};

export default TransactonList;

import React from "react";

function ClassDetailCard() {
  const data = [
    { id: 1, name: "Students", value: 100 },
    { id: 2, name: "Total Girls", value: 40 },
    { id: 3, name: "Total Boys", value: 60 },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      {data.map((item) => {
        const { id, name, value } = item;
        return (
          <div
            key={id}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-lg shadow-md w-full"
          >
            <h3 className="text-lg font-semibold">
              {name}: {value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default ClassDetailCard;

import React, { useState } from "react";

interface NewExerciseProps {
    setAddExisting: React.Dispatch<React.SetStateAction<boolean>>;
    toggleEnabled: () => void;
}

const NewExercise: React.FC<NewExerciseProps> = ({ setAddExisting, toggleEnabled }) => {
    const [repMin, setRepMin] = useState<number>(8);
    const [repMax, setRepMax] = useState<number>(12);

    const [sets, setSets] = useState<number>(3);

    const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => setSets(parseInt(e.target.value));

    const handleRepMinChange = (e: React.ChangeEvent<HTMLInputElement>) => setRepMin(parseInt(e.target.value));
    const handleRepMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => setRepMax(parseInt(e.target.value));

    const handleAddExisting = () => setAddExisting(true);

    return (
        <>
            <div onClick={handleAddExisting} className="cursor-pointer max-h-full w-full rounded-lg flex flex-col p-4 gap-3 relative bg-blue-600 text-white">
                <p>Add existing exercise?</p>
            </div>

            <div className="max-h-full w-full bg-white rounded-lg flex flex-col overflow-scroll p-4 gap-3 relative">
                <h1 className="text-lg">New Exercise</h1>
                <button className="absolute top-3 right-3 bg-red-400 w-7 h-7 rounded-lg" onClick={toggleEnabled}>x</button>
                <input className="bg-gray-300 rounded-md p-3 w-full" type="text" placeholder="name" />
                <p>Weight</p>
                <input className="bg-gray-300 rounded-md p-3 w-full" type="number" placeholder="max" value={repMax} onChange={handleRepMaxChange} />

                <p>Rep range</p>
                <div className="flex w-full gap-2">
                    <input className="bg-gray-300 rounded-md p-3 w-full" type="number" placeholder="min" value={repMin} onChange={handleRepMinChange} />
                    <input className="bg-gray-300 rounded-md p-3 w-full" type="number" placeholder="max" value={repMax} onChange={handleRepMaxChange} />
                </div>

                <p>Sets</p>
                <div className="flex w-full gap-2">
                    <input className="bg-gray-300 rounded-md p-3 w-full" type="number" placeholder="Amount" value={sets} onChange={handleSetsChange} />
                </div>

                <button className="bg-blue-500 text-white p-3 rounded-md w-full">Save</button>
            </div>
        </>
    );
}

export { NewExercise };
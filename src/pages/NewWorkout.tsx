import { useContext, useEffect, useState } from "react";
import { NewExercise } from "../components/NewExercise";
import { AddExercise } from "../components/AddExercise";
import { NewWorkoutContext } from "../components/NewWorkoutContext";
import { Exercise } from "./WorkoutList";

const NewWorkout: React.FC = () => {
    const { newWorkout, setNewWorkout } = useContext(NewWorkoutContext);
    console.log(newWorkout);

    useEffect(() => {
        if (setNewWorkout)
            setNewWorkout({ id: '', name: '', exercises: [{ id: 0, name: 'Squats' }] });
    }, []);

    const exercises = newWorkout?.exercises;

    const [name, setName] = useState<string>('');
    const [addScreen, setAddScreen] = useState<boolean>(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const toggleAddScreen = () => setAddScreen(!addScreen);
    const removeExercise = (id: number) => {
        if (setNewWorkout === null) return;
        if (exercises === undefined) return;

        const filteredExercises = exercises.filter((exercise, index) => index !== id);
        setNewWorkout({ ...newWorkout!, exercises: filteredExercises });
    }

    return (
        <div className='flex flex-col justify-center text-center gap-3 w-full items-center'>
            <h1 className="text-lg">{name == "" ? "New Workout" : name}</h1>
            <input className="bg-gray-300 rounded-md p-3 w-full" type="text" placeholder="name" value={name} onChange={handleNameChange} />

            <div className="flex flex-col w-full">
                <p>Exercises ({exercises?.length})</p>
                <div className="grid p-2 overflow-scroll">
                    {exercises?.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} index={index} removeExercise={removeExercise} />)}
                </div>
                <button className="bg-blue-500 text-white p-3 rounded-md w-full" onClick={toggleAddScreen}>+</button>
            </div>

            <div className="p-3 pb-9 w-full bottom-0 absolute z-0">
                <button className="bg-green-500 text-white p-3 rounded-md w-full">Save</button>
            </div>

            {addScreen && <AddScreen toggleEnabled={toggleAddScreen} />}
        </div>
    )
}

const ExerciseCard: React.FC<{ exercise: Exercise, removeExercise: (id: number) => void, index: number }> = ({ exercise, removeExercise, index }) => {
    const { name } = exercise;

    const handleRemove = () => removeExercise(index);

    return (
        <div className="flex items-center border-t-2 text-left p-1 justify-between">
            <p>{name}</p>
            <button onClick={handleRemove} className="bg-red-400 flex items-center justify-center w-9 h-9 rounded-lg">x</button>
        </div>
    )
}

interface AddScreenProps {
    toggleEnabled: () => void;
}

const AddScreen: React.FC<AddScreenProps> = ({ toggleEnabled }) => {
    const [addExisting, setAddExisting] = useState<boolean>(true);

    return (
        <div className="absolute bg-opacity-50 bg-black bottom-0 w-full h-full z-10 p-9 flex gap-4 flex-col items-center justify-center">
            {
                addExisting ? <AddExercise setAddExisting={setAddExisting} toggleEnabled={toggleEnabled} /> : <NewExercise setAddExisting={setAddExisting} toggleEnabled={toggleEnabled} />
            }
        </div>
    );
}

export default NewWorkout;
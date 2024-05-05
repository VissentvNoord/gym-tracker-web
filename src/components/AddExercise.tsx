import { useContext, useState } from "react";
import testData from "../testdata.json";
import { Exercise } from "../pages/WorkoutList";
import { NewWorkoutContext } from "./NewWorkoutContext";

interface AddExerciseProps {
    setAddExisting: React.Dispatch<React.SetStateAction<boolean>>;
    toggleEnabled: () => void;
}

const loadExercises = (): Exercise[] => {
    return testData.exercises;
}

const AddExercise: React.FC<AddExerciseProps> = ({ setAddExisting, toggleEnabled }) => {
    const {newWorkout, setNewWorkout} = useContext(NewWorkoutContext);

    const [name, setName] = useState<string>('');
    const [selected, setSelected] = useState<string>();
    const [exercises, setExercises] = useState<Exercise[]>(loadExercises());
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);

    const addText = selectedExercises.length > 1 ? `Add (${selectedExercises.length})` : "Add";
    console.log(selectedExercises);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleCreateNew = () => setAddExisting(false);

    const toggleSelected = (id: number, selected: boolean) => { 
        if (selected) {
            setSelectedExercises([...selectedExercises, id]);
        } else {
            setSelectedExercises(selectedExercises.filter((exercise) => exercise != id));
        }
    };

    const handleAdd = () => {
        if(setNewWorkout === null) return;

        const newExercises = exercises.filter((exercise) => selectedExercises.includes(exercise.id));
        setNewWorkout({...newWorkout!, exercises: [...newWorkout!.exercises, ...newExercises]});
        toggleEnabled();
    }

    return (
        <>
            <div onClick={handleCreateNew} className="max-h-full w-full rounded-lg flex flex-col p-4 gap-3 relative bg-blue-500 text-white">
                <p>Create new exercise?</p>
            </div>

            <div className="max-h-full w-full bg-white rounded-lg flex flex-col overflow-scroll p-4 gap-3 relative">
                <h1>Add existing exercise</h1>

                <button className="absolute top-3 right-3 bg-red-400 w-7 h-7 rounded-lg" onClick={toggleEnabled}>x</button>

                <input className="bg-gray-300 rounded-md p-3 w-full" type="text" placeholder="search" value={name} onChange={handleNameChange} />
                <div className="flex flex-col w-full">
                    <div className="grid p-2 overflow-scroll">
                        {exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} toggleSelected={toggleSelected} />)}
                    </div>
                </div>
                <button onClick={handleAdd} disabled={selectedExercises.length < 1} className="bg-blue-500 text-white p-3 rounded-md w-full">{addText}</button>
            </div>
        </>
    );
}

interface ExerciseCardProps{
    exercise: Exercise;
    toggleSelected: (id: number, selected: boolean) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, toggleSelected }) => {
    const [selected, setSelected] = useState<boolean>(false);
    const {name, id} = exercise;

    const extraStyle = selected ? " bg-blue-400 text-white" : "";

    const handleToggleSelected = () => {
        toggleSelected(id, !selected);
        setSelected(!selected);
    }

    return (
        <div onClick={handleToggleSelected} className={"flex items-center border-t-2 text-left p-1 justify-between" + extraStyle}>
            <p>{name}</p>
        </div>
    )
}

export { AddExercise };
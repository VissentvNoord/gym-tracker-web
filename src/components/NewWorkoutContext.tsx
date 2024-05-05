import { createContext } from "react";
import { Workout } from "../pages/WorkoutList";

interface NewWorkoutContextType {
    newWorkout: Workout | null;
    setNewWorkout: React.Dispatch<React.SetStateAction<Workout | null>> | null;
}

export const NewWorkoutContext = createContext<NewWorkoutContextType>({
    newWorkout: null,
    setNewWorkout: null
});
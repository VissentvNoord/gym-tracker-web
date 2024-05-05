import React, { useState } from 'react';
import testData from "../testdata.json";

export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
}

export interface Exercise {
    id: number;
    name: string;
}

const loadWorkouts = () : Workout[] => {
    let workouts: Workout[] = [];
    for (let i = 0; i < testData.workouts.length; i++) {
        let workout: Workout = {
            id: testData.workouts[i].id.toString(),
            name: testData.workouts[i].name,
            exercises: []
        }

        const exercises: number[] = testData.workouts[i].exercises;
        for (let j = 0; j < exercises.length; j++) {
            for (let k = 0; k < testData.exercises.length; k++) {
                if (testData.exercises[k].id == exercises[j]) {
                    workout.exercises.push({
                        id: testData.exercises[k].id,
                        name: testData.exercises[k].name
                    })
                }
            }
        }

        workouts.push(workout);
    }

    return workouts;
}

const WorkoutList = () => {
    const [workouts] = useState<Workout[]>(loadWorkouts());

    console.log(workouts);

    return (
        <div className='flex flex-col justify-between items-center w-full h-full gap-9'>
            <div className='grid gap-3 w-full overflow-scroll p-3'>
                {workouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}
            </div>

            <button className='bg-green-400 w-24 h-24 rounded-full'>+</button>
        </div>
    );
}

interface WorkoutProps {
    workout: Workout;
}

const WorkoutCard: React.FC<WorkoutProps> = ({ workout }) => {
    const { id, name } = workout;

    return (
        <div className='bg-gray-300 rounded-lg p-3 flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h1>{name}</h1>
                <p className='font-thin'>6 exercises</p>
            </div>

            <div className='bg-gray-600'>
                start
            </div>
        </div>
    )
}

export default WorkoutList;
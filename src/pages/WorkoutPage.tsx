import React, { useState } from 'react';
import { Workout, Exercise } from './WorkoutList';

const WorkoutPage: React.FC<Workout> = ({ id, name }) => {
    const [workouts] = useState<Workout[]>([]);

    return (
        <div className='grid gap-3'>
            <h1>{name}</h1>
            <div className='grid gap-3'>
                <ExerciseCard  />
                <ExerciseCard  />
            </div>
        </div>
    );
}

const ExerciseCard: React.FC = ({ }) => {
    return (
        <div className='bg-gray-300 rounded-lg p-3 flex justify-between'>
            <div className='flex flex-col gap-2'>
                <h1>{}</h1>
                <p className='font-thin'>6 exercises</p>
            </div>

            <div className='bg-gray-600'>
                start
            </div>
        </div>
    )
}

export default WorkoutPage;
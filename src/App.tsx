import React from 'react';
import logo from './logo.svg';
import WorkoutList, { Workout } from './pages/WorkoutList';
import WorkoutPage from './pages/WorkoutPage';
import NewWorkout from './pages/NewWorkout';
import { NewWorkoutContext } from './components/NewWorkoutContext';

function App() {
  const [newWorkout, setNewWorkout] = React.useState<Workout | null>(null);

  return (
    <div className='h-full'>
      <main className='h-full p-6'>
        <NewWorkoutContext.Provider value={{ newWorkout, setNewWorkout }}>
          <NewWorkout />
        </NewWorkoutContext.Provider>
      </main>
    </div>
  );
}

export default App;

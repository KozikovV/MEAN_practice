export interface ExerciseResponse {
  exercises: Exercise[];
}

export interface Exercise {
  exercisesId: string;
  title: string;
  information: {
    description: string;
    targetMuscle: string[];
  };
}

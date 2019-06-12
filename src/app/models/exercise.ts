export interface ExerciseResponse {
  exercises: Exercise[];
}

export interface Exercise {
  title: string;
  information: {
    description: string;
    targetMuscle: string[];
  };
}

export interface ExerciseResponse {
  exercises: Exercise[];
}

export interface Exercise {
  exercisesId?: string;
  title: string;
  information: {
    description: string;
    targetMuscle: string[];
  };
}

export interface CreateExercise {
  message: string;
  body: Exercise;
}

export interface DeleteExercise {
  message: string;
}

export interface EditExercise {
  message: string;
}

// Trainings models

export interface Training {
  date: string;
  trainingId: string;
  exercises: TrainingExercise[];
}

export interface TrainingExercise extends Exercise {
  trainingExerciseId: string;
  reps: number;
  count: string;
}

export interface CreateTrainingResponse {
  date: string;
  message: string;
  body: Training;
}

export interface DeleteTraining {
  message: string;
}

export interface TrainingList {
  body: Training[];
}

export interface TrainingRes {
  body: Training;
}


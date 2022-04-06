from app import db, login_manager

# Represents an individual exercise
class Exercise(db.Model):
    __tablename__ = 'exercises'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    # Workout Relationship
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    def __init__(self, name, sets, reps):
        self.name = name
        self.sets = sets
        self.reps = reps

    def __repr__(self):
        return f'<Exercise {self.name} {self.sets}x{self.reps}>'

# Represents a singular workout
class Workout(db.Model):
    __tablename__ = 'workouts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    # foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # relationships
    exercises = db.relationship("Exercise", backref='workout', lazy='dynamic')

    def __init__(self, user, name, exercises):
        self.name = name
        self.user_id = user.id

        # Create exercises
        for exercise in exercises:
            self.exercises.append(Exercise(exercise['name'], exercise['sets'], exercise['reps']))

    def __repr__(self):
        return f'<Workout {self.name}>'

# Connects workouts to it's exercises
#class WorkoutExercise(db.Model):
#    __table__ = 'workout_exercises'
#    id = db.Column(db.Integer, primary_key=True)
#    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
#    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'))

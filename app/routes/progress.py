from app import app, db
from flask import render_template, redirect, request, url_for, flash
from flask_login import current_user, login_required
from tables import Exercise, Workout


@app.route("/progress/exercise/<exercise_id>")
@login_required
def progress_exercise(exercise_id=None):
    exercise = (
        db.session.query(Exercise)
        .filter_by(id=exercise_id)
        .join(Workout, Workout.user_id == current_user.id)
        .first()
    )
    if not exercise:
        return redirect(url_for("home"))

    return render_template("progress/exercise.html", exercise=exercise)

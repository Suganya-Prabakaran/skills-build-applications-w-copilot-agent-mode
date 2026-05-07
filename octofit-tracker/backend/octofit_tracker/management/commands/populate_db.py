from django.core.management.base import BaseCommand
from datetime import date, timedelta
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()

        # Create teams
        team_marvel = Team.objects.create(name='marvel', description='Marvel Team')
        team_dc = Team.objects.create(name='dc', description='DC Team')

        # Create Marvel users
        ironman = User.objects.create(name='Tony Stark', email='tony@marvel.com', team='marvel')
        spiderman = User.objects.create(name='Peter Parker', email='peter@marvel.com', team='marvel')
        hulk = User.objects.create(name='Bruce Banner', email='bruce@marvel.com', team='marvel')

        # Create DC users
        batman = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team='dc')
        superman = User.objects.create(name='Clark Kent', email='clark@dc.com', team='dc')
        wonderwoman = User.objects.create(name='Diana Prince', email='diana@dc.com', team='dc')

        # Create workouts
        pushups = Workout.objects.create(name='Pushups', description='Upper body strength training', suggested_for='marvel')
        running = Workout.objects.create(name='Running', description='Cardio training', suggested_for='dc')
        swimming = Workout.objects.create(name='Swimming', description='Full body cardio', suggested_for='marvel')
        weightlifting = Workout.objects.create(name='Weightlifting', description='Strength training', suggested_for='dc')

        # Create activities for Marvel team
        today = date.today()
        Activity.objects.create(user_id=str(ironman.id), user_name=ironman.name, type='running', duration=30, date=today)
        Activity.objects.create(user_id=str(ironman.id), user_name=ironman.name, type='weightlifting', duration=45, date=today - timedelta(days=1))
        Activity.objects.create(user_id=str(spiderman.id), user_name=spiderman.name, type='running', duration=25, date=today)
        Activity.objects.create(user_id=str(spiderman.id), user_name=spiderman.name, type='climbing', duration=60, date=today - timedelta(days=1))
        Activity.objects.create(user_id=str(hulk.id), user_name=hulk.name, type='weightlifting', duration=90, date=today)
        Activity.objects.create(user_id=str(hulk.id), user_name=hulk.name, type='swimming', duration=40, date=today - timedelta(days=2))

        # Create activities for DC team
        Activity.objects.create(user_id=str(batman.id), user_name=batman.name, type='running', duration=35, date=today)
        Activity.objects.create(user_id=str(batman.id), user_name=batman.name, type='martial arts', duration=50, date=today - timedelta(days=1))
        Activity.objects.create(user_id=str(superman.id), user_name=superman.name, type='flying', duration=120, date=today)
        Activity.objects.create(user_id=str(superman.id), user_name=superman.name, type='weightlifting', duration=60, date=today - timedelta(days=1))
        Activity.objects.create(user_id=str(wonderwoman.id), user_name=wonderwoman.name, type='sword training', duration=75, date=today)
        Activity.objects.create(user_id=str(wonderwoman.id), user_name=wonderwoman.name, type='running', duration=30, date=today - timedelta(days=2))

        # Create leaderboard entries
        Leaderboard.objects.create(user_id=str(superman.id), user_name=superman.name, points=500, rank=1)
        Leaderboard.objects.create(user_id=str(hulk.id), user_name=hulk.name, points=450, rank=2)
        Leaderboard.objects.create(user_id=str(wonderwoman.id), user_name=wonderwoman.name, points=400, rank=3)
        Leaderboard.objects.create(user_id=str(ironman.id), user_name=ironman.name, points=380, rank=4)
        Leaderboard.objects.create(user_id=str(batman.id), user_name=batman.name, points=350, rank=5)
        Leaderboard.objects.create(user_id=str(spiderman.id), user_name=spiderman.name, points=300, rank=6)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data'))

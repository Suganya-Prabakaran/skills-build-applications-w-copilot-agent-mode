from rest_framework import viewsets
from .models import User, Team, Activity, Workout, Leaderboard
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, WorkoutSerializer, LeaderboardSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

from django.http import JsonResponse

def activities(request):
    # Replace with real query logic
    data = {"activities": ["run", "swim", "cycle"]}
    return JsonResponse(data)

def leaderboard(request):
    # Replace with real query logic
    data = {"leaderboard": [{"user": "Alice", "score": 100}, {"user": "Bob", "score": 90}]}
    return JsonResponse(data)

def teams(request):
    # Replace with real query logic
    data = {"teams": ["Team Octo", "Team Fit"]}
    return JsonResponse(data)

def users(request):
    # Replace with real query logic
    data = {"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}
    return JsonResponse(data)

def workouts(request):
    # Replace with real query logic
    data = {"workouts": ["pushups", "squats", "plank"]}
    return JsonResponse(data)

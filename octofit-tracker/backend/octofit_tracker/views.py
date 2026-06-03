from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
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

@api_view(['GET'])
def activities(request):
    activities = Activity.objects.all()
    serializer = ActivitySerializer(activities, many=True)
    return Response({"activities": serializer.data})

@api_view(['GET'])
def leaderboard(request):
    leaderboard = Leaderboard.objects.all().order_by('-points')
    serializer = LeaderboardSerializer(leaderboard, many=True)
    return Response({"leaderboard": serializer.data})

@api_view(['GET'])
def teams(request):
    teams = Team.objects.all()
    serializer = TeamSerializer(teams, many=True)
    return Response({"teams": serializer.data})

@api_view(['GET'])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response({"users": serializer.data})

@api_view(['GET'])
def workouts(request):
    workouts = Workout.objects.all()
    serializer = WorkoutSerializer(workouts, many=True)
    return Response({"workouts": serializer.data})

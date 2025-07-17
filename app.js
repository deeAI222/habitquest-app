import React, { useState, useEffect } from 'react';
import { Trophy, Flame, Star, Plus, Check, X, Target, Calendar, Award } from 'lucide-react';

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 8 glasses of water', streak: 12, completed: false, category: 'health', xp: 10 },
    { id: 2, name: 'Exercise for 30 minutes', streak: 7, completed: true, category: 'fitness', xp: 20 },
    { id: 3, name: 'Read for 20 minutes', streak: 5, completed: false, category: 'learning', xp: 15 },
    { id: 4, name: 'Meditate for 10 minutes', streak: 3, completed: false, category: 'wellness', xp: 15 }
  ]);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [userLevel, setUserLevel] = useState(8);
  const [userXP, setUserXP] = useState(340);
  const [totalXP, setTotalXP] = useState(1240);

  const categories = {
    health: { color: 'bg-green-500', icon: '💚' },
    fitness: { color: 'bg-orange-500', icon: '💪' },
    learning: { color: 'bg-blue-500', icon: '📚' },
    wellness: { color: 'bg-purple-500', icon: '🧘' }
  };

  const completeHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: true, streak: habit.streak + 1 }
        : habit
    ));
    
    const habit = habits.find(h => h.id === id);
    setUserXP(prev => prev + habit.xp);
    setTotalXP(prev => prev + habit.xp);
    
    if (userXP + habit.xp >= 500) {
      setUserLevel(prev => prev + 1);
      setUserXP(prev => (prev + habit.xp) - 500);
    }
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const newId = Math.max(...habits.map(h => h.id)) + 1;
      setHabits([...habits, {
        id: newId,
        name: newHabit,
        streak: 0,
        completed: false,
        category: 'health',
        xp: 10
      }]);
      setNewHabit('');
      setShowAddHabit(false);
    }
  };

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(h => h.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm p-4 border-b border-white/10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">HabitQuest</h1>
              <p className="text-sm text-gray-300">Level {userLevel} Adventurer</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold">{totalXP}</span>
            </div>
            <div className="text-xs text-gray-400">Total XP</div>
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="max-w-md mx-auto p-4">
        <div className="bg-black/20 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Level {userLevel}</span>
            <span className="text-sm text-gray-300">{userXP}/500 XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userXP / 500) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-md mx-auto px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-xl font-bold">{totalStreak}</span>
            </div>
            <p className="text-xs text-gray-400">Total Streak</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="w-5 h-5 text-green-500" />
              <span className="text-xl font-bold">{completedToday}</span>
            </div>
            <p className="text-xs text-gray-400">Done Today</p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-xl font-bold">{habits.length}</span>
            </div>
            <p className="text-xs text-gray-400">Active Habits</p>
          </div>
        </div>
      </div>

      {/* Daily Habits */}
      <div className="max-w-md mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Today's Quests</h2>
          <button
            onClick={() => setShowAddHabit(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full p-2 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${categories[habit.category].color}`}></div>
                  <div className="flex-1">
                    <p className={`font-medium ${habit.completed ? 'line-through text-gray-400' : ''}`}>
                      {habit.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-300">{habit.streak} day streak</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">{habit.xp} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => completeHabit(habit.id)}
                  disabled={habit.completed}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    habit.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-600 hover:bg-green-500 text-gray-300 hover:text-white'
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Habit Modal */}
      {showAddHabit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Add New Quest</h3>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Enter your new habit..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            />
            <div className="flex space-x-3">
              <button
                onClick={addHabit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg py-2 font-medium transition-all duration-200"
              >
                Add Quest
              </button>
              <button
                onClick={() => setShowAddHabit(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-lg py-2 font-medium transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-md mx-auto flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 text-purple-400">
            <Target className="w-6 h-6" />
            <span className="text-xs">Habits</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <Trophy className="w-6 h-6" />
            <span className="text-xs">Achievements</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400">
            <Award className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;

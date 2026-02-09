/* ============================================
   🎯 JEE HABIT TRACKER - MAIN APPLICATION
   Daily habit tracking with sub-tasks and progress
   ============================================ */

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
    HABITS: 'jee_tracker_habits',
    DAILY_RECORDS: 'jee_tracker_daily',
    SETTINGS: 'jee_tracker_settings',
    THEME: 'jee_tracker_theme',
    NOTIFICATIONS_ASKED: 'jee_tracker_notifications_asked'
};

// ============================================
// DEFAULT HABITS CONFIGURATION
// ============================================

const DEFAULT_HABITS = [
    {
        id: 'exercise',
        name: 'Exercise',
        icon: '💪',
        color: '#10b981',
        defaultSubtasks: ['Morning Workout', 'Stretching', 'Walking 30 mins']
    },
    {
        id: 'jee-math',
        name: 'JEE Maths',
        icon: '➗',
        color: '#6366f1',
        defaultSubtasks: ['PYQs Practice', 'Revision Notes', 'Practice 20 Questions', 'Mock Test Section']
    },
    {
        id: 'jee-physics',
        name: 'JEE Physics',
        icon: '⚛️',
        color: '#8b5cf6',
        defaultSubtasks: ['Theory Reading', 'Numericals Practice', 'PYQs', 'Formula Revision']
    },
    {
        id: 'jee-chemistry',
        name: 'JEE Chemistry',
        icon: '🧪',
        color: '#ec4899',
        defaultSubtasks: ['Organic Reactions', 'Inorganic Facts', 'Physical Chem Problems']
    },
    {
        id: 'jee-60days',
        name: 'JEE 60 Days Plan',
        icon: '📅',
        color: '#f59e0b',
        defaultSubtasks: ['Daily Target', 'Backlog Clearing', 'Weak Topic Focus']
    },
    {
        id: 'jee-99',
        name: 'JEE 99% Plan',
        icon: '🎯',
        color: '#ef4444',
        defaultSubtasks: ['High Weightage Topics', 'Previous Topper Strategy', 'Important Derivations']
    },
    {
        id: 'jee-paper-analysis',
        name: 'JEE Paper Analysis',
        icon: '📝',
        color: '#14b8a6',
        defaultSubtasks: ['Analyze Previous Paper', 'Note Mistakes', 'Trend Analysis']
    },
    {
        id: 'bme',
        name: 'BME (Biomedical)',
        icon: '🔬',
        color: '#06b6d4',
        defaultSubtasks: ['Lecture Notes', 'Assignment', 'Lab Preparation']
    },
    {
        id: 'college-math',
        name: 'College Maths',
        icon: '📐',
        color: '#3b82f6',
        defaultSubtasks: ['Class Notes', 'Tutorials', 'Assignment Solving']
    },
    {
        id: 'es',
        name: 'ES (Environmental)',
        icon: '🌍',
        color: '#22c55e',
        defaultSubtasks: ['Chapter Reading', 'Case Studies', 'Quiz Prep']
    },
    {
        id: 'be',
        name: 'BE (Basic Elec.)',
        icon: '⚡',
        color: '#eab308',
        defaultSubtasks: ['Circuit Analysis', 'Lab Work', 'Viva Preparation']
    },
    {
        id: 'college-chemistry',
        name: 'College Chemistry',
        icon: '⚗️',
        color: '#d946ef',
        defaultSubtasks: ['Theory Study', 'Practical Notes', 'Equation Balancing']
    },
    {
        id: 'book-reading',
        name: 'Book Reading',
        icon: '📖',
        color: '#0ea5e9',
        defaultSubtasks: ['Read 20 Pages', 'Note Key Points', 'Reflection Writing']
    },
    {
        id: 'english',
        name: 'English Speaking/Writing',
        icon: '🗣️',
        color: '#84cc16',
        defaultSubtasks: ['Vocab Practice', 'Writing Exercise', 'Speaking Practice 15min']
    },
    {
        id: 'communication',
        name: 'Communication',
        icon: '💬',
        color: '#f97316',
        defaultSubtasks: ['Conversation Practice', 'Body Language', 'Presentation Skills']
    },
    {
        id: 'day-vlog',
        name: 'Own Day Vlog',
        icon: '🎬',
        color: '#dc2626',
        defaultSubtasks: ['Morning Clip', 'Activity Recording', 'Evening Edit']
    },
    {
        id: 'learning-new',
        name: 'Learning New Things',
        icon: '🧠',
        color: '#7c3aed',
        defaultSubtasks: ['Online Course', 'Skill Practice', 'Documentation']
    },
    {
        id: 'yt-ai',
        name: 'YT and AI',
        icon: '🤖',
        color: '#e11d48',
        defaultSubtasks: ['Content Ideas', 'AI Tool Exploration', 'Video Scripting']
    },
    {
        id: 'finance',
        name: 'Finance',
        icon: '💰',
        color: '#059669',
        defaultSubtasks: ['Expense Tracking', 'Investment Study', 'Budget Review']
    },
    {
        id: 'reviewing-today',
        name: 'Reviewing Today',
        icon: '📊',
        color: '#4f46e5',
        defaultSubtasks: ['What Went Well', 'What to Improve', 'Tomorrow Planning']
    }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

const Storage = {
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    }
};

const DateUtils = {
    getToday() {
        return new Date().toISOString().split('T')[0];
    },

    getYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    },

    formatDate(date = new Date()) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    },

    formatTime(time24) {
        if (!time24) return '';
        const [hours, minutes] = time24.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    },

    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning! ☀️';
        if (hour < 17) return 'Good afternoon! 🌤️';
        if (hour < 21) return 'Good evening! 🌅';
        return 'Night owl mode! 🌙';
    },

    getDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }
};

// ============================================
// HABIT MANAGER
// ============================================

class HabitManager {
    constructor() {
        this.habits = [];
        this.load();
    }

    load() {
        const saved = Storage.get(STORAGE_KEYS.HABITS);
        if (saved && saved.length > 0) {
            this.habits = saved;
        } else {
            // Initialize with default habits
            this.habits = DEFAULT_HABITS.map(h => ({
                ...h,
                streak: 0,
                bestStreak: 0,
                reminderTime: '09:00',
                createdAt: DateUtils.getToday(),
                enabled: true
            }));
            this.save();
        }
    }

    save() {
        Storage.set(STORAGE_KEYS.HABITS, this.habits);
    }

    getAll() {
        return this.habits.filter(h => h.enabled !== false);
    }

    getById(id) {
        return this.habits.find(h => h.id === id);
    }

    updateStreak(habitId, completed) {
        const habit = this.getById(habitId);
        if (!habit) return;

        const today = DateUtils.getToday();
        const yesterday = DateUtils.getYesterday();

        // Get yesterday's record
        const dailyManager = new DailyRecordManager();
        const yesterdayRecord = dailyManager.getRecord(yesterday);
        const wasCompletedYesterday = yesterdayRecord?.habits?.[habitId]?.completed;

        if (completed) {
            if (wasCompletedYesterday || habit.streak === 0) {
                habit.streak = wasCompletedYesterday ? habit.streak + 1 : 1;
            }
            if (habit.streak > habit.bestStreak) {
                habit.bestStreak = habit.streak;
            }
        } else {
            // Only reset if it wasn't completed yesterday either
            if (!wasCompletedYesterday) {
                habit.streak = 0;
            }
        }

        this.save();
    }

    toggleHabit(id) {
        const habit = this.getById(id);
        if (habit) {
            habit.enabled = !habit.enabled;
            this.save();
        }
    }

    updateHabit(id, updates) {
        const index = this.habits.findIndex(h => h.id === id);
        if (index !== -1) {
            this.habits[index] = { ...this.habits[index], ...updates };
            this.save();
        }
    }

    createHabit(name, icon, color, defaultSubtasks = []) {
        const id = 'custom-' + Date.now();
        const newHabit = {
            id,
            name,
            icon,
            color,
            defaultSubtasks,
            streak: 0,
            bestStreak: 0,
            reminderTime: '09:00',
            createdAt: DateUtils.getToday(),
            enabled: true
        };
        this.habits.push(newHabit);
        this.save();
        return newHabit;
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(h => h.id !== id);
        this.save();
    }

    getBestStreak() {
        return Math.max(...this.habits.map(h => h.bestStreak), 0);
    }

    getCurrentBestStreak() {
        return Math.max(...this.habits.map(h => h.streak), 0);
    }
}

// ============================================
// DAILY RECORD MANAGER
// ============================================

class DailyRecordManager {
    constructor() {
        this.records = {};
        this.load();
    }

    load() {
        const saved = Storage.get(STORAGE_KEYS.DAILY_RECORDS);
        this.records = saved || {};
        this.cleanOldRecords();
    }

    save() {
        Storage.set(STORAGE_KEYS.DAILY_RECORDS, this.records);
    }

    cleanOldRecords() {
        // Keep only last 60 days
        const cutoffDate = DateUtils.getDaysAgo(60);
        const cleaned = {};

        Object.keys(this.records).forEach(date => {
            if (date >= cutoffDate) {
                cleaned[date] = this.records[date];
            }
        });

        this.records = cleaned;
        this.save();
    }

    getRecord(date) {
        return this.records[date] || null;
    }

    getTodayRecord() {
        const today = DateUtils.getToday();
        if (!this.records[today]) {
            this.initializeTodayRecord();
        }
        return this.records[today];
    }

    initializeTodayRecord() {
        const today = DateUtils.getToday();
        const habitManager = new HabitManager();
        const habits = habitManager.getAll();

        this.records[today] = {
            date: today,
            habits: {},
            overallPercent: 0,
            timestamp: Date.now()
        };

        habits.forEach(habit => {
            // Copy subtasks from yesterday or use defaults
            const yesterday = DateUtils.getYesterday();
            const yesterdayRecord = this.records[yesterday];
            const yesterdayHabit = yesterdayRecord?.habits?.[habit.id];

            let subtasks;
            if (yesterdayHabit && yesterdayHabit.subtasks) {
                // Reset progress but keep task titles
                subtasks = yesterdayHabit.subtasks.map((st, idx) => ({
                    id: `${habit.id}-${idx}-${Date.now()}`,
                    title: st.title,
                    done: false,
                    progress: 0
                }));
            } else {
                // Use default subtasks
                subtasks = (habit.defaultSubtasks || []).map((title, idx) => ({
                    id: `${habit.id}-${idx}-${Date.now()}`,
                    title,
                    done: false,
                    progress: 0
                }));
            }

            this.records[today].habits[habit.id] = {
                subtasks,
                completionPercent: 0,
                completed: false
            };
        });

        this.save();
    }

    updateSubtask(habitId, subtaskId, updates) {
        const today = DateUtils.getToday();
        const record = this.getTodayRecord();

        if (!record.habits[habitId]) return;

        const subtask = record.habits[habitId].subtasks.find(st => st.id === subtaskId);
        if (subtask) {
            Object.assign(subtask, updates);
            if (updates.done !== undefined) {
                subtask.progress = updates.done ? 100 : 0;
            }
            this.recalculateCompletion(habitId);
        }
    }

    addSubtask(habitId, title) {
        const today = DateUtils.getToday();
        const record = this.getTodayRecord();

        if (!record.habits[habitId]) return;

        const newSubtask = {
            id: `${habitId}-${Date.now()}`,
            title,
            done: false,
            progress: 0
        };

        record.habits[habitId].subtasks.push(newSubtask);
        this.recalculateCompletion(habitId);
        return newSubtask;
    }

    removeSubtask(habitId, subtaskId) {
        const today = DateUtils.getToday();
        const record = this.getTodayRecord();

        if (!record.habits[habitId]) return;

        record.habits[habitId].subtasks = record.habits[habitId].subtasks
            .filter(st => st.id !== subtaskId);
        this.recalculateCompletion(habitId);
    }

    recalculateCompletion(habitId) {
        const today = DateUtils.getToday();
        const record = this.records[today];

        if (!record?.habits?.[habitId]) return;

        const habitData = record.habits[habitId];
        const subtasks = habitData.subtasks;

        if (subtasks.length === 0) {
            habitData.completionPercent = 0;
            habitData.completed = false;
        } else {
            const totalProgress = subtasks.reduce((sum, st) => sum + st.progress, 0);
            habitData.completionPercent = Math.round(totalProgress / subtasks.length);
            habitData.completed = habitData.completionPercent >= 80;
        }

        // Update overall day completion
        this.recalculateOverall();

        // Update habit streak
        const habitManager = new HabitManager();
        habitManager.updateStreak(habitId, habitData.completed);

        this.save();
    }

    recalculateOverall() {
        const today = DateUtils.getToday();
        const record = this.records[today];

        if (!record) return;

        const habitIds = Object.keys(record.habits);
        if (habitIds.length === 0) {
            record.overallPercent = 0;
            return;
        }

        const totalPercent = habitIds.reduce((sum, id) => {
            return sum + (record.habits[id].completionPercent || 0);
        }, 0);

        record.overallPercent = Math.round(totalPercent / habitIds.length);
    }

    getHabitProgress(habitId) {
        const record = this.getTodayRecord();
        return record?.habits?.[habitId] || { subtasks: [], completionPercent: 0, completed: false };
    }

    // Get history for charts
    getWeeklyData() {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = DateUtils.getDaysAgo(i);
            const record = this.records[date];
            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

            data.push({
                date,
                day: dayName,
                percent: record?.overallPercent || 0
            });
        }
        return data;
    }

    getYesterdaySummary() {
        const yesterday = DateUtils.getYesterday();
        return this.records[yesterday] || null;
    }

    // Get weekly data for a specific habit
    getHabitWeeklyData(habitId) {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = DateUtils.getDaysAgo(i);
            const record = this.records[date];
            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

            const habitData = record?.habits?.[habitId];
            data.push({
                date,
                day: dayName,
                percent: habitData?.completionPercent || 0
            });
        }
        return data;
    }
}

// ============================================
// THEME MANAGER
// ============================================

class ThemeManager {
    constructor() {
        this.theme = Storage.get(STORAGE_KEYS.THEME) || 'light';
        this.apply();
    }

    apply() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateIcon();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        Storage.set(STORAGE_KEYS.THEME, this.theme);
        this.apply();
    }

    updateIcon() {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }
}

// ============================================
// NOTIFICATION MANAGER
// ============================================

class NotificationManager {
    constructor() {
        this.permission = 'Notification' in window ? Notification.permission : 'denied';
    }

    isSupported() {
        return 'Notification' in window;
    }

    async requestPermission() {
        if (!this.isSupported()) return false;

        try {
            this.permission = await Notification.requestPermission();
            Storage.set(STORAGE_KEYS.NOTIFICATIONS_ASKED, true);
            return this.permission === 'granted';
        } catch (e) {
            return false;
        }
    }

    shouldAskPermission() {
        if (!this.isSupported()) return false;
        if (this.permission === 'granted' || this.permission === 'denied') return false;
        return !Storage.get(STORAGE_KEYS.NOTIFICATIONS_ASKED);
    }

    send(title, body) {
        if (this.permission !== 'granted') return;
        new Notification(title, { body, icon: '🎯' });
    }
}

// ============================================
// UI CONTROLLER
// ============================================

class UIController {
    constructor() {
        this.habitManager = new HabitManager();
        this.dailyManager = new DailyRecordManager();
        this.themeManager = new ThemeManager();
        this.notificationManager = new NotificationManager();

        this.currentView = 'home';
        this.expandedHabit = null;
        this.browsedDate = DateUtils.getYesterday(); // For past day browser

        this.cacheElements();
        this.bindEvents();
        this.render();
        this.checkNotifications();
    }

    cacheElements() {
        this.elements = {
            greeting: document.getElementById('greeting'),
            dateDisplay: document.getElementById('date-display'),
            progressCircle: document.getElementById('progress-circle'),
            progressCount: document.getElementById('progress-count'),
            progressPercent: document.getElementById('progress-percent'),
            bestStreak: document.getElementById('best-streak'),
            motivationText: document.getElementById('motivation-text'),
            habitsList: document.getElementById('habits-list'),
            themeToggle: document.getElementById('theme-toggle'),

            // Navigation
            navHome: document.getElementById('nav-home'),
            navHistory: document.getElementById('nav-history'),

            // Views
            mainContent: document.querySelector('.main-content'),
            historyView: document.getElementById('history-view'),

            // Modals
            subtaskModal: document.getElementById('subtask-modal'),
            subtaskModalOverlay: document.getElementById('subtask-modal-overlay'),
            subtaskHabitName: document.getElementById('subtask-habit-name'),
            subtaskList: document.getElementById('subtask-list'),
            newSubtaskInput: document.getElementById('new-subtask-input'),
            addSubtaskBtn: document.getElementById('add-subtask-btn'),
            closeSubtaskModal: document.getElementById('close-subtask-modal'),

            // History elements
            yesterdaySummary: document.getElementById('yesterday-summary'),
            weeklyChart: document.getElementById('weekly-chart'),

            // Notification toast
            notificationToast: document.getElementById('notification-toast'),
            enableNotifications: document.getElementById('enable-notifications'),
            dismissToast: document.getElementById('dismiss-toast'),

            // Add Habit Modal
            addHabitBtn: document.getElementById('add-habit-btn'),
            addHabitModalOverlay: document.getElementById('add-habit-modal-overlay'),
            closeAddHabitModal: document.getElementById('close-add-habit-modal'),
            newHabitName: document.getElementById('new-habit-name'),
            iconPicker: document.getElementById('icon-picker'),
            colorPicker: document.getElementById('color-picker'),
            saveNewHabit: document.getElementById('save-new-habit'),

            // Habit Chart (in modal)
            habitMiniChart: document.getElementById('habit-mini-chart'),
            habitStreak: document.getElementById('habit-streak'),
            habitBestStreak: document.getElementById('habit-best-streak'),
            habitAvg: document.getElementById('habit-avg'),

            // Past Day Browser
            prevDayBtn: document.getElementById('prev-day-btn'),
            nextDayBtn: document.getElementById('next-day-btn'),
            selectedDate: document.getElementById('selected-date'),
            pastDaySummary: document.getElementById('past-day-summary'),
            incompleteTasksList: document.getElementById('incomplete-tasks-list'),

            // Delete Habit Confirmation Modal
            deleteHabitBtn: document.getElementById('delete-habit-btn'),
            deleteConfirmModalOverlay: document.getElementById('delete-confirm-modal-overlay'),
            deleteConfirmText: document.getElementById('delete-confirm-text'),
            cancelDeleteBtn: document.getElementById('cancel-delete-btn'),
            confirmDeleteBtn: document.getElementById('confirm-delete-btn')
        };
    }

    bindEvents() {
        // Theme toggle
        this.elements.themeToggle?.addEventListener('click', () => {
            this.themeManager.toggle();
        });

        // Navigation
        this.elements.navHome?.addEventListener('click', () => this.switchView('home'));
        this.elements.navHistory?.addEventListener('click', () => this.switchView('history'));

        // Subtask modal
        this.elements.closeSubtaskModal?.addEventListener('click', () => this.closeSubtaskModal());
        this.elements.subtaskModalOverlay?.addEventListener('click', (e) => {
            if (e.target === this.elements.subtaskModalOverlay) this.closeSubtaskModal();
        });

        // Add subtask
        this.elements.addSubtaskBtn?.addEventListener('click', () => this.addNewSubtask());
        this.elements.newSubtaskInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addNewSubtask();
        });

        // Notifications
        this.elements.enableNotifications?.addEventListener('click', async () => {
            await this.notificationManager.requestPermission();
            this.hideNotificationToast();
        });
        this.elements.dismissToast?.addEventListener('click', () => {
            Storage.set(STORAGE_KEYS.NOTIFICATIONS_ASKED, true);
            this.hideNotificationToast();
        });

        // Add Habit Modal
        this.elements.addHabitBtn?.addEventListener('click', () => this.openAddHabitModal());
        this.elements.closeAddHabitModal?.addEventListener('click', () => this.closeAddHabitModal());
        this.elements.addHabitModalOverlay?.addEventListener('click', (e) => {
            if (e.target === this.elements.addHabitModalOverlay) this.closeAddHabitModal();
        });
        this.elements.saveNewHabit?.addEventListener('click', () => this.saveNewHabit());

        // Icon picker
        this.elements.iconPicker?.querySelectorAll('.icon-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.iconPicker.querySelectorAll('.icon-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });

        // Color picker
        this.elements.colorPicker?.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.colorPicker.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });

        // Past Day Browser Navigation
        this.elements.prevDayBtn?.addEventListener('click', () => this.navigatePastDay(-1));
        this.elements.nextDayBtn?.addEventListener('click', () => this.navigatePastDay(1));

        // Delete Habit
        this.elements.deleteHabitBtn?.addEventListener('click', () => this.showDeleteConfirmation());
        this.elements.cancelDeleteBtn?.addEventListener('click', () => this.hideDeleteConfirmation());
        this.elements.confirmDeleteBtn?.addEventListener('click', () => this.confirmDeleteHabit());
        this.elements.deleteConfirmModalOverlay?.addEventListener('click', (e) => {
            if (e.target === this.elements.deleteConfirmModalOverlay) this.hideDeleteConfirmation();
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSubtaskModal();
                this.closeAddHabitModal();
                this.hideDeleteConfirmation();
            }
        });
    }

    render() {
        this.renderHeader();
        this.renderProgress();
        this.renderHabits();
    }

    renderHeader() {
        if (this.elements.greeting) {
            this.elements.greeting.textContent = DateUtils.getGreeting();
        }
        if (this.elements.dateDisplay) {
            this.elements.dateDisplay.textContent = DateUtils.formatDate();
        }
    }

    renderProgress() {
        const record = this.dailyManager.getTodayRecord();
        const habits = this.habitManager.getAll();

        const completedCount = Object.values(record.habits)
            .filter(h => h.completed).length;
        const totalCount = habits.length;
        const overallPercent = record.overallPercent || 0;

        // Progress ring
        if (this.elements.progressCircle) {
            const circumference = 2 * Math.PI * 52;
            const offset = circumference - (overallPercent / 100) * circumference;
            this.elements.progressCircle.style.strokeDashoffset = offset;
        }

        // Progress text
        if (this.elements.progressCount) {
            this.elements.progressCount.textContent = `${completedCount}/${totalCount}`;
        }
        if (this.elements.progressPercent) {
            this.elements.progressPercent.textContent = `${overallPercent}%`;
        }

        // Best streak
        if (this.elements.bestStreak) {
            this.elements.bestStreak.textContent = this.habitManager.getBestStreak();
        }

        // Motivation
        this.renderMotivation(overallPercent);
    }

    renderMotivation(percent) {
        if (!this.elements.motivationText) return;

        let message;
        if (percent === 100) {
            message = "🎉 INCREDIBLE! You crushed it today!";
        } else if (percent >= 80) {
            message = "🔥 Almost there! Finish strong!";
        } else if (percent >= 50) {
            message = "💪 Great progress! Keep pushing!";
        } else if (percent > 0) {
            message = "🚀 You've started! Every step counts!";
        } else {
            message = "✨ New day, new opportunities! Let's go!";
        }
        this.elements.motivationText.textContent = message;
    }

    renderHabits() {
        const habits = this.habitManager.getAll();
        const record = this.dailyManager.getTodayRecord();

        if (!this.elements.habitsList) return;

        this.elements.habitsList.innerHTML = habits.map(habit => {
            const progress = record.habits[habit.id] || { completionPercent: 0, completed: false };
            const percent = progress.completionPercent;
            const isCompleted = progress.completed;

            return `
                <div class="habit-card ${isCompleted ? 'completed' : ''}" 
                     data-habit-id="${habit.id}"
                     onclick="app.openHabitDetail('${habit.id}')">
                    <div class="habit-left">
                        <div class="habit-icon" style="background: ${habit.color}20; color: ${habit.color}">
                            ${habit.icon}
                        </div>
                        <div class="habit-info">
                            <div class="habit-name">${this.escapeHtml(habit.name)}</div>
                            <div class="habit-meta">
                                ${habit.streak > 0 ? `<span class="habit-streak">🔥 ${habit.streak}</span>` : ''}
                                <span class="subtask-count">${progress.subtasks?.length || 0} tasks</span>
                            </div>
                        </div>
                    </div>
                    <div class="habit-right">
                        <div class="habit-percent ${isCompleted ? 'complete' : ''}">${percent}%</div>
                        <div class="mini-progress-bar">
                            <div class="mini-progress-fill" style="width: ${percent}%; background: ${habit.color}"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    openHabitDetail(habitId) {
        this.expandedHabit = habitId;
        const habit = this.habitManager.getById(habitId);
        const progress = this.dailyManager.getHabitProgress(habitId);

        if (!habit || !this.elements.subtaskModalOverlay) return;

        // Set habit name
        if (this.elements.subtaskHabitName) {
            this.elements.subtaskHabitName.innerHTML = `
                <span class="modal-habit-icon" style="color: ${habit.color}">${habit.icon}</span>
                ${this.escapeHtml(habit.name)}
                <span class="modal-habit-percent">${progress.completionPercent}%</span>
            `;
        }

        // Render the 7-day progress chart
        this.renderHabitChart(habitId);

        // Render subtasks
        this.renderSubtasks(habitId);

        // Show modal
        this.elements.subtaskModalOverlay.classList.add('active');
    }

    renderHabitChart(habitId) {
        const habit = this.habitManager.getById(habitId);
        const weeklyData = this.dailyManager.getHabitWeeklyData(habitId);

        // Render mini bar chart
        if (this.elements.habitMiniChart) {
            this.elements.habitMiniChart.innerHTML = weeklyData.map((day, index) => {
                const isToday = index === 6;
                const barColor = isToday ? habit.color : (day.percent >= 80 ? '#10b981' : (day.percent > 0 ? habit.color + '80' : 'var(--border-color)'));

                return `
                    <div class="habit-chart-bar">
                        <span class="habit-bar-value">${day.percent > 0 ? day.percent + '%' : ''}</span>
                        <div class="habit-bar-container">
                            <div class="habit-bar-fill" style="height: ${Math.max(day.percent, 4)}%; background: ${barColor}"></div>
                        </div>
                        <span class="habit-bar-label" style="${isToday ? 'font-weight: bold; color: ' + habit.color : ''}">${day.day}</span>
                    </div>
                `;
            }).join('');
        }

        // Update stats
        if (this.elements.habitStreak) {
            this.elements.habitStreak.textContent = habit.streak || 0;
        }
        if (this.elements.habitBestStreak) {
            this.elements.habitBestStreak.textContent = habit.bestStreak || 0;
        }
        if (this.elements.habitAvg) {
            const avg = Math.round(weeklyData.reduce((sum, d) => sum + d.percent, 0) / 7);
            this.elements.habitAvg.textContent = avg + '%';
        }
    }


    renderSubtasks(habitId) {
        const habit = this.habitManager.getById(habitId);
        const progress = this.dailyManager.getHabitProgress(habitId);

        if (!this.elements.subtaskList) return;

        if (progress.subtasks.length === 0) {
            this.elements.subtaskList.innerHTML = `
                <div class="empty-subtasks">
                    <p>No tasks yet. Add your first task below!</p>
                </div>
            `;
            return;
        }

        this.elements.subtaskList.innerHTML = progress.subtasks.map(subtask => `
            <div class="subtask-item ${subtask.done ? 'completed' : ''}" data-subtask-id="${subtask.id}">
                <button class="subtask-check ${subtask.done ? 'checked' : ''}"
                        onclick="app.toggleSubtask('${habitId}', '${subtask.id}'); event.stopPropagation();">
                    ${subtask.done ? '✓' : ''}
                </button>
                <div class="subtask-content">
                    <span class="subtask-title">${this.escapeHtml(subtask.title)}</span>
                    <div class="subtask-progress-bar">
                        <input type="range" 
                               min="0" max="100" 
                               value="${subtask.progress}"
                               class="progress-slider"
                               style="--progress: ${subtask.progress}%; --color: ${habit.color}"
                               onchange="app.updateSubtaskProgress('${habitId}', '${subtask.id}', this.value); event.stopPropagation();"
                               onclick="event.stopPropagation();">
                        <span class="progress-value">${subtask.progress}%</span>
                    </div>
                </div>
                <button class="subtask-delete" 
                        onclick="app.deleteSubtask('${habitId}', '${subtask.id}'); event.stopPropagation();">
                    🗑️
                </button>
            </div>
        `).join('');
    }

    toggleSubtask(habitId, subtaskId) {
        const progress = this.dailyManager.getHabitProgress(habitId);
        const subtask = progress.subtasks.find(st => st.id === subtaskId);

        if (subtask) {
            this.dailyManager.updateSubtask(habitId, subtaskId, { done: !subtask.done });
            this.renderSubtasks(habitId);
            this.updateModalHeader(habitId);
            this.render();
        }
    }

    updateSubtaskProgress(habitId, subtaskId, value) {
        const progress = parseInt(value);
        this.dailyManager.updateSubtask(habitId, subtaskId, {
            progress,
            done: progress === 100
        });
        this.renderSubtasks(habitId);
        this.updateModalHeader(habitId);
        this.render();
    }

    updateModalHeader(habitId) {
        const habit = this.habitManager.getById(habitId);
        const progress = this.dailyManager.getHabitProgress(habitId);

        if (this.elements.subtaskHabitName) {
            this.elements.subtaskHabitName.innerHTML = `
                <span class="modal-habit-icon" style="color: ${habit.color}">${habit.icon}</span>
                ${this.escapeHtml(habit.name)}
                <span class="modal-habit-percent">${progress.completionPercent}%</span>
            `;
        }
    }

    addNewSubtask() {
        if (!this.expandedHabit || !this.elements.newSubtaskInput) return;

        const title = this.elements.newSubtaskInput.value.trim();
        if (!title) return;

        this.dailyManager.addSubtask(this.expandedHabit, title);
        this.elements.newSubtaskInput.value = '';
        this.renderSubtasks(this.expandedHabit);
        this.updateModalHeader(this.expandedHabit);
        this.render();

        // Vibrate feedback
        if (navigator.vibrate) navigator.vibrate(50);
    }

    deleteSubtask(habitId, subtaskId) {
        this.dailyManager.removeSubtask(habitId, subtaskId);
        this.renderSubtasks(habitId);
        this.updateModalHeader(habitId);
        this.render();
    }

    closeSubtaskModal() {
        this.expandedHabit = null;
        this.elements.subtaskModalOverlay?.classList.remove('active');
    }

    openAddHabitModal() {
        // Reset form
        if (this.elements.newHabitName) this.elements.newHabitName.value = '';

        // Reset icon selection
        this.elements.iconPicker?.querySelectorAll('.icon-option').forEach((btn, i) => {
            btn.classList.toggle('selected', i === 0);
        });

        // Reset color selection
        this.elements.colorPicker?.querySelectorAll('.color-option').forEach((btn, i) => {
            btn.classList.toggle('selected', i === 0);
        });

        this.elements.addHabitModalOverlay?.classList.add('active');
        this.elements.newHabitName?.focus();
    }

    closeAddHabitModal() {
        this.elements.addHabitModalOverlay?.classList.remove('active');
    }

    saveNewHabit() {
        const name = this.elements.newHabitName?.value.trim();
        if (!name) {
            alert('Please enter a habit name');
            return;
        }

        const selectedIcon = this.elements.iconPicker?.querySelector('.icon-option.selected');
        const selectedColor = this.elements.colorPicker?.querySelector('.color-option.selected');

        const icon = selectedIcon?.dataset.icon || '📚';
        const color = selectedColor?.dataset.color || '#6366f1';

        // Create the new habit
        const newHabit = this.habitManager.createHabit(name, icon, color, ['Task 1', 'Task 2']);

        // Initialize today's record for this habit
        const today = DateUtils.getToday();
        const record = this.dailyManager.getTodayRecord();
        if (!record.habits[newHabit.id]) {
            record.habits[newHabit.id] = {
                subtasks: [
                    { id: `${newHabit.id}-1-${Date.now()}`, title: 'Task 1', done: false, progress: 0 },
                    { id: `${newHabit.id}-2-${Date.now()}`, title: 'Task 2', done: false, progress: 0 }
                ],
                completionPercent: 0,
                completed: false
            };
            this.dailyManager.save();
        }

        this.closeAddHabitModal();
        this.render();

        // Vibrate feedback
        if (navigator.vibrate) navigator.vibrate(50);
    }

    switchView(view) {
        this.currentView = view;

        if (view === 'home') {
            this.elements.mainContent?.classList.add('active');
            this.elements.historyView?.classList.remove('active');
            this.elements.navHome?.classList.add('active');
            this.elements.navHistory?.classList.remove('active');
        } else {
            this.elements.mainContent?.classList.remove('active');
            this.elements.historyView?.classList.add('active');
            this.elements.navHome?.classList.remove('active');
            this.elements.navHistory?.classList.add('active');
            this.renderHistory();
        }
    }

    renderHistory() {
        this.renderYesterdaySummary();
        this.renderWeeklyChart();
        this.renderPastDayBrowser();
    }

    renderYesterdaySummary() {
        const summary = this.dailyManager.getYesterdaySummary();
        if (!this.elements.yesterdaySummary) return;

        if (!summary) {
            this.elements.yesterdaySummary.innerHTML = `
                <div class="no-data">No data from yesterday</div>
            `;
            return;
        }

        const habits = this.habitManager.getAll();
        const habitSummaries = habits.slice(0, 5).map(habit => {
            const data = summary.habits[habit.id];
            const percent = data?.completionPercent || 0;
            return `
                <div class="yesterday-habit">
                    <span class="yh-icon">${habit.icon}</span>
                    <span class="yh-name">${habit.name}</span>
                    <span class="yh-percent ${percent >= 80 ? 'good' : percent >= 50 ? 'medium' : 'low'}">${percent}%</span>
                </div>
            `;
        }).join('');

        this.elements.yesterdaySummary.innerHTML = `
            <div class="yesterday-header">
                <strong>Yesterday's Progress</strong>
                <span class="yesterday-overall ${summary.overallPercent >= 80 ? 'good' : ''}">${summary.overallPercent}%</span>
            </div>
            <div class="yesterday-habits">${habitSummaries}</div>
            ${habits.length > 5 ? `<div class="more-habits">+${habits.length - 5} more habits</div>` : ''}
        `;
    }

    renderWeeklyChart() {
        const data = this.dailyManager.getWeeklyData();
        if (!this.elements.weeklyChart) return;

        const maxPercent = Math.max(...data.map(d => d.percent), 1);

        this.elements.weeklyChart.innerHTML = data.map(d => {
            const height = (d.percent / 100) * 100;
            return `
                <div class="chart-bar">
                    <div class="bar-value">${d.percent}%</div>
                    <div class="bar-container">
                        <div class="bar-fill" style="height: ${height}%"></div>
                    </div>
                    <div class="bar-label">${d.day}</div>
                </div>
            `;
        }).join('');
    }

    // ============================================
    // PAST DAY BROWSER
    // ============================================

    navigatePastDay(direction) {
        const currentDate = new Date(this.browsedDate);
        currentDate.setDate(currentDate.getDate() + direction);

        const today = DateUtils.getToday();
        const minDate = DateUtils.getDaysAgo(60);
        const newDate = currentDate.toISOString().split('T')[0];

        // Don't go into the future or beyond 60 days ago
        if (newDate >= today || newDate < minDate) return;

        this.browsedDate = newDate;
        this.renderPastDayBrowser();

        // Vibrate feedback
        if (navigator.vibrate) navigator.vibrate(30);
    }

    renderPastDayBrowser() {
        if (!this.elements.selectedDate) return;

        // Format date for display
        const date = new Date(this.browsedDate + 'T00:00:00');
        const displayDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        this.elements.selectedDate.textContent = displayDate;

        // Get record for this date
        const record = this.dailyManager.getRecord(this.browsedDate);

        // Update navigation buttons
        const today = DateUtils.getToday();
        const yesterday = DateUtils.getYesterday();
        const minDate = DateUtils.getDaysAgo(59);

        if (this.elements.nextDayBtn) {
            this.elements.nextDayBtn.disabled = this.browsedDate >= yesterday;
        }
        if (this.elements.prevDayBtn) {
            this.elements.prevDayBtn.disabled = this.browsedDate <= minDate;
        }

        // Render summary
        if (this.elements.pastDaySummary) {
            if (record) {
                this.elements.pastDaySummary.innerHTML = `
                    <div class="past-day-percent">${record.overallPercent}%</div>
                    <div class="past-day-label">completed on this day</div>
                `;
            } else {
                this.elements.pastDaySummary.innerHTML = `
                    <p class="hint-text">No data for this day</p>
                `;
            }
        }

        // Get incomplete tasks
        const incompleteTasks = this.getIncompleteTasksFromDay(this.browsedDate);

        // Render incomplete tasks
        if (this.elements.incompleteTasksList) {
            if (incompleteTasks.length === 0 && record) {
                this.elements.incompleteTasksList.innerHTML = `
                    <div class="no-incomplete-tasks">
                        <div class="success-icon">✅</div>
                        <p>All tasks completed!</p>
                    </div>
                `;
            } else if (incompleteTasks.length === 0) {
                this.elements.incompleteTasksList.innerHTML = '';
            } else {
                this.elements.incompleteTasksList.innerHTML = `
                    <div class="incomplete-tasks-header">
                        <span>⚠️</span> Incomplete Tasks (${incompleteTasks.length})
                    </div>
                    ${incompleteTasks.map(task => `
                        <div class="incomplete-task-card">
                            <div class="incomplete-task-info">
                                <div class="incomplete-task-habit">
                                    <span>${task.habitIcon}</span>
                                    <span>${this.escapeHtml(task.habitName)}</span>
                                </div>
                                <div class="incomplete-task-title">${this.escapeHtml(task.title)}</div>
                            </div>
                            <button class="reschedule-btn" 
                                    onclick="app.rescheduleTask('${task.habitId}', '${this.escapeHtml(task.title).replace(/'/g, "\\'")}')">+ Today</button>
                        </div>
                    `).join('')}
                `;
            }
        }
    }

    getIncompleteTasksFromDay(dateStr) {
        const record = this.dailyManager.getRecord(dateStr);
        if (!record) return [];

        const incompleteTasks = [];
        const habits = this.habitManager.getAll();

        Object.keys(record.habits).forEach(habitId => {
            const habitData = record.habits[habitId];
            const habit = habits.find(h => h.id === habitId);

            if (!habit || !habitData.subtasks) return;

            habitData.subtasks.forEach(subtask => {
                if (!subtask.done && subtask.progress < 100) {
                    incompleteTasks.push({
                        habitId: habit.id,
                        habitName: habit.name,
                        habitIcon: habit.icon,
                        title: subtask.title,
                        progress: subtask.progress
                    });
                }
            });
        });

        return incompleteTasks;
    }

    rescheduleTask(habitId, taskTitle) {
        // Add the task to today's habit
        const newSubtask = this.dailyManager.addSubtask(habitId, taskTitle);

        if (newSubtask) {
            // Show feedback
            alert(`✅ "${taskTitle}" added to today's tasks!`);

            // Re-render
            this.render();
            this.renderPastDayBrowser();

            // Vibrate feedback
            if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
        }
    }

    checkNotifications() {
        if (this.notificationManager.shouldAskPermission()) {
            setTimeout(() => this.showNotificationToast(), 3000);
        }
    }

    showNotificationToast() {
        this.elements.notificationToast?.classList.add('active');
    }

    hideNotificationToast() {
        this.elements.notificationToast?.classList.remove('active');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================
    // DELETE HABIT FUNCTIONALITY
    // ============================================

    showDeleteConfirmation() {
        if (!this.expandedHabit) return;

        const habit = this.habitManager.getById(this.expandedHabit);
        if (!habit) return;

        // Update confirmation text with habit name
        if (this.elements.deleteConfirmText) {
            this.elements.deleteConfirmText.textContent =
                `This will permanently delete "${habit.name}" and all its history. This cannot be undone.`;
        }

        this.elements.deleteConfirmModalOverlay?.classList.add('active');
    }

    hideDeleteConfirmation() {
        this.elements.deleteConfirmModalOverlay?.classList.remove('active');
    }

    confirmDeleteHabit() {
        if (!this.expandedHabit) return;

        const habitId = this.expandedHabit;
        const habit = this.habitManager.getById(habitId);

        // Delete the habit from habit manager
        this.habitManager.deleteHabit(habitId);

        // Remove habit data from today's record
        const today = DateUtils.getToday();
        const record = this.dailyManager.records[today];
        if (record && record.habits[habitId]) {
            delete record.habits[habitId];
            this.dailyManager.recalculateOverall();
            this.dailyManager.save();
        }

        // Close modals
        this.hideDeleteConfirmation();
        this.closeSubtaskModal();

        // Re-render UI
        this.render();

        // Vibrate feedback
        if (navigator.vibrate) navigator.vibrate([50, 30, 50]);

        console.log(`🗑️ Deleted habit: ${habit?.name || habitId}`);
    }
}

// ============================================
// APP INITIALIZATION
// ============================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new UIController();

    // Day change detection
    let lastDate = DateUtils.getToday();
    setInterval(() => {
        const currentDate = DateUtils.getToday();
        if (currentDate !== lastDate) {
            lastDate = currentDate;
            location.reload(); // Refresh on new day
        }
    }, 60000);

    console.log('🎯 JEE Habit Tracker loaded successfully!');
});

// Expose global methods for inline handlers
window.app = {
    openHabitDetail: (id) => app?.openHabitDetail(id),
    toggleSubtask: (habitId, subtaskId) => app?.toggleSubtask(habitId, subtaskId),
    updateSubtaskProgress: (habitId, subtaskId, value) => app?.updateSubtaskProgress(habitId, subtaskId, value),
    deleteSubtask: (habitId, subtaskId) => app?.deleteSubtask(habitId, subtaskId),
    rescheduleTask: (habitId, taskTitle) => app?.rescheduleTask(habitId, taskTitle)
};

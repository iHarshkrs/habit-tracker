/* ============================================
   🧪 DUMMY DATA GENERATOR
   Generate 7 days of sample data for preview
   Run this once, then delete this file
   ============================================ */

(function () {
    const STORAGE_KEYS = {
        HABITS: 'jee_tracker_habits',
        DAILY_RECORDS: 'jee_tracker_daily'
    };

    // Helper to get date string N days ago
    function getDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }

    // Load existing habits or use sample
    let habits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS)) || [];

    if (habits.length === 0) {
        console.log('No habits found. Please open the app first to initialize habits.');
        return;
    }

    // Generate random progress data
    function randomProgress() {
        const rand = Math.random();
        if (rand > 0.7) return 100;  // 30% chance of complete
        if (rand > 0.4) return Math.floor(Math.random() * 40) + 50; // 30% chance of 50-90
        if (rand > 0.2) return Math.floor(Math.random() * 30) + 20; // 20% chance of 20-50
        return Math.floor(Math.random() * 20); // 20% chance of 0-20
    }

    // Sample subtask titles per habit
    const subtaskSamples = {
        'exercise': ['Morning Run 30min', 'Push-ups 50x', 'Stretching', 'Evening Walk'],
        'jee-math': ['Definite Integration PYQs', 'Algebra Problems', 'Coordinate Geometry', 'Mock Test'],
        'jee-physics': ['Mechanics Numericals', 'Electrostatics Theory', 'Optics PYQs', 'Formula Revision'],
        'jee-chemistry': ['Organic Reactions', 'Periodic Table', 'Physical Chem Problems', 'GOC Practice'],
        'jee-60days': ['Day Target Complete', 'Backlog Topic', 'Weak Area Focus'],
        'jee-99': ['High Weightage Ch', 'Important Derivations', 'Topper Notes'],
        'jee-paper-analysis': ['2024 Paper Analysis', 'Mistake Notes', 'Pattern Study'],
        'bme': ['Lecture Notes', 'Lab Report', 'Assignment'],
        'college-math': ['Calculus Tutorial', 'Linear Algebra', 'Assignment Solving'],
        'es': ['Chapter 3 Reading', 'Case Study', 'Quiz Prep'],
        'be': ['Circuit Analysis', 'Breadboard Practice', 'Viva Topics'],
        'college-chemistry': ['Titration Notes', 'Organic Theory', 'Lab Prep'],
        'book-reading': ['Atomic Habits Ch 5', 'Notes Summary', 'Key Takeaways'],
        'english': ['50 Vocab Words', 'Essay Writing', '15min Speaking'],
        'communication': ['Mirror Practice', 'Confidence Exercise', 'Video Recording'],
        'day-vlog': ['Morning Clip', 'Study Timelapse', 'Night Edit'],
        'learning-new': ['Python Course', 'Project Practice', 'Documentation'],
        'yt-ai': ['Script Writing', 'ChatGPT Experiment', 'Thumbnail Ideas'],
        'finance': ['Expense Entry', 'Investment Study', 'Budget Check'],
        'reviewing-today': ['3 Wins Today', '1 Improvement', 'Tomorrow Plan']
    };

    // Update habit streaks based on data
    habits.forEach(habit => {
        // Random streak between 0-7
        const streakDays = Math.floor(Math.random() * 5) + 2; // 2-6 days
        habit.streak = streakDays;
        habit.bestStreak = Math.max(habit.bestStreak || 0, streakDays + Math.floor(Math.random() * 5));
    });
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));

    // Generate records for past 7 days
    const records = {};

    for (let day = 6; day >= 0; day--) {
        const dateStr = getDaysAgo(day);

        const dayRecord = {
            date: dateStr,
            habits: {},
            overallPercent: 0,
            timestamp: new Date(dateStr).getTime()
        };

        let totalPercent = 0;
        let habitCount = 0;

        habits.forEach(habit => {
            const samples = subtaskSamples[habit.id] || ['Task 1', 'Task 2', 'Task 3'];
            const numSubtasks = Math.floor(Math.random() * 2) + 2; // 2-3 subtasks

            const subtasks = [];
            for (let i = 0; i < numSubtasks; i++) {
                const progress = randomProgress();
                subtasks.push({
                    id: `${habit.id}-${i}-${Date.now()}-${day}`,
                    title: samples[i % samples.length],
                    done: progress === 100,
                    progress: progress
                });
            }

            const avgProgress = Math.round(subtasks.reduce((sum, st) => sum + st.progress, 0) / subtasks.length);

            dayRecord.habits[habit.id] = {
                subtasks: subtasks,
                completionPercent: avgProgress,
                completed: avgProgress >= 80
            };

            totalPercent += avgProgress;
            habitCount++;
        });

        dayRecord.overallPercent = Math.round(totalPercent / habitCount);
        records[dateStr] = dayRecord;
    }

    // Save records
    localStorage.setItem(STORAGE_KEYS.DAILY_RECORDS, JSON.stringify(records));

    console.log('✅ Generated 7 days of dummy data!');
    console.log('📊 Records:', records);
    console.log('🔥 Updated streaks for', habits.length, 'habits');
    console.log('');
    console.log('👉 Refresh the page to see the data!');

    alert('✅ 7 days of sample data generated!\n\nRefresh the page to see:\n• Weekly chart with bars\n• Yesterday summary\n• Habit streaks\n• Completion percentages');
})();

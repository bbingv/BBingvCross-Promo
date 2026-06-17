const express = require('express');
const router = express.Router();

// Mock database reference
const stats = {};

// Get Creator Stats
router.get('/creator/:creatorId', (req, res) => {
  try {
    const { creatorId } = req.params;

    // Mock data
    const creatorStats = {
      creatorId,
      totalCasesCompleted: 5,
      totalCasesInProgress: 2,
      totalCasesApplied: 8,
      totalCompensation: 15000,
      joinedAt: new Date('2024-01-01'),
      accounts: {
        threads: { followers: 1200, posts: 45 },
        instagram: { followers: 5400, posts: 89 },
        dcard: { followers: 800, posts: 23 }
      },
      averageRating: 4.8,
      totalReviews: 12
    };

    res.json({
      success: true,
      stats: creatorStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Platform Stats
router.get('/platform', (req, res) => {
  try {
    const platformStats = {
      totalCreators: 45,
      totalCases: 120,
      completedCases: 89,
      totalCompensationPaid: 450000,
      activePlatforms: {
        threads: 42,
        instagram: 44,
        dcard: 38
      },
      statistics: {
        averageCaseCompensation: 3750,
        averageCreatorCases: 2.6,
        completionRate: '74.2%'
      }
    };

    res.json({
      success: true,
      stats: platformStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Dashboard Overview
router.get('/dashboard/overview', (req, res) => {
  try {
    const overview = {
      thisMonth: {
        newCreators: 8,
        newCases: 15,
        completedCases: 12,
        totalCompensation: 45000
      },
      lastMonth: {
        newCreators: 6,
        newCases: 10,
        completedCases: 8,
        totalCompensation: 30000
      },
      topCreators: [
        { id: '1', name: 'Creator A', completedCases: 12, rating: 4.9 },
        { id: '2', name: 'Creator B', completedCases: 10, rating: 4.8 },
        { id: '3', name: 'Creator C', completedCases: 9, rating: 4.7 }
      ],
      recentCases: [
        { id: '1', title: 'Case 1', status: 'completed', creator: 'Creator A' },
        { id: '2', title: 'Case 2', status: 'in_progress', creator: 'Creator B' },
        { id: '3', title: 'Case 3', status: 'open', creator: null }
      ]
    };

    res.json({
      success: true,
      overview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

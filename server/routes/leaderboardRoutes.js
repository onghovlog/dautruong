import express from 'express';
import { getLeaderboard } from '../services/leaderboardService.js';
import { getActiveSeason } from '../services/gameService.js';
import { getPlayerByToken } from '../auth/playerAuth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { timeRange = 'all' } = req.query;
    let seasonId = req.query.seasonId;

    if (!seasonId) {
      const activeSeason = await getActiveSeason();
      seasonId = activeSeason.id;
    }

    // Nhận diện người chơi nếu có cookie
    let currentPlayerId = null;
    const playerToken = req.cookies?.player_token;
    if (playerToken) {
      const player = await getPlayerByToken(playerToken);
      if (player) {
        currentPlayerId = player.playerId;
      }
    }

    const leaderboard = await getLeaderboard(seasonId, timeRange, currentPlayerId);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

// 사용자 팔로우
router.post('/users/:userId/follow', authMiddleware, async (req, res) => {
  // 사용자 팔로우 로직
});

// 사용자 언팔로우
router.delete('/users/:userId/follow', authMiddleware, async (req, res) => {
  // 사용자 언팔로우 로직
});
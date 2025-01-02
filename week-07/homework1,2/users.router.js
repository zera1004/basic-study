// 프로필 조회
router.get('/users/:userId', authMiddleware, async (req, res) => {
  // 프로필 조회 로직
});

// 프로필 수정
router.patch('/users/:userId', authMiddleware, async (req, res) => {
  // 프로필 수정 로직
});

// 회원 탈퇴
router.delete('/users/:userId', authMiddleware, async (req, res) => {
  // 회원 탈퇴 로직
});

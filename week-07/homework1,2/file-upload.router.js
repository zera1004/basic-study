// 프로필 사진 업로드
router.post('/users/:userId/profile-imagew', authMiddleware, async (req, res) => {
  // 프로필 사진 업로드 로직
});

// 게시물 이미지 업로드
router.post('/posts/:postId/images', authMiddleware, async (req, res) => {
  // 게시물 이미지 업로드 로직
});
// 게시물 좋아요
router.post('/posts/:postId/likes', authMiddleware, async (req, res) => {
  // 게시물 좋아요 로직
});

// 게시물 좋아요 취소
router.delete('/posts/:postId/likes', authMiddleware, async (req, res) => {
  // 게시물 좋아요 취소 로직
});
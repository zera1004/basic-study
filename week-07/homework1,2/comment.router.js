// 댓글 작성
router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  // 댓글 작성 로직
});

// 댓글 목록 조회
router.get('/posts/:postId/comments', async (req, res) => {
  // 댓글 목록 로직
});

// 댓글 수정
router.patch('/posts/:postId/comments/:commnetId', authMiddleware, async (req, res) => {
  // 댓글 수정 로직
});

// 댓글 삭제
router.patch('/posts/:postId/comments/:commnetId', authMiddleware, async (req, res) => {
  // 댓글 삭제 로직
});
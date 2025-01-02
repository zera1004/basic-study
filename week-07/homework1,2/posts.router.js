// 게시물 작성
router.post('/posts', authMiddleware, async (req, res) => {
  // 게시물 작성 로직
});

// 게시물 목록 조회
router.get('/posts', async (req, res) => {
  // 게시물 목록 조회 로직
});

// 게시물 상세 조회
router.get('/posts/:postId', async (req, res) => {
  // 게시물 상세 조회 로직
});

// 게시물 수정
router.patch('/posts/:postId', authMiddleware, async (req, res) => {
  // 게시물 수정 로직
});

// 게시물 삭제
router.delete('/posts/:postId', authMiddleware, async (req, res) => {
  // 게시물 삭제 로직
});
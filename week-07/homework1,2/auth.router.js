// 회원가입
router.post('/signup', async (req, res) => {
  // 회원가입 로직
});

// 로그인
router.post('/login', async (req, res) => {
  // 로그인 로직
});

// 로그아웃
router.post('/logout', authMiddleware, async (req, res) => {
  // 로그아웃 로직
});

import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 로그인 로직 연동 시 여기에서 호출하세요.
    // 개발 중 StrictMode 이슈로 인한 중복 호출 방지를 위해
    // 요청 중복 방지/멱등 처리를 권장합니다.
    console.log("login submit", { email, password });
  };

  return (
    <Box display="flex" justifyContent="center" mt={{ xs: 4, md: 8 }} px={2}>
      <Paper elevation={0} sx={{ maxWidth: 420, width: "100%", p: { xs: 3, md: 4 }, border: (t) => `1px solid ${t.palette.border?.default || "#e5e5e5"}`, borderRadius: 2 }}>
        <Stack gap={3} component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" fontWeight={700}>로그인</Typography>
          <TextField
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" size="large">로그인</Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;



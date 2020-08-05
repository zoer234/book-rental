const dotenv = require("dotenv");
dotenv.config({ path: " ./cofig/config.env " });

// 내가 만든 파일 require 는 이 아래에 다가 넣는다
const users = require("./routes/users");

const app = express();
app.use(express.json());

app.user("/api/v1/users", users);

const PORT = process.env.PORT || 5322;
app.listen(PORT, console.log("서버 가동"));

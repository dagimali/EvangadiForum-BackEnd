/** @format */

login: (req, res) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password)
    return res.status(400).json({ msg: "Not all fields have been provided!" });
  getUserByEmail(email, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: "database connection err" });
    }
    if (!results) {
      return res
        .status(404)
        .json({ msg: "No account with this email has been registered" });
    }
    const isMatch = bcrypt.compareSync(password, results.user_password);
    if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });
    const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: results.user_id,
        display_name: results.user_name,
      },
    });
  });
};

// controler
const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createUser,
  getUsers,
  getUserById,
  login,
} = require("./user.controller");

router.post("/", createUser);
router.get("/all", getUsers);
router.get("/", auth, getUserById);
router.post("/login", login);

module.exports = router;

// isMatching = bcrypt.compare(password, results.password);
// if (!isMatch)
//   return res.status(404).json({ msg: "Invalid Credentials" });
// const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
//   expiresIn: 3600,
// });
// return res.json({
//   token,
//   user: {
//     id: results.user_id,
//     display_name: results.user_name,
//   },
// });
const [selectedAvatar, setSelectedAvatar] = useState();
const [formData, setFormData] = useState({
  avatar: "",
});

useEffect(() => {
  if (!selectedAvatar) {
    setFormData({ ...formData, avatar: "" });
    return;
  }

  const objectUrl = URL.createObjectURL(selectedAvatar);

  //DB call to save objectUrl into the DB

  setFormData({ ...formData, avatar: objectUrl });

  return () => URL.revokeObjectURL(objectUrl);
}, [selectedAvatar]);

const onSelectFile = (e) => {
  if (!e.target.files || !e.target.files.length) {
    setSelectedAvatar("");
    return;
  }

  setSelectedAvatar(e.target.files[0]);
};

return (
  <div>
    <input type="file" onChange={onSelectFile} />
    {!!selectedAvatar && (
      <div>
        <ProfileBanner.Header
          coverSrc={coverSrc}
          avatar={formData.avatar}
          className="mb-8"
        />
      </div>
    )}
  </div>
);
const [userData, setUserData] = useContext(UserContext);
const [listQuestion, setListQuestion] = UseState([]);
const navigate = useNavigate();
const handleRequest = () => {
  navigate("/ask");
};
useEffect(() => {
  fetch("http://localhost:3000/api/users/questions")
    .then((response) => response.json)
    .then((data) => {
      setListQuestion(data);
    })
    .catch((error) => {
      console.log(error);
    });
  if (!userData.user) navigate("/login");
}, [userData.user, navigate, question]);
port = 3000;
host = localhost;
database = evangadiforum;
user = EvangadiForum;
password = rv80bBcTfUrTEI3;
JWT_SECRET = rv80bBcTfUrTEI3;

gitignor
// # dependencies
/node_modules
/.pnp
.pnp.js

// # testing
/coverage

// # production
/build

// # misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log
yarn-debug.log
yarn-error.log
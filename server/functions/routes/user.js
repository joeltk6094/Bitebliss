// const router = require("express").Router();
// // // const admin = require("firebase-admin");

// router.get("/", (req, res) => {
//   return res.send("Inside the user router");
// });

// router.get("/jwtVerification", async (req, res) => {
//   if (!req.headers.authorization) {
//     return res.status(500).send({msg: "Token not found"});
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decodedValue = await admin.auth().verifyIdToken(token);
//     if (!decodedValue) {
//       return res.status(500).json({success: false, msg: "Unauthorized"});
//     }
//     return res.status(200).json({success: true, data: decodedValue});
//   } catch (err) {
//     return res.send({
//       success: false,
//       msg: `Error in extracting the token: ${err}`,
//     });
//   }
// });

// module.exports = router;

//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decodedValue = await admin.auth().verifyIdToken(token);
//     if (!decodedValue) {
//       return res.status(500).json({ success: false, msg: "Unauthorized" });
//     }
//     return res.status(200).json({ success: true, data: decodedValue });
//   } catch (err) {
//     return res.send({
//       success: false,
//       msg: `Error in extracting the token: ${err}`,
//     });
//   }
// });
// const ListAllUsers = async (nextPageToken) => {
//   admin
//     .auth()
//     .listUsers(1000, nextPageToken)
//     .then((listUserResult) => {
//       listUserResult.users.forEach((rec) => {
//         data.push(rec.toJSON());
//       });
//       if (listUserResult.pageToken) {
//         ListAllUsers(listUserResult.pageToken);
//       }
//     })
//     .catch((err) => console.log(err));
// };
// // Start listing users from the beginning, 1000 at a time.
// ListAllUsers();
// router.get("/all", async (req, res) => {
//   ListAllUsers();
//   try {
//     return res
//       .status(200)
//       .send({ success: true, data: data, dataCount: data.length });
//   } catch (err) {
//     return res.send({
//       success: false,
//       msg: "Error in listing users: " + err.message,
//     });
//   }
// });


const router = require("express").Router();
const admin = require("firebase-admin");

const data=[];
const ListAllUsers = async (nextPageToken) => {
  try {
    const listUserResult = await admin.auth().listUsers(1000, nextPageToken);

    listUserResult.users.forEach((rec) => {
      data.push(rec.toJSON());
    });

    if (listUserResult.pageToken) {
      await ListAllUsers(listUserResult.pageToken);
    }
  } catch (err) {
    console.error("Error in listing users:", err);
  }
};

ListAllUsers();

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({msg: "Token not found"});
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedValue = await admin.auth().verifyIdToken(token);

    if (!decodedValue) {
      return res.status(500).json({success: false, msg: "Unauthorized"});
    }

    return res.status(200).json({success: true, data: decodedValue});
  } catch (err) {
    return res.send({
      success: false,
      msg: `Error in extracting the token: ${err}`,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    return res
        .status(200)
        .send({success: true, data: data, dataCount: data.length});
  } catch (err) {
    return res.send({
      success: false,
      msg: "Error in listing users: " + err.message,
    });
  }
});

module.exports = router;

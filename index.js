const express = require("express");
const bodyparser = require("body-parser");
const port = 8080;
const app = express();

let Globalusers = [
  
];
let counter = 0; 

// express จะใช้ bodyparserในการอ่าน ถ้า.textก็จะได้เป็นtext
app.use(bodyparser.json());

app.listen(port, () => {
  console.log(`HTTP server running at port ${port}`);
});


app.get("/user", (req, res) => {
  
  const filteruser = Globalusers.map((i, index) => {
    return {
      firstname: i.firstname,
      lastname: i.lastname,
      indexที่: index   
    }
  });

  res.json(filteruser);
});


app.get("/user/:id", (req, res) => {
  let id = parseInt(req.params.id); // เปลี่ยน id ให้เป็นตัวเลขเพื่อการเปรียบเทียบที่ถูกต้อง
  let IDIndex = Globalusers.findIndex(i => i.id === id);

  // ตรวจสอบว่าพบผู้ใช้หรือไม่
  if (IDIndex !== -1) {
    res.json(Globalusers[IDIndex]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});


app.post("/user", (req, res) => {
  let inp = req.body;
  //เพิ่มค่าcounterที่เราสร้าง ลงไปใส่ในbody 
  inp.id = counter;
  counter += 1;
  Globalusers.push(inp);
  res.json({ message: "User added successfully", user: inp });
});



// PUT - update user
app.patch("/user/:id", (req, res) => {
  //รับ เป็นparam
  let id = req.params.id
  let updateuser = req.body;
  // Find index
  let selectind = Globalusers.findIndex((i) => {
    if (i.id == id) {
      return true;
    } else {
      return false;
    }
  });
  
    // ถ้าพบ user ที่ต้องการอัปเดต ให้ทำการอัปเดตข้อมูลนั้น
    if (updateuser.firstname){
      Globalusers[selectind].firstname = updateuser.firstname
    }
    if (updateuser.lastname){
      Globalusers[selectind].lastname = updateuser.lastname
    }
    res.json({
      message: "User update complete!",
      data: {
        user: updateuser,
        indexUpdate: selectind,
      },
    });
  }
);

app.delete("/user/:id" , (req,res) =>{
  let id = req.params.id
  let delIndex = Globalusers.findIndex(i => i.id == id)
   
  // delete Globalusers[delIndex]
  delete Globalusers.slice(delIndex,1)
    res.json({
      message : "Delete Json file",
      indexdeleted : delIndex
    }
    )

  })
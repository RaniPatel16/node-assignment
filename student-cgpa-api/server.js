const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const students = [
  {
    id: 1,
    name: "Aarav Sharma",
    branch: "CSE",
    semester: 8,
    cgpa: 9.3
  },
  {
    id: 2,
    name: "Ishita Verma",
    branch: "IT",
    semester: 7,
    cgpa: 8.9
  },
  {
    id: 3,
    name: "Rohan Kulkarni",
    branch: "ECE",
    semester: 6,
    cgpa: 8.4
  },
  {
    id: 4,
    name: "Meera Iyer",
    branch: "CSE",
    semester: 8,
    cgpa: 9.1
  },
  {
    id: 5,
    name: "Kunal Deshmukh",
    branch: "IT",
    semester: 5,
    cgpa: 7.8
  },
  {
    id: 6,
    name: "Ananya Reddy",
    branch: "CSE",
    semester: 6,
    cgpa: 8.7
  },
  {
    id: 7,
    name: "Vikram Patil",
    branch: "ECE",
    semester: 7,
    cgpa: 8.2
  },
  {
    id: 8,
    name: "Priyanka Nair",
    branch: "AI",
    semester: 4,
    cgpa: 8.8
  },
  {
    id: 9,
    name: "Harsh Mehta",
    branch: "Data Science",
    semester: 5,
    cgpa: 8.0
  },
  {
    id: 10,
    name: "Neha Gupta",
    branch: "CSE",
    semester: 6,
    cgpa: 7.9
  }
];

//Routes
//GET /students
app.get("/students", (req,res) =>{
    res.status(200).json(students);
});

//GET /students/topper

app.get("/students/topper", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({
      message: "No students found"
    });
  }
  const topper = students.reduce((max, student) => {
    return student.cgpa > max.cgpa ? student : max;
  });
  res.status(200).json(topper);
});


//GET /students/average
app.get("/students/average", (req, res) => {
  if (students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  const totalCGPA = students.reduce((sum, s) => sum + s.cgpa, 0);
  const average = (totalCGPA / students.length).toFixed(2);

  res.status(200).json({ averageCGPA:Number(average) });
});

//GET /students/count
app.get("/students/count", (req,res) =>{
    res.status(200).json({totalStudents: students.length});
});

//GET /students/:id
app.get("/students/:id", (req, res)=>{
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!students){
        return res.status(404).json({message: "Students not found"});
    }

    res.status(200).json(student);
});

//GET /students/branch/:branchName
app.get("/students/branch/:branchName", (req, res) =>{
    const branchName = req.params.branchName.toLowerCase();

    const filterStudents = students.filter(
        s => s.branch.toLowerCase() === branchName
    );

    res.status(200).json(filterStudents);
});

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
});
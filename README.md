Student_apis
To run the api
Clone the repo

- url :https://github.com/INDUDHA/Student_apis.git
- cd Student_details_api
- then run npm run dev command in integrated terminal
- Api url : http://localhost:8000/studentDetails
- method : post
- body(form-data) :{
  files : "uploaded file path (should be in xlsx format) template xlsx file is given.",
  name : "abcd",
  page_number : "1",
  page_size :"5"
  }
- output : Success{
  "status": 200,
  "page_number": 1,
  "page_size": 5,
  "message": "Student Details",
  "student_data": [
  {
  "total_marks": "519",
  "id": "1",
  "name": "Abishek",
  "father_name": "Harsha",
  "mother_name": "Poornima",
  "english": "80",
  "kannada": "90",
  "hindi": "100",
  "science": "89",
  "social": "70",
  "maths": "90"
  },
  {
  "total_marks": "439",
  "id": "2",
  "name": "Bharat",
  "father_name": "Suresh",
  "mother_name": "Uma",
  "english": "90",
  "kannada": "70",
  "hindi": "50",
  "science": "60",
  "social": "80",
  "maths": "89"
  },
  {
  "total_marks": "456",
  "id": "3",
  "name": "Chandan",
  "father_name": "Umesh",
  "mother_name": "Anu",
  "english": "100",
  "kannada": "78",
  "hindi": "50",
  "science": "100",
  "social": "78",
  "maths": "50"
  },
  {
  "total_marks": "420",
  "id": "4",
  "name": "Dinesh",
  "father_name": "Jayashankar",
  "mother_name": "Revati",
  "english": "50",
  "kannada": "100",
  "hindi": "60",
  "science": "50",
  "social": "100",
  "maths": "60"
  },
  {
  "total_marks": "440",
  "id": "5",
  "name": "Erresh",
  "father_name": "Yash",
  "mother_name": "Priya",
  "english": "60",
  "kannada": "90",
  "hindi": "70",
  "science": "60",
  "social": "90",
  "maths": "70"
  }
  ]
  }

- Api url : "http://localhost:8000/studentDetails/name"
- Method : Get
- Output : Success {
  "status": 200,
  "message": "Records found in that name",
  "no_of_students": 1,
  "student_data": [
  {
  "total_marks": "440",
  "id": "5",
  "name": "Erresh",
  "father_name": "Yash",
  "mother_name": "Priya",
  "english": "60",
  "kannada": "90",
  "hindi": "70",
  "science": "60",
  "social": "90",
  "maths": "70"
  }
  ]
  }


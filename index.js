const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const xlsxtojson = require("xlsx-to-json-lc");
const student_details = "./temp/student_details.json";

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/studentDetails", async (req, res) => {
  try {
    let fileData = req.files.files;
    console.log("fileData" + fileData);
    let currentTimestamp = Date.now();
    let file_name = req.body.name + currentTimestamp + ".xlsx";
    let json_file_name = currentTimestamp + ".json";
    console.log("filename" + file_name);
    let page_number = parseInt(req.body.page_number);
    let page_size = parseInt(req.body.page_size);
    let startIndex = (page_number - 1) * page_size;
    const endIndex = startIndex + page_size;

    await fileData.mv("./temp/" + file_name, function (err) {
      xlsxtojson(
        {
          input: "./temp/" + file_name,
          output: "./temp/" + json_file_name,
          sheet: "Sheet1",
          lowerCaseHeaders: true,
        },
        function (err, result) {
          if (err) {
            console.error(err);
            res.status(500).send("Error converting file to JSON");
          } else {
            let studentResult = result.slice(startIndex, endIndex);
            fs.unlink("./temp/" + file_name, function (err) {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("File deleted successfully");
              }
            });
            let jsonData = [];
            if (fs.existsSync(student_details)) {
              const existingData = fs.readFileSync(student_details);
              try {
                jsonData = JSON.parse(existingData);
              } catch (error) {
                console.error("Error parsing existing JSON data:", error);
              }
            }
            jsonData.push(...studentResult);
            fs.writeFileSync(
              student_details,
              JSON.stringify(jsonData, null, 2)
            );

            console.log(result);
            res.status(200).send({
              status: 200,
              page_number: page_number,
              page_size: page_size,
              message: "Student Details",
              student_data: studentResult,
            });
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: "Error while displaying student details",
    });
  }
});

app.get("/studentDetails/:name", async (req, res) => {
  try {
    let params = req.params;
    console.log("params" + params);
    console.log("name" + params.name);
    fs.readFile(student_details, function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).send("Error reading student details");
      } else {
        let studentData = JSON.parse(data);
        console.log("Student data: " + JSON.stringify(studentData));
        var result = studentData.filter((obj) => obj.name == params.name);
        if (result == [] || result == undefined) {
          res.status(200).send({
            staus: 200,
            message: "No record found in that name",
          });
        } else {
          res.status(200).send({
            status: 200,
            message: "Records found in that name",
            no_of_students: result.length,
            student_data: result,
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching student details");
  }
});

app.listen(port, () => {
  console.log(`Student Details APIs listening on port ${port}`);
});

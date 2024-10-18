import React, { useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useDropzone } from "react-dropzone";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateChart = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          layout="vertical"
          width={400}
          height={600}
          margin={{ top: 0, right: 10, left: 30, bottom: 300 }}
          barCategoryGap="5%"
        >
          <XAxis type="number" />
          <YAxis dataKey="label" type="category" width={165} interval={0} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ImageUpload = ({
  setPrediction,
  setImagePreview,
  setChartData,
  imagePreview,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        handleFileUpload(file);
      }
    },
  });

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      // Set the breed prediction and pass the remaining data to the chart
      setPrediction(data[0].breed);
      let chartData = data.slice(1); // Remove the first element
      chartData = chartData.map((item) => ({
        ...item,
        value: parseFloat(item.value),
      }));
      setChartData(chartData);
      console.log(chartData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      {...getRootProps()}
      className={`border p-5 text-center ${isDragActive ? "bg-light" : ""}`}
      style={{
        borderRadius: "10px",
        marginLeft: "1rem",
        height: "60vh",
        boxShadow: "0px 4px 10px rgba(136, 136, 136, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <input {...getInputProps()} />
      <p className="mb-3 px-5">
        Drag & drop an image here, or click to select one
      </p>
      <button type="button" className="btn btn-outline-dark mt-3">
        Browse File
      </button>
      {imagePreview && (
        <div className="mt-4 text-center">
          <img
            src={imagePreview}
            alt="Uploaded preview"
            style={{
              width: "100%",
              maxWidth: "200px",
              maxHeight: "150px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(136, 136, 136, 0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};

const Predictions = ({ predictedLabel, plotUrl, chartData }) => {
  return (
    <div>
      <h3 className="text-center container">
        Predicted Breed: {predictedLabel}
      </h3>
      <div className=" text-center ">
        {/* <h5>Prediction Confidence Plot</h5> */}
        <CreateChart data={chartData} />
      </div>
      {/* {chartData && <CreateChart data={chartData} />} */}
    </div>
  );
};

const PredictComponent = () => {
  const [predictedLabel, setPrediction] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [chartData, setChartData] = useState([]);

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center"
      id="predict"
      style={{ backgroundColor: "#e8f9f4" }}
    >
      <div className="row w-100 mt-5">
        <div className="col-lg-5">
          <ImageUpload
            setPrediction={setPrediction}
            setImagePreview={setImagePreview}
            setChartData={setChartData}
            imagePreview={imagePreview}
          />
        </div>
        <div className="col-lg-7">
          <Predictions predictedLabel={predictedLabel} chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default PredictComponent;
